import {API_PATH} from "../config/config";
import {HTTP} from './http-commons'
import Qs from 'qs' //outil de parse et stringify de JSON

// demande les films a l'api
// nécessite que l'on se soit authentifié
const MoviesService = {
    fetchMovies: async function() {
        //await authenticate(auth.state.user.username, auth.state.user.password)
        return await HTTP.getInstance()
            .get(`http://${API_PATH}/movies/getMovies`)
            .then(response => Qs.parse(response.data))
    },

    getAMovie: async function(noFilm) {
        return await HTTP.getInstance()
            .get(`http://${API_PATH}/movies/getMovie/${encodeURIComponent(noFilm)}`)
            .then(response => Qs.parse(response.data))
    },

    createMovie: async function(titre, duree, dateSortie, budget, montantRecette, noRea, codeCat) {
        try {
            return await HTTP.getInstance().post(`http://${API_PATH}/movies/insertMovie`, {titre, duree, dateSortie, budget, montantRecette, noRea, codeCat})
        } catch (error) {
            throw error
        }
    },

    getMoviesFromDirector: async function(noRea) {
        try {
            return await HTTP.getInstance().get(`http://${API_PATH}/movies/getMovies/director/${encodeURIComponent(noRea)}`)
        } catch (error) {
            throw error
        }
    },

    getMoviesFromCat: async function(codeCat) {
        try {
            return await HTTP.getInstance().get(`http://${API_PATH}/movies/getMovies/cat/${encodeURIComponent(codeCat)}`)
        } catch (error) {
            throw error
        }
    },

    editMovie: async function(noFilm, titre, duree, dateSortie, budget, montantRecette, noRea, codeCat) {
        try {
            return await HTTP.getInstance().put(`http://${API_PATH}/movies/updateMovie`, {noFilm, titre, duree, dateSortie, budget, montantRecette, noRea, codeCat})
        } catch (error) {
            throw error
        }
    },

    deleteMovie: async function(noFilm) {
        try {
            return await HTTP.getInstance().delete(`http://${API_PATH}/movies/deleteMovie/${encodeURIComponent(noFilm)}`)
        } catch (error) {
            throw error
        }
    }
};

export default MoviesService