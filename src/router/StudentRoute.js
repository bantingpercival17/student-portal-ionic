
import {
    RouteModel
} from './RouteModel'
const routeModel = new RouteModel()
const userType = 'student'
export const studentRoute = (prop) => [
    routeModel.appendUserRoute(prop, '.home', '/student/home', 'Home', userType, () => import('@/views/Students/Dashboard.vue')),
    routeModel.appendUserRoute(prop, '.classroom', '/student/classroom', 'Classroom', userType, () => import('@/views/Students/Classroom/ClassroomOverview.vue')),
    routeModel.appendUserRoute(prop, '.payment', '/student/payment', 'Payment', userType, () => import('@/views/Students/Payment/Overview.vue')),
    routeModel.appendUserRoute(prop, '.onboard', '/student/onboard', 'Onboard', userType, () => import('@/views/Students/Onboard/Overview.vue')),
    routeModel.appendUserRoute(prop, '.onboard-mopm-view-v2', '/student/onboard/mopm', 'Onboard (MOPM)', userType, () => import('@/views/Students/Onboard/Overview.vue')),
];
