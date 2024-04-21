export const authRoute = (prop) => [{
    path: '/login ',
    name: prop + '.login ',
    meta: {
        auth: false,
        name: 'Login',
        user: 'guest'
    },
    component: () => import('../views/Auth/Login.vue')
}]