import { RouteConfig } from 'vue-router'
import Transactions from '@/modules/transaction/views/Transactions.vue'

const routesTransaction: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Transactions',
    component: Transactions,
  },
]

export default routesTransaction
