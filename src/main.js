import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import {getters,state,actions,mutations} from "./movieStore";

Vue.config.productionTip = false; // <- utile? créé automatiquement par webstorm
Vue.use(Vuex);

new Vue({
  store:new Vuex.Store({state,getters,actions,mutations}), //instancie store
  render: h => h(App),
}).$mount('#app')
