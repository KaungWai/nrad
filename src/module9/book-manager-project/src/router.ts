import express, { Request, Response } from 'express'
import * as Yup from 'yup'
import { Handler, HandlerError } from './types'
// auth
import { auth } from './auth'
import { loginHandler } from './handlers/auth/login/handler'
import { logoutHandler } from './handlers/auth/logout/handler'
import { getAuthUserHandler } from './handlers/auth/getAuthUser/handler'
// stats
import { getStatsHandler } from './handlers/stats/getStats/handler'
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
import { getPublishersHandler } from './handlers/publisher/getPublishers/handler'
import { updatePublisherByIdHandler } from './handlers/publisher/updatePublisherById/handler'
// category
import { createCategoryHandler } from './handlers/category/createCategory/handler'
import { deleteCategoryById } from './handlers/category/deleteCategoryById/handler'
import { getCategoryById } from './handlers/category/getCategoryById/handler'
import { getCategoriesHandler } from './handlers/category/getCategories/handler'
import { updateCategoryByIdHandler } from './handlers/category/updateCategoryById/handler'
import { createBookHandler } from './handlers/book/createBook/handler'
import { deleteBookById } from './handlers/book/deleteBookById/handler'
import { getBookById } from './handlers/book/getBookById/handler'
import { updateBookByIdHandler } from './handlers/book/updateBookById/handler'
import { getBooksHandler } from './handlers/book/getBooks/handler'

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
        console.log(e.errors)
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
router.get('/auth/user', auth(['ADMIN', 'USER']), convertHanlder(getAuthUserHandler))
// stats
router.get('/stats', auth(['ADMIN', 'USER']), convertHanlder(getStatsHandler))
// user
router.post('/users', auth(['ADMIN']), convertHanlder(createUserHandler))
router.delete('/users/:user_id', auth(['ADMIN']), convertHanlder(deleteUserById))
router.get('/users/:user_id', auth(['ADMIN']), convertHanlder(getUserById))
router.get('/users', auth(['ADMIN']), convertHanlder(getUsersHandler))
router.patch('/users/:user_id', auth(['ADMIN', 'USER']), convertHanlder(updateUserHandler))
// author
router.post('/authors', auth(['ADMIN', 'USER']), convertHanlder(createAuthorHandler))
router.delete('/authors/:author_id', auth(['ADMIN', 'USER']), convertHanlder(deleteAuthorById))
router.get('/authors/:author_id', auth(['ADMIN', 'USER']), convertHanlder(getAuthorById))
router.get('/authors', auth(['ADMIN', 'USER']), convertHanlder(getAuthorsHandler))
router.patch('/authors/:author_id', auth(['ADMIN', 'USER']), convertHanlder(updateAuthorByIdHandler))
// publisher
router.post('/publishers', convertHanlder(createPublisherHandler))
router.delete('/publishers/:publisher_id', convertHanlder(deletePublisherById))
router.get('/publishers/:publisher_id', convertHanlder(getPublisherById))
router.get('/publishers', convertHanlder(getPublishersHandler))
router.patch('/publishers/:publisher_id', convertHanlder(updatePublisherByIdHandler))
// category
router.post('/categories', convertHanlder(createCategoryHandler))
router.delete('/categories/:category_id', convertHanlder(deleteCategoryById))
router.get('/categories/:category_id', convertHanlder(getCategoryById))
router.get('/categories', convertHanlder(getCategoriesHandler))
router.patch('/categories/:category_id', convertHanlder(updateCategoryByIdHandler))
// book
router.post('/books', convertHanlder(createBookHandler))
router.delete('/books/:book_id', convertHanlder(deleteBookById))
router.get('/books/:book_id', convertHanlder(getBookById))
router.get('/books', convertHanlder(getBooksHandler))
router.patch('/books/:book_id', convertHanlder(updateBookByIdHandler))

export default router
