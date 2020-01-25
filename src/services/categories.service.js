import {HTTP} from "./http-commons";
import {API_PATH} from "../config/config";
import Qs from "qs";

const CategoriesService = {
    fetchCategories: async function() {
        try {
            return await HTTP.getInstance()
                .get(`${API_PATH}/categories/getCategories`)
                .then(response => Qs.parse(response.data))
        } catch (error) {
            throw error
        }
    },

    getACategory: async function(code) {
        try {
            return await HTTP.getInstance().get(`${API_PATH}/categories/getCategory/${encodeURIComponent(code)}`)
        } catch (error) {
            throw error
        }
    },

    createCategory: async function(codeCat, libelleCat, image) {
        try {
            return await HTTP.getInstance().post(`${API_PATH}/categories/insertCategory`, {codeCat, libelleCat, image})
        } catch (error) {
            throw error
        }
    },

    editCategory: async function(codeCat, libelleCat, image) {
        try {
            return await HTTP.getInstance().put(`${API_PATH}/categories/updateCategory`, {codeCat, libelleCat, image})
        } catch (error) {
            throw error
        }
    },

    deleteCategory: async function(code) {
        try {
            return await HTTP.getInstance().delete(`${API_PATH}/categories/deleteCategory/${encodeURIComponent(code)}`)
        } catch (error) {
            throw error
        }
    }
}

export default CategoriesService
