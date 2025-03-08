<script setup lang="ts">
import { API, type Category } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from '@/router'

const form = ref<{
  category_name: string
}>({
  category_name: '',
})

const save = async () => {
  const response = await API.category.createCategory(form.value)
  if (response.ok) {
    router.push(`/categories/edit/${response.data?.category_id}`)
  }
}
</script>

<template>
  <DefaultWrapper :title="'New Category'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="save">Save</button>
      <RouterLink class="btn btn-sm btn-secondary" to="/categories">Back</RouterLink>
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
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" v-model="form.category_name" />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
