import { useErrorStore } from '@/stores/error'
import axios, { AxiosError } from 'axios'

export const useAxios = () => {
  const errorStore = useErrorStore()

  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (e) => {
      console.log(e)
      if (e instanceof AxiosError) {
        if (Array.isArray(e.response?.data?.errors)) {
          errorStore.setError(e.response.data.errors)
        }
      }
      return Promise.reject(e)
    },
  )

  return instance
}
