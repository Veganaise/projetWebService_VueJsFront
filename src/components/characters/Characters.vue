<template>
    <div class="characters">
        <!-- Modal pour créer ou éditer un personnage-->
        <b-modal id="modalCreateOrEditCharacter" header-bg-variant="dark" footer-bg-variant="dark" body-bg-variant="dark" hide-header-close>
            <template v-slot:modal-title>
                <!--Titre modale pour créer un personnage-->
                <h1 class="text-white text-center" v-if="creating && !editing">Créer un personnage</h1>
                <!--Titre modale pour modifier un personnage-->
                <h1 class="text-white text-center" v-if="!creating && editing">Modifier le personnage {{characterToEdit.nomPers}}</h1>
            </template>
            <b-container fluid>
                <div class="row">
                    <div class="col-md-12 ml-auto text-white">
                        <!--Input pour créer un personnage-->
                        <p v-if="creating && !editing">Nom<b-form-input class="h-100" type="text" name="nomPers" v-model="nomPers"/></p>
                        <!--Input pour modifier un personnage-->
                        <p v-if="!creating && editing">Nom<b-form-input class="h-100" type="text" name="editNomPers" v-model="characterToEdit.nomPers"/></p>
                    </div>
                </div>
                <div class="row" v-if="renderMovies">
                    <div class="col-md-12 ml-auto text-white">
                        <!--Input pour créer un personnage-->
                        <p v-if="creating && !editing">Film<b-form-select class="h-100" name="movie" v-for="movie in movies" :key="movie.noFilm" v-model="noFilm">
                            <option v-for="(element, index) in movie.items" :key="index" :value="element.noFilm">{{element.titre}}</option>
                        </b-form-select></p>
                        <!--Input pour modifier un personnage-->
                        <p v-if="!creating && editing">Film<b-form-select class="h-100" name="editMovie" v-for="movie in movies" :key="movie.noFilm" v-model="characterToEdit.noFilm">
                            <option v-for="(element, index) in movie.items" :key="index" :value="element.noFilm">{{element.titre}}</option>
                        </b-form-select></p>
                    </div>
                </div>
                <div class="row" v-if="renderActors">
                    <div class="col-md-12 ml-auto text-white">
                        <!--Input pour créer un personnage-->
                        <p v-if="creating && !editing">Acteur<b-form-select class="h-100" name="actor" v-for="actor in actors" :key="actor.noAct" v-model="noAct">
                            <option v-for="(element, index) in actor.items" :key="index" :value="element.noAct">{{element.prenAct}} {{element.nomAct}}</option>
                        </b-form-select></p>
                        <!--Input pour modifier un personnage-->
                        <p v-if="!creating && editing">Acteur<b-form-select class="h-100" name="editActor" v-for="actor in actors" :key="actor.noAct" v-model="characterToEdit.noAct">
                            <option v-for="(element, index) in actor.items" :key="index" :value="element.noAct">{{element.prenAct}} {{element.nomAct}}</option>
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
                <b-button v-if="creating && !editing" @click="confirmCreateCharacter()" style="background-color: #BB0B0B;" class="text-white">Créer</b-button>
                <b-button v-if="!creating && editing" @click="confirmEditCharacter(characterToEdit.noFilm, characterToEdit.noAct)" style="background-color: #BB0B0B;" class="text-white">Modifier</b-button>
                <b-button @click="hideCreateOrEditCharacter()" style="background-color: #BB0B0B;" class="text-white">Annuler</b-button>
            </template>
        </b-modal>

        <h2 class="mt-3 text-center"><strong>Liste des personnages  </strong><img src="../../assets/icon/plus_b.png" alt="plus" @click="onClickCreateCharacter()"/></h2>
        <div>
            <div class="row justify-content-center" v-for="character in characters" :key="(character.noFilm, character.noAct)">
                <b-card class="text-center col-md-5 mt-3 mr-3 ml-3" bg-variant="dark" text-variant="white" v-for="(element, index) in character.items" :key="index">
                    <template v-slot:header>
                        <h4 class="mb-0">{{element.nomPers}}
                            <img src="../../assets/icon/pencil-edit-button.png" @click="getACharacterToEdit(element)">
                            <img src="../../assets/icon/rubbish-bin.png" @click="deleteACharacter(element.noFilm, element.noAct)">
                        </h4>
                    </template>
                    <b-list-group flush>
                        <b-list-group-item variant="dark">
                            <strong>Film</strong>
                            <div v-for="movie in movies" :key="movie.noFilm">
                                <div v-for="(element2, index2) in movie.items" :key="index2" :value="element2.noFilm">
                                    <p v-if="element2.noFilm === element.noFilm">{{element2.titre}}</p>
                                </div>
                            </div>
                        </b-list-group-item>
                        <b-list-group-item variant="dark">
                            <strong>Acteur</strong>
                            <div v-for="actor in actors" :key="actor.noAct">
                                <div v-for="(element3, index3) in actor.items" :key="index3" :value="element3.noAct">
                                    <p v-if="element3.noAct === element.noAct">{{element3.prenAct}} {{element3.nomAct}}</p>
                                </div>
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Characters",
        data() {
            return {
                creating: false,
                noFilm: '',
                noAct: '',
                nomPers: '',
                errEmpty: '',

                editing: false,
                characterToEdit: '',

                renderMovies: false,
                renderActors: false
            }
        },
        created() {
            this.fetchCharacters()

            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'characters/fetchCharactersSuccess') {
                    this.fetchMovies()
                }
            })

            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'movies/fetchMoviesSuccess') {
                    this.renderMovies = true
                    this.fetchActors()
                }
            })

            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'actors/fetchActorsSuccess') {
                    this.renderActors = true
                }
            })
        },
        computed: {
            ...mapState({characters: state => state.characters}),
            ...mapState({movies: state => state.movies}),
            ...mapState({actors: state => state.actors}),
        },
        methods: {
            ...mapActions('characters', ['fetchCharacters', 'createCharacter', 'getACharacter', 'editCharacter', 'deleteCharacter']),
            ...mapActions('movies', ['fetchMovies']),
            ...mapActions('actors', ['fetchActors']),

            onClickCreateCharacter() {
                this.$bvModal.show('modalCreateOrEditCharacter')
                this.creating = true
            },

            confirmCreateCharacter() {
                if(this.nomPers !== '' && this.noFilm !== '' && this.noAct !== '') {
                    this.$bvModal.hide('modalCreateOrEditCharacter')
                    this.creating = false
                    this.errEmpty = ''
                    return this.createCharacter({noFilm: this.noFilm, noAct: this.noAct, nomPers: this.nomPers})
                } else {
                    this.errEmpty = "Veuillez renseigner correctement tous les champs svp"
                }
            },

            hideCreateOrEditCharacter() {
                this.$bvModal.hide('modalCreateOrEditCharacter')
                this.creating = false
                this.editing = false
            },

            async getACharacterToEdit(character) {
                this.characterToEdit = character
                this.editing = true
                this.$bvModal.show('modalCreateOrEditCharacter')
            },

            async confirmEditCharacter(noFilm, noAct) {
                await this.getACharacter({noFilm: noFilm, noAct: noAct})
                if(this.characters.characters.charactersSelected.character.noFilm !== this.characterToEdit.noFilm
                    || this.characters.characters.charactersSelected.character.noAct !== this.characterToEdit.noAct
                    || this.characters.characters.charactersSelected.character.nomPers !== this.characterToEdit.nomPers) {

                    if(this.characterToEdit.noFilm !== '' && this.characterToEdit.noAct !== '' && this.characterToEdit.nomPers) {
                        this.editing = false
                        this.$bvModal.hide('modalCreateOrEditCharacter')
                        return this.editCharacter({character: this.characters.characters.charactersSelected.character, noFilm: this.characterToEdit.noFilm,
                            noAct: this.characterToEdit.noAct, nomPers: this.characterToEdit.nomPers})
                        } else {
                        this.characterToEdit = this.characters.characters.charactersSelected.character
                        this.$router.go(0)
                    }
                }
                this.editing = false
                this.$bvModal.hide('modalCreateOrEditCharacter')
            },

            deleteACharacter(noFilm, noAct) {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce personnage ?")) {
                    return this.deleteCharacter({noFilm: noFilm, noAct: noAct})
                } else {
                    return false
                }
            }
        }
    }
</script>

<style scoped>
</style>