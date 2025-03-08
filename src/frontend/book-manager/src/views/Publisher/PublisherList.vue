<script setup lang="ts">
import { API, type Publisher } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const publishers = ref<Publisher[]>()

const init = async () => {
  const response = await API.publisher.getPublishers()
  if (response.ok) {
    publishers.value = response.data
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Publishers'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="init">Search</button>
      <RouterLink class="btn btn-sm btn-primary" to="/publishers/new">New Publisher</RouterLink>
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
        <tr v-for="(publiser, idx) in publishers" :key="publiser.publisher_id">
          <td>{{ idx + 1 }}</td>
          <td>
            <RouterLink :to="`/publishers/edit/${publiser.publisher_id}`">{{ publiser.publisher_id }}</RouterLink>
          </td>
          <td>{{ publiser.publisher_name }}</td>
          <td>{{ publiser.created_at }}</td>
          <td>{{ publiser.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
