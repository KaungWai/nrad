<script setup lang="ts">
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import router from '@/router'
import { useAxios } from '@/api/axios'

const axios = useAxios()

const form = ref<{
  category_name: string
}>({
  category_name: '',
})

const save = async () => {
  const response = await axios.post(`/categories`, form.value)
  if (response.status < 400) {
    router.push(`/categories/edit/${response.data?.category_id}`)
  }
}
</script>

<template>
  <DefaultWrapper :title="'New Category'" :action-links="[{ name: 'Back', to: '/categories', theme: 'secondary' }]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Category Id</span>
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
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
