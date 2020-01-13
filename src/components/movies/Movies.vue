<template>
    <div class="moviesResultSet">
        <!--Modal to create a movie-->
        <transition name="modal" v-if="showModalCreateOrEditMovie">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="row">
                            <div class="col-md-12 ml-auto">
                                <!--Titre modale pour créer un film-->
                                <h1 v-if="creating && !editing">Créer un film</h1>
                                <!--Titre modale pour modifier un film-->
                                <h1 v-if="!creating && editing">Modifier le film n°{{movieToEdit.noFilm}}</h1>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 ml-auto">
                                <!--Input pour créer un film-->
                                <p v-if="creating && !editing">Titre<b-form-input class="h-100" type="text" name="titre" v-model="titre"/></p>
                                <!--Input pour modifier un film-->
                                <p v-if="!creating && editing">Titre<b-form-input class="h-100" type="text" name="editTitre" v-model="movieToEdit.titre"/></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un film-->
                                <p v-if="creating && !editing">Durée<b-form-input class="h-100" type="number" name="duree" v-model="duree"/></p>
                                <!--Input pour modifier un film-->
                                <p v-if="!creating && editing">Durée<b-form-input class="h-100" type="number" name="editDuree" v-model="movieToEdit.duree"/></p>
                            </div>
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un film-->
                                <p v-if="creating && !editing">Date de sortie<b-form-input class="h-100" type="date" name="dateSortie" v-model="dateSortie"/></p>
                                <!--Input pour modifier un film-->
                                <p v-if="!creating && editing">Date de sortie<b-form-input class="h-100" type="date" name="editDateSortie" v-model="movieToEdit.dateSortie"/></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un film-->
                                <p v-if="creating && !editing">Budget<b-form-input class="h-100" type="number" name="budget" v-model="budget"/></p>
                                <!--Input pour modifier un film-->
                                <p v-if="!creating && editing">Budget<b-form-input class="h-100" type="number" name="editBudget" v-model="movieToEdit.budget"/></p>
                            </div>
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un film-->
                                <p v-if="creating && !editing">Montant recette<b-form-input class="h-100" type="number" name="montantRecette" v-model="montantRecette"/></p>
                                <!--Input pour modifier un film-->
                                <p v-if="!creating && editing">Montant recette<b-form-input class="h-100" type="number" name="editMontantRecette" v-model="movieToEdit.montantRecette"/></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un film-->
                                <p v-if="creating && !editing">Réalisateur<b-form-select class="h-100" name="real" v-for="director in directors" :key="director.noRea" v-model="noRea">
                                    <option v-for="(element, index) in director.items" :key="index" :value="element.noRea">{{element.prenRea}} {{element.nomRea}}</option>
                                </b-form-select></p>
                                <!--Input pour modifier un film-->
                                <p v-if="!creating && editing">Réalisateur<b-form-select class="h-100" name="editReal" v-for="director in directors" :key="director.noRea" v-model="movieToEdit.realisateurByNoRea.noRea">
                                    <option v-for="(element, index) in director.items" :key="index" :value="element.noRea">{{element.prenRea}} {{element.nomRea}}</option>
                                </b-form-select></p>
                            </div>
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un film-->
                                <p v-if="creating && !editing">Catégorie<b-form-select class="h-100" name="cat" v-for="category in categories" :key="category.codeCat" v-model="codeCat">
                                    <option v-for="(element, index) in category.items" :key="index" :value="element.codeCat">{{element.libelleCat}}</option>
                                </b-form-select></p>
                                <!--Input pour modifier un film-->
                                <p v-if="!creating && editing">Catégorie<b-form-select class="h-100" name="editCat" v-for="category in categories" :key="category.codeCat" v-model="movieToEdit.categorieByCodeCat.codeCat">
                                    <option v-for="(element, index) in category.items" :key="index" :value="element.codeCat">{{element.libelleCat}}</option>
                                </b-form-select></p>
                            </div>
                        </div>
                        <br/>

                        <div class="modal-buttons">
                            <button class="modal-button" @click="hideCreateMovie()">Cancel</button>
                            <button class="modal-button" v-if="creating && !editing" @click="confirmCreateMovie()">Créer</button>
                            <button class="modal-button" v-if="!creating && editing" @click="confirmEditMovie(movieToEdit.noFilm)">Modifier</button>
                        </div>

                        <br/>
                        <span v-if="movies.error" class="text-danger">ERROR: {{movies.error}}</span>
                    </div>
                </div>
            </div>
        </transition>

        <b-button v-b-modal.modal-1 class="float-right" v-on:click="onClickCreateMovie()">Créer un film</b-button>
        <br />
        <h2>Liste des films</h2>
        <div>
            <div v-for="movie in movies" :key="movie.noFilm">
                <b-card class="movie-card" bg-variant="dark" text-variant="white" v-for="(element, index) in movie.items" :key="index" :title="element.titre">
                    <template v-slot:header>
                        <h4 class="mb-0">Film n°{{element.noFilm}}</h4>
                        <img src="../../assets/pencil-edit-button.png" @click="getAMovieToEdit(element)">
                        <img src="../../assets/rubbish-bin.png" @click="deleteAMovie(element.noFilm)">
                    </template>
                    <b-card-body>
                        <b-card-sub-title>Durée : {{element.duree}}</b-card-sub-title>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item variant="dark">Date de sortie : {{element.dateSortie}}</b-list-group-item>
                        <b-list-group-item variant="dark">Budget : {{element.budget}}</b-list-group-item>
                        <b-list-group-item variant="dark">Montant de la recette : {{element.montantRecette}}</b-list-group-item>
                        <b-list-group-item variant="dark" v-if="showMore && movieSelected === element.noFilm">Réalisateur : {{directors.directors.directorSelected.director.prenRea}} {{directors.directors.directorSelected.director.nomRea}} </b-list-group-item>
                        <b-list-group-item variant="dark" v-if="showMore && movieSelected === element.noFilm">Catégorie : {{ categories.categories.categorySelected.category.libelleCat }}</b-list-group-item>
                    </b-list-group>
                    <a v-if="movieSelected !== element.noFilm" @click="showMoreInformation(element)">Voir + d'info</a>
                </b-card>
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
                showModalCreateOrEditMovie: false,
                creating: false,
                titre: '',
                duree: 0,
                dateSortie: '',
                budget: 0,
                montantRecette: 0,
                noRea: '',
                codeCat: '',

                showMore: false,
                movieSelected: '',

                editing: false,
                movieToEdit: '',
            }
        },
        // Appelées à la création du component
        created() {
            // récupérer film
            this.fetchMovies();
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
            ...mapActions('movies', ['fetchMovies', 'createMovie', 'getAMovie', 'editMovie', 'deleteMovie']),
            ...mapActions('directors', ['fetchDirectors', 'getADirector']),
            ...mapActions('categories', ['fetchCategories', 'getACategory']),

            // Modale création d'un film
            onClickCreateMovie() {
                this.showModalCreateOrEditMovie = true
                this.creating = true
            },

            confirmCreateMovie() {
                if(this.titre !== '' && this.duree !== 0 && this.dateSortie !== '' && this.budget !== 0 && this.montantRecette !== 0 && this.noRea !== '' && this.codeCat !== '') {
                    this.showModalCreateOrEditMovie = false
                    this.creating = false
                    return this.createMovie({titre: this.titre, duree: this.duree, dateSortie: this.dateSortie, budget: this.budget, montantRecette: this.montantRecette, noRea: this.noRea, codeCat: this.codeCat})
                }
            },

            hideCreateMovie() {
                this.showModalCreateOrEditMovie = false
                this.creating = false
                this.editing = false
            },

            async showMoreInformation(movie) {
                this.movieSelected = movie.noFilm
                await this.getTheDirector(movie.noRea)
                await this.getTheCategory(movie.codeCat)
                this.showMore = true
            },

            async getTheDirector(noRea) {
                return await this.getADirector(noRea)
            },

            async getTheCategory(codeCat) {
                return await this.getACategory(codeCat)
            },

            async getAMovieToEdit(movie) {
                this.movieToEdit = movie
                this.editing = true
                this.showModalCreateOrEditMovie = true
            },

            async confirmEditMovie(noFilm) {
                await this.getAMovie(noFilm)

                if(this.this.movies.movies.movieSelected.movie.noFilm === this.movieToEdit.noFilm) {
                    if(this.movies.movies.movieSelected.movie.titre !== this.movieToEdit.titre
                        || this.movies.movies.movieSelected.movie.duree !== this.movieToEdit.duree
                        || this.movies.movies.movieSelected.movie.dateSortie !== this.movieToEdit.dateSortie
                        || this.movies.movies.movieSelected.movie.budget !== this.movieToEdit.budget
                        || this.movies.movies.movieSelected.movie.montantRecette !== this.movieToEdit.montantRecette
                        || this.movies.movies.movieSelected.movie.noRea !== this.movieToEdit.noRea
                        || this.movies.movies.movieSelected.movie.codeCat !== this.movieToEdit.codeCat) {
                        return this.editMovie({movie: this.movies.movies.movieSelected.movie, noFilm: this.movieToEdit.noFilm, titre: this.movieToEdit.titre,
                            duree: this.movieToEdit.duree, dateSortie: this.movieToEdit.dateSortie, budget: this.movieToEdit.budget,
                            montantRecette: this.movieToEdit.montantRecette, noRea: this.movieToEdit.noRea, codeCat: this.movieToEdit.codeCat})
                    }
                }
                this.editing = false
                this.showModalCreateOrEditMovie = false
            },

            deleteAMovie(noFilm) {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
                    return this.deleteMovie(noFilm)
                } else {
                    return false
                }
            },
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

    .modal-mask {
        position: absolute;
        z-index: 9998;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
        overflow: hidden;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 600px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #1E1E1E;
        border-radius: 2px;
        color: #BB0B0B;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #BB0B0B;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    input, select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 2px solid black;
        border-radius: 4px;
        background-color: #BB0B0B;
        color: black;
    }

    .modal-button {
        background-color: #BB0B0B;
        border: none;
        color: #1E1E1E;
        padding: 12px 30px;
        text-align: center;
        text-decoration: none;
        margin-top: 10px;
        cursor: pointer;
        margin-right: 5px;
    }
</style>
