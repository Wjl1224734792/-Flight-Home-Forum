import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/wall',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/wall',
                name: 'Wall',
                component: () => import('../views/WallMessage.vue'),
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;