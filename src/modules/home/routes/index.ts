import { RouteConfig } from 'vue-router'
import Home from '@/modules/home/views/Home.vue'

const routesHome: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

export default routesHome
