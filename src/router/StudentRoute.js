
import {
    RouteModel
} from './RouteModel'
const routeModel = new RouteModel()
const userType = 'student'
export const studentRoute = (prop) => [
    routeModel.appendUserRoute(prop, '.dashboard', '/', 'Dashboard', userType, () => import('@/views/Students/Dashboard.vue')),
    routeModel.appendUserRoute(prop, '.dashboard', '/student/dashboard', 'Dashboard', userType, () => import('@/views/Students/Dashboard.vue')),
    routeModel.appendUserRoute(prop, '.subjects-view', '/student/classroom', 'Dashboard', userType, () => import('@/views/Students/Classroom/SubjectListView.vue')),
]