<template>
    <div>
        <h2 class="mt-3 text-center"><strong>Liste des utilisateurs</strong></h2>
        <div style="overflow-x:auto;">
            <table class="text-center m-auto table-bordered bg-dark text-white" style="border:1px solid #BB0B0B;">
                <thead>
                    <tr>
                        <th class="pt-3 pb-3 pr-2 pl-2">Username</th>
                        <th class="pt-3 pb-3 pr-2 pl-2">Password</th>
                        <th class="pt-3 pb-3 pr-2 pl-2">Role</th>
                        <th class="pt-3 pb-3 pr-2 pl-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="user in users">
                        <tr v-for="(element, index) in user" :key="index">
                            <td class="pt-3 pb-3 pr-2 pl-2">{{ element.username }}</td>
                            <td class="pt-3 pb-3 pr-2 pl-2" v-if="editing && element.username === userToEdit"><b-form-input type="password" name="editPassword" v-model="editPassword" :placeholder="element.password"/></td>
                            <td class="pt-3 pb-3 pr-2 pl-2" v-else>{{ element.password}}</td>
                            <td class="pt-3 pb-3 pr-2 pl-2" v-if="editing && element.username === userToEdit">
                                <b-form-select name="editRole" v-model="editRole" :placeholder="element.role">
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </b-form-select>
                            </td>
                            <td class="pt-3 pb-3 pr-2 pl-2" v-else>{{ element.role}}</td>
                            <td class="pt-3 pb-3 pr-2 pl-2">
                                <img v-if="!editing" src="../../assets/icon/pencil-edit-button.png" @click="getAnUser(element.username)">
                                <img v-if="!editing" src="../../assets/icon/rubbish-bin.png" @click="deleteAnUser(element.username)">
                                <img v-if="editing" src="../../assets/icon/confirm.png" @click="editAnUser(element)">
                                <img v-if="editing" src="../../assets/icon/remove.png" @click="cancel()">
                            </td>
                        </tr>
                    </template>
                    <tr v-if="!editing && !creating">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="pt-3 pb-3 pr-2 pl-2"><img src="../../assets/icon/plus.png" @click="startToCreateAnUser()"></td>
                    </tr>
                    <tr v-if="!editing && creating">
                        <td class="pt-3 pb-3 pr-2 pl-2"><b-form-input type="text" name="username" v-model="username" placeholder="Username"/></td>
                        <td class="pt-3 pb-3 pr-2 pl-2"><b-form-input type="password" name="password" v-model="password" placeholder="Password"/></td>
                        <td class="pt-3 pb-3 pr-2 pl-2">
                            <b-form-select name="role" v-model="role" placeholder="Role">
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </b-form-select>
                        </td>
                        <td class="pt-3 pb-3 pr-2 pl-2"><img src="../../assets/icon/confirm.png" @click="createAnUser(username, password, role)"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br />
        <span v-if="users.error !== ''">{{users.error}}</span>
        </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: "Administration",
        created() {
            this.getAllUsers()
        },
        data() {
            return {
                editing: false,
                editPassword: '',
                editRole: '',
                userToEdit: '',

                creating: false,
                username: '',
                password: '',
                role: ''
            }
        },
        computed: {
            ...mapGetters('auth', ['loggedIn']),
            ...mapState({users: state => state.users.all})
        },
        methods: {
            ...mapActions('users', {getAllUsers: 'getAllUsers'}),
            ...mapActions('users', ['deleteUser', 'getUser', 'editUser', 'createUser']),

            deleteAnUser(username) {
                if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
                    return this.deleteUser(username)
                } else {
                    return false
                }
            },

            getAnUser(username) {
                this.editing = true
                this.userToEdit = username
                return this.getUser(username)
            },

            editAnUser(user) {
                this.editing = false

                if(this.editPassword === '') { this.editPassword = user.password }
                if(this.editRole === '') { this.editRole = user.role }

                return this.editUser({user: user, username: user.username, password: this.editPassword, role: this.editRole})
            },

            cancel() {
                this.editing = false
            },

            startToCreateAnUser() {
                this.creating = true
            },

            createAnUser() {
                this.creating = false
                if(this.username !== '' && this.password !== '' && this.role !== '') {
                    return this.createUser({username: this.username, password: this.password, role: this.role})
                }
            }
        }
    }
</script>

<style scoped>
    table.table-bordered{
        border: 2px solid #BB0B0B;
        margin-top: 20px;
    }
    table.table-bordered > thead > tr > th{
        border: 2px solid #BB0B0B;
    }
    table.table-bordered > tbody > tr > td{
        border: 2px solid #BB0B0B;
    }

    th:hover {
        color: #fff;
    }

    td:hover {
        color: #BB0B0B;
    }
</style>