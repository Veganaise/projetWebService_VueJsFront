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

    getAnActor: async function(noAct) {
        return await HTTP.getInstance()
            .get(`http://${API_PATH}/actors/getActor/${encodeURIComponent(noAct)}`)
            .then(response => Qs.parse(response.data))
    },

    createActor: async function(nomAct, prenAct, dateNaiss, dateDeces) {
        try {
            return await HTTP.getInstance().post(`http://${API_PATH}/actors/insertActor`, {nomAct, prenAct, dateNaiss, dateDeces})
        } catch (error) {
            throw error
        }
    },

    editActor: async function(noAct, nomAct, prenAct, dateNaiss, dateDeces) {
        try {
            return await HTTP.getInstance().put(`http://${API_PATH}/actors/updateActor`, {noAct, nomAct, prenAct, dateNaiss, dateDeces})
        } catch (error) {
            throw error
        }
    },

    deleteActor: async function(noAct) {
        try {
            return await HTTP.getInstance().delete(`http://${API_PATH}/actors/deleteActor/${encodeURIComponent(noAct)}`)
        } catch (error) {
            throw error
        }
    }
};

export default ActorsService