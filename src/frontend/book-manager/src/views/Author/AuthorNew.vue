<script setup lang="ts">
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import router from '@/router'
import { useAxios } from '@/api/axios'

const axios = useAxios()

const form = ref<{
  author_name: string
  gender: string
  birth_date: string
}>({
  author_name: '',
  gender: '',
  birth_date: '',
})

const save = async () => {
  const response = await axios.post(`/authors`, form.value)
  if (response.status < 400) {
    router.push(`/authors/edit/${response.data?.author_id}`)
  }
}
</script>

<template>
  <DefaultWrapper :title="'New Author'" :action-links="[{ name: 'Back', to: '/authors', theme: 'secondary' }]">
    <div class="row">
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author Id</span>
          <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Author Name</span>
          <input class="form-control form-control-sm" type="text" v-model="form.author_name" />
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Gender</span>
          <select class="form-select form-select-sm" v-model="form.gender">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text">Birthdate</span>
          <input class="form-control form-control-sm" type="date" v-model="form.birth_date" />
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
