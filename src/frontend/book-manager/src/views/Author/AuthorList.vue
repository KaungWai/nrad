<script setup lang="ts">
import { API, type Author } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const authors = ref<Author[]>()

const init = async () => {
  const response = await API.author.getAuthors()
  if (response.ok) {
    authors.value = response.data
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Authors'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="init">Search</button>
      <RouterLink class="btn btn-sm btn-primary" to="/authors/new">New Author</RouterLink>
    </div>

    <table class="table m-0 mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Author Id</th>
          <th>Author Name</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(author, idx) in authors" :key="author.author_id">
          <td>{{ idx + 1 }}</td>
          <td>
            <RouterLink :to="`/authors/edit/${author.author_id}`">{{ author.author_id }}</RouterLink>
          </td>
          <td>{{ author.author_name }}</td>
          <td>{{ author.created_at }}</td>
          <td>{{ author.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
