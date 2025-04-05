<script setup lang="ts">
import { useAxios } from '@/api/axios'
import qs from 'qs'
import type { Publisher, GetPublishersQuery, Meta } from '@/types'
import { formatDate } from '@/utils/strUtils'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { removeBlankFields } from '@/utils/objUtils'

const axios = useAxios()

const actionLinks = [{ name: 'New Publisher', to: '/publishers/new', theme: 'primary' }]

const publishers = ref<Publisher[]>()
const meta = ref<Meta>()
const searchForm = ref<GetPublishersQuery>({
  filter: {
    publisher_id: '',
    publisher_name: '',
  },
  sorting: {
    publisher_name: 'asc',
  },
  skip: 0,
  take: 10,
})

const search = async () => {
  searchForm.value.skip = 0
  searchForm.value.take = 10
  const response = await axios.get(`/publishers?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    publishers.value = response.data.result
    meta.value = response.data.meta
  }
}

const prev = async () => {
  searchForm.value.skip -= 10
  const response = await axios.get(`/publishers?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    publishers.value = response.data.result
    meta.value = response.data.meta
  }
}

const next = async () => {
  searchForm.value.skip += 10
  const response = await axios.get(`/publishers?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    publishers.value = response.data.result
    meta.value = response.data.meta
  }
}

const isPrevAvailable = computed(() => {
  return searchForm.value.skip > 0
})

const isNextAvailable = computed(() => {
  return searchForm.value.skip + searchForm.value.take < (meta.value?.total ?? 0)
})

search()
</script>

<template>
  <DefaultWrapper :title="'Publishers'" :action-links="actionLinks">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher Id</span>
          <input type="text" class="form-control" v-model="searchForm.filter.publisher_id" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher Name</span>
          <input type="text" class="form-control" v-model="searchForm.filter.publisher_name" />
        </div>
      </div>
      <div class="col">
        <!-- empty -->
      </div>
      <div class="col">
        <!-- empty -->
      </div>
    </div>

    <div class="border-bottom pb-3 d-flex justify-content-end">
      <button class="btn btn-sm btn-primary" @click="search">Search</button>
    </div>

    <table class="table m-0 mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Publisher Id</th>
          <th>Publisher Name</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(publisher, idx) in publishers" :key="publisher.publisher_id">
          <td>{{ searchForm.skip + idx + 1 }}</td>
          <td>
            <RouterLink :to="`/publishers/edit/${publisher.publisher_id}`">{{ publisher.publisher_id }}</RouterLink>
          </td>
          <td>{{ publisher.publisher_name }}</td>
          <td>{{ formatDate(publisher.created_at) }}</td>
          <td>{{ formatDate(publisher.updated_at) }}</td>
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
