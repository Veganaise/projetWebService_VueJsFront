<template>
    <div class="movies">
        <!--Modal pour créer ou éditer un film-->
        <b-modal id="modalCreateOrEditMovie" header-bg-variant="dark" footer-bg-variant="dark" body-bg-variant="dark" hide-header-close>
            <template v-slot:modal-title>
                <!--Titre modale pour créer un film-->
                <h1 class="text-white text-center" v-if="creating && !editing">Créer un film</h1>
                <!--Titre modale pour modifier un film-->
                <h1 class="text-white text-center" v-if="!creating && editing">Modifier le film n°{{movieToEdit.noFilm}}</h1>
            </template>
            <b-container fluid>
                <div class="row">
                    <div class="col-md-12 ml-auto text-white">
                        <!--Input pour créer un film-->
                        <p v-if="creating && !editing">Titre<b-form-input class="h-100" type="text" name="titre" v-model="titre"/></p>
                        <!--Input pour modifier un film-->
                        <p v-if="!creating && editing">Titre<b-form-input class="h-100" type="text" name="editTitre" v-model="movieToEdit.titre"/></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un film-->
                        <p v-if="creating && !editing">Durée<b-form-input class="h-100" type="number" name="duree" v-model="duree"/></p>
                        <!--Input pour modifier un film-->
                        <p v-if="!creating && editing">Durée<b-form-input class="h-100" type="number" name="editDuree" v-model="movieToEdit.duree"/></p>
                    </div>
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un film-->
                        <p v-if="creating && !editing">Date de sortie<b-form-input class="h-100" type="date" name="dateSortie" v-model="dateSortie"/></p>
                        <!--Input pour modifier un film-->
                        <p v-if="!creating && editing">Date de sortie<b-form-input class="h-100" type="date" name="editDateSortie" v-model="movieToEdit.dateSortie"/></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un film-->
                        <p v-if="creating && !editing">Budget<b-form-input class="h-100" type="number" name="budget" v-model="budget"/></p>
                        <!--Input pour modifier un film-->
                        <p v-if="!creating && editing">Budget<b-form-input class="h-100" type="number" name="editBudget" v-model="movieToEdit.budget"/></p>
                    </div>
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un film-->
                        <p v-if="creating && !editing">Montant recette<b-form-input class="h-100" type="number" name="montantRecette" v-model="montantRecette"/></p>
                        <!--Input pour modifier un film-->
                        <p v-if="!creating && editing">Montant recette<b-form-input class="h-100" type="number" name="editMontantRecette" v-model="movieToEdit.montantRecette"/></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un film-->
                        <p v-if="creating && !editing">Réalisateur<b-form-select class="h-100" name="real" v-for="director in directors" :key="director.noRea" v-model="noRea">
                            <option v-for="(element, index) in director.items" :key="index" :value="element.noRea">{{element.prenRea}} {{element.nomRea}}</option>
                        </b-form-select></p>
                        <!--Input pour modifier un film-->
                        <p v-if="!creating && editing">Réalisateur<b-form-select class="h-100" name="editReal" v-for="director in directors" :key="director.noRea" v-model="movieToEdit.noRea">
                            <option v-for="(element, index) in director.items" :key="index" :value="element.noRea">{{element.prenRea}} {{element.nomRea}}</option>
                        </b-form-select></p>
                    </div>
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un film-->
                        <p v-if="creating && !editing">Catégorie<b-form-select class="h-100" name="cat" v-for="category in categories" :key="category.codeCat" v-model="codeCat">
                            <option v-for="(element, index) in category.items" :key="index" :value="element.codeCat">{{element.libelleCat}}</option>
                        </b-form-select></p>
                        <!--Input pour modifier un film-->
                        <p v-if="!creating && editing">Catégorie<b-form-select class="h-100" name="editCat" v-for="category in categories" :key="category.codeCat" v-model="movieToEdit.codeCat">
                            <option v-for="(element, index) in category.items" :key="index" :value="element.codeCat">{{element.libelleCat}}</option>
                        </b-form-select></p>
                    </div>
                </div>
                <div class="row" v-if="errEmpty !== ''">
                    <div class="col-md-12 ml-auto text-danger text-center">
                        <span>{{errEmpty}}</span>
                    </div>
                </div>
            </b-container>
            <template v-slot:modal-footer>
                <button v-if="creating && !editing" @click="confirmCreateMovie()" style="background-color: #BB0B0B;" class="text-white">Créer</button>
                <button v-if="!creating && editing" @click="confirmEditMovie(movieToEdit.noFilm)" style="background-color: #BB0B0B;" class="text-white">Modifier</button>
                <button @click="hideCreateOrEditMovie()" style="background-color: #BB0B0B;" class="text-white">Annuler</button>
            </template>
        </b-modal>

        <!--Affichage depuis l'onglet "Film" du menu-->
        <div v-if="codeCatFromCategoriesPage === undefined && noReaFromDirectorsPage === undefined">
            <h2 class="mt-3 text-center"><strong>Liste des films  </strong><img src="../../assets/icon/plus_b.png" alt="plus" @click="onClickCreateMovie()"/></h2>
            <div>
                <div v-for="movie in movies" :key="movie.noFilm">
                    <b-card class="mt-3 text-center mr-5 ml-5" bg-variant="dark" text-variant="white" v-for="(element, index) in movie.items" :key="index" :title="element.titre">
                        <template v-slot:header>
                            <h4 class="mb-0">Film n°{{element.noFilm}}
                                <img src="../../assets/icon/pencil-edit-button.png" @click="getAMovieToEdit(element)">&nbsp;
                                <img src="../../assets/icon/rubbish-bin.png" @click="deleteAMovie(element.noFilm)">
                            </h4>
                        </template>
                        <b-card-body>
                            <b-card-sub-title><strong>Durée</strong> {{element.duree}} min</b-card-sub-title>
                        </b-card-body>
                        <b-list-group flush>
                            <b-list-group-item variant="dark"><strong>Date de sortie</strong> {{element.dateSortie}}</b-list-group-item>
                            <b-list-group-item variant="dark"><strong>Budget</strong> {{element.budget}} €</b-list-group-item>
                            <b-list-group-item variant="dark"><strong>Montant de la recette</strong> {{element.montantRecette}} €</b-list-group-item>
                        </b-list-group>
                        <br />
                        <router-link class="text-white" :to="`/movieDetails/${element.noFilm}`">Voir + d'info</router-link>
                    </b-card>
                    <br />
                    <span v-if="movies.movies.error !== '' && movies.movies.items === undefined">{{movies.movies.error}}</span>
                </div>
            </div>
        </div>

        <!-- Affichage depuis l'onglet "Catégories" du menu-->
        <div v-if="codeCatFromCategoriesPage !== undefined">
            <h2 class="mt-3 text-center"><strong>Liste des films de la catégorie {{libelle}} </strong><img src="../../assets/icon/plus_b.png" alt="plus" @click="onClickCreateMovie()"/></h2>
            <div class="text-center">
                <a class="text-white" @click="showAllMovies()">Afficher tous les films</a>
            </div>
            <div>
                <div v-for="movie in movies" :key="movie.noFilm">
                    <b-card class="mt-3 text-center mr-5 ml-5" bg-variant="dark" text-variant="white" v-for="(element, index) in movie.items" :key="index" :title="element.titre">
                        <template v-slot:header>
                            <h4 class="mb-0">Film n°{{element.noFilm}}</h4>
                            <img src="../../assets/icon/pencil-edit-button.png" @click="getAMovieToEdit(element)">
                            <img src="../../assets/icon/rubbish-bin.png" @click="deleteAMovie(element.noFilm)">
                        </template>
                        <b-card-body>
                            <b-card-sub-title>Durée : {{element.duree}}</b-card-sub-title>
                        </b-card-body>
                        <b-list-group flush>
                            <b-list-group-item variant="dark">Date de sortie : {{element.dateSortie}}</b-list-group-item>
                            <b-list-group-item variant="dark">Budget : {{element.budget}}</b-list-group-item>
                            <b-list-group-item variant="dark">Montant de la recette : {{element.montantRecette}}</b-list-group-item>
                        </b-list-group>
                        <br />
                        <router-link class="text-white" :to="`/movieDetails/${element.noFilm}`">Voir + d'info</router-link>
                    </b-card>
                    <br />
                    <span v-if="movies.movies.error !== '' && movies.movies.items === undefined">{{movies.movies.error}}</span>
                </div>
            </div>
        </div>

        <!-- Affichage depuis l'onglet "Réalisateurs" du menu-->
        <div v-if="noReaFromDirectorsPage !== undefined">
            <h2 class="mt-3 text-center"><strong>Liste des films de {{prenRea}} {{nomRea}} </strong><img src="../../assets/icon/plus_b.png" alt="plus" @click="onClickCreateMovie()"/></h2>
            <div class="text-center">
                <a class="text-white" @click="showAllMovies()">Afficher tous les films</a>
            </div>
            <div>
                <div class="text-center" v-if="movies.movies.items.length === 0">
                    <br />
                    Ce réalisateur n'a pas de film dans la base de données. Vous pouvez en ajouter si vous le souhaitez
                </div>
                <div v-for="movie in movies" :key="movie.noFilm">
                    <b-card class="mt-3 text-center mr-5 ml-5" bg-variant="dark" text-variant="white" v-for="(element, index) in movie.items" :key="index" :title="element.titre">
                        <template v-slot:header>
                            <h4 class="mb-0">Film n°{{element.noFilm}}</h4>
                            <img src="../../assets/icon/pencil-edit-button.png" @click="getAMovieToEdit(element)">
                            <img src="../../assets/icon/rubbish-bin.png" @click="deleteAMovie(element.noFilm)">
                        </template>
                        <b-card-body>
                            <b-card-sub-title>Durée : {{element.duree}}</b-card-sub-title>
                        </b-card-body>
                        <b-list-group flush>
                            <b-list-group-item variant="dark">Date de sortie : {{element.dateSortie}}</b-list-group-item>
                            <b-list-group-item variant="dark">Budget : {{element.budget}}</b-list-group-item>
                            <b-list-group-item variant="dark">Montant de la recette : {{element.montantRecette}}</b-list-group-item>
                        </b-list-group>
                        <br />
                        <router-link class="text-white" :to="`/movieDetails/${element.noFilm}`">Voir + d'info</router-link>
                    </b-card>
                    <br />
                    <span v-if="movies.movies.error !== '' && movies.movies.items === undefined">{{movies.movies.error}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Movies",
        data() {
            return {
                creating: false,
                titre: '',
                duree: 0,
                dateSortie: null,
                budget: 0,
                montantRecette: 0,
                noRea: '',
                codeCat: '',
                errEmpty: '',

                movieSelected: '',

                editing: false,
                movieToEdit: '',

                codeCatFromCategoriesPage: this.$route.params.codeCat,
                noReaFromDirectorsPage: this.$route.params.noRea,
                nomRea: this.$route.query.nomRea,
                prenRea: this.$route.query.prenRea,
                libelle: this.$route.query.libelle
            }
        },
        // Appelée à la création du component
        created() {
            // Pour afficher tous les films
            if(this.codeCatFromCategoriesPage === undefined && this.noReaFromDirectorsPage === undefined) {
                this.fetchMovies();
            // Pour afficher les films d'une catégorie choisie dans la page catégorie
            } else if(this.codeCatFromCategoriesPage !== undefined && this.noReaFromDirectorsPage === undefined) {
                this.getMoviesFromCat(this.codeCatFromCategoriesPage)
            // Pour afficher les films d'un réalisateur choisi dans la page réalisateurs
            } else if(this.noReaFromDirectorsPage !== undefined && this.codeCatFromCategoriesPage === undefined) {
                this.getMoviesFromDirector(this.noReaFromDirectorsPage)
            } else {
                this.codeCatFromCategoriesPage = undefined
                this.noReaFromDirectorsPage = undefined
                this.fetchMovies()
            }
            // récupérer réalisateurs
            this.fetchDirectors();
            // récupérer catégories
            this.fetchCategories();
        },
        computed: {
            ...mapState({movies: state => state.movies}),
            ...mapState({directors: state => state.directors}),
            ...mapState({categories: state => state.categories}),
        },
        methods: {
            ...mapActions('movies', ['fetchMovies', 'createMovie', 'getAMovie', 'editMovie', 'deleteMovie', 'getMoviesFromCat', 'getMoviesFromDirector']),
            ...mapActions('directors', ['fetchDirectors', 'getADirector']),
            ...mapActions('categories', ['fetchCategories', 'getACategory']),

            // Modale création d'un film
            onClickCreateMovie() {
                this.$bvModal.show('modalCreateOrEditMovie')
                this.creating = true
                this.codeCatFromCategoriesPage = undefined
            },

            confirmCreateMovie() {
                if(this.titre !== '' && this.duree > 0 && this.dateSortie !== null && this.budget > 0 && this.montantRecette > 0 && this.noRea !== '' && this.codeCat !== '') {
                    this.$bvModal.hide('modalCreateOrEditMovie')
                    this.creating = false
                    this.errEmpty = ''
                    return this.createMovie({titre: this.titre, duree: this.duree, dateSortie: this.dateSortie, budget: this.budget, montantRecette: this.montantRecette, noRea: this.noRea, codeCat: this.codeCat})
                } else {
                    this.errEmpty = 'Veuillez renseigner correctement tous les champs svp'
                }
            },

            hideCreateOrEditMovie() {
                this.$bvModal.hide('modalCreateOrEditMovie')
                this.creating = false
                this.editing = false
            },

            async getAMovieToEdit(movie) {
                this.movieToEdit = movie
                this.editing = true
                this.$bvModal.show('modalCreateOrEditMovie')
                this.codeCatFromCategoriesPage = undefined
            },

            async confirmEditMovie(noFilm) {
                await this.getAMovie(noFilm)
                if(this.movies.movies.movieSelected.movie.noFilm === this.movieToEdit.noFilm) {
                    if(this.movies.movies.movieSelected.movie.titre !== this.movieToEdit.titre
                        || this.movies.movies.movieSelected.movie.duree !== this.movieToEdit.duree
                        || this.movies.movies.movieSelected.movie.dateSortie !== this.movieToEdit.dateSortie
                        || this.movies.movies.movieSelected.movie.budget !== this.movieToEdit.budget
                        || this.movies.movies.movieSelected.movie.montantRecette !== this.movieToEdit.montantRecette
                        || this.movies.movies.movieSelected.movie.noRea !== this.movieToEdit.noRea
                        || this.movies.movies.movieSelected.movie.codeCat !== this.movieToEdit.codeCat) {

                        if(this.movieToEdit.titre !== '' && this.movieToEdit.duree > 0 && this.movieToEdit.dateSortie !== null && this.movieToEdit.budget > 0
                            && this.movieToEdit.montantRecette > 0 && this.movieToEdit.noRea !== '' && this.movieToEdit.codeCat !== '') {

                            this.editing = false
                            this.$bvModal.hide('modalCreateOrEditMovie')
                            return this.editMovie({movie: this.movies.movies.movieSelected.movie, noFilm: this.movieToEdit.noFilm, titre: this.movieToEdit.titre,
                                duree: this.movieToEdit.duree, dateSortie: this.movieToEdit.dateSortie, budget: this.movieToEdit.budget,
                                montantRecette: this.movieToEdit.montantRecette, noRea: this.movieToEdit.noRea, codeCat: this.movieToEdit.codeCat})
                        } else {
                            this.movieToEdit = this.movies.movies.movieSelected.movie
                            this.$router.go(0)
                        }
                    }
                }
                this.editing = false
                this.$bvModal.hide('modalCreateOrEditMovie')
            },

            deleteAMovie(noFilm) {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
                    return this.deleteMovie(noFilm)
                } else {
                    return false
                }
            },

            showAllMovies() {
                this.codeCatFromCategoriesPage = undefined
                this.noReaFromDirectorsPage = undefined
                this.fetchMovies()
                return this.$router.push('/movies')
            }
        }
    }
</script>

<style scoped>

</style>
