import {API_PATH} from "../config/config";
import {HTTP} from './http-commons'
import Qs from 'qs'

const ActorsService = {
    fetchActors: async function() {
        try {
            return await HTTP.getInstance()
                .get(`http://${API_PATH}/actors/getActors`)
                .then(response => Qs.parse(response.data))
        } catch (error) {
            throw error
        }
    },

    getAnActor: async function(id) {
        try {
            return await HTTP.getInstance().get(`http://${API_PATH}/actors/getActor/${encodeURIComponent(id)}`)
        } catch (error) {
            throw error
        }
    },

    createActor: async function(nomAct, prenAct, dateNaissance, dateDeces) {
        try {
            return await HTTP.getInstance().post(`http://${API_PATH}/actors/insertActor`, {nomAct, prenAct, dateNaissance, dateDeces})
        } catch (error) {
            throw error
        }
    },

    updateActor: async function(nomAct, prenAct, dateNaissance, dateDeces) {
        try {
            return await HTTP.getInstance().put(`http://${API_PATH}/actors/updateActor`, {nomAct, prenAct, dateNaissance, dateDeces})
        } catch (error) {
            throw error
        }
    },

    deleteActor: async function(id) {
        try {
            return await HTTP.getInstance().delete(`http://${API_PATH}/actors/deleteActor/${encodeURIComponent(id)}`)
        } catch (error) {
            throw error
        }
    }
};

export default ActorsService