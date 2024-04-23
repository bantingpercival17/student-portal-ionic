export const authRoute = (prop) => [{
    path: '/',
    name: prop + '.login ',
    meta: {
        auth: false,
        name: 'Login',
        user: 'guest'
    },
    component: () => import('../views/Auth/StudentLogin.vue')
}, {
    path: '/login',
    name: prop + '.login ',
    meta: {
        auth: false,
        name: 'Login',
        user: 'guest'
    },
    component: () => import('../views/Auth/StudentLogin.vue')
}]