import DirectorsService from "../services/directors.service";

const state = { // état initial
    directors: {},
};

const getters = {
    fetchDirectors: (state) => {
        return state.directors
    },
};

const actions = {
    async fetchDirectors( {commit} ) {
        try {
            const directors = await DirectorsService.fetchDirectors()
            commit('fetchDirectorsSuccess', directors)
        } catch (e) {
            commit('fetchDirectorsFailure', {error: e})
            return false
        }
    },

    async getADirector( {commit}, noRea) {
        try {
            const director = await DirectorsService.getADirector(noRea)
            commit('getADirectorSuccess', director.data)
        } catch (e) {
            commit('getADirectorFailure', {error: e})
            return false
        }
    },

};

const mutations = {
    fetchDirectorsSuccess(state, directors){
        state.directors = { items: directors };
    },
    fetchDirectorsFailure(state, error) {
        state.directors = { error }
    },

    getADirectorSuccess(state, director) {
        state.directors.directorSelected = {director}
    },
    getADirectorFailure(state, error) {
        state.directors.directorSelected = {error}
    },
};

export const directors = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}