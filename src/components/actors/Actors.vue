<template>
    <div class="actors">
        <!-- Modale create or update actor -->
        <transition name="modal" v-if="showModalCreateOrEditActor">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="row">
                            <div class="col-md-12 ml-auto">
                                <!--Titre modale pour créer un acteur-->
                                <h1 v-if="creating && !editing">Créer un acteur</h1>
                                <!--Titre modale pour modifier un acteur-->
                                <h1 v-if="!creating && editing">Modifier l'acteur n°{{actorToEdit.noAct}}</h1>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un acteur-->
                                <p v-if="creating && !editing">Nom<b-form-input class="h-100" type="text" name="nomAct" v-model="nomAct"/></p>
                                <!--Input pour modifier un acteur-->
                                <p v-if="!creating && editing">Nom<b-form-input class="h-100" type="text" name="editNomAct" v-model="actorToEdit.nomAct"/></p>
                            </div>
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un acteur-->
                                <p v-if="creating && !editing">Prénom<b-form-input class="h-100" type="text" name="prenAct" v-model="prenAct"/></p>
                                <!--Input pour modifier un acteur-->
                                <p v-if="!creating && editing">Prénom<b-form-input class="h-100" type="text" name="editPrenAct" v-model="actorToEdit.prenAct"/></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un acteur-->
                                <p v-if="creating && !editing">Date de naissance<b-form-input class="h-100" type="date" name="dateNaiss" v-model="dateNaiss"/></p>
                                <!--Input pour modifier un acteur-->
                                <p v-if="!creating && editing">Date de naissance<b-form-input class="h-100" type="date" name="editDateNaiss" v-model="actorToEdit.dateNaiss"/></p>
                            </div>
                            <div class="col-md-6 ml-auto">
                                <!--Input pour créer un acteur-->
                                <p v-if="creating && !editing">Date de décés<b-form-input class="h-100" type="date" name="dateDeces" v-model="dateDeces"/></p>
                                <!--Input pour modifier un acteur-->
                                <p v-if="!creating && editing">Date de décés<b-form-input class="h-100" type="date" name="editDateDeces" v-model="actorToEdit.dateDeces"/></p>
                            </div>
                        </div>
                        <br/>
                        <div class="modal-buttons">
                            <button class="modal-button" @click="hideCreateOrEditActor()">Cancel</button>
                            <button class="modal-button" v-if="creating && !editing" @click="confirmCreateActor()">Créer</button>
                            <button class="modal-button" v-if="!creating && editing" @click="confirmEditActor(actorToEdit.noAct)">Modifier</button>
                        </div>

                        <br/>
                        <span v-if="actors.error" class="text-danger">ERROR: {{actors.error}}</span>
                    </div>
                </div>
            </div>
        </transition>

        <b-button v-b-modal.modal-1 class="float-right" v-on:click="onClickCreateActor()">Créer un acteur</b-button>
        <br />
        <h2>Liste des acteurs</h2>
        <div>
            <div v-for="actor in actors" :key="actor.noAct">
                <b-card class="actor-card" bg-variant="dark" text-variant="white" v-for="(element, index) in actor.items" :key="index">
                    <template v-slot:header>
                        <h4 class="mb-0">{{element.nomAct}} {{element.prenAct}}</h4>
                        <img src="../../assets/icon/pencil-edit-button.png" @click="getAnActorToEdit(element)">
                        <img src="../../assets/icon/rubbish-bin.png" @click="deleteAnActor(element.noAct)">
                    </template>
                    <b-list-group flush>
                        <b-list-group-item variant="dark">Date de naissance : {{element.dateNaiss}}</b-list-group-item>
                        <b-list-group-item variant="dark" v-if="element.dateDeces !== null">Date de décés : {{element.dateDeces}}</b-list-group-item>
                        <router-link :to="`/actorDetails/${element.noAct}`">Voir + d'info</router-link>
                    </b-list-group>
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
                showModalCreateOrEditActor: false,
                creating: false,
                nomAct: '',
                prenAct: '',
                dateNaiss: '',
                dateDeces: '',

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
                this.showModalCreateOrEditActor = true
                this.creating = true
            },

            confirmCreateActor() {
                if(this.prenAct !== '' && this.nomAct !== '' && this.dateNaiss !== '') {
                    this.showModalCreateOrEditActor = false
                    this.creating = false
                    return this.createActor({nomAct: this.nomAct, prenAct: this.prenAct, dateNaiss: this.dateNaiss, dateDeces: this.dateDeces})
                }
            },

            hideCreateOrEditActor() {
                this.showModalCreateOrEditActor = false
                this.creating = false
                this.editing = false
            },

            async getAnActorToEdit(actor) {
                this.actorToEdit = actor
                this.editing = true
                this.showModalCreateOrEditActor = true
            },

            async confirmEditActor(noAct) {
                await this.getAnActor(noAct)
                if(this.actors.actors.actorSelected.actor.noAct === this.actorToEdit.noAct) {
                    if(this.actors.actors.actorSelected.actor.nomAct !== this.actorToEdit.nomAct && this.actorToEdit.nomAct !== ''
                    || this.actors.actors.actorSelected.actor.prenAct !== this.actorToEdit.prenAct && this.actorToEdit.prenAct !== ''
                    || this.actors.actors.actorSelected.actor.dateNaiss !== this.actorToEdit.dateNaiss && this.actorToEdit.dateNaiss !== ''
                    || this.actors.actors.actorSelected.actor.dateDeces !== this.actorToEdit.dateDeces) {
                        this.editing = false
                        this.showModalCreateOrEditActor = false
                        return this.editActor({actor: this.actors.actors.actorSelected.actor, noAct: this.actorToEdit.noAct,
                        nomAct: this.actorToEdit.nomAct, prenAct: this.actorToEdit.prenAct, dateNaiss: this.actorToEdit.dateNaiss,
                        dateDeces: this.actorToEdit.dateDeces})
                    }
                }
                this.editing = false
                this.showModalCreateOrEditActor = false
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
    .actor-card {
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