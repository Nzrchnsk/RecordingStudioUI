import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/studio',
    name: 'Studios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Studios.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login'),
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/auth/registration'),
  },
  {
    path: '/users',
    name: 'users_directory',
    component: () => import('../views/users/users_directory'),
    props: true,
  },
  {
    path: '/records_studios/:studioId',
    name: 'studioEdit',
    component: () => import('../views/records_studios/editStudio'),
    props: true,
  },
  {
    path: '/records_studios',
    name: 'studiosList',
    component: () => import('../views/records_studios/studiosList'),
  },
  {
    path: '/records_studios/create',
    name: 'studioCreate',
    component: () => import('../views/records_studios/editStudio'),
    props: true,
  },
  {
    path: '/reservations',
    name: 'reservationsList',
    component: () => import('../views/reservations/reservationsList'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
