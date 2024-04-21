import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';
import {
  clientRoute
} from './clientRoute'
const studentRoute = (prop) => [{
  path: '/student',
  name: prop + '.student ',
  meta: {
    auth: false,
    name: 'student',
    user: 'student'
  },
  component: () => import('../views/Students/Dashboard.vue')
}]

const routes = [{
  path: '/',
  name: 'client-layout',
  component: () => import('@/components/layouts/GuestLayout.vue'),
  children: clientRoute('client-layout')
}]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes
})

export default router