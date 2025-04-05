<script setup lang="ts">
import { useAxios } from '@/api/axios'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { Author } from '@/types'
import { formatDateTime, formatDateToBind } from '@/utils/strUtils'

const axios = useAxios()

const form = ref<Author>({
  author_id: '',
  author_name: '',
  gender: '',
  birth_date: '',
  created_at: '',
  updated_at: '',
})

const init = async () => {
  const route = useRoute()
  const authorId = route.params.author_id as string
  const response = await axios.get(`/authors/${authorId}`)
  if (response.status < 400) {
    form.value = response.data as Author
    format()
  }
}

const save = async () => {
  if(!confirm("Are you sure want to delete?")) {
    return;
  }
  const response = await axios.patch(`/authors/${form.value.author_id}`, form.value)
  if (response.status < 400) {
    form.value = response.data as Author
    format()
  }
}

const remove = async () => {
  const response = await axios.delete(`/authors/${form.value.author_id}`)
  if (response.status < 400) {
    router.push('/authors')
  }
}

const format = () => {
  form.value.birth_date = formatDateToBind(form.value.birth_date)
  form.value.created_at = formatDateTime(form.value.created_at)
  form.value.updated_at = formatDateTime(form.value.updated_at)
}

init()
</script>

<template>
  <DefaultWrapper :title="'Edit Author'" :action-links="[{name: 'Back', to: '/authors', theme: 'secondary'}]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author Id</span>
          <input class="form-control form-control-sm" type="text" v-model="form.author_id" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author Name</span>
          <input class="form-control form-control-sm" type="text" v-model="form.author_name" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Gender</span>
          <select class="form-select form-select-sm" v-model="form.gender">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Birthdate</span>
          <input class="form-control form-control-sm" type="date" v-model="form.birth_date" />
        </div>
      </div>
    </div>
    <div class="row">
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
      <div class="col"></div>
      <div class="col"></div>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn btn-sm btn-success" @click="save">Update</button>
      <span>
        <button class="btn btn-sm btn-danger" @click="remove">Delete</button>
      </span>
    </div>


  </DefaultWrapper>
</template>
