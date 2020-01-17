<template>
    <div class="login">
        <h1>Login</h1>
        <div style="text-align: center;">
            <label>
                <input type="text" name="username" v-model="username" required placeholder="Username" />
            </label>
            <br/>
            <label>
                 <input type="password" name="password" v-model="password" required placeholder="Password" />
            </label>
        </div>
        <div style="text-align: center;">
            <button type="button" v-on:click="handleSubmit()">Login</button>
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
            ...mapGetters('auth', [
                'authenticating',
                'authenticationError',
                'authenticationErrorCode',
                'authenticationSuccess'
            ])
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
    .login {
        width: 500px;
        border: none;
        background-color: #1E1E1E;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
    }

    h1 {
        color: #BB0B0B;
        text-align: center;
    }

    input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-radius: 4px;
        background-color: #BB0B0B;
        color: #1E1E1E;
    }

    input[type=text] {
        background-image: url('../assets/icon/user.png');
        background-position: 5px 3px;
        background-repeat: no-repeat;
        padding-left: 40px;
    }

    input[type=password] {
        background-image: url('../assets/icon/lock.png');
        background-position: 5px 3px;
        background-repeat: no-repeat;
        padding-left: 40px;
    }

    button {
        background-color: #BB0B0B;
        border: none;
        color: #000000;
        padding: 12px 30px;
        text-align: center;
        text-decoration: none;
        margin-top: 10px;
        cursor: pointer;
    }
</style>