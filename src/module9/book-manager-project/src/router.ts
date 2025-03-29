import express, { Request, Response } from 'express'
import * as Yup from 'yup'
import { loginHandler } from './handlers/auth/login/handler'
import { logoutHandler } from './handlers/auth/logout/handler'
import { Handler, HandlerError } from './types'
import { createAuthorHandler } from './handlers/author/createAuthor/handler'
import { deleteAuthorById } from './handlers/author/deleteAuthorById/handler'
import { getAuthorById } from './handlers/author/getAuthorById/handler'
import { updateAuthorByIdHandler } from './handlers/author/updateAuthorById/handler'
import { createPublisherHandler } from './handlers/publisher/createPublisher/handler'
import { deletePublisherById } from './handlers/publisher/deletePublisherById/handler'
import { getPublisherById } from './handlers/publisher/getPublisherById/handler'
import { updatePublisherByIdHandler } from './handlers/publisher/updatePublisherById/handler'
import { createCategoryHandler } from './handlers/category/createCategory/handler'
import { deleteCategoryById } from './handlers/category/deleteCategoryById/handler'
import { getCategoryById } from './handlers/category/getCategoryById/handler'
import { updateCategoryByIdHandler } from './handlers/category/updateCategoryById/handler'

function convertHanlder(handler: Handler) {
  return async (request: Request, response: Response) => {
    try {
      const result = await handler(request, response)
      if (result.body) {
        response.status(result.statusCode).send(result.body)
      } else {
        response.status(result.statusCode).end()
      }
    } catch (e) {
      if (e instanceof HandlerError) {
        response.status(e.statusCode).send({
          errors: e.errors,
        })
        return
      } else if (e instanceof Yup.ValidationError) {
        response.status(400).send({
          errors: e.errors,
        })
        return
      }
      // default error handling
      request.log.error(e)
      response.status(500).send({
        errors: ['internal server error'],
      })
    }
  }
}

const router = express.Router()

router.post('/auth/login', convertHanlder(loginHandler))
router.post('/auth/logout', convertHanlder(logoutHandler))

// author
router.post('/authors', convertHanlder(createAuthorHandler))
router.delete('/authors/:author_id', convertHanlder(deleteAuthorById))
router.get('/authors/:author_id', convertHanlder(getAuthorById))
router.patch('/authors/:author_id', convertHanlder(updateAuthorByIdHandler))

// publisher
router.post('/publishers', convertHanlder(createPublisherHandler))
router.delete('/publishers/:publisher_id', convertHanlder(deletePublisherById))
router.get('/publishers/:publisher_id', convertHanlder(getPublisherById))
router.patch('/publishers/:publisher_id', convertHanlder(updatePublisherByIdHandler))

// category
router.post('/categorys', convertHanlder(createCategoryHandler))
router.delete('/categorys/:category_id', convertHanlder(deleteCategoryById))
router.get('/categorys/:category_id', convertHanlder(getCategoryById))
router.patch('/categorys/:category_id', convertHanlder(updateCategoryByIdHandler))

export default router
