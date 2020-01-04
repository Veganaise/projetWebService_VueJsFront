import MoviesService from "../services/movies.services";

const state = { // état initial
    movies: {},
};

const getters = {
    fetchMovies: (state) => {
        return state.movies
    },
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
    }
};

const mutations = {
    fetchMoviesSuccess(state, movies){
        state.movies = { items: movies };
    },
    fetchMoviesFailure(state, error) {
        state.movies = { error }
    }
};

export const movies = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}
