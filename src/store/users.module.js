import UserService from '../services/user.service'
import router from '../router'

const state = {
    all: [],
    userSelected: [],
};

const getters = {
    getAllUsers: (state) => {
        return state.all
    }
};

const actions = {
    async getAllUsers({commit}) {
        try {
            const users = await UserService.getAllUsers()
            commit('getAllUsersSuccess', users)
        } catch (e) {
            commit('getAllUsersFailure', {error: e})
            return false
        }
    },

    async deleteUser({commit}, username) {
        try {
            await UserService.deleteUser(username)
            commit('deleteUserSuccess', username)
            return await router.go(0)
        } catch (e) {
            commit('deleteUserFailure', {error: e})
            return false
        }
    },

    async getUser({commit}, username) {
        try {
            const user = await UserService.getUser(username)
            commit('getAnUserSuccess', user.data)
        } catch (e) {
            commit('getAnUserFailure', {error: e})
            return false
        }
    },

    async editUser({commit}, {user, username, password, role}) {
        try {
            await UserService.editUser(username, password, role)
            commit('editUserSuccess', user)
            return await router.go(0)
        } catch(e) {
            commit('editUserFailure', {error: e})
            return false
        }
    },

    async createUser({commit}, {username, password, role}) {
        try {
            await UserService.createUser(username, password, role)
            commit('createUserSuccess')
            return await router.go(0)
        } catch(e) {
            commit('createUserFailure', {error: e})
            return false
        }
    }
};

const mutations = {
    getAllUsersSuccess(state, users) {
        state.all = {items: users}
    },
    getAllUsersFailure(state, error) {
        state.all = error
    },

    deleteUserSuccess(state, username) {
        state.all.items = Object.keys(state.all.items).filter(user => user.username !== username)
    },
    deleteUserFailure(state, error) {
        state.all = error
    },

    getAnUserSuccess(state, user) {
        state.userSelected = {user}
    },
    getAnUserFailure(state, error) {
        state.userSelected = error
    },

    editUserSuccess(state, user) {
        Object.keys(state.all.items).forEach(u => {
            if(u.username === user.username) {
                u = user
            }
        });
    },
    editUserFailure(state, error) {
        state.all = { error }
    },

    createUserSuccess(state) {
        state.all = { items: users }
    },
    createUserFailure(state, error) {
        state.all = error
    },

};

export const users = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}