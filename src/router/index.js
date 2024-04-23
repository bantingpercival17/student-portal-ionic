import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';
import {
  clientRoute
} from './clientRoute'
import {
  studentRoute
} from './student-route.js'
import store from '../store/index'
import {
  IS_USER_AUTHENTICATE_GETTER,
  GET_USER_TYPE
} from '@/store/storeConstants'
/* const studentRoute = (prop) => [{
  path: '/student/dashboard',
  name: prop + '.student ',
  meta: {
    auth: false,
    name: 'Dashboard',
    user: 'student'
  },
  component: () => import('../views/Students/Dashboard.vue')
}] */

const routes = [{
    path: '/',
    name: 'client-layout',
    component: () => import('@/components/layouts/GuestLayout.vue'),
    children: clientRoute('client-layout')
  },
  {
    path: '/student',
    name: 'student-layout',
    component: () => import('@/components/layouts/MainLayout.vue'),
    children: studentRoute('student-layout')
  },
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes
})

function studentUserMiddleware(to, from, next) {
  // Regular user middleware logic
  // console.log('Student user middleware')
  if (to.meta.user !== 'student') {
    next('/student/dashboard')
  } else {
    next()
  }
}

function applicantUserMiddleware(to, from, next) {
  // Admin user middleware logic
  // console.log('Applicant user middleware')
  if (to.meta.user !== 'applicant') {
    next('/applicant/dashboard')
  } else {
    next()
  }
}
router.beforeEach((to, from, next) => {
  const isAuth = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  const isAuthType = store.getters[`auth/${GET_USER_TYPE}`]
  document.title = `${to.meta.name} - Baliwag Maritime Academy, Inc.`
  if (isAuth) {
    if (isAuthType === 'student') {
      studentUserMiddleware(to, from, next)
    } else if (isAuthType === 'applicant') {
      applicantUserMiddleware(to, from, next)
    }
  } else {
    if (to.meta.user !== 'guest') {
      next('/')
    } else {
      next()
    }
  }
})
export default router