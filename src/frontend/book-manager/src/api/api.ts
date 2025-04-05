import axios, { AxiosError } from 'axios'
import qs from 'qs'
import { useErrorStore } from '@/stores/error'
import type { User } from '@/stores/user'

export interface Publisher {
  publisher_id: string
  publisher_name: string
  created_at: string
  updated_at: string
}

export interface Author {
  author_id: string
  author_name: string
  gender: string
  birth_date: string
  created_at: string
  updated_at: string
}

export interface GetAuthorsQuery {
  filter: {
    birth_date?: string | undefined
    author_id?: string | undefined
    author_name?: string | undefined
    gender?: string | undefined
  }
  sorting: {
    birth_date?: string | undefined
    author_name?: string | undefined
    gender?: string | undefined
  }
  skip: number
  take: number
}

export interface Category {
  category_id: string
  category_name: string
  created_at: string
  updated_at: string
}

export interface Book {
  book_id: string
  book_name: string
  created_at: string
  updated_at: string
  category: {
    category_id: string
    category_name: string
  }
  author: {
    author_id: string
    author_name: string
  }
  publisher: {
    publisher_id: string
    publisher_name: string
  }
}
export interface GetBooksQuery {
  filter: {
    book_id: string
    book_name: string
    category_id: string
    author_id: string
    publisher_id: string
  }
  sorting: {
    book_name: string
  }
  skip: number
  take: number
}

export interface Stats {
  category: number
  author: number
  publisher: number
  book: number
}

function encodeQuery(targetObj: any) {
  const processObject = (targetObj: any, prefix = '') => {
    let queries: string[] = []
    Object.keys(targetObj).forEach((currentKey) => {
      if (typeof targetObj[currentKey] == 'object') {
        let nextPrefix = ''
        if (prefix === '') {
          nextPrefix = currentKey
        } else {
          nextPrefix = `${prefix}[${currentKey}]`
        }
        queries = queries.concat(processObject(targetObj[currentKey], nextPrefix))
      } else {
        if (prefix === '') {
          queries.push(`${currentKey}=${targetObj[currentKey]}`)
        } else {
          queries.push(`${prefix}[${currentKey}]=${targetObj[currentKey]}`)
        }
      }
    })
    return queries
  }
  return processObject(targetObj).join('&')
}

function removeBlankFields(obj: any): any {
  const objDeepCopy = JSON.parse(JSON.stringify(obj))

  if (typeof objDeepCopy !== 'object') {
    return objDeepCopy
  }
  for (const key in objDeepCopy) {
    if (Object.prototype.hasOwnProperty.call(objDeepCopy, key)) {
      if (objDeepCopy[key] === '' || objDeepCopy[key] === null || objDeepCopy[key] === undefined) {
        delete objDeepCopy[key]
      } else if (typeof objDeepCopy[key] === 'object') {
        objDeepCopy[key] = removeBlankFields(objDeepCopy[key])
        if (Object.keys(objDeepCopy[key]).length === 0) {
          delete objDeepCopy[key]
        }
      }
    }
  }
  return objDeepCopy
}

export const useAPI = () => {
  const errorStore = useErrorStore()

  const baseURL = 'https://localhost:3000'

  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (e) => {
      console.log(e)
      if (e instanceof AxiosError) {
        if (Array.isArray(e.response?.data?.errors)) {
          errorStore.setError(e.response.data.errors)
        }
      }
      return Promise.reject(e)
    },
  )

  const login = async (form: any) => {
    const response = await instance.post(baseURL + '/auth/login', form)
    const ok = response.status >= 200 && response.status <= 299
    return {
      ok,
      data: ok ? (response.data as User) : undefined,
    }
  }

  const getPublishers = async () => {
    const response = await fetch(baseURL + '/publishers')
    return {
      ok: response.ok,
      data: JSON.parse(await response.text()) as Publisher[],
    }
  }

  const getPublisherById = async (id: string) => {
    const response = await fetch(baseURL + '/publishers/' + id)
    return {
      ok: response.ok,
      data: JSON.parse(await response.text()) as Publisher,
    }
  }

  const createPublisher = async (body: any) => {
    const response = await fetch(baseURL + '/publishers', { method: 'POST', body: JSON.stringify(body) })
    return {
      ok: response.ok,
      data: JSON.parse(await response.text()) as Publisher,
    }
  }

  const updatePublisher = async (id: string, body: any) => {
    const response = await instance.patch(`/publishers/${id}`, body)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Publisher,
      }
    } else {
      return {
        ok: false,
        data: response.data as any,
      }
    }
  }

  const deletePublisher = async (id: string) => {
    const response = await instance.delete(`/publishers/${id}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const getAuthors = async (query: GetAuthorsQuery) => {
    const queryString = qs.stringify(removeBlankFields(query))
    const response = await instance.get(`/authors?${queryString}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data.result as Author[],
        meta: response.data.meta,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const getAuthorById = async (id: string) => {
    const response = await instance.get(`/authors/${id}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Author,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const createAuthor = async (body: any) => {
    const response = await instance.post('/authors', body)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Author,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const updateAuthor = async (id: string, body: any) => {
    const response = await instance.patch(`/authors/${id}`, body)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Author,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const deleteAuthor = async (id: string) => {
    const response = await instance.delete(`/authors/${id}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const getCategories = async () => {
    const response = await instance.get(`/categories`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Category[],
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const getCategoryById = async (id: string) => {
    const response = await instance.get(`/categories/${id}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Category,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const createCategory = async (body: any) => {
    const response = await instance.post('/categories', body)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Category,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const updateCategory = async (id: string, body: any) => {
    const response = await instance.patch(`/categories/${id}`, body)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Category,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const deleteCategory = async (id: string) => {
    const response = await instance.delete(`/categories/${id}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const getBooks = async (query: GetBooksQuery) => {
    const response = await instance.get(`/books?${encodeQuery(removeBlankFields(query))}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Book[],
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const getBookById = async (id: string) => {
    const response = await instance.get(`/books/${id}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Book,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const createBook = async (body: any) => {
    const response = await instance.post('/books', body)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Book,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const updateBook = async (id: string, body: any) => {
    const response = await instance.patch(`/books/${id}`, body)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Book,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const deleteBook = async (id: string) => {
    const response = await instance.delete(`/books/${id}`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  const getStats = async () => {
    const response = await instance.get(`/stats`)
    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        data: response.data as Stats,
      }
    } else {
      return {
        ok: false,
      }
    }
  }

  return {
    login,
    getStats,
    publisher: {
      getPublishers,
      getPublisherById,
      createPublisher,
      updatePublisher,
      deletePublisher,
    },
    author: {
      getAuthors,
      getAuthorById,
      createAuthor,
      updateAuthor,
      deleteAuthor,
    },
    category: {
      getCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory,
    },
    book: {
      getBooks,
      getBookById,
      createBook,
      updateBook,
      deleteBook,
    },
  }
}
