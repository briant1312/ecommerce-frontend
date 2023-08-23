import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from "../views/CategoryView.vue"
import NotFoundView from "../views/NotFoundView.vue"
import ShowProductView from "../views/ShowProductView.vue"

const router = createRouter({
  scrollBehavior () {
    window.scrollTo(0,0);
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:category',
      name: 'category',
      component: CategoryView,
      props: true
    },
    {
      path: '/show/:id',
      name: 'showProduct',
      component: ShowProductView,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
