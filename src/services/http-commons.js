import axios from 'axios'; //outil d'envoi de requètes
 import Qs from 'qs' //outil de parse et stringify de JSON
import {API_PATH} from "../config/config";

// instanciation d'axios
const axiosCreate =axios.create({
    baseURL: `http://${API_PATH}`,
    //timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin" : "*", // pas sur que ce soit utile

        //pour dire au serveur que le data est du json
        "Content-Type" : "application/json",

        Authorization: ' '
    },
    //withCredentials: true
});

// Singleton pattern
export var HTTP = (function () {
    let axios_instance;
    return {
       getInstance: function () {
           if(!axios_instance){
               axios_instance=axiosCreate;
           }
           return axios_instance;
       }
   }
})();

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
    HTTP.getInstance().post(session_url, Qs.parse({
        "username": uname,
        "password": pass
    }))
        .then(function(response) {
            // on ajoute le webtoken aux headers de l'instance d'axios
            const axiosInst = HTTP.getInstance();
            axiosInst.AUTH_TOKEN=response.data.token;
            //axiosInst.headers={'authorization' : 'Bearer '+ axiosInst.AUTH_TOKEN };
            axiosInst.defaults.headers.common['authorization'] = ('Bearer '+ axiosInst.AUTH_TOKEN).trim();
            authentication_is_ok=true;

            // eslint-disable-next-line no-console
            console.log('Authenticated: '+ axiosInst.defaults.headers.common['authorization']);

            return  Promise.resolve();

        }).catch(error =>{
            // eslint-disable-next-line no-console
            console.log('Error on Authentication: '+error+"\n axios config was : "+Qs.stringify(error.config));
            return  Promise.reject();
        }
    );

};




