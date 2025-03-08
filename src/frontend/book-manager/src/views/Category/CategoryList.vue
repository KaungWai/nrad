<script setup lang="ts">
import { API, type Category } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const categories = ref<Category[]>()

const init = async () => {
  const response = await API.category.getCategories()
  if (response.ok) {
    categories.value = response.data
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Categories'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="init">Search</button>
      <RouterLink class="btn btn-sm btn-primary" to="/categories/new">New Category</RouterLink>
    </div>

    <table class="table m-0 mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Category Id</th>
          <th>Category Name</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, idx) in categories" :key="category.category_id">
          <td>{{ idx + 1 }}</td>
          <td>
            <RouterLink :to="`/categories/edit/${category.category_id}`">{{ category.category_id }}</RouterLink>
          </td>
          <td>{{ category.category_name }}</td>
          <td>{{ category.created_at }}</td>
          <td>{{ category.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
