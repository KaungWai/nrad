<script setup lang="ts">
import { useAxios } from '@/api/axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'

const axios = useAxios()
const userStore = useUserStore()

const form = ref({
  password: '',
})

const save = async () => {
  const response = await axios.patch(`/users/${userStore.user?.user_id}`, form.value)
  if (response.status < 400) {
    alert('Password changed')
    router.push(`/`)
  }
}

const logout = async () => {
  const response = await axios.post('/auth/logout')
  if (response.status < 400) {
    userStore.setUser(null)
    router.push(`/login`)
  }
}
</script>

<template>
  <DefaultWrapper :title="'Setting'" :action-links="[{ name: 'Logout', theme: 'primary', to: '#', callback: logout }]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">User Name</span>
          <input type="text" class="form-control" :value="userStore.user?.user_name" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Password</span>
          <input type="text" class="form-control" v-model="form.password" />
        </div>
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
    <button class="btn btn-sm btn-success" @click="save">Update</button>
  </DefaultWrapper>
</template>
