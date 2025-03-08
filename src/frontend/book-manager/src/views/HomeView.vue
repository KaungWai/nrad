<script setup lang="ts">
import { API, type Stats } from '@/api/api';
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue';
import { ref } from 'vue';

const stats = ref<Stats>({
  category: 0,
  author: 0,
  publisher: 0,
  book: 0
})

const init = async () => {
  const response = await API.getStats()
  if (response.ok) {
    stats.value = response.data as Stats
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Home'">
    <table class="table">
      <thead>
        <tr>
          <th>Books</th>
          <th>Categories</th>
          <th>Authors</th>
          <th>Publishers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ stats.book }}</td>
          <td>{{ stats.category }}</td>
          <td>{{ stats.author }}</td>
          <td>{{ stats.publisher }}</td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
