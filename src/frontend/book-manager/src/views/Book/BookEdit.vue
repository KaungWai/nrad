<script setup lang="ts">
import { API, type Author, type Book, type Category, type Publisher } from '@/api/api'
import router from '@/router'
import DefaultWrapper from '@/wrappers/DefaultWrapper.vue'
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const form = ref<Book>({
    book_id: '',
    book_name: '',
    created_at: '',
    updated_at: '',
    category: {
        category_id: '',
        category_name: ''
    },
    author: {
        author_id: '',
        author_name: ''
    },
    publisher: {
        publisher_id: '',
        publisher_name: ''
    }
})

const categories = ref<Category[]>([])
const authors = ref<Author[]>([])
const publishers = ref<Publisher[]>([])

const route = useRoute()
const bookId = route.params.book_id as string

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

  const bResponse = await API.book.getBookById(bookId)
  if (bResponse.ok) {
    form.value = bResponse.data as Book
  }
}

const save = async () => {
  
  const data = {
    book_name: form.value.book_name,
    category_id: form.value.category.category_id,
    author_id: form.value.author.author_id,
    publisher_id: form.value.publisher.publisher_id
  }

  console.log(data)
  const response = await API.book.updateBook(bookId, data)
  if (response.ok) {
    init()
  }
}

const deletE = async () => {
  const response = await API.book.deleteBook(form.value.book_id)
  if (response.ok) {
    router.push('/books')
  }
}

init()
</script>

<template>
  <DefaultWrapper :title="'Edit Book'">
    <div class="border-bottom pb-3 d-flex justify-content-between">
      <button class="btn btn-sm btn-primary" @click="save">Save</button>
      <span>
        <button class="btn btn-sm btn-danger me-3" @click="deletE">Delete</button>
        <RouterLink class="btn btn-sm btn-secondary" to="/books">Back</RouterLink>
      </span>
    </div>

    <table class="table m-0 mt-3">
      <tbody>
        <tr>
          <td>
            Book Id
            <br>
            <input class="form-control form-control-sm" type="text" v-model="form.book_id" readonly />
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
            <select class="form-select" v-model="form.category.category_id">
              <option selected value="">--select--</option>
              <option v-for="c in categories" :value="c.category_id" :key="c.category_id">{{ c.category_name }}</option>
            </select>
          </td>
          <td>
            Author
            <br>
            <select class="form-select" v-model="form.author.author_id">
              <option selected value="">--select--</option>
              <option v-for="a in authors" :value="a.author_id" :key="a.author_id">{{ a.author_name }}</option>
            </select>
          </td>
          <td>
            Publisher
            <br>
            <select class="form-select" v-model="form.publisher.publisher_id">
              <option selected value="">--select--</option>
              <option v-for="p in publishers" :value="p.publisher_id" :key="p.publisher_id">{{ p.publisher_name }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            Created At
            <br>
            <input class="form-control form-control-sm" type="text" v-model="form.created_at" readonly />
          </td>
          <td>
            Updated Name
            <br>
            <input class="form-control form-control-sm" type="text" v-model="form.updated_at" readonly />
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </DefaultWrapper>
</template>
