<template>
    <div class="w-50 m-auto" style="background-color: #1E1E1E;">
        <h1 class="text-center" style="color: #BB0B0B">Login</h1>
        <div class="input-group w-auto m-auto pl-3 pr-3">
            <div class="input-group-prepend">
                <span class="input-group-text" style="background-color: #BB0B0B;">
                    <img alt="user" src="../assets/icon/user.png">
                </span>
            </div>
            <input type="text" class="form-control m-auto" placeholder="Username" aria-label="Username" v-model="username" required>
        </div>
        <br />
        <div class="input-group w-auto m-auto pl-3 pr-3">
            <div class="input-group-prepend">
                <span class="input-group-text" style="background-color: #BB0B0B;">
                    <img alt="lock" src="../assets/icon/lock.png">
                </span>
            </div>
            <input type="password" class="form-control m-auto " placeholder="Password" aria-label="Password" v-model="password" required>
        </div>
        <div class="text-center mt-2">
            <button class="btn" style="background-color: #BB0B0B;" type="submit" v-on:click="handleSubmit()">Login</button>
            <br/>
            <router-link class="text-white" to="/register">Vous n'avez pas de compte ? Inscrivez vous ici</router-link>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        computed: {
            ...mapGetters('auth', ['authenticating', 'authenticationError', 'authenticationErrorCode', 'authenticationSuccess'])
        },
        methods: {
            ...mapActions('auth', ['authenticate']),

            handleSubmit() {
                this.submitted = true
                if (this.username !== '' && this.password !== '') {
                    this.authenticate({username: this.username, password: this.password})
                    this.password = ""
                }
            }
        },
    }
</script>

<style scoped>
</style>