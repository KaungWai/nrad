<script setup lang="ts">
import { API, type Author, type Book, type Category, type Publisher } from '@/api/api'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from '@/router'

const form = ref({
  book_name: '',
  category_id: '',
  author_id: '',
  publisher_id: '',
})

const categories = ref<Category[]>([])
const authors = ref<Author[]>([])
const publishers = ref<Publisher[]>([])

const init = async () => {
  const cResponse = await API.category.getCategories()
  if (cResponse.ok) {
    categories.value = cResponse.data ?? []
  }

  const aResponse = await API.author.getAuthors()
  if (aResponse.ok) {
    authors.value = aResponse.data ?? []
  }

  const pResponse = await API.publisher.getPublishers()
  if (pResponse.ok) {
    publishers.value = pResponse.data ?? []
  }
}

const save = async () => {
  const response = await API.book.createBook(form.value)
  if (response.ok) {
    router.push(`/books/edit/${response.data?.book_id}`)
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'New Book'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="save">Save</button>
      <RouterLink class="btn btn-sm btn-secondary" to="/books">Back</RouterLink>
    </div>

    <table class="table m-0 mt-3">
      <tbody>
        <tr>
          <td>
            Book Id
            <br>
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
          <td>
            Book Name
            <br>
            <input class="form-control form-control-sm" type="text" v-model="form.book_name" />
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            Category
            <br>
            <select class="form-select" v-model="form.category_id">
              <option selected value="">--select--</option>
              <option v-for="c in categories" :value="c.category_id" :key="c.category_id">{{ c.category_name }}</option>
            </select>
          </td>
          <td>
            Author
            <br>
            <select class="form-select" v-model="form.author_id">
              <option selected value="">--select--</option>
              <option v-for="a in authors" :value="a.author_id" :key="a.author_id">{{ a.author_name }}</option>
            </select>
          </td>
          <td>
            Publisher
            <br>
            <select class="form-select" v-model="form.publisher_id">
              <option selected value="">--select--</option>
              <option v-for="p in publishers" :value="p.publisher_id" :key="p.publisher_id">{{ p.publisher_name }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            Created At
            <br>
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
          <td>
            Updated Name
            <br>
            <input class="form-control form-control-sm" type="text" placeholder="(auto)" disabled />
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
