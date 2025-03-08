<script setup lang="ts">
import { API, type Author } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import router from '@/router'

const form = ref<Author>({
  author_id: '',
  author_name: '',
  created_at: '',
  updated_at: ''
})

const init = async () => {
  const route = useRoute()
  const authorId = route.params.author_id as string
  const response = await API.author.getAuthorById(authorId)
  if(response.ok) {
    form.value = response.data as Author
  }
}

const save = async () => {
  const response = await API.author.updateAuthor(form.value.author_id, form.value)
  if (response.ok) {
    form.value = response.data as Author
  }
}

const deletE = async () => {
  const response = await API.author.deleteAuthor(form.value.author_id)
  if (response.ok) {
    router.push('/authors')
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Edit Author'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="save">Save</button>
      <span>
        <button class="btn btn-sm btn-danger me-3" @click="deletE">Delete</button>
        <RouterLink class="btn btn-sm btn-secondary" to="/authors">Back</RouterLink>
      </span>
      
    </div>

    <table class="table m-0 mt-3">
      <thead>
        <tr>
          <th>Author Id</th>
          <th>Author Name</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.author_id" readonly />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.author_name" />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.created_at" readonly />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.updated_at" readonly />
          </td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
