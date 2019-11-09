import {API_PATH} from "../config/config";
import {HTTP} from './http-commons'

export const getMovies = () => {
    return HTTP.get(`http://${API_PATH}/movies/getMovies`)
        .then(response => response.json())
};
