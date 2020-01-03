import {API_PATH} from "../config/config";
import {HTTP} from './http-commons'
import {auth} from '../store/auth.module'
import {authenticate} from '../services/http-commons'
//import { store } from '../main'
import Qs from 'qs' //outil de parse et stringify de JSON

// demande les films a l'api
// nécessite que l'on se soit authentifié
const MoviesService = {
    fetchMovies: async function() {
        await authenticate(auth.state.user.login, auth.state.user.password)

        return await HTTP.getInstance()
            .get(`http://${API_PATH}/movies/getMovies`)
            .then(response => Qs.parse(response.data))
    }
};

/*export const fetchMovies = async function() {
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
};*/

export default MoviesService