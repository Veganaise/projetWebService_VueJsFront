import {HTTP} from "./http-commons";
import {API_PATH} from "../config/config";
import Qs from "qs";

const UserService = {
    getAllUsers: async function() {
        try {
            return await HTTP.getInstance()
                .get(`http://${API_PATH}/users/getUsers`)
                .then(response => Qs.parse(response.data))
        } catch (error) {
            throw error
        }
    },

    deleteUser: async function(username) {
        try {
            return await HTTP.getInstance().delete(`http://${API_PATH}/users/deleteUser/${encodeURIComponent(username)}`)
        } catch (error) {
            throw error
        }
    },

    getUser: async function(username) {
        try {
            return await HTTP.getInstance().get(`http://${API_PATH}/users/getUser/${encodeURIComponent(username)}`)
        } catch (error) {
            throw error
        }
    },

    getUserConnected: async function() {
        try {
            return await HTTP.getInstance().get(`http://${API_PATH}/users/getUser/me`)
        } catch (error) {
            throw error
        }
    },

    editUser: async function(username, password, role) {
        try {
            return await HTTP.getInstance().put(`http://${API_PATH}/users/updateUser`, {username, password, role})
        } catch (error) {
            throw error
        }
    },

    createUser: async function(username, password, role) {
        try {
            return await HTTP.getInstance().post(`http://${API_PATH}/users/insertUser`, {username, password, role})
        } catch (error) {
            throw error
        }
    }
}

export default UserService