<script setup lang="ts">
import { useAxios } from '@/api/axios'
import type { Stats } from '@/types'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'

const axios = useAxios()

const stats = ref<Stats>({
  category: 0,
  author: 0,
  publisher: 0,
  book: 0,
})

const init = async () => {
  const response = await axios.get('/stats')
  if (response.status < 400) {
    stats.value = response.data as Stats
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Home'" :action-links="[]">
    <div class="row g-3">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Books</h5>
            <p class="card-text text-end display-6">{{ stats.book }}</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Categories</h5>
            <p class="card-text text-end display-6">{{ stats.category }}</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Authors</h5>
            <p class="card-text text-end display-6">{{ stats.author }}</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Publishers</h5>
            <p class="card-text text-end display-6">{{ stats.publisher }}</p>
          </div>
        </div>
      </div>
    </div>
  </DefaultWrapper>
</template>
