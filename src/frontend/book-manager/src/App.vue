<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar bg-body-tertiary border-bottom">
    <div class="container">
      <span class="navbar-brand mb-0 h1">Book Manager - Mini Project</span>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-auto p-3" style="min-width: 200px">
        <ul class="list-group rounded-0">
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
        </ul>
      </div>
      <div class="col border-start p-3" style="height: calc(100vh - 42px)">
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
