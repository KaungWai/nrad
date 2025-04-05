<script setup lang="ts">
import { useAxios } from '@/api/axios'
import qs from 'qs'
import type { User, GetUsersQuery, Meta } from '@/types'
import { formatDate } from '@/utils/strUtils'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { removeBlankFields } from '@/utils/objUtils'

const axios = useAxios()

const actionLinks = [{ name: 'New User', to: '/users/new', theme: 'primary' }]

const users = ref<User[]>()
const meta = ref<Meta>()
const searchForm = ref<GetUsersQuery>({
  filter: {
    user_id: '',
    user_name: '',
    role: '',
  },
  sorting: {
    user_name: 'asc',
  },
  skip: 0,
  take: 10,
})

const remove = async (userId: string) => {
  if(!confirm("Are you sure want to delete?")) {
    return;
  }
  const response = await axios.delete(`/users/${userId}`)
  search()
}

const search = async () => {
  searchForm.value.skip = 0
  searchForm.value.take = 10
  const response = await axios.get(`/users?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    users.value = response.data.result
    meta.value = response.data.meta
  }
}

const prev = async () => {
  searchForm.value.skip -= 10
  const response = await axios.get(`/users?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    users.value = response.data.result
    meta.value = response.data.meta
  }
}

const next = async () => {
  searchForm.value.skip += 10
  const response = await axios.get(`/users?${qs.stringify(removeBlankFields(searchForm.value))}`)
  if (response.status < 400) {
    users.value = response.data.result
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
  <DefaultWrapper :title="'Users'" :action-links="actionLinks">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">User Id</span>
          <input type="text" class="form-control" v-model="searchForm.filter.user_id" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">User Name</span>
          <input type="text" class="form-control" v-model="searchForm.filter.user_name" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Role</span>
          <select class="form-select" v-model="searchForm.filter.role">
            <option value="">--select--</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
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
          <th>User Id</th>
          <th>User Name</th>
          <th>Role</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in users" :key="user.user_id">
          <td>{{ searchForm.skip + idx + 1 }}</td>
          <td>{{ user.user_id }}</td>
          <td>{{ user.user_name }}</td>
          <td>{{ user.role }}</td>
          <td>{{ formatDate(user.created_at) }}</td>
          <td>{{ formatDate(user.updated_at) }}</td>
          <td><button class="btn btn-sm btn-danger" @click="() => remove(user.user_id)">Delete</button></td>
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
