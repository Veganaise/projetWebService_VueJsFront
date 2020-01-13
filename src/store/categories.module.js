import CategoriesService from "../services/categories.service";

const state = { // état initial
    categories: {}
};

const getters = {
    fetchCategories: (state) => {
        return state.categories
    },
};

const actions = {
    async fetchCategories( {commit} ) {
        try {
            const categories = await CategoriesService.fetchCategories()
            commit('fetchCategoriesSuccess', categories)
        } catch (e) {
            commit('fetchCategoriesFailure', {error: e})
            return false
        }
    },

    async getACategory( {commit}, codeCat) {
        try {
            const category = await CategoriesService.getACategory(codeCat)
            commit('getACategorySuccess', category.data)
        } catch (e) {
            commit('getACategoryFailure', {error: e})
            return false
        }
    },

};

const mutations = {
    fetchCategoriesSuccess(state, categories){
        state.categories = { items: categories };
    },
    fetchCategoriesFailure(state, error) {
        state.categories = { error }
    },

    getACategorySuccess(state, category) {
        state.categories.categorySelected = {category}
    },
    getACategoryFailure(state, error) {
        state.categories.categorySelected = {error}
    },
};

export const categories = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}