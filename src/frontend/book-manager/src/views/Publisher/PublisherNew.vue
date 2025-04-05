<script setup lang="ts">
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import router from '@/router'
import { useAxios } from '@/api/axios'

const axios = useAxios()

const form = ref<{
  publisher_name: string
}>({
  publisher_name: '',
})

const save = async () => {
  const response = await axios.post(`/publishers`, form.value)
  if (response.status < 400) {
    router.push(`/publishers/edit/${response.data?.publisher_id}`)
  }
}
</script>

<template>
  <DefaultWrapper :title="'New Publisher'" :action-links="[{ name: 'Back', to: '/publishers', theme: 'secondary' }]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Publisher Id</span>
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
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
