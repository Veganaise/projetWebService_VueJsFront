import TokenService from '../services/storage.service'
import AuthenticateService from "../services/http-commons";
// import router from '../router'
import UserService from "../services/user.service";

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    authenticationSuccess: false,
    currentUser: ''
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
    },

    currentUser: (state) => {
        return state.currentUser
    }
};

const actions = {
    async authenticate( {commit}, {username, password}) {
        commit('authenticateRequest');
        try {
            const response = await AuthenticateService.authenticate(username, password);
            commit('authenticateSuccess', response.data.token);
            TokenService.saveToken(response.data.token);
            // await router.push('/');
            return true;
        } catch (e) {
            if (e.message === 'Request failed with status code 401') {
                commit('authenticateFailure', {errorCode: e.errorCode, errorMessage: "Username ou password incorrects"});
                return false;
            } else {
                commit('authenticateFailure', {errorCode: e.errorCode, errorMessage: e.message});
                return false;
            }
        }
    },

    async getUserConnected({commit}) {
        try {
            const userConnected = await UserService.getUserConnected();
            commit('getUserConnectedSuccess', userConnected.data);
        } catch (e) {
            commit('getUserConnectedFailure', {error: e});
            return false;
        }
    },

    logout({commit}) {
        AuthenticateService.logout();
        commit('logoutSuccess');
    }
};

const mutations = {
    authenticateRequest(state) {
        state.authenticating = true;
        state.authenticationError = '';
        state.authenticationErrorCode = 0;
    },
    authenticateSuccess(state, accessToken) {
        state.accessToken = accessToken;
        state.authenticating = false;
        state.authenticationSuccess = true;
    },
    authenticateFailure(state, {errorCode, errorMessage}) {
        state.authenticating = false;
        state.authenticationErrorCode = errorCode;
        state.authenticationError = errorMessage;
        state.authenticationSuccess = false;
    },
    logoutSuccess(state) {
        state.accessToken = '';
    },

    getUserConnectedSuccess(state, user) {
        state.currentUser = user;
    },
    getUserConnectedFailure(state, error) {
        state.currentUser = error;
    },
};

export const auth = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
