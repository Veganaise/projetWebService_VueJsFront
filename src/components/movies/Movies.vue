<template>
    <div class="moviesResultSet">
        <h2>Liste des films</h2>
        <div>
            <div v-for="movie in movies" :key="movie.id">
                <b-card class="movie-card" bg-variant="dark" text-variant="white" v-for="(element, index) in movie.items" :key="index" :title="element.titre">
                    <template v-slot:header>
                        <h4 class="mb-0">Film n°{{element.noFilm}}</h4>
                    </template>
                    <b-card-body>
                        <b-card-sub-title>Durée : {{element.duree}}</b-card-sub-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item variant="dark">Date de sortie : {{element.dateSortie}}</b-list-group-item>
                        <b-list-group-item variant="dark">Budget : {{element.budget}}</b-list-group-item>
                        <b-list-group-item variant="dark">Montant de la recette : {{element.montantRecette}}</b-list-group-item>
                    </b-list-group>
                    <!--<b-button href="#" variant="primary">Voir le détail de ce film</b-button>-->
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "MoviesResultSet",
        created() { //appelé a la création du component
            this.fetchMovies()
        },
        computed: {
            //...mapGetters('auth', ['authenticate']),
            ...mapState({movies: state => state.movies}),
            /*movies(){
                return this.$store.getters.movies;
            }*/
        },
        methods: {
            ...mapActions('movies', {fetchMovies: 'fetchMovies'}),
        }
    }
</script>

<style scoped>
    .movie-card {
        margin-top: 30px;
        text-align: center;
        margin-right: 200px;
        margin-left: 200px;
    }

    h2 {
        margin-top: 20px;
        text-align: center;
    }

</style>
