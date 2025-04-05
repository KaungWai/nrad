export interface Meta {
  total: number
  skip: number
  take: number
}

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

export interface User {
  user_id: string
  user_name: string
  role: string
  created_at: string
  updated_at: string
}

export interface GetAuthorsQuery {
  filter: {
    birth_date?: string
    author_id?: string
    author_name?: string
    gender?: string
  }
  sorting: {
    birth_date?: string
    author_name?: string
    gender?: string
  }
  skip: number
  take: number
}

export interface GetPublishersQuery {
  filter: {
    publisher_id?: string
    publisher_name?: string
  }
  sorting: {
    publisher_name?: string
  }
  skip: number
  take: number
}

export interface GetCategoriesQuery {
  filter: {
    category_id?: string
    category_name?: string
  }
  sorting: {
    category_name?: string
  }
  skip: number
  take: number
}

export interface GetUsersQuery {
  filter: {
    user_id?: string
    user_name?: string
    role?: string
  }
  sorting: {
    user_name?: string
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
  published_date: string
  category: Category
  author: Author
  publisher: Publisher
  created_at: string
  updated_at: string
}
export interface GetBooksQuery {
  filter: {
    book_id: string
    book_name: string
    category_id: string
    author_id: string
    publisher_id: string
    published_date: string
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
