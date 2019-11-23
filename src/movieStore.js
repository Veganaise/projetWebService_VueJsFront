import {getMovies} from "@/services/movies.services";
import {authenticate,AUTHENTICATED} from "@/services/http-commons";

export const state = { //état initial
    movies:[]
};

export const getters = {
    movies(state){
        return state.movies;
    }
};

export  const actions = {
    fetchMovies({commit}){

        getMovies().then((movies)=>commit('fetchMovies',movies));
    }
};

export const mutations = {
    fetchMovies(state,payload){
        state.movies=payload;
    }
};