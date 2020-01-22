<template>
    <div class="directors">
        <!-- Modal pour créer ou éditer un réalisateur-->
        <b-modal id="modalCreateOrEditDirector" header-bg-variant="dark" footer-bg-variant="dark" body-bg-variant="dark" hide-header-close>
            <template v-slot:modal-title>
                <!--Titre modale pour créer un réalisateur-->
                <h1 class="text-white text-center" v-if="creating && !editing">Créer un réalisateur</h1>
                <!--Titre modale pour modifier un réalisateur-->
                <h1 class="text-white text-center" v-if="!creating && editing">Modifier le réalisateur n°{{directorToEdit.noRea}}</h1>
            </template>
            <b-container fluid>
                <div class="row">
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un réalisateur-->
                        <p v-if="creating && !editing">Nom<b-form-input class="h-100" type="text" name="nomRea" v-model="nomRea"/></p>
                        <!--Input pour modifier un réalisateur-->
                        <p v-if="!creating && editing">Nom<b-form-input class="h-100" type="text" name="editNomRea" v-model="directorToEdit.nomRea"/></p>
                    </div>
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un réalisateur-->
                        <p v-if="creating && !editing">Prénom<b-form-input class="h-100" type="text" name="prenRea" v-model="prenRea"/></p>
                        <!--Input pour modifier un réalisateur-->
                        <p v-if="!creating && editing">Prénom<b-form-input class="h-100" type="text" name="editPrenRea" v-model="directorToEdit.prenRea"/></p>
                    </div>
                </div>
                <div class="row" v-if="errEmpty !== ''">
                    <div class="col-md-12 ml-auto text-danger text-center">
                        <span>{{errEmpty}}</span>
                    </div>
                </div>
            </b-container>
            <template v-slot:modal-footer>
                <b-button v-if="creating && !editing" @click="confirmCreateDirector()" style="background-color: #BB0B0B;" class="text-white">Créer</b-button>
                <b-button v-if="!creating && editing" @click="confirmEditDirector(directorToEdit.noRea)" style="background-color: #BB0B0B;" class="text-white">Modifier</b-button>
                <b-button @click="hideCreateOrEditDirector()" style="background-color: #BB0B0B;" class="text-white">Annuler</b-button>
            </template>
        </b-modal>

        <h2 class="mt-3 text-center"><strong>Liste des réalisateurs  </strong><img src="../../assets/icon/plus_b.png" alt="plus" @click="onClickCreateDirector()"/></h2>
        <div>
            <div class="row justify-content-center" v-for="director in directors" :key="director.noRea">
                <b-card class="text-center col-md-5 mt-3 mr-3 ml-3" bg-variant="dark" text-variant="white" v-for="(element, index) in director.items" :key="index">
                    <template v-slot:header>
                        <h4 class="mb-0">{{element.prenRea}} {{element.nomRea}}
                            <img src="../../assets/icon/pencil-edit-button.png" @click="getADirectorToEdit(element)">
                            <img src="../../assets/icon/rubbish-bin.png" @click="deleteADirector(element.noRea)">
                        </h4>
                    </template>
                    <router-link class="text-white pt-3" :to="`/moviesDirector/${element.noRea}?nomRea=${element.nomRea}&prenRea=${element.prenRea}`">Voir les films de ce réalisateur</router-link>
                </b-card>
                </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Directors",
        data() {
            return {
                creating: false,
                nomRea: '',
                prenRea: '',
                errEmpty: '',

                editing: false,
                directorToEdit: ''
            }
        },
        created() {
            this.fetchDirectors()
        },
        computed: {
            ...mapState({directors: state => state.directors}),
        },
        methods: {
            ...mapActions('directors', ['fetchDirectors', 'createDirector', 'getADirector', 'editDirector', 'deleteDirector']),

            onClickCreateDirector() {
                this.$bvModal.show('modalCreateOrEditDirector')
                this.creating = true
            },

            confirmCreateDirector() {
                if(this.prenRea !== '' && this.nomRea !== '') {
                    this.$bvModal.hide('modalCreateOrEditDirector')
                    this.creating = false
                    this.errEmpty = ''
                    return this.createDirector({nomRea: this.nomRea, prenRea: this.prenRea})
                } else {
                    this.errEmpty = "Veuillez renseigner correctement tous les champs svp"
                }
            },

            hideCreateOrEditDirector() {
                this.$bvModal.hide('modalCreateOrEditDirector')
                this.creating = false
                this.editing = false
            },

            async getADirectorToEdit(director) {
                this.directorToEdit = director
                this.editing = true
                this.$bvModal.show('modalCreateOrEditDirector')
            },

            async confirmEditDirector(noRea) {
                await this.getADirector(noRea)
                if(this.directors.directors.directorSelected.director.noRea === this.directorToEdit.noRea) {
                    if(this.directors.directors.directorSelected.director.nomRea !== this.directorToEdit.nomRea
                        || this.directors.directors.directorSelected.director.prenRea !== this.directorToEdit.prenRea) {

                        if(this.directorToEdit.nomRea !== '' && this.directorToEdit.prenRea !== '') {
                            this.editing = false
                            this.$bvModal.hide('modalCreateOrEditDirector')
                            return this.editDirector({director: this.directors.directors.directorSelected.director, noRea: this.directorToEdit.noRea,
                                nomRea: this.directorToEdit.nomRea, prenRea: this.directorToEdit.prenRea})
                        } else {
                            this.directorToEdit = this.directors.directors.directorSelected.director
                            this.$router.go(0)
                        }
                    }
                }
                this.editing = false
                this.$bvModal.hide('modalCreateOrEditDirector')
            },

            deleteADirector(noRea) {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce réalisateur ?")) {
                    return this.deleteDirector(noRea)
                } else {
                    return false
                }
            }
        }
    }
</script>

<style scoped>
</style>