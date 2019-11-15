import {API_PATH} from "../config/config";
import {HTTP} from './http-commons'

// demande les films a l'api
// nécessite que l'on se soit authentifié
export const getMovies = () => {
    return HTTP.get(`http://${API_PATH}/movies/getMovies`)
        .then(response => response.json())
};
