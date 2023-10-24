import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/pages/Home.vue';
import InGame from '../components/pages/InGame.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/inGame',
        component: InGame,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;