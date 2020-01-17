import {HTTP} from "./http-commons";
import {API_PATH} from "../config/config";
import Qs from "qs";

const CharactersService = {
    fetchCharacters: async function() {
        try {
            return await HTTP.getInstance()
                .get(`http://${API_PATH}/characters/getCharacters`)
                .then(response => Qs.parse(response.data))
        } catch (error) {
            throw error
        }
    },

    getActorCharacters: async function(noAct) {
        try {
            return await HTTP.getInstance()
                .get(`http://${API_PATH}/characters/getCharacters/actor/${encodeURIComponent(noAct.toString())}`)
                .then(response => Qs.parse(response.data))
        } catch (error) {
            throw error
        }
    },

    getMovieCharacters: async function(noFilm) {
        try {
            return await HTTP.getInstance().get(`http://${API_PATH}/characters/getCharacters/movie/${encodeURIComponent(noFilm.toString())}`)
        } catch (error) {
            throw error
        }
    },

    getMovieAndActorCharacters: async function(movie, actor) {
        const idMovie = movie.noFilm
        const idActor = actor.noAct
        try {
            return await HTTP.getInstance()
                .get(`http://${API_PATH}/characters/getCharacters/movie/${encodeURIComponent(idMovie.toString())}/actor/${encodeURIComponent(idActor.toString())}`)
                .then(response => Qs.parse(response.data))
        } catch (error) {
            throw error
        }
    },

    createCharacter: async function(noFilm, noAct, nomPers) {
        try {
            return await HTTP.getInstance().post(`http://${API_PATH}/characters/insertCharacter`, {noFilm, noAct, nomPers})
        } catch (error) {
            throw error
        }
    },

    updateCharacter: async function(noFilm, noAct, nomPers) {
        try {
            return await HTTP.getInstance().put(`http://${API_PATH}/characters/updateCharacter`, {noFilm, noAct, nomPers})
        } catch (error) {
            throw error
        }
    },

    deleteCharacter: async function(movie, actor) {
        const idMovie = movie.noFilm
        const idActor = actor.noAct
        try {
            return await HTTP.getInstance().delete(`http://${API_PATH}/characters/deleteCharacter/movie/${encodeURIComponent(idMovie.toString())}/actors/${encodeURIComponent(idActor.toString())}`)
        } catch (error) {
            throw error
        }
    }
}

export default CharactersService