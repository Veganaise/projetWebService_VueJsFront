import CategoriesService from "../services/categories.service";
import router from "../router";

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

    async createCategory({commit}, {codeCat, libelleCat, image}) {
        try {
            await CategoriesService.createCategory(codeCat, libelleCat, image)
            commit('createCategorySuccess')
            return await router.go(0)
        } catch (e) {
            commit('createCategoryFailure', {error: e})
            return false
        }
    },

    async editCategory({commit}, {category, codeCat, libelleCat, image}) {
        try {
            await CategoriesService.editCategory(codeCat, libelleCat, image)
            commit('editCategorySuccess', category)
        } catch(e) {
            commit('editCategoryFailure', {error: e})
            return false
        }
    },

    async deleteCategory({commit}, codeCat) {
        try {
            await CategoriesService.deleteCategory(codeCat)
            commit('deleteCategorySuccess', codeCat)
            return await router.go(0)
        } catch (e) {
            if (e.message === 'Request failed with status code 500') {
                commit('deleteCategoryFailure', {error: "Vous ne pouvez pas supprimer cette catégorie car au moins un film en fait partie"})
                return false
            } else {
                commit('deleteCategoryFailure', {error: e.message})
                return false
            }
        }
    },
};

const mutations = {
    fetchCategoriesSuccess(state, categories){
        state.categories = { items: categories };
    },
    fetchCategoriesFailure(state, error) {
        state.categories = error
    },

    getACategorySuccess(state, category) {
        state.categories.categorySelected = {category}
    },
    getACategoryFailure(state, error) {
        state.categories.categorySelected = error
    },

    createCategorySuccess(state) {
        state.categories = { items: categories }
    },
    createCategoryFailure(state, error) {
        state.categories = error
    },

    editCategorySuccess(state, category) {
        Object.keys(state.categories.items).forEach(c => {
            if(c.codeCat === category.codeCat) {
                c = category
            }
        });
    },
    editCategoryFailure(state, error) {
        state.categories = error
    },

    deleteCategorySuccess(state, codeCat) {
        state.categories.items = Object.keys(state.categories.items).filter(category => category.codeCat !== codeCat)
    },
    deleteCategoryFailure(state, error) {
        state.categories = error
    },
};

export const categories = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}