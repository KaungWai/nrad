import express, { Request, Response } from 'express'
import * as Yup from 'yup'
import { Handler, HandlerError } from './types'
// auth
import { loginHandler } from './handlers/auth/login/handler'
import { logoutHandler } from './handlers/auth/logout/handler'
// user
import { createUserHandler } from './handlers/user/createUser/handler'
import { deleteUserById } from './handlers/user/deleteUserById/handler'
import { getUserById } from './handlers/user/getUserById/handler'
import { getUsersHandler } from './handlers/user/getUsers/handler'
import { updateUserHandler } from './handlers/user/updateUserById/handler'
// author
import { createAuthorHandler } from './handlers/author/createAuthor/handler'
import { deleteAuthorById } from './handlers/author/deleteAuthorById/handler'
import { getAuthorById } from './handlers/author/getAuthorById/handler'
import { getAuthorsHandler } from './handlers/author/getAuthors/handler'
import { updateAuthorByIdHandler } from './handlers/author/updateAuthorById/handler'
// publisher
import { createPublisherHandler } from './handlers/publisher/createPublisher/handler'
import { deletePublisherById } from './handlers/publisher/deletePublisherById/handler'
import { getPublisherById } from './handlers/publisher/getPublisherById/handler'
import { updatePublisherByIdHandler } from './handlers/publisher/updatePublisherById/handler'
// category
import { createCategoryHandler } from './handlers/category/createCategory/handler'
import { deleteCategoryById } from './handlers/category/deleteCategoryById/handler'
import { getCategoryById } from './handlers/category/getCategoryById/handler'
import { getCategorysHandler } from './handlers/category/getCategorys/handler'
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

// auth
router.post('/auth/login', convertHanlder(loginHandler))
router.post('/auth/logout', convertHanlder(logoutHandler))
// user
router.post('/users', convertHanlder(createUserHandler))
router.delete('/user/:user_id', convertHanlder(deleteUserById))
router.get('/users/:user_id', convertHanlder(getUserById))
router.get('/users', convertHanlder(getUsersHandler))
router.patch('/user/:user_id', convertHanlder(updateUserHandler))
// author
router.post('/authors', convertHanlder(createAuthorHandler))
router.delete('/authors/:author_id', convertHanlder(deleteAuthorById))
router.get('/authors/:author_id', convertHanlder(getAuthorById))
router.get('/authors', convertHanlder(getAuthorsHandler))
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
router.get('/categorys', convertHanlder(getCategorysHandler))
router.patch('/categorys/:category_id', convertHanlder(updateCategoryByIdHandler))

export default router
