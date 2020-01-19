<template>
    <div>
        <h2>Liste des utilisateurs</h2>
        <div style="overflow-x:auto;">
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <template v-for="user in users">
                        <tr v-for="(element, index) in user" :key="index">
                            <td>{{ element.username }}</td>
                            <td v-if="editing && element.username === userToEdit"><b-form-input type="password" name="editPassword" v-model="editPassword" :placeholder="element.password"/></td>
                            <td v-else>{{ element.password}}</td>
                            <td v-if="editing && element.username === userToEdit">
                                <b-form-select name="editRole" v-model="editRole" :placeholder="element.role">
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </b-form-select>
                            </td>
                            <td v-else>{{ element.role}}</td>
                            <td>
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
                        <td><img src="../../assets/icon/plus.png" @click="startToCreateAnUser()"></td>
                    </tr>
                    <tr v-if="!editing && creating">
                        <td><b-form-input type="text" name="username" v-model="username" placeholder="Username"/></td>
                        <td><b-form-input type="password" name="password" v-model="password" placeholder="Password"/></td>
                        <td>
                            <b-form-select name="role" v-model="role" placeholder="Role">
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </b-form-select>
                        </td>
                        <td><img src="../../assets/icon/confirm.png" @click="createAnUser(username, password, role)"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
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
    table {
        border: 2px solid #BB0B0B;
        border-radius: 3px;
        background-color: #1E1E1E;
        align-content: center;
        border-collapse: collapse;
        text-align: center;
        margin-right: auto;
        margin-left: auto;
    }

    th, td {
        background-color: #1E1E1E;
        color: rgba(255,255,255,0.66);
        cursor: pointer;
        border: 2px solid #BB0B0B;
        padding: 10px 20px;
    }

    th:hover {
        color: #fff;
    }

    td:hover {
        color: #BB0B0B;
    }

    h2 {
        margin-top: 20px;
        text-align: center;
    }

    .text-danger {
        color: #BB0B0B;
    }

    input {

    }
</style>