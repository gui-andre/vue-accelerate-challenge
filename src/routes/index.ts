import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import routesHome from '@/modules/home/routes'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  ...routesHome
]

const router = new VueRouter({
  routes
})

export default router
