import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SettingView from '../views/SettingView.vue'
// book
import BookList from '../views/Book/BookList.vue'
import BookNew from '../views/Book/BookNew.vue'
import BookEdit from '@/views/Book/BookEdit.vue'
// category
import CategoryList from '../views/Category/CategoryList.vue'
import CategoryNew from '../views/Category/CategoryNew.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
// author
import AuthorList from '../views/Author/AuthorList.vue'
import AuthorNew from '../views/Author/AuthorNew.vue'
import AuthorEdit from '../views/Author/AuthorEdit.vue'
// publisher
import PublisherList from '../views/Publisher/PublisherList.vue'
import PublisherNew from '../views/Publisher/PublisherNew.vue'
import PublisherEdit from '../views/Publisher/PublisherEdit.vue'
// user
import UserList from '../views/User/UserList.vue'
import UserNew from '../views/User/UserNew.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        isRequiredAuth: false,
      },
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
      meta: {
        isRequiredAuth: true,
      },
    },
    // book
    {
      path: '/books',
      name: 'books',
      component: BookList,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/books/new',
      name: 'books-new',
      component: BookNew,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/books/edit/:book_id',
      name: 'books-edit',
      component: BookEdit,
      meta: {
        isRequiredAuth: true,
      },
    },
    // category
    {
      path: '/categories',
      name: 'categories',
      component: CategoryList,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/categories/new',
      name: 'categories-new',
      component: CategoryNew,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/categories/edit/:category_id',
      name: 'categories-edit',
      component: CategoryEdit,
      meta: {
        isRequiredAuth: true,
      },
    },
    // Author
    {
      path: '/authors',
      name: 'authors',
      component: AuthorList,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/authors/new',
      name: 'authors-new',
      component: AuthorNew,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/authors/edit/:author_id',
      name: 'authors-edit',
      component: AuthorEdit,
      meta: {
        isRequiredAuth: true,
      },
    },
    // publisher
    {
      path: '/publishers',
      name: 'publishers',
      component: PublisherList,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/publishers/new',
      name: 'publishers-new',
      component: PublisherNew,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/publishers/edit/:publisher_id',
      name: 'publishers-edit',
      component: PublisherEdit,
      meta: {
        isRequiredAuth: true,
      },
    },
    // user
    {
      path: '/users',
      name: 'users',
      component: UserList,
      meta: {
        isRequiredAuth: true,
      },
    },
    {
      path: '/users/new',
      name: 'users-new',
      component: UserNew,
      meta: {
        isRequiredAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user) {
    next()
  } else {
    if (to.meta.isRequiredAuth) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
