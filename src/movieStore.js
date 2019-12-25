import {getMovies} from "@/services/movies.services";
import {authenticate} from "@/services/http-commons";

export const state = { //état initial
    movies:[],
    user: {
        login: "dylan",
        password: "12345"
    },
    token: undefined
};

export const getters = {
    movies(state) {
        return state.movies;
    },
    authorizationHeader(state) {
        return state.token; // Get
    },
    authenticated(state) {
        return !!state.token; // Check whether there is a stored token or not
    }
};

export const actions = {
    fetchMovies( {commit} ) {
        getMovies().then( (movies) => commit('fetchMovies',movies) );
    },
    authenticate( {state, commit} ) {
        return authenticate(state.user.login, state.user.password).then( (token) => commit('authenticate', token) );
    }
};

export const mutations = {
    fetchMovies(state,payload){
        state.movies=payload;
    },
    authenticate(state,payload){
        state.token=payload;
    }
};
