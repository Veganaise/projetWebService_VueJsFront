<template>
    <div class="moviesResultSet">
        <h2>Liste des films</h2>
        <div>
            <movie v-for="movie in movies" v-bind="movie" :key="movie.title"/>
        </div>
    </div>
</template>

<script>
    import Movie from "@/components/movies/Movie";
    import {getMovies} from "@/services/movies.services";
    import {authenticate} from "@/services/http-commons";
    export default {
        name: "moviesResultSet",
        components: {Movie},
        data(){
            return{
                pokemons: [] //init avec tableau vide
            }
        },
        created() { //appelé a la création du component
            authenticate();
            getMovies().then(()=>{
                this.$store.dispatch('fetchMovies');
            })
        },
        computed: {
            movies(){
                return this.$store.getters.movies;
            }
        }
    }
</script>

<style scoped>

</style>