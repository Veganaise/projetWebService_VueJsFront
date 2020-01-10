import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { movies } from './movies.module'
import { actors } from './actors.module'
import { users } from './users.module'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        movies,
        actors,
        users
    },
})

export default store