<template>
    <div class="actors">
        <!-- Modal pour créer ou éditer un acteur-->
        <b-modal id="modalCreateOrEditActor" header-bg-variant="dark" footer-bg-variant="dark" body-bg-variant="dark" hide-header-close>
            <template v-slot:modal-title>
                <!--Titre modale pour créer un acteur-->
                <h1 class="text-white text-center" v-if="creating && !editing">Créer un acteur</h1>
                <!--Titre modale pour modifier un acteur-->
                <h1 class="text-white text-center" v-if="!creating && editing">Modifier l'acteur n°{{actorToEdit.noAct}}</h1>
            </template>
            <b-container fluid>
                <div class="row">
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un acteur-->
                        <p v-if="creating && !editing">Nom<b-form-input class="h-100" type="text" name="nomAct" v-model="nomAct"/></p>
                        <!--Input pour modifier un acteur-->
                        <p v-if="!creating && editing">Nom<b-form-input class="h-100" type="text" name="editNomAct" v-model="actorToEdit.nomAct"/></p>
                    </div>
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un acteur-->
                        <p v-if="creating && !editing">Prénom<b-form-input class="h-100" type="text" name="prenAct" v-model="prenAct"/></p>
                        <!--Input pour modifier un acteur-->
                        <p v-if="!creating && editing">Prénom<b-form-input class="h-100" type="text" name="editPrenAct" v-model="actorToEdit.prenAct"/></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un acteur-->
                        <p v-if="creating && !editing">Date de naissance<b-form-input class="h-100" type="date" name="dateNaiss" v-model="dateNaiss"/></p>
                        <!--Input pour modifier un acteur-->
                        <p v-if="!creating && editing">Date de naissance<b-form-input class="h-100" type="date" name="editDateNaiss" v-model="actorToEdit.dateNaiss"/></p>
                    </div>
                    <div class="col-md-6 ml-auto text-white">
                        <!--Input pour créer un acteur-->
                        <p v-if="creating && !editing">Date de décés<b-form-input class="h-100" type="date" name="dateDeces" v-model="dateDeces"/></p>
                        <!--Input pour modifier un acteur-->
                        <p v-if="!creating && editing">Date de décés<b-form-input class="h-100" type="date" name="editDateDeces" v-model="actorToEdit.dateDeces"/></p>
                    </div>
                </div>
                <div class="row" v-if="errEmpty !== ''">
                    <div class="col-md-12 ml-auto text-danger text-center">
                        <span>{{errEmpty}}</span>
                    </div>
                </div>
            </b-container>
            <template v-slot:modal-footer>
                <b-button v-if="creating && !editing" @click="confirmCreateActor()" style="background-color: #BB0B0B;" class="text-white">Créer</b-button>
                <b-button v-if="!creating && editing" @click="confirmEditActor(actorToEdit.noAct)" style="background-color: #BB0B0B;" class="text-white">Modifier</b-button>
                <b-button @click="hideCreateOrEditActor()" style="background-color: #BB0B0B;" class="text-white">Annuler</b-button>
            </template>
        </b-modal>

        <h2 class="mt-3 text-center"><strong>Liste des acteurs  </strong><img src="../../assets/icon/plus_b.png" alt="plus" @click="onClickCreateActor()"/></h2>
        <div>
            <div v-for="actor in actors" :key="actor.noAct">
                <b-card class="mt-3 text-center mr-5 ml-5" bg-variant="dark" text-variant="white" v-for="(element, index) in actor.items" :key="index">
                    <template v-slot:header>
                        <h4 class="mb-0">{{element.prenAct}} {{element.nomAct}}
                            <img src="../../assets/icon/pencil-edit-button.png" @click="getAnActorToEdit(element)">
                            <img src="../../assets/icon/rubbish-bin.png" @click="deleteAnActor(element.noAct)">
                        </h4>
                    </template>
                    <b-list-group flush>
                        <b-list-group-item variant="dark"><strong>Date de naissance </strong> {{element.dateNaiss}}</b-list-group-item>
                        <b-list-group-item variant="dark" v-if="element.dateDeces !== null"><strong>Date de décés </strong> {{element.dateDeces}}</b-list-group-item>
                    </b-list-group>
                    <br />
                    <router-link class="text-white" :to="`/actorDetails/${element.noAct}`">Voir + d'info</router-link>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Actors",
        data() {
            return {
                creating: false,
                nomAct: '',
                prenAct: '',
                dateNaiss: null,
                dateDeces: null,
                errEmpty: '',

                editing: false,
                actorToEdit: ''
            }
        },
        created() {
            this.fetchActors()
        },
        computed: {
            ...mapState({actors: state => state.actors}),
        },
        methods: {
            ...mapActions('actors', ['fetchActors', 'createActor', 'getAnActor', 'editActor', 'deleteActor']),

            onClickCreateActor() {
                this.$bvModal.show('modalCreateOrEditActor')
                this.creating = true
            },

            confirmCreateActor() {
                if(this.prenAct !== '' && this.nomAct !== '' && this.dateNaiss !== null) {
                    this.$bvModal.hide('modalCreateOrEditActor')
                    this.creating = false
                    this.errEmpty = ''
                    return this.createActor({nomAct: this.nomAct, prenAct: this.prenAct, dateNaiss: this.dateNaiss, dateDeces: this.dateDeces})
                } else {
                    this.errEmpty = "Veuillez renseigner correctement tous les champs svp"
                }
            },

            hideCreateOrEditActor() {
                this.$bvModal.hide('modalCreateOrEditActor')
                this.creating = false
                this.editing = false
            },

            async getAnActorToEdit(actor) {
                this.actorToEdit = actor
                this.editing = true
                this.$bvModal.show('modalCreateOrEditActor')
            },

            async confirmEditActor(noAct) {
                await this.getAnActor(noAct)
                if(this.actors.actors.actorSelected.actor.noAct === this.actorToEdit.noAct) {
                    if(this.actors.actors.actorSelected.actor.nomAct !== this.actorToEdit.nomAct
                    || this.actors.actors.actorSelected.actor.prenAct !== this.actorToEdit.prenAct
                    || this.actors.actors.actorSelected.actor.dateNaiss !== this.actorToEdit.dateNaiss
                    || this.actors.actors.actorSelected.actor.dateDeces !== this.actorToEdit.dateDeces) {
                        if(this.actorToEdit.nomAct !== '' && this.actorToEdit.prenAct !== '' && this.actorToEdit.dateNaiss !== null) {
                            this.editing = false
                            this.$bvModal.hide('modalCreateOrEditActor')
                            return this.editActor({actor: this.actors.actors.actorSelected.actor, noAct: this.actorToEdit.noAct,
                                nomAct: this.actorToEdit.nomAct, prenAct: this.actorToEdit.prenAct, dateNaiss: this.actorToEdit.dateNaiss,
                                dateDeces: this.actorToEdit.dateDeces})
                        } else {
                            this.actorToEdit = this.actors.actors.actorSelected.actor
                            this.$router.go(0)
                        }
                    }
                }
                this.editing = false
                this.$bvModal.hide('modalCreateOrEditActor')
            },

            deleteAnActor(noAct) {
                if (confirm("Êtes-vous sûr de vouloir supprimer cet acteur ?")) {
                    return this.deleteActor(noAct)
                } else {
                    return false
                }
            }
        }
    }
</script>

<style scoped>
</style>