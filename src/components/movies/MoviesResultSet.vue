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
    // import {getMovies} from "@/services/movies.services";

    export default {
        name: "moviesResultSet",
        components: {Movie},
        created() { //appelé a la création du component
            this.$store.dispatch('fetchMovies');
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
