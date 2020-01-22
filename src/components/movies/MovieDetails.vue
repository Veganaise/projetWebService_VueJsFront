<template>
    <div>
        <router-link to="/movies"><img class="ml-1 mt-1" src="../../assets/icon/left-arrow.png"/></router-link>
        <div class="w-75 mt-0 mr-auto ml-auto bg-dark">
            <h1 class="text-white mt-3 text-center">Informations sur le film n°{{noFilm}}</h1>
            <div v-if="renderComponent">
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/movie-clapper-open.png"/>  Titre</h4>
                    </div>
                    <div class="col-md-2 mr-auto text-center">
                        <h4 class="text-white">{{movies.movies.movieSelected.movie.titre}}</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/hourglass.png"/>  Durée</h4>
                    </div>
                    <div class="col-md-2 mr-auto text-center">
                        <h4 class="text-white">{{movies.movies.movieSelected.movie.duree}} min</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/calendar.png"/>  Date de sortie</h4>
                    </div>
                    <div class="col-md-2 mr-auto text-center">
                        <h4 class="text-white">{{movies.movies.movieSelected.movie.dateSortie}}</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/film-budget.png"/>  Budget</h4>
                    </div>
                    <div class="col-md-2 mr-auto text-center">
                        <h4 class="text-white">{{movies.movies.movieSelected.movie.budget}} €</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/cost.png"/>  Montant recette</h4>
                    </div>
                    <div class="col-md-2 mr-auto text-center">
                        <h4 class="text-white">{{movies.movies.movieSelected.movie.montantRecette}} €</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/furniture-and-household.png"/>  Réalisateur</h4>
                    </div>
                    <div class="col-md-2 mr-auto text-center">
                        <h4 class="text-white">{{movies.movies.movieSelected.movie.realisateurByNoRea.prenRea}} {{movies.movies.movieSelected.movie.realisateurByNoRea.nomRea}}</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/grid.png"/>  Catégorie</h4>
                    </div>
                    <div class="col-md-2 mr-auto text-center">
                        <h4 class="text-white">{{movies.movies.movieSelected.movie.categorieByCodeCat.libelleCat}}</h4>
                    </div>
                </div>
            </div>
            <div v-if="renderCharacters">
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/superhero.png"/>  Personnages</h4>
                    </div>
                    <div class="col-md-2 mr-auto ml-0 text-center">
                        <div v-for="character in characters" :key="character.noFilm">
                            <h4 class="text-white" v-for="(element, index) in character.charactersSelected.character" :key="index" :value="element.nomPers">{{element.nomPers}}</h4>
                        </div>
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
                renderComponent: false,
                renderCharacters: false,
            }
        },
        created() {
            this.getAMovie(this.noFilm)
            this.getMovieCharacters(this.noFilm)

            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'movies/getAMovieSuccess') {
                    this.renderComponent = true
                }
            });

            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'characters/getMovieCharactersSuccess') {
                    this.renderCharacters = true
                }
            })
        },
        computed: {
            ...mapState({movies: state => state.movies}),
            ...mapState({characters: state => state.characters})
        },
        methods: {
            ...mapActions('movies', ['getAMovie']),
            ...mapActions('characters', ['getMovieCharacters']),
        },
    }
</script>

<style scoped>

</style>