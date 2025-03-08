import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// publisher
import PublisherList from '../views/Publisher/PublisherList.vue'
import PubliserNew from '../views/Publisher/PubliserNew.vue'
import PubliserEdit from '../views/Publisher/PubliserEdit.vue'
// author
import AuthorList from '../views/Author/AuthorList.vue'
import AuthorNew from '../views/Author/AuthorNew.vue'
import AuthorEdit from '../views/Author/AuthorEdit.vue'
// category
import CategoryList from '../views/Category/CategoryList.vue'
import CategoryNew from '../views/Category/CategoryNew.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
// Book
import BookList from '../views/Book/BookList.vue'
import BookNew from '../views/Book/BookNew.vue'
import BookEdit from '@/views/Book/BookEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // publisher
    {
      path: '/publishers',
      name: 'publishers',
      component: PublisherList,
    },
    {
      path: '/publishers/new',
      name: 'publishers-new',
      component: PubliserNew,
    },
    {
      path: '/publishers/edit/:publisher_id',
      name: 'publishers-edit',
      component: PubliserEdit,
    },
    // Author
    {
      path: '/authors',
      name: 'authors',
      component: AuthorList,
    },
    {
      path: '/authors/new',
      name: 'authors-new',
      component: AuthorNew,
    },
    {
      path: '/authors/edit/:author_id',
      name: 'authors-edit',
      component: AuthorEdit,
    },
    // Category
    {
      path: '/categories',
      name: 'categories',
      component: CategoryList,
    },
    {
      path: '/categories/new',
      name: 'categories-new',
      component: CategoryNew,
    },
    {
      path: '/categories/edit/:category_id',
      name: 'categories-edit',
      component: CategoryEdit,
    },
    // book
    {
      path: '/books',
      name: 'books',
      component: BookList,
    },
    {
      path: '/books/new',
      name: 'books-new',
      component: BookNew,
    },
    {
      path: '/books/edit/:book_id',
      name: 'books-edit',
      component: BookEdit,
    },
  ],
})

export default router
