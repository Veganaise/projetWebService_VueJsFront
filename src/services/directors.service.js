import {HTTP} from "./http-commons";
import {API_PATH} from "../config/config";
import Qs from "qs";

const DirectorsService = {
    fetchDirectors: async function() {
        try {
            return await HTTP.getInstance()
                .get(`${API_PATH}/directors/getDirectors`)
                .then(response => Qs.parse(response.data))
        } catch (error) {
            throw error
        }
    },

    getADirector: async function(id) {
        try {
            return await HTTP.getInstance().get(`${API_PATH}/directors/getDirector/${encodeURIComponent(id)}`)
        } catch (error) {
            throw error
        }
    },

    createDirector: async function(nomRea, prenRea) {
        try {
            return await HTTP.getInstance().post(`${API_PATH}/directors/insertDirector`, {nomRea, prenRea})
        } catch (error) {
            throw error
        }
    },

    updateDirector: async function(noRea, nomRea, prenRea) {
        try {
            return await HTTP.getInstance().put(`${API_PATH}/directors/updateDirector`, {noRea, nomRea, prenRea})
        } catch (error) {
            throw error
        }
    },

    deleteDirector: async function(id) {
        try {
            return await HTTP.getInstance().delete(`${API_PATH}/directors/deleteDirector/${encodeURIComponent(id)}`)
        } catch (error) {
            throw error
        }
    }
}

export default DirectorsService
