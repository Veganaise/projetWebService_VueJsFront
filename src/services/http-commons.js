import axios from 'axios';
 import Qs from 'qs'

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



export const HTTP =axios.create({
    baseURL: `http://localhost:8080/authentication/authenticate`,
    //timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type" : "application/json;charset=UTF-8",

        //Authorization: 'Bearer {token}'
    }
});


var session_url = 'http://localhost:8080';
var uname = "dylan";
var pass = "12345";
let AUTH_TOKEN;

// eslint-disable-next-line no-console
console.log("envoi auth post :"+uname+" "+pass);
// eslint-disable-next-line no-console
console.log(Qs.parse({
    "\"username\"": uname,
    "\"password\"": pass
}));

export const authenticate=() => axios.post(session_url, Qs.parse({
    "\"username\"": uname,
    "\"password\"": pass
})).then(function(response) {
    // eslint-disable-next-line no-console
    console.log('Authenticated: '+response.headers);
    HTTP.AUTH_TOKEN=response.headers.common['Authorization'].token;
    HTTP.headers={'Autorisation' : 'Bearer '+AUTH_TOKEN }
}).catch(function(error) {
    // eslint-disable-next-line no-console
    console.log('Error on Authentication'+error);
});


