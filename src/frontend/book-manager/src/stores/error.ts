import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  const error = ref<string[]>([])
  function setError(messages: string[]) {
    error.value = messages
  }
  return { error, setError }
})
