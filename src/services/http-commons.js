import axios from 'axios'; //outil d'envoi de requètes
 import Qs from 'qs' //outil de parse et stringify de JSON
import {API_PATH} from "../config/config";

// instanciation d'axios sous le nom HTTP
export const HTTP =axios.create({
    baseURL: `http://${API_PATH}`,
    //timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin" : "*", // pas sur que ce soit utile

        //pour dire au serveur que le data est du json
        "Content-Type" : "application/json",

        Authorization: 'Bearer '
    },
    //withCredentials: true
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // affiche la config d'axios pour la requçete interceptée
    // eslint-disable-next-line no-console
    console.log("intercept: "+Qs.stringify(config));
    // eslint-disable-next-line no-console
    console.log(config.data);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


var session_url = `authentication/authenticate`;
var uname = "dylan";
var pass = "12345";

export var authentication_is_ok = false;

// fonction d'authentification
// appelée à la création de App.vue
export const authenticate= () =>{
    // we only do the post request if the authentication haven't happened yet
    if(authentication_is_ok) return  Promise.resolve();
    HTTP.post(session_url, Qs.parse({
        "username": uname,
        "password": pass
    }))
        .then(function(response) {
            // on ajoute le webtoken aux headers de l'instance d'axios
            HTTP.AUTH_TOKEN=response.data.token;
            HTTP.headers={'Autorisation' : 'Bearer '+ HTTP.AUTH_TOKEN };
            authentication_is_ok=true;

            // eslint-disable-next-line no-console
            console.log('Authenticated: '+HTTP.AUTH_TOKEN);

            return  Promise.resolve();

        }).catch(error =>{
            // eslint-disable-next-line no-console
            console.log('Error on Authentication: '+error+"\n axios config was : "+Qs.stringify(error.config));
            return  Promise.reject();
        }
    );

};




