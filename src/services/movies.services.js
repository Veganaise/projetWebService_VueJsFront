import {API_PATH} from "../config/config";
import {authenticate, HTTP} from './http-commons'
import Qs from 'qs' //outil de parse et stringify de JSON


// demande les films a l'api
// nécessite que l'on se soit authentifié
export const getMovies = async () => {
    // eslint-disable-next-line no-console
    console.log("before authentication");
    var r= await authenticate();
    // eslint-disable-next-line no-console
    console.log("after authentication  "+r);
    var result = await resolveAfter5Seconds();
    // eslint-disable-next-line no-console
    console.log("after 5seconds  "+result);
    return HTTP.getInstance()
        .get(`http://${API_PATH}/movies/getMovies`)
        // .then(response => response.json())
        .then(response => Qs.parse(response.data))
};

function resolveAfter5Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}