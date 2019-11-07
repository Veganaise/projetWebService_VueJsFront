import {API_PATH} from "../config/config";

export const getMovies = () => {
    return fetch(`http://${API_PATH}/movies/getMovies`)
        .then(response => response.json())
};
