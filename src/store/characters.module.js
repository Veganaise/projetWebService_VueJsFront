import CharactersService from "../services/characters.service";
import router from "../router";

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

    async createCharacter({commit}, {noFilm, noAct, nomPers}) {
        try {
            await CharactersService.createCharacter(noFilm, noAct, nomPers)
            commit('createCharacterSuccess')
            return await router.go(0)
        } catch (e) {
            commit('createCharacterFailure', {error: e})
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
    },

    async getACharacter({commit}, {noFilm, noAct}) {
        try {
            const character = await CharactersService.getACharacter(noFilm, noAct)
            commit('getACharacterSuccess', character)
        } catch(e) {
            commit('getACharacterFailure', {error: e})
            return false
        }
    },

    async editCharacter({commit}, {character, noFilm, noAct, nomPers}) {
        try {
            await CharactersService.editCharacter(noFilm, noAct, nomPers)
            commit('editCharacterSuccess', character)
            return await router.go(0)
        } catch(e) {
            commit('editCharacterFailure', {error: e})
            return false
        }
    },

    async deleteCharacter({commit}, {noFilm, noAct}) {
        try {
            await CharactersService.deleteCharacter(noFilm, noAct)
            commit('deleteCharacterSuccess', noFilm, noAct)
            return await router.go(0)
        } catch (e) {
            if (e.message === 'Request failed with status code 500') {
                commit('deleteCharacterFailure', {error: "Vous ne pouvez pas supprimer ce personnage car il fait partie d'au moins un film"})
                return false
            } else {
                commit('deleteCharacterFailure', {error: e.message})
                return false
            }
        }
    },
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

    createCharacterSuccess(state) {
        state.characters = {items: characters}
    },
    createCharacterFailure(state, error) {
        state.characters = error
    },

    getACharacterSuccess(state, character) {
        state.characters.charactersSelected = {character}
    },
    getACharacterFailure(state, error) {
        state.characters.charactersSelected = error
    },

    editCharacterSuccess(state, character) {
        Object.keys(state.characters.items).forEach(c => {
            if(c.noFilm === character.noFilm && c.noAct === character.noAct) {
                c = character
            }
        });
    },
    editCharacterFailure(state, error) {
        state.characters = error
    },

    deleteCharacterSuccess(state, noFilm, noAct) {
        state.characters.items = Object.keys(state.characters.items).filter(character => character.noFilm !== noFilm && character.noAct !== noAct)
    },
    deleteCharacterFailure(state, error) {
        state.characters = error
    },
};

export const characters = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}