<script setup lang="ts">
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import router from '@/router'
import { useAxios } from '@/api/axios'
import type { Author, Category, GetAuthorsQuery, GetCategoriesQuery, GetPublishersQuery, Publisher } from '@/types'
import qs from 'qs'

const axios = useAxios()

const selectLists = ref<{ categories: Category[]; authors: Author[]; publishers: Publisher[] }>({
  categories: [],
  authors: [],
  publishers: [],
})

const form = ref<{
  book_name: string
  published_date: string
  category_id: string
  author_id: string
  publisher_id: string
}>({
  book_name: '',
  published_date: '',
  category_id: '',
  author_id: '',
  publisher_id: '',
})

const init = async () => {
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

const save = async () => {
  const response = await axios.post(`/books`, form.value)
  if (response.status < 400) {
    router.push(`/books/edit/${response.data.book_id}`)
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'New Book'" :action-links="[{ name: 'Back', to: '/books', theme: 'secondary' }]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Book Id</span>
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
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
          <select class="form-select form-select-sm" v-model="form.category_id">
            <option v-for="category in selectLists.categories" :value="category.category_id">{{ category.category_name }}</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author</span>
          <select class="form-select form-select-sm" v-model="form.author_id">
            <option v-for="author in selectLists.authors" :value="author.author_id">{{ author.author_name }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher</span>
          <select class="form-select form-select-sm" v-model="form.publisher_id">
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
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Updated At</span>
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn btn-sm btn-success" @click="save">Register</button>
    </div>
  </DefaultWrapper>
</template>
