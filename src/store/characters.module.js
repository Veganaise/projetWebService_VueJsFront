import CharactersService from "../services/characters.service";

const state = {
    characters: {},
};

const getters = {
    fetchCharacters: (state) => {
        return state.characters
    },
};

const actions = {
    async fetchCharacters( {commit} ) {
        try {
            const characters = await CharactersService.fetchCharacters()
            commit('fetchCharactersSuccess', characters)
        } catch (e) {
            commit('fetchCharactersFailure', {error: e})
            return false
        }
    },

    async getMovieCharacters( {commit}, noFilm) {
        try {
            const character = await CharactersService.getMovieCharacters(noFilm)
            commit('getMovieCharactersSuccess', character.data)
        } catch (e) {
            commit('getMovieCharactersFailure', {error: e})
            return false
        }
    },

    async getActorCharacters( {commit}, noAct) {
        try {
            const character = await CharactersService.getActorCharacters(noAct)
            commit('getActorCharactersSuccess', character)
        } catch (e) {
            commit('getActorCharactersFailure', {error: e})
            return false
        }
    }
};

const mutations = {
    fetchCharactersSuccess(state, characters) {
        state.characters = { items: characters };
    },
    fetchCharactersFailure(state, error) {
        state.characters = error
    },

    getMovieCharactersSuccess(state, character) {
        state.characters.charactersSelected = {character}
    },
    getMovieCharactersFailure(state, error) {
        state.characters.charactersSelected = error
    },

    getActorCharactersSuccess(state, character) {
        state.characters.charactersSelected = {character}
    },
    getActorCharactersFailure(state, error) {
        state.characters.charactersSelected = error
    },
};

export const characters = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}