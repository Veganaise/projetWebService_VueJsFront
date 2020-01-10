import axios from 'axios'; //outil d'envoi de requètes
import Qs from 'qs' //outil de parse et stringify de JSON
import {API_PATH} from "../config/config";
import TokenService from "./storage.service";
//import store from '../movieStore';

// instanciation d'axios
const axiosCreate = axios.create({
    baseURL: `http://${API_PATH}`,
    //timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, HEAD",
        "Access-Control-Allow-Headers" : "*",
        //pour dire au serveur que le data est du json
        "Content-Type" : "application/json",
        Authorization: TokenService.getToken()
    },
    //withCredentials: true
});

// Singleton pattern
export var HTTP = (function () {
    let axios_instance;
    return {
       getInstance: function () {
           if(!axios_instance){
               axios_instance = axiosCreate;
           }
           // Pour voir ce qu'il se passe à chaque requête
           //axios_instance.interceptors.request.use(interceptorValid, interceptorError);
           return axios_instance;
       }
   }
})();

// // Add a request interceptor
// function interceptorValid(config) {
//     // affiche la config d'axios pour la requçete interceptée
// // eslint-disable-next-line no-console
// console.log("intercept: "+config);
// for(let key in config) {
//     // eslint-disable-next-line no-console
//     console.log(key, "|", config[key]);
// }
// // eslint-disable-next-line no-console
// console.log(config.data);
//
// return config;
// }
// function interceptorError(error) {
//     // Do something with request error
//     return Promise.reject(error);
// }

/*const AUTH_BASE_ROUTE = "authentication";

export const authenticate = function(username, password) {
    return new Promise((resolve, reject) => {
        const instance = HTTP.getInstance();
        instance.post(`${AUTH_BASE_ROUTE}/authenticate`, Qs.parse({
            "username": username,
            "password": password
        })).then((response) => {
            instance.AUTH_TOKEN = response.data.token;
            instance.defaults.headers['Authorization'] = `Bearer ${instance.AUTH_TOKEN}`;
            resolve(instance.AUTH_TOKEN);
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.log(`Error on authentication: ${error}\nAxios config was: ${Qs.stringify(error.config)}`);
            reject(error);
        })
    })
};*/

const AuthenticateService = {
    authenticate: async function(username, password) {
        const instance = HTTP.getInstance();
        try {
            return await instance.post('authentication/authenticate', Qs.parse({
                "username": username,
                "password": password
            }))
        } catch(error) {
            throw new error
        }
    },

    logout() {
        TokenService.removeToken()
    }
};

export default AuthenticateService