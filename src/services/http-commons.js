import axios from 'axios';
import Qs from 'qs'

export const HTTP = axios.create({
    baseURL: `http://localhost:8080/`,
    headers: {
        //Authorization: 'Bearer {token}'
    }
});