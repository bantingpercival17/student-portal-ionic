import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import store from '../store/index';
import {
    IS_USER_AUTHENTICATE_GETTER,
    GET_USER_TYPE,
    AUTO_LOGIN_ACTION
} from '@/store/storeConstants';
import { authRoute } from './AuthRoute.js';
import { RouteModel } from './RouteModel.js';
import { studentRoute } from './StudentRoute.js';

const routeModel = new RouteModel();

// Define routes
const routes = [
    {
        path: '/',
        redirect: '/login',
        name: 'client-layout',
        component: () => import('@/components/layouts/AuthLayout.vue'),
        children: authRoute('client-layout'),
    },
    {
        path: '/student',
        name: 'student-layout',
        component: () => import('@/components/widgets/BottomTabs.vue'),
        children: studentRoute('student-layout'),
    },
    {
        path: '/error',
        name: 'error-layout',
        component: () => import('@/views/ErrorPage/404.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/error' }
];

// Create router
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// Wait for AUTO_LOGIN_ACTION to complete
store.dispatch(`auth/${AUTO_LOGIN_ACTION}`).then(() => {
    console.log('Auto login completed');
}).catch(err => {
    console.error('Error during auto login:', err);
});

// Router navigation guard
router.beforeEach((to, from, next) => {
    try {
        const isAuth = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`];
        const isAuthType = store.getters[`auth/${GET_USER_TYPE}`];

        // Update document title
        document.title = `${to.meta.name} - Baliwag Maritime Academy, Inc.`;
        console.log(isAuthType)
        // Authenticated user navigation
        /* if (isAuth) {
            if (isAuthType === 'student') {
                routeModel.studentUserMiddleware(to, from, next);
            } else {
                routeModel.applicantUserMiddleware(to, from, next);
            }
        } else {
            // Guest user navigation
            if (to.meta.user !== 'guest') {
                next('/');
            } else {
                next();
            }
        } */
        next()
    } catch (error) {
        next('/error'); // Cancel navigation on error
    }
});

export default router;
