import axios from 'axios';
import Qs from 'qs'

export const HTTP = axios.create({
    baseURL: `http://localhost:8080/`,
    headers: {
        //Authorization: 'Bearer {token}'
    },
    paramsSerializer: function (params) {
        // eslint-disable-next-line no-console
        console.log("yooooooooooooooo"+Qs.stringify(params))
        return Qs.stringify(params)
    }
});