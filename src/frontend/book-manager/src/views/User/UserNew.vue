<script setup lang="ts">
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import router from '@/router'
import { useAxios } from '@/api/axios'

const axios = useAxios()

const form = ref<{
  user_name: string
  role: string
  password: string
}>({
  user_name: '',
  role: '',
  password: '',
})

const save = async () => {
  const response = await axios.post(`/users`, form.value)
  if (response.status < 400) {
    router.push(`/users`)
  }
}
</script>

<template>
  <DefaultWrapper :title="'New User'" :action-links="[{ name: 'Back', to: '/users', theme: 'secondary' }]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">User Id</span>
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">User Name</span>
          <input class="form-control form-control-sm" type="text" v-model="form.user_name" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Role</span>
          <select class="form-select" v-model="form.role">
            <option value="">--select--</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Password</span>
          <input class="form-control form-control-sm" type="text" v-model="form.password" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Created At</span>
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Updated At</span>
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
        </div>
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn btn-sm btn-success" @click="save">Register</button>
    </div>
  </DefaultWrapper>
</template>
