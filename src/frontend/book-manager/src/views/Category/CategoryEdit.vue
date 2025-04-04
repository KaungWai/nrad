<script setup lang="ts">
import { useAxios } from '@/api/axios'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { Category } from '@/types'
import { formatDateTime } from '@/utils/strUtils'

const axios = useAxios()

const form = ref<Category>({
  category_id: '',
  category_name: '',
  created_at: '',
  updated_at: '',
})

const init = async () => {
  const route = useRoute()
  const categoryId = route.params.category_id as string
  const response = await axios.get(`/categories/${categoryId}`)
  if (response.status < 400) {
    form.value = response.data as Category
    format()
  }
}

const save = async () => {
  const response = await axios.patch(`/categories/${form.value.category_id}`, form.value)
  if (response.status < 400) {
    form.value = response.data as Category
    format()
  }
}

const remove = async () => {
  if(!confirm("Are you sure want to delete?")) {
    return;
  }
  const response = await axios.delete(`/categories/${form.value.category_id}`)
  if (response.status < 400) {
    router.push('/categories')
  }
}

const format = () => {
  form.value.created_at = formatDateTime(form.value.created_at)
  form.value.updated_at = formatDateTime(form.value.updated_at)
}

init()
</script>

<template>
  <DefaultWrapper :title="'Edit Category'" :action-links="[{name: 'Back', to: '/categories', theme: 'secondary'}]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Category Id</span>
          <input class="form-control form-control-sm" type="text" v-model="form.category_id" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Category Name</span>
          <input class="form-control form-control-sm" type="text" v-model="form.category_name" />
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
