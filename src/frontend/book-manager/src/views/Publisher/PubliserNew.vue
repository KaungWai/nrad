<script setup lang="ts">
import { API, type Publisher } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from '@/router'

const form = ref<{
  publisher_name: string
}>({
  publisher_name: '',
})

const save = async () => {
  const response = await API.publisher.createPublisher(form.value)
  if (response.ok) {
    router.push(`/publishers/edit/${response.data.publisher_id}`)
  }
}
</script>

<template>
  <DefaultWrapper :title="'New Publisher'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="save">Save</button>
      <RouterLink class="btn btn-sm btn-secondary" to="/publishers">Back</RouterLink>
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
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.publisher_name" />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
