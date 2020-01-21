<template>
    <div>
        <div class="w-75 mt-0 mr-auto ml-auto bg-dark">
            <h1 class="text-white mt-3 text-center">Mes informations</h1>
            <div v-if="auth.currentUser.username !== undefined">
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/user-r.png"/>  Username</h4>
                    </div>
                    <div class="col-md-4 mr-auto text-center">
                        <h4 class="text-white">{{username}}</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/team.png"/>  Rôle</h4>
                    </div>
                    <div class="col-md-4 mr-auto text-center">
                        <h4 class="text-white">{{auth.currentUser.role}}</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/lock-r.png"/>  Password</h4>
                    </div>
                    <div class="col-md-4 mr-auto text-center">
                        <button class="bg-dark text-white" v-if="!editMyPassword" @click="showToEditPassword()">Modifier</button>
                        <b-form-input type="password" v-if="editMyPassword" name="password" v-model="password" placeholder="Password"/>
                        <img v-if="editMyPassword" src="../../assets/icon/confirm.png" @click="editPassword(auth.currentUser)">
                        <img v-if="editMyPassword" src="../../assets/icon/remove.png" @click="cancel()">
                    </div>
                </div>
                <br />
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'

    export default {
        name: "Profile",
        data() {
            return {
                username: this.$route.params.id,
                editMyPassword: false,
                password: ''
            }
        },
        computed: {
            ...mapGetters('auth', ['currentUser']),
            ...mapState({auth: state => state.auth}),
        },
        methods: {
            ...mapActions('users', ['editUser']),

            showToEditPassword() {
                this.editMyPassword = true
            },

            editPassword(currentUser) {
                this.editMyPassword = false
                if(this.password !== '' && this.password !== currentUser.password) {
                    return this.editUser({user: currentUser, username: currentUser.username, password: this.password, role: currentUser.role})
                }
            },

            cancel() {
                this.editMyPassword = false
            }
        }
    }
</script>

<style scoped>

</style>