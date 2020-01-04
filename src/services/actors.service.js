import {API_PATH} from "../config/config";
import {HTTP} from './http-commons'
import Qs from 'qs'

const ActorsService = {
    fetchActors: async function() {
        return await HTTP.getInstance()
            .get(`http://${API_PATH}/actors/getActors`)
            .then(response => Qs.parse(response.data))
    },

    getActorCharacters: async function(actor) {
        const id = actor.noAct
        return await HTTP.getInstance()
            .get(`http://${API_PATH}/characters/getCharacters/actor/${encodeURIComponent(id.toString())}`)
            .then(response => Qs.parse(response.data))
    }
};

export default ActorsService