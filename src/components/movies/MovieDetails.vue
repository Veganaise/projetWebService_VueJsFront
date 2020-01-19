<template>
    <div class="w-75 mt-3 mr-auto ml-auto" style="background-color: #1E1E1E;">
        <h1 class="text-white mt-3 text-center">Informations sur le film n°{{noFilm}}</h1>
        <div v-if="renderComponent && movies.movies.movieSelected === undefined">
            <h4 class="text-white text-center m-auto" @click="forceRerender()">Force Reload</h4>
            <br/>
        </div>
        <div v-if="renderComponent && movies.movies.movieSelected !== undefined">
            <div class="row mt-3">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Titre</h4>
                </div>
                <div class="col-md-4 mr-auto">
                    <h4 class="text-white">{{movies.movies.movieSelected.movie.titre}}</h4>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Durée</h4>
                </div>
                <div class="col-md-4 mr-auto">
                    <h4 class="text-white">{{movies.movies.movieSelected.movie.duree}} min</h4>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Date de sortie</h4>
                </div>
                <div class="col-md-4 mr-auto">
                    <h4 class="text-white">{{movies.movies.movieSelected.movie.dateSortie}}</h4>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Budget</h4>
                </div>
                <div class="col-md-4 mr-auto">
                    <h4 class="text-white">{{movies.movies.movieSelected.movie.budget}} €</h4>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Montant recette</h4>
                </div>
                <div class="col-md-4 mr-auto">
                    <h4 class="text-white">{{movies.movies.movieSelected.movie.montantRecette}} €</h4>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Réalisateur</h4>
                </div>
                <div class="col-md-4 mr-auto">
                    <h4 class="text-white">{{movies.movies.movieSelected.movie.realisateurByNoRea.prenRea}} {{movies.movies.movieSelected.movie.realisateurByNoRea.nomRea}}</h4>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Catégorie</h4>
                </div>
                <div class="col-md-4 mr-auto">
                    <h4 class="text-white">{{movies.movies.movieSelected.movie.categorieByCodeCat.libelleCat}}</h4>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Personnages</h4>
                </div>
                <div class="col-md-4 mr-auto">
                    <div v-for="character in characters" :key="character.noFilm">
                        <h4 class="text-white" v-for="(element, index) in character.charactersSelected.character" :key="index" :value="element.nomPers">{{element.nomPers}}</h4>
                    </div>
                </div>
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