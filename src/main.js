import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import App from './App.vue'
import store from './store'
//import {actions, getters, mutations, state} from "./store/movies.module.js";

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//import axios from 'axios';

Vue.config.productionTip = false; // <- utile? créé automatiquement par webstorm
Vue.use(Vuex);
Vue.use(BootstrapVue);

//export const store = new Vuex.Store(auth);

new Vue({
  store, //instancie store
  router,
  /*HTTP: axios.create({
    baseURL: `http://localhost:8080/authentication/authenticate`,
    timeout: 1000,
    headers: {
      //Authorization: 'Bearer {token}'
    }
  }),*/
  render: h => h(App),
}).$mount('#app');
