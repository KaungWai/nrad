import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  user_id: string
  user_name: string
  role: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  function setUser(u: User | null) {
    user.value = u
  }
  return { user, setUser }
})
