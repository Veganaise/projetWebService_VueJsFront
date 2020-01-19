import Vue from 'vue'
import VueRouter from 'vue-router'
import Movies from '../components/movies/Movies'
import MovieDetails from '../components/movies/MovieDetails'
import Home from '../components/Home'
import Login from '../components/Login'
import Actors from '../components/actors/Actors'
import ActorDetails from '../components/actors/ActorDetails'
import Administration from "../components/users/Administration";
import Profile from "../components/users/Profile";
import Categories from "../components/categories/Categories";
import store from '../store/index'

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
        name: 'Movies',
        component: Movies
    },
    {
        path: '/movieDetails/:id',
        props: true,
        name: 'MovieDetails',
        component: MovieDetails
    },
    {
      path: '/moviesCategory/:id',
      name: 'Movies',
      component: Movies
    },
    {
        path: '/actors',
        name: 'Actors',
        component: Actors
    },
    {
        path: '/actorDetails/:id',
        props: true,
        name: 'ActorDetails',
        component: ActorDetails
    },
    {
        path: '/users',
        name: 'Administration',
        component: Administration
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/categories',
        name: 'Categories',
        component: Categories
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