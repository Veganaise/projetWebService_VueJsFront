<template>
    <div>
        <p>{{noFilm}}</p>
        <div v-if="renderComponent && movies.movies.movieSelected === undefined">
            <a @click="forceRerender()">Force Reload</a>
        </div>
        <div v-if="renderComponent && movies.movies.movieSelected !== undefined">
            <p>{{movies.movies.movieSelected.movie.titre}}</p>
            <p>{{movies.movies.movieSelected.movie.duree}}</p>
            <p>{{movies.movies.movieSelected.movie.dateSortie}}</p>
            <p>{{movies.movies.movieSelected.movie.budget}}</p>
            <p>{{movies.movies.movieSelected.movie.montantRecette}}</p>
            <p>{{movies.movies.movieSelected.movie.realisateurByNoRea.prenRea}} {{movies.movies.movieSelected.movie.realisateurByNoRea.nomRea}}</p>
            <p>{{movies.movies.movieSelected.movie.categorieByCodeCat.libelleCat}}</p>
            <div v-for="character in characters" :key="character.noFilm">
                <p v-for="(element, index) in character.charactersSelected.character" :key="index" :value="element.nomPers">{{element.nomPers}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "MovieDetails",
        data() {
            return {
                noFilm: this.$route.params.id,
                renderComponent: true
            }
        },
        created() {
            this.getAMovie(this.noFilm)
            this.getMovieCharacters(this.noFilm)
        },
        mounted() {
            this.forceRerender()
        },
        computed: {
            ...mapState({movies: state => state.movies}),
            ...mapState({characters: state => state.characters})
        },
        methods: {
            ...mapActions('movies', ['getAMovie']),
            ...mapActions('characters', ['getMovieCharacters']),

            forceRerender() {
                // Remove my-component from the DOM
                this.renderComponent = false

                this.$nextTick(() => {
                    // Add the component back in
                    this.renderComponent = true
                });
            }
        },
    }
</script>

<style scoped>

</style>