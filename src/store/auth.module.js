import TokenService from '../services/storage.service'
import AuthenticateService from "../services/http-commons";
import router from '../router'

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    authenticationSuccess: false,
};

const getters = {
    loggedIn: (state) => {
        return state.accessToken != null
    },

    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    authenticationSuccess: (state) => {
        return state.authenticationSuccess
    },

    authenticating: (state) => {
        return state.authenticating
    }
};

const actions = {
    async authenticate( {commit}, {username, password}) {
        commit('authenticateRequest')
        try {
            const response = await AuthenticateService.authenticate(username, password)
            commit('authenticateSuccess', response.data.token)
            TokenService.saveToken(response.data.token)
            await router.push('/')
        } catch (e) {
            commit('authenticateFailure', {errorCode : e.errorCode, errorMessage: e.message})
            return false
        }
    },

    logout({commit}) {
        AuthenticateService.logout()
        commit('logoutSuccess')
        router.push('/')
    }
};

const mutations = {
    authenticateRequest(state) {
        state.authenticating = true
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },
    authenticateSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticating = false
        state.authenticationSuccess = true
    },
    authenticateFailure(state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
        state.authenticationSuccess = false
    },
    logoutSuccess(state) {
        state.accessToken = ''
    },
};

export const auth = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}