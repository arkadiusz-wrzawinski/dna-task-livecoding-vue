import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TransactionListView from '@/views/TransactionListView.vue'
import TransactionDetailsView from '@/views/TransactionDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionListView
    },
    {
      path: '/transactions/:id',
      name: 'details',
      component: TransactionDetailsView
    }
  ]
})

export default router
