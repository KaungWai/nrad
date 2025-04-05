<script setup lang="ts">
import { useAxios } from '@/api/axios'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { Author, Book, Category, GetAuthorsQuery, GetCategoriesQuery, GetPublishersQuery, Publisher } from '@/types'
import { formatDateTime, formatDateToBind } from '@/utils/strUtils'
import qs from 'qs'

const axios = useAxios()

const selectLists = ref<{ categories: Category[]; authors: Author[]; publishers: Publisher[] }>({
  categories: [],
  authors: [],
  publishers: [],
})

const form = ref<Book>({
  book_id: '',
  book_name: '',
  published_date: '',
  category: {
    category_id: '',
    category_name: '',
    created_at: '',
    updated_at: '',
  },
  author: {
    author_id: '',
    author_name: '',
    gender: '',
    birth_date: '',
    created_at: '',
    updated_at: '',
  },
  publisher: {
    publisher_id: '',
    publisher_name: '',
    created_at: '',
    updated_at: '',
  },
  created_at: '',
  updated_at: '',
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

const init = async () => {
  getSelectLists()

  const route = useRoute()
  const bookId = route.params.book_id as string
  const response = await axios.get(`/books/${bookId}`)
  if (response.status < 400) {
    form.value = response.data as Book
    format()
  }
}

const save = async () => {
  const payload = {
    book_id: form.value.book_id,
    book_name: form.value.book_name,
    published_date: form.value.published_date,
    category_id: form.value.category.category_id,
    author_id: form.value.author.author_id,
    publisher_id: form.value.publisher.publisher_id,
  }

  const response = await axios.patch(`/books/${form.value.book_id}`, payload)
  if (response.status < 400) {
    form.value = response.data as Book
    format()
  }
}

const remove = async () => {
  if(!confirm("Are you sure want to delete?")) {
    return;
  }
  const response = await axios.delete(`/books/${form.value.book_id}`)
  if (response.status < 400) {
    router.push('/books')
  }
}

const format = () => {
  form.value.published_date = formatDateToBind(form.value.published_date)
  form.value.created_at = formatDateTime(form.value.created_at)
  form.value.updated_at = formatDateTime(form.value.updated_at)
}

init()
</script>

<template>
  <DefaultWrapper :title="'Edit Book'" :action-links="[{ name: 'Back', to: '/books', theme: 'secondary' }]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Book Id</span>
          <input class="form-control form-control-sm" type="text" v-model="form.book_id" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Book Name</span>
          <input class="form-control form-control-sm" type="text" v-model="form.book_name" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Category</span>
          <select class="form-select form-select-sm" v-model="form.category.category_id">
            <option v-for="category in selectLists.categories" :value="category.category_id">{{ category.category_name }}</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author</span>
          <select class="form-select form-select-sm" v-model="form.author.author_id">
            <option v-for="author in selectLists.authors" :value="author.author_id">{{ author.author_name }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher</span>
          <select class="form-select form-select-sm" v-model="form.publisher.publisher_id">
            <option v-for="publisher in selectLists.publishers" :value="publisher.publisher_id">{{ publisher.publisher_name }}</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publication Date</span>
          <input class="form-control form-control-sm" type="date" v-model="form.published_date" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Created At</span>
          <input class="form-control form-control-sm" type="text" v-model="form.created_at" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Updated At</span>
          <input class="form-control form-control-sm" type="text" v-model="form.updated_at" disabled />
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn btn-sm btn-success" @click="save">Update</button>
      <span>
        <button class="btn btn-sm btn-danger" @click="remove">Delete</button>
      </span>
    </div>
  </DefaultWrapper>
</template>
