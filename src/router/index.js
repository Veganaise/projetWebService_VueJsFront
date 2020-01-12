import Vue from 'vue'
// import VueRouter from 'vue-router'
import MoviesResultSet from '../components/movies/Movies'
import Home from '../components/Home'
import Login from '../components/Login'
import Actors from '../components/actors/Actors'
import Administration from "../components/Administration";
import store from '../store/index'
import { IonicVueRouter } from '@ionic/vue'
//import App from "../App";

// Vue.use(VueRouter)
Vue.use(IonicVueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/movies',
        name: 'MoviesResultSet',
        component: MoviesResultSet
    },
    {
        path: '/actors',
        name: 'Actors',
        component: Actors
    },
    {
        path: '/users',
        name: 'Administration',
        component: Administration
    }
];

// const router = new VueRouter({
const router = new IonicVueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = store.getters['auth/loggedIn']
    if (authRequired && !loggedIn) {
        return next('login')
    }

    next()
});

export default router
