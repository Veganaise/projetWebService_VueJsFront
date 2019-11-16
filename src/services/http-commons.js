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

        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkeWxhbiIsInNjb3BlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE1NzM4OTgyMTUsImV4cCI6MTU3MzkxNjIxNX0.0Qmj-in9PFmEyiTigLI-hK5swWwbNkg6gfj9lkjFYJY'
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


var session_url = `http://${API_PATH}/authentication/authenticate`;
var uname = "dylan";
var pass = "12345";

// on console log le data qu'on envoit (du moins j'espère)
// eslint-disable-next-line no-console
console.log(Qs.parse({
    "\"username\"": uname,
    "\"password\"": pass
}));

// fonction d'authentification
// appelée à la création de App.vue
export const authenticate=() => axios.post(session_url, Qs.parse({
    "\"username\"": uname,
    "\"password\"": pass
})).then(function(response) {
    // eslint-disable-next-line no-console
    console.log('Authenticated: '+response.headers);

    // on ajoute le webtoken aux headers de l'instance d'axios
    HTTP.AUTH_TOKEN=response.headers.common['Authorization'].token;
    HTTP.headers={'Autorisation' : 'Bearer '+ HTTP.AUTH_TOKEN };
}).catch(error =>
    // eslint-disable-next-line no-console
    console.log('Error on Authentication: '+error+"\n axios config was : "+Qs.stringify(error.config))
);



