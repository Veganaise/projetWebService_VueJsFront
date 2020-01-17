import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { movies } from './movies.module'
import { actors } from './actors.module'
import { users } from './users.module'
import { categories } from './categories.module'
import { directors } from './directors.module'
import { characters } from './characters.module'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        movies,
        actors,
        users,
        categories,
        directors,
        characters
    },
})

export default store