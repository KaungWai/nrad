<script setup lang="ts">
import { useAxios } from '@/api/axios'
import qs from 'qs'
import type { Author, GetAuthorsQuery, Meta } from '@/types'
import { formatDate } from '@/utils/strUtils'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { removeBlankFields } from '@/utils/objUtils'

const axios = useAxios()

const actionLinks = [{name: 'New Author', to: '/authors/new', theme: 'primary'}]

const authors = ref<Author[]>()
const meta = ref<Meta>()
const searchForm = ref<GetAuthorsQuery>({
  filter: {
    author_id: '',
    author_name: '',
    gender: '',
    birth_date: '',
  },
  sorting: {
    author_name: 'asc',
  },
  skip: 0,
  take: 10,
})

const search = async () => {
  searchForm.value.skip = 0
  searchForm.value.take = 10
  const response = await axios.get(`/authors?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    authors.value = response.data.result
    meta.value = response.data.meta
  }
}

const prev = async () => {
  searchForm.value.skip -= 10
  const response = await axios.get(`/authors?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    authors.value = response.data.result
    meta.value = response.data.meta
  }
}

const next = async () => {
  searchForm.value.skip += 10
  const response = await axios.get(`/authors?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    authors.value = response.data.result
    meta.value = response.data.meta
  }
}

const isPrevAvailable = computed(() => {
  return searchForm.value.skip > 0;
})

const isNextAvailable = computed(() => {
  return searchForm.value.skip + searchForm.value.take < (meta.value?.total ?? 0)
})

search()
</script>

<template>
  <DefaultWrapper :title="'Authors'" :action-links="actionLinks">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author Id</span>
          <input type="text" class="form-control" v-model="searchForm.filter.author_id" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author Name</span>
          <input type="text" class="form-control" v-model="searchForm.filter.author_name" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Gender</span>
          <select class="form-select" v-model="searchForm.filter.gender">
            <option value="">--select--</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Birthdate</span>
          <input type="date" class="form-control" v-model="searchForm.filter.birth_date" />
        </div>
      </div>
    </div>

    <div class="border-bottom pb-3 d-flex justify-content-end">
      <button class="btn btn-sm btn-primary" @click="search">Search</button>
    </div>

    <table class="table m-0 mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Author Id</th>
          <th>Author Name</th>
          <th>Gender</th>
          <th>Birthdate</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(author, idx) in authors" :key="author.author_id">
          <td>{{ searchForm.skip + idx + 1 }}</td>
          <td>
            <RouterLink :to="`/authors/edit/${author.author_id}`">{{ author.author_id }}</RouterLink>
          </td>
          <td>{{ author.author_name }}</td>
          <td>{{ author.gender }}</td>
          <td>{{ formatDate(author.birth_date) }}</td>
          <td>{{ formatDate(author.created_at) }}</td>
          <td>{{ formatDate(author.updated_at) }}</td>
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
