import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from "../views/CategoryView.vue"
import NotFoundView from "../views/NotFoundView.vue"
import ShowProductView from "../views/ShowProductView.vue"
import CheckoutView from "../views/CheckoutView.vue"

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
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView,
    },
  ]
})

export default router
