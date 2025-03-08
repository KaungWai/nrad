<script setup lang="ts">
import { API, type Category } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import router from '@/router'

const form = ref<Category>({
  category_id: '',
  category_name: '',
  created_at: '',
  updated_at: ''
})

const init = async () => {
  const route = useRoute()
  const categoryId = route.params.category_id as string
  const response = await API.category.getCategoryById(categoryId)
  if(response.ok) {
    form.value = response.data as Category
  }
}

const save = async () => {
  const response = await API.category.updateCategory(form.value.category_id, form.value)
  if (response.ok) {
    form.value = response.data as Category
  }
}

const deletE = async () => {
  const response = await API.category.deleteCategory(form.value.category_id)
  if (response.ok) {
    router.push('/categories')
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Edit Category'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="save">Save</button>
      <span>
        <button class="btn btn-sm btn-danger me-3" @click="deletE">Delete</button>
        <RouterLink class="btn btn-sm btn-secondary" to="/categories">Back</RouterLink>
      </span>
      
    </div>

    <table class="table m-0 mt-3">
      <thead>
        <tr>
          <th>Category Id</th>
          <th>Category Name</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.category_id" readonly />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.category_name" />
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
