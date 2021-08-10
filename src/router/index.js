import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchResult from '../views/SearchResult'
import Product from '../views/Product'
import Cart from '../views/Cart'
import BuyList from '../views/BuyList'
import Thanks from '../views/Thanks'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/like',
    name: 'Like',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Like.vue')
  },
  {
    path: '/result',
    name: 'SearchResult',
    component: SearchResult
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/buylist',
    name: 'BuyList',
    component: BuyList
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
