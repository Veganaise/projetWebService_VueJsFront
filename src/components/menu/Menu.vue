<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">Cinema</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="/movies">Films</b-nav-item>
                <b-nav-item href="/categories">Catégories</b-nav-item>
                <b-nav-item href="/actors">Acteurs</b-nav-item>
                <b-nav-item href="/directors">Réalisateurs</b-nav-item>
                <b-nav-item href="/users" v-if="auth.currentUser.role === 'admin'">Administration</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <!--<b-nav-form>
                   <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                   <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>-->

                <b-nav-item-dropdown v-if="renderUserConnected" right>
                    <template v-slot:button-content>
                        {{auth.currentUser.username}}
                    </template>
                    <b-dropdown-item :to="`/profile/${auth.currentUser.username}`">Mes informations</b-dropdown-item>
                    <b-dropdown-item href="/" v-on:click="logoutSubmit()">Se déconnecter</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item v-if="!renderUserConnected" href="/login">Se connecter</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex'

    export default {
        name: "Menu",
        data() {
            return {
                userLogged: false,
                renderUserConnected: false
            }
        },
        async beforeMount() {
            this.userLogged = this.$store.state.auth.accessToken !== null
            if(this.userLogged) {
                await this.getUserConnected()
            }
            return this.userLogged
        },
        created() {
            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'auth/getUserConnectedSuccess') {
                    this.renderUserConnected = true
                }
            })
        },
        computed: {
          ...mapGetters('auth', ['currentUser']),
          ...mapState({users: state => state.users}),
          ...mapState({auth: state => state.auth}),
        },
        methods: {
            ...mapActions('auth', ['logout', 'getUserConnected']),

            logoutSubmit() {
                return this.logout()
            },
        },
    }
</script>

<style scoped>

</style>