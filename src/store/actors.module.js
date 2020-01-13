import ActorsService from '../services/actors.service'

const state = {
    all: {},
};

const getters = {
    fetchActors: (state) => {
        return state.actors
    },
};

const actions = {
    async fetchActors( {commit} ) {
        try {
            const actors = await ActorsService.fetchActors()
            commit('fetchActorsSuccess', actors)
        } catch(e) {
            commit('fetchActorsFailure', {error: e})
            return false
        }
    },

    async getActorCharacters( {commit}, actor) {
        try {
            const actorCharacters = await ActorsService.getActorCharacters(actor)
            // eslint-disable-next-line no-console
            console.log(actorCharacters)
            commit('getActorCharactersSuccess', actorCharacters)
        } catch(e) {
            commit('getActorCharactersFailure', {error: e})
            return false
        }
    }

};

const mutations = {
    fetchActorsSuccess(state, actors) {
        state.all = { items: actors};
    },
    fetchActorsFailure(state, error) {
        state.all = { error }
    },

    getActorCharactersSuccess(state, actorCharacters) {
        state.all.items.actorCharacters = {items: actorCharacters}
    },
    getActorCharactersFailure(state, error) {
        state.all.items.actorCharacters = { error }
    },
};

export const actors = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}