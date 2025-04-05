<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useErrorStore } from '@/stores/error'

const props = defineProps<{
  title: string
  actionLinks: { name: string; theme: string; to: string; callback?: () => void }[]
}>()

const errorStore = useErrorStore()
</script>

<template>
  <div>
    <div class="bg-secondary-subtle p-3 d-flex justify-content-between align-items-center">
      <span>{{ props.title }}</span>
      <span>
        <template v-for="link in props.actionLinks">
          <button v-if="link.callback" :class="`btn btn-sm btn-${link.theme} ms-3`" @click="link.callback">{{ link.name }}</button>
          <RouterLink v-else :class="`btn btn-sm btn-${link.theme} ms-3`" :to="link.to">{{ link.name }}</RouterLink>
        </template>
      </span>
    </div>
    <div class="bg-light p-3">
      <slot></slot>
    </div>
    <div v-if="errorStore.error.length > 0" class="bg-danger-subtle text-dark p-3 d-flex justify-content-between">
      <span>{{ errorStore.error.join(' | ') }}</span>
      <span
        class="btn-link clickable"
        @click="
          () => {
            errorStore.setError([])
          }
        "
        >close</span
      >
    </div>
    <div class="mt-3 text-center">NodeJS REST API Development</div>
  </div>
</template>
