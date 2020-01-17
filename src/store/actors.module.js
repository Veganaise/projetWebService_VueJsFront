import ActorsService from '../services/actors.service'
import router from "../router";

const state = {
    actors: {},
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

    async createActor({commit}, {nomAct, prenAct, dateNaiss, dateDeces}) {
        try {
            await ActorsService.createActor(nomAct, prenAct, dateNaiss, dateDeces)
            commit('createActorSuccess')
            return await router.go(0)
        } catch (e) {
            commit('createActorFailure', {error: e})
            return false
        }
    },

    async getAnActor({commit}, noAct) {
        try {
            const actor = await ActorsService.getAnActor(noAct)
            commit('getAnActorSuccess', actor)
        } catch(e) {
            commit('getAnActorFailure', {error: e})
            return false
        }
    },

    async editActor({commit}, {actor, noAct, nomAct, prenAct, dateNaiss, dateDeces}) {
        try {
            await ActorsService.editActor(noAct, nomAct, prenAct, dateNaiss, dateDeces)
            commit('editActorSuccess', actor)
            return await router.go(0)
        } catch(e) {
            commit('editActorFailure', {error: e})
            return false
        }
    },

    async deleteActor({commit}, noAct) {
        try {
            await ActorsService.deleteActor(noAct)
            commit('deleteActorSuccess', noAct)
            return await router.go(0)
        } catch (e) {
            commit('deleteActorFailure', {error: e})
            return false
        }
    },

    /*async getActorCharacters( {commit}, actor) {
        try {
            const actorCharacters = await ActorsService.getActorCharacters(actor)
            // eslint-disable-next-line no-console
            console.log(actorCharacters)
            commit('getActorCharactersSuccess', actorCharacters)
        } catch(e) {
            commit('getActorCharactersFailure', {error: e})
            return false
        }
    }*/

};

const mutations = {
    fetchActorsSuccess(state, actors) {
        state.actors = { items: actors};
    },
    fetchActorsFailure(state, error) {
        state.actors = { error }
    },

    createActorSuccess(state) {
        state.actors = {items: actors}
    },
    createActorFailure(state, {error}) {
        state.actors = {error}
    },

    getAnActorSuccess(state, actor) {
        state.actors.actorSelected = {actor}
    },
    getAnActorFailure(state, error) {
        state.actors.actorSelected = {error}
    },

    editActorSuccess(state, actor) {
        Object.keys(state.actors.items).forEach(a => {
            if(a.noAct === actor.noAct) {
                a = actor
            }
        });
    },
    editActorFailure(state, error) {
        state.actors = {error}
    },

    deleteActorSuccess(state, noAct) {
        state.actors.items = Object.keys(state.actors.items).filter(actor => actor.noAct !== noAct)
    },
    deleteActorFailure(state, error) {
        state.actors = {error}
    },

    /*getActorCharactersSuccess(state, actorCharacters) {
        state.actors.items.actorCharacters = {items: actorCharacters}
    },
    getActorCharactersFailure(state, error) {
        state.actors.items.actorCharacters = { error }
    },*/
};

export const actors = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}