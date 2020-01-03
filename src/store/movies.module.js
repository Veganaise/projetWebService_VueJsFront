import MoviesService from "../services/movies.services";
//import {authenticate} from "@/services/http-commons";

const state = { //état initial
    movies: {},
    /*user: {
        login: "dylan",
        password: "12345"
    },
    token: undefined*/
};

const getters = {
    fetchMovies: (state) => {
        return state.movies
    },

    /*movies(state) {
        return state.movies;
    },*/
    /*authorizationHeader(state) {
        return state.token; // Get
    },
    authenticated(state) {
        return !!state.token; // Check whether there is a stored token or not
    }*/
};

const actions = {
    async fetchMovies( {commit} ) {
        try {
            const movies = await MoviesService.fetchMovies()
            commit('fetchMoviesSuccess', movies)
        } catch (e) {
            commit('fetchMoviesFailure', {error: e})
            return false
        }
       /* getMovies().then(
            (movies) => commit('fetchMovies', movies)
        );*/
    },
    /*authenticate( {state, commit} ) {
        return authenticate(state.user.login, state.user.password).then( (token) => commit('authenticate', token) );
    }*/
};

const mutations = {
    fetchMoviesSuccess(state, movies){
        state.movies = { items: movies };
    },
    fetchMoviesFailure(state, error) {
        state.movies = { error }
    }
    /*authenticate(state,payload){
        state.token=payload;
    }*/
};

export const movies = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}
