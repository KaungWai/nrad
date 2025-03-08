<script setup lang="ts">
import { API, type Publisher } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import router from '@/router'

const form = ref<Publisher>({
  publisher_id: '',
  publisher_name: '',
  created_at: '',
  updated_at: ''
})


const init = async () => {
  const route = useRoute()
  const publisherId = route.params.publisher_id as string
  const response = await API.publisher.getPublisherById(publisherId)
  if(response.ok) {
    form.value = response.data
  }
}

const save = async () => {
  const response = await API.publisher.updatePublisher(form.value.publisher_id, form.value)
  if (response.ok) {
    form.value = response.data
  }
}

const deletE = async () => {
  const response = await API.publisher.deletePublisher(form.value.publisher_id)
  if (response.ok) {
    router.push('/publishers')
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Edit Publisher'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="save">Save</button>
      <span>
        <button class="btn btn-sm btn-danger me-3" @click="deletE">Delete</button>
        <RouterLink class="btn btn-sm btn-secondary" to="/publishers">Back</RouterLink>
      </span>
      
    </div>

    <table class="table m-0 mt-3">
      <thead>
        <tr>
          <th>Publisher Id</th>
          <th>Publisher Name</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.publisher_id" readonly />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.publisher_name" />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.created_at" readonly />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.updated_at" readonly />
          </td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
