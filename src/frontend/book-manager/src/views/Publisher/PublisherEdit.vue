<script setup lang="ts">
import { useAxios } from '@/api/axios'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { Publisher } from '@/types'
import { formatDateTime, formatDateToBind } from '@/utils/strUtils'

const axios = useAxios()

const form = ref<Publisher>({
  publisher_id: '',
  publisher_name: '',
  created_at: '',
  updated_at: '',
})

const init = async () => {
  const route = useRoute()
  const publisherId = route.params.publisher_id as string
  const response = await axios.get(`/publishers/${publisherId}`)
  if (response.status < 400) {
    form.value = response.data as Publisher
    format()
  }
}

const save = async () => {
  const response = await axios.patch(`/publishers/${form.value.publisher_id}`, form.value)
  if (response.status < 400) {
    form.value = response.data as Publisher
    format()
  }
}

const remove = async () => {
  if(!confirm("Are you sure want to delete?")) {
    return;
  }
  const response = await axios.delete(`/publishers/${form.value.publisher_id}`)
  if (response.status < 400) {
    router.push('/publishers')
  }
}

const format = () => {
  form.value.created_at = formatDateTime(form.value.created_at)
  form.value.updated_at = formatDateTime(form.value.updated_at)
}

init()
</script>

<template>
  <DefaultWrapper :title="'Edit Publisher'" :action-links="[{name: 'Back', to: '/publishers', theme: 'secondary'}]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher Id</span>
          <input class="form-control form-control-sm" type="text" v-model="form.publisher_id" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher Name</span>
          <input class="form-control form-control-sm" type="text" v-model="form.publisher_name" />
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
