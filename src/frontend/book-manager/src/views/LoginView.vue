<script setup lang="ts">
import { useAxios } from '@/api/axios'
import router from '@/router'
import { useUserStore, type User } from '@/stores/user'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref, watch } from 'vue'

const userStore = useUserStore()
const axios = useAxios()

const form = ref<{ username: string; password: string }>({
  username: '',
  password: '',
})

const login = async () => {
  const response =  await axios.post('/auth/login', form.value)
  if (response.status < 400) {
    userStore.setUser(response.data as User)
  } else {
    userStore.setUser(null)
  }
}

watch(userStore, (value) => {
  if (value.user) {
    router.push(`/`)
  }
})
</script>

<template>
  <DefaultWrapper :title="'Login'" :action-links="[]">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-center">
          <div class="mw">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text">Username</span>
              <input type="text" class="form-control" v-model="form.username" />
            </div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text">Password</span>
              <input type="password" class="form-control" v-model="form.password" />
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary btn-sm" @click="login">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultWrapper>
</template>

<style scoped>
.mw {
  width: 100%;
  max-width: 200px;
}
</style>
