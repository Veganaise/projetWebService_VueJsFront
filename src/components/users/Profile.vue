<template>
    <div>
        <div v-if="auth.currentUser.username !== undefined">
            <p>{{username}} ({{auth.currentUser.role}})</p>
            <p>{{auth.currentUser.password}}</p>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'

    export default {
        name: "Profile",
        data() {
            return {
                username: this.$route.params.id
            }
        },
        computed: {
            ...mapGetters('auth', ['currentUser']),
            ...mapState({auth: state => state.auth}),
        }
    }
</script>

<style scoped>

</style>