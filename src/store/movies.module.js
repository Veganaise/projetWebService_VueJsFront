import MoviesService from "../services/movies.services";
import router from "../router";

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
    },

    async createMovie({commit}, {titre, duree, dateSortie, budget, montantRecette, noRea, codeCat}) {
        try {
            await MoviesService.createMovie(titre, duree, dateSortie, budget, montantRecette, noRea, codeCat)
            commit('createMovieSuccess')
            return await router.go(0)
        } catch (e) {
            commit('createMovieFailure', {error: e})
            return false
        }
    },

    async getAMovie({commit}, noFilm) {
        try {
            const movie = await MoviesService.getAMovie(noFilm)
            commit('getAMovieSuccess', movie)
        } catch (e) {
            commit('getAMovieFailure', {error: e})
            return false
        }
    },

    async editMovie({commit}, {movie, noFilm, titre, duree, dateSortie, budget, montantRecette, noRea, codeCat}) {
        try {
            await MoviesService.editMovie(noFilm, titre, duree, dateSortie, budget, montantRecette, noRea, codeCat)
            commit('editMovieSuccess', movie)
        } catch(e) {
            commit('editMovieFailure', {error: e})
            return false
        }
    },

    async deleteMovie({commit}, noFilm) {
        try {
            await MoviesService.deleteMovie(noFilm)
            commit('deleteMovieSuccess', noFilm)
            return await router.go(0)
        } catch (e) {
            commit('deleteMovieFailure', {error: e})
            return false
        }
    },

    /*async getMoviesDirector({commit}, noRea) {
        try {
            const director = await MoviesService.getMoviesDirector(noRea)
            commit('getMovieDirectorSuccess', director.data)
        } catch (e) {
            commit('getMovieDirectorFailure', {error: e})
            return false
        }
    },*/

    async getMoviesFromCat({commit}, codeCat) {
        try {
            const movies = await MoviesService.getMoviesFromCat(codeCat)
            commit('getMoviesFromCatSuccess', movies.data)
        } catch(e) {
            commit('getMoviesFromCatFailure', {error: e})
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
    },

    createMovieSuccess(state) {
        state.movies = { items: movies }
    },
    createMovieFailure(state, { error }) {
        state.movies = { error }
    },

    getAMovieSuccess(state, movie) {
        state.movies.movieSelected = {movie}
    },
    getAMovieFailure(state, error) {
        state.movies.movieSelected = {error}
    },

    editMovieSuccess(state, movie) {
        Object.keys(state.movies.items).forEach(m => {
            if(m.noFilm === movie.noFilm) {
                m = movie
            }
        });
    },
    editMovieFailure(state, error) {
        state.movies = { error }
    },

    deleteMovieSuccess(state, noFilm) {
        state.movies.items = Object.keys(state.movies.items).filter(movie => movie.noFilm !== noFilm)
    },
    deleteMovieFailure(state, error) {
        state.movies = {error}
    },

    getMoviesFromCatSuccess(state, movies) {
        state.movies = {items : movies}
    },
    getMoviesFromCatFailure(state, error) {
        state.movies = {error}
    },
};

export const movies = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}
