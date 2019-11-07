import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import {getters,state,actions,mutations} from "./movieStore";

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './custom.scss'

Vue.config.productionTip = false; // <- utile? créé automatiquement par webstorm
Vue.use(Vuex);
Vue.use(BootstrapVue)


new Vue({
  store:new Vuex.Store({state,getters,actions,mutations}), //instancie store
  render: h => h(App),
}).$mount('#app')
