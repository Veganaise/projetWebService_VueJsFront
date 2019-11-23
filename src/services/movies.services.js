import {API_PATH} from "../config/config";
import {authenticate, HTTP} from './http-commons'

// demande les films a l'api
// nécessite que l'on se soit authentifié
export const getMovies = async () => {
    // eslint-disable-next-line no-console
    console.log("before authentication");
    authenticate()
    var result = await resolveAfter5Seconds();
    // eslint-disable-next-line no-console
    console.log("after authentication  "+result);
    return HTTP
        .get(`http://${API_PATH}/movies/getMovies`)
        .then(response => response.json())
};

function resolveAfter5Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 5000);
    });
}