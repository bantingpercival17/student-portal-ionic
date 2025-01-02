import { RouteModel } from './RouteModel'
const routeModel = new RouteModel()
const userType = 'guest'

export const authRoute = (prop) => [
    routeModel.appendGuestRoute(prop, '.login', '/', 'Login', () => import('@/views/Auth/StudentLogin.vue'), userType),
    routeModel.appendGuestRoute(prop, '.login', '/login', 'Login', () => import('@/views/Auth/StudentLogin.vue'), userType),
    routeModel.appendGuestRoute(prop, '.student-forget-password', '/forget-password', 'Forget Password', () => import('@/views/Auth/StudentForgetPassword.vue'), userType)
]