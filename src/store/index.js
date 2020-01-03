import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { movies } from './movies.module'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        movies
    },
})

export default store