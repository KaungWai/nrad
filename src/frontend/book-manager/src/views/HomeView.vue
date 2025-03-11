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
    <table class="table m-0">
      <thead>
        <tr>
          <th class="text-center">Books</th>
          <th class="text-center">Categories</th>
          <th class="text-center">Authors</th>
          <th class="text-center">Publishers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">{{ stats.book }}</td>
          <td class="text-center">{{ stats.category }}</td>
          <td class="text-center">{{ stats.author }}</td>
          <td class="text-center">{{ stats.publisher }}</td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
