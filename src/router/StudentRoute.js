
import {
    RouteModel
} from './RouteModel'
const routeModel = new RouteModel()
const userType = 'student'
export const studentRoute = (prop) => [
    routeModel.appendUserRoute(prop, '.dashboard', '/', 'Dashboard', () => import('@/views/Students/Dashboard.vue'), userType),
    routeModel.appendUserRoute(prop, '.dashboard', '/dashboard', 'Dashboard', () => import('@/views/Students/Dashboard.vue'), userType),
]