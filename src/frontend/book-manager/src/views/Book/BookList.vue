<script setup lang="ts">
import { useAxios } from '@/api/axios'
import qs from 'qs'
import type { Author, Book, Category, GetAuthorsQuery, GetBooksQuery, GetCategoriesQuery, GetPublishersQuery, Meta, Publisher } from '@/types'
import { formatDate } from '@/utils/strUtils'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { removeBlankFields } from '@/utils/objUtils'

const axios = useAxios()

const actionLinks = [{ name: 'New Book', to: '/books/new', theme: 'primary' }]
const selectLists = ref<{ categories: Category[]; authors: Author[]; publishers: Publisher[] }>({
  categories: [],
  authors: [],
  publishers: [],
})

const books = ref<Book[]>()
const meta = ref<Meta>()
const searchForm = ref<GetBooksQuery>({
  filter: {
    book_id: '',
    book_name: '',
    category_id: '',
    author_id: '',
    publisher_id: '',
    published_date: '',
  },
  sorting: {
    book_name: 'asc',
  },
  skip: 0,
  take: 10,
})

const search = async () => {
  searchForm.value.skip = 0
  searchForm.value.take = 10
  const response = await axios.get(`/books?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    books.value = response.data.result
    meta.value = response.data.meta
  }
}

const prev = async () => {
  searchForm.value.skip -= 10
  const response = await axios.get(`/books?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    books.value = response.data.result
    meta.value = response.data.meta
  }
}

const next = async () => {
  searchForm.value.skip += 10
  const response = await axios.get(`/books?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    books.value = response.data.result
    meta.value = response.data.meta
  }
}

const isPrevAvailable = computed(() => {
  return searchForm.value.skip > 0
})

const isNextAvailable = computed(() => {
  return searchForm.value.skip + searchForm.value.take < (meta.value?.total ?? 0)
})

const getSelectLists = async () => {
  const queryC: GetCategoriesQuery = {
    filter: {},
    sorting: { category_name: 'asc' },
    skip: 0,
    take: 100,
  }
  const responseC = await axios.get(`/categories?${qs.stringify(queryC)}`)
  if (responseC.status < 400) {
    selectLists.value.categories = responseC.data.result
  }

  const queryA: GetAuthorsQuery = {
    filter: {},
    sorting: { author_name: 'asc' },
    skip: 0,
    take: 100,
  }
  const responseA = await axios.get(`/authors?${qs.stringify(queryA)}`)
  if (responseA.status < 400) {
    selectLists.value.authors = responseA.data.result
  }

  const queryP: GetPublishersQuery = {
    filter: {},
    sorting: { publisher_name: 'asc' },
    skip: 0,
    take: 100,
  }
  const responseP = await axios.get(`/publishers?${qs.stringify(queryP)}`)
  if (responseP.status < 400) {
    selectLists.value.publishers = responseP.data.result
  }
}

getSelectLists()
search()
</script>

<template>
  <DefaultWrapper :title="'Books'" :action-links="actionLinks">
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
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Category</span>
          <select class="form-select form-select-sm" v-model="searchForm.filter.category_id">
            <option value="">-- Select --</option>
            <option v-for="category in selectLists.categories" :value="category.category_id">{{ category.category_name }}</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author</span>
          <select class="form-select form-select-sm" v-model="searchForm.filter.author_id">
            <option value="">-- Select --</option>
            <option v-for="author in selectLists.authors" :value="author.author_id">{{ author.author_name }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher</span>
          <select class="form-select form-select-sm" v-model="searchForm.filter.publisher_id">
            <option value="">-- Select --</option>
            <option v-for="publisher in selectLists.publishers" :value="publisher.publisher_id">{{ publisher.publisher_name }}</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publication Date</span>
          <input class="form-control form-control-sm" type="date" v-model="searchForm.filter.published_date" />
        </div>
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>

    <div class="border-bottom pb-3 d-flex justify-content-end">
      <button class="btn btn-sm btn-primary" @click="search">Search</button>
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
          <th>Publication Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, idx) in books" :key="book.book_id">
          <td>{{ searchForm.skip + idx + 1 }}</td>
          <td>
            <RouterLink :to="`/books/edit/${book.book_id}`">{{ book.book_id }}</RouterLink>
          </td>
          <td>{{ book.book_name }}</td>
          <td>{{ book.category.category_name }}</td>
          <td>{{ book.author.author_name }}</td>
          <td>{{ book.publisher.publisher_name }}</td>
          <td>{{ formatDate(book.published_date) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-between mt-3">
      <span> {{ meta?.total ?? '0' }} record(s) found </span>
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary" :disabled="!isPrevAvailable" @click="prev">Prev</button>
        <button type="button" class="btn btn-primary" :disabled="!isNextAvailable" @click="next">Next</button>
      </div>
    </div>
  </DefaultWrapper>
</template>
