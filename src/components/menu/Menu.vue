<template>
    <div>
        <b-navbar toogleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">Cinema</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/movies">Films</b-nav-item>
                    <b-nav-item href="#">Genres</b-nav-item>
                   <!-- <b-nav-item-dropdown right>
                        <template v-slot:button-content>Genres</template>
                        <b-dropdown-item href="#">Comédie</b-dropdown-item>
                    </b-nav-item-dropdown>-->
                    <b-nav-item href="/actors">Acteurs</b-nav-item>
                    <b-nav-item href="/users">Administration</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="/login">Sign In</b-dropdown-item>
                        <!--<b-dropdown-item href="#">Profile</b-dropdown-item>-->
                        <b-dropdown-item href="/" v-on:click="logoutSubmit()">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>

        </b-navbar>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Menu",
        computed: {
          ...mapGetters('auth', ['loggedIn']),
        },
        methods: {
            ...mapActions('auth', ['logout']),

            logoutSubmit() {
                this.logout()
            }
        },
    }
</script>

<style scoped>

</style>