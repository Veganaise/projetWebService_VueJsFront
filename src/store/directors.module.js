import DirectorsService from "../services/directors.service";
import router from "../router";

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

    async createDirector({commit}, {nomRea, prenRea}) {
        try {
            await DirectorsService.createDirector(nomRea, prenRea)
            commit('createDirectorSuccess')
            return await router.go(0)
        } catch (e) {
            commit('createDirectorFailure', {error: e})
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

    async editDirector({commit}, {director, noRea, nomRea, prenRea}) {
        try {
            await DirectorsService.editDirector(noRea, nomRea, prenRea)
            commit('editDirectorSuccess', director)
            return await router.go(0)
        } catch (e) {
            commit('editDirectorFailure', {error: e})
            return false
        }
    },

    async deleteDirector({commit}, noRea) {
        try {
            await DirectorsService.deleteDirector(noRea)
            commit('deleteDirectorSuccess', noRea)
            return await router.go(0)
        } catch(e) {
            if (e.message === 'Request failed with status code 500') {
                commit('deleteDirectorFailure', {error: "Vous ne pouvez pas supprimer ce réalisateur car il a réalisé au moins un film"})
                return false
            } else {
                commit('deleteDirectorFailure', {error: e.message})
                return false
            }
        }
    }

};

const mutations = {
    fetchDirectorsSuccess(state, directors){
        state.directors = { items: directors };
    },
    fetchDirectorsFailure(state, error) {
        state.directors = error
    },

    createDirectorSuccess(state) {
        state.directors = {items: directors}
    },
    createDirectorFailure(state, error) {
        state.directors = error
    },

    getADirectorSuccess(state, director) {
        state.directors.directorSelected = {director}
    },
    getADirectorFailure(state, error) {
        state.directors.directorSelected = error
    },

    editDirectorSuccess(state, director) {
        Object.keys(state.directors.items).forEach(d => {
            if(d.noRea === director.noRea) {
                d = director
            }
        });
    },
    editDirectorFailure(state, error) {
        state.directors = error
    },

    deleteDirectorSuccess(state, noRea) {
        state.directors.items = Object.keys(state.directors.items).filter(director => director.noRea !== noRea)
    },
    deleteDirectorFailure(state, error) {
        state.directors = error
    },
};

export const directors = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}