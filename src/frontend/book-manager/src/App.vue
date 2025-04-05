<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { useAxios } from './api/axios'
const userStore = useUserStore()
const axios = useAxios()

const init = async () => {
  if (userStore.user) {
    return
  }
  const response = await axios.get(`/auth/user`)
  if (response.status < 400) {
    userStore.setUser(response.data)
  }
}

init()
</script>

<template>
  <nav class="navbar bg-body-tertiary border-bottom">
    <div class="container d-flex justify-content-bewteen">
      <span class="navbar-brand mb-0 h1">Book Manager - Mini Project</span>
      <span>{{ userStore.user?.user_name }}</span>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-auto p-3" style="min-width: 200px">
        <ul class="list-group rounded-0" v-if="userStore.user">
          <li class="list-group-item">
            <RouterLink class="nav-link" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="list-group-item">
            <RouterLink class="nav-link" aria-current="page" to="/books">Books</RouterLink>
          </li>
          <li class="list-group-item">
            <RouterLink class="nav-link" aria-current="page" to="/categories">Categories</RouterLink>
          </li>
          <li class="list-group-item">
            <RouterLink class="nav-link" aria-current="page" to="/authors">Authors</RouterLink>
          </li>
          <li class="list-group-item">
            <RouterLink class="nav-link" aria-current="page" to="/publishers">Publishers</RouterLink>
          </li>
          <li class="list-group-item" v-if="userStore.user.role == 'ADMIN'">
            <RouterLink class="nav-link" aria-current="page" to="/users">Users</RouterLink>
          </li>
          <li class="list-group-item">
            <RouterLink class="nav-link" aria-current="page" to="/setting">Setting</RouterLink>
          </li>
        </ul>
      </div>
      <div class="col border-start p-3" style="height: calc(100vh - 42px); overflow-y: auto">
        <Transition>
          <RouterView />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-item:hover {
  background-color: rgb(226, 227, 229);
}
</style>
