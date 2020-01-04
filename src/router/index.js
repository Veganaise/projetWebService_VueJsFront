import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesResultSet from '../components/movies/Movies'
import Home from '../components/Home'
import Login from '../components/Login'
import Actors from '../components/actors/Actors'
import store from '../store/index'
//import App from "../App";

Vue.use(VueRouter)

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
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

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