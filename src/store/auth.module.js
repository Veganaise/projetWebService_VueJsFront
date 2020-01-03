import {authenticate} from "@/services/http-commons";

const state = {
    user: {
        login: "dylan",
        password: "12345"
    },
    token: undefined
};

const getters = {
    authorizationHeader(state) {
        return state.token; // Get
    },
    authenticated(state) {
        return !!state.token; // Check whether there is a stored token or not
    }
};

const actions = {
    authenticate( {state, commit} ) {
        return authenticate(state.user.login, state.user.password)
            .then( (token) => commit('authenticate', token));
    }
};

const mutations = {
    authenticate(state, payload){
        state.token = payload;
    }
};

export const auth = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}