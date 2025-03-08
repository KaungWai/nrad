<script setup lang="ts">
import { API, type Author, type Book, type Category, type GetBooksQuery, type Publisher } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const books = ref<Book[]>()
const searchForm = ref<GetBooksQuery>({
  filter: {
    book_id: '',
    book_name: '',
    category_id: '',
    author_id: '',
    publisher_id: '',
  },
  sorting: {
    book_name: 'asc',
  },
  skip: 0,
  take: 10,
})

const categories = ref<Category[]>([])
const authors = ref<Author[]>([])
const publishers = ref<Publisher[]>([])

const init = async () => {
  const cResponse = await API.category.getCategories()
  if (cResponse.ok) {
    categories.value = cResponse.data ?? []
  }

  const aResponse = await API.author.getAuthors()
  if (aResponse.ok) {
    authors.value = aResponse.data ?? []
  }

  const pResponse = await API.publisher.getPublishers()
  if (pResponse.ok) {
    publishers.value = pResponse.data ?? []
  }
}

const search = async () => {
  const response = await API.book.getBooks(searchForm.value)
  if (response.ok) {
    books.value = response.data
  }
}

init()
search()
</script>

<template>
  <DefaultWrapper :title="'Books'">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Book Id</span>
          <input type="text" class="form-control" v-model="searchForm.filter.book_id" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Book Name</span>
          <input type="text" class="form-control" v-model="searchForm.filter.book_name" />
        </div>
      </div>
      <div class="col"></div>
    </div>
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Category</span>
          <select class="form-select" v-model="searchForm.filter.category_id">
            <option selected value="">--select--</option>
            <option v-for="c in categories" :value="c.category_id" :key="c.category_id">{{ c.category_name }}</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author</span>
          <select class="form-select" v-model="searchForm.filter.author_id">
            <option selected value="">--select--</option>
            <option v-for="a in authors" :value="a.author_id" :key="a.author_id">{{ a.author_name }}</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher</span>
          <select class="form-select" v-model="searchForm.filter.publisher_id">
            <option selected value="">--select--</option>
            <option v-for="p in publishers" :value="p.publisher_id" :key="p.publisher_id">{{ p.publisher_name }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="search">Search</button>
      <RouterLink class="btn btn-sm btn-primary" to="/books/new">New Book</RouterLink>
    </div>

    <table class="table m-0 mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Book Id</th>
          <th>Book Name</th>
          <th>Category</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, idx) in books" :key="book.book_id">
          <td>{{ idx + 1 }}</td>
          <td>
            <RouterLink :to="`/books/edit/${book.book_id}`">{{ book.book_id }}</RouterLink>
          </td>
          <td>{{ book.book_name }}</td>
          <td>{{ book.category.category_name }}</td>
          <td>{{ book.author.author_name }}</td>
          <td>{{ book.publisher.publisher_name }}</td>
          <td>{{ book.created_at.substring(0, 10).replace('-', '/').replace('-', '/') }}</td>
          <td>{{ book.updated_at.substring(0, 10).replace('-', '/').replace('-', '/') }}</td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
