import {API_PATH} from "../config/config";
import {HTTP} from './http-commons'
import { store } from '../main'
import Qs from 'qs' //outil de parse et stringify de JSON


// demande les films a l'api
// nécessite que l'on se soit authentifié
export const getMovies = async function() {
    // eslint-disable-next-line no-console
    console.log("before authentication: ", this);
    if(!store.getters.authenticated) {
        await store.dispatch('authenticate');
        var r = store.getters.authorizationHeader
    }
    //var r= await authenticate("dylan", "12345");
    // eslint-disable-next-line no-console
    console.log("after authentication  " + r);
    return HTTP.getInstance()
        .get(`http://${API_PATH}/movies/getMovies`)
        // .then(response => response.json())
        .then(response => Qs.parse(response.data))
};
