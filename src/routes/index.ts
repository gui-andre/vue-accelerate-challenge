import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import routesHome from '@/modules/home/routes'
import routesTransaction from '@/modules/transaction/routes'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  ...routesTransaction
]

const router = new VueRouter({
  routes
})

export default router
