import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { movies } from './movies.module'
import { actors } from './actors.module'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        movies,
        actors
    },
})

export default store