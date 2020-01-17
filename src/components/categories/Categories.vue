<template>
    <div class="categories">
        <!-- Modale create or update actor -->
        <transition name="modal" v-if="showModalCreateOrEditCategory">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="row">
                            <div class="col-md-12 ml-auto">
                                <!--Titre modale pour créer une catégorie-->
                                <h1 v-if="creating && !editing">Créer une catégorie</h1>
                                <!--Titre modale pour modifier une catégorie-->
                                <h1 v-if="!creating && editing">Modifier la catégorie {{catToEdit.libelleCat}}</h1>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 ml-auto">
                                <!--Titre modale pour créer une catégorie-->
                                <p v-if="creating && !editing">Code<b-form-input class="h-100" type="text" name="codeCat" v-model="codeCat"/></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 ml-auto">
                                <!--Input pour créer une catégorie-->
                                <p v-if="creating && !editing">Libellé<b-form-input class="h-100" type="text" name="libelleCat" v-model="libelleCat"/></p>
                                <!--Input pour modifier une catégorie-->
                                <p v-if="!creating && editing">Libellé<b-form-input class="h-100" type="text" name="editLibelleCat" v-model="catToEdit.libelleCat"/></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 ml-auto">
                                <!--Input pour créer une catégorie-->
                                <p v-if="creating && !editing">Image<b-form-input class="h-100" type="url" name="image" v-model="image"/></p>
                                <!--Input pour modifier une catégorie-->
                                <p v-if="!creating && editing">Image<b-form-input class="h-100" type="url" name="editImage" v-model="catToEdit.image"/></p>
                            </div>
                        </div>
                        <br/>

                        <div class="modal-buttons">
                            <button class="modal-button" @click="hideCreateOrEditCategory()">Cancel</button>
                            <button class="modal-button" v-if="creating && !editing" @click="confirmCreateCategory()">Créer</button>
                            <button class="modal-button" v-if="!creating && editing" @click="confirmEditCategory(catToEdit.codeCat)">Modifier</button>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        </transition>

        <b-button v-b-modal.modal-1 class="float-right" v-on:click="onClickCreateCategory()">Créer une catégorie</b-button>
        <br />
        <h2>Liste des catégories</h2>
        <div>
            <div v-for="category in categories" :key="category.codeCat">
                <b-card class="category-card" bg-variant="dark" text-variant="white" v-for="(element, index) in category.items" :key="index">
                    <template v-slot:header>
                        <h4 class="mb-0">{{element.libelleCat}}</h4>
                        <img src="../../assets/icon/pencil-edit-button.png" @click="getACategoryToEdit(element)">
                        <img src="../../assets/icon/rubbish-bin.png" @click="deleteACategory(element.codeCat)">
                    </template>
                    <img :src="element.image">
                    <br />
                    <router-link :to="`/moviesCategory/${element.codeCat}`">Voir les films de cette catégorie</router-link>
                </b-card>
                <span v-if="categories.categories.error !== '' && categories.categories.items === undefined">{{categories.categories.error}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Categories",
        data() {
            return {
                showModalCreateOrEditCategory: false,
                creating: false,
                codeCat: '',
                libelleCat: '',
                image: '',

                editing: false,
                catToEdit: ''
            }
        },
        created() {
            this.fetchCategories()
        },
        computed: {
            ...mapState({categories: state => state.categories}),
        },
        methods: {
            ...mapActions('categories', ['fetchCategories', 'createCategory', 'getACategory', 'editCategory', 'deleteCategory']),

            onClickCreateCategory() {
                this.showModalCreateOrEditCategory = true
                this.creating = true
            },

            confirmCreateCategory() {
                if(this.codeCat !== '' && this.libelleCat !== '' && this.image !== '') {
                    this.showModalCreateOrEditCategory = false
                    this.creating = false
                    return this.createCategory({codeCat: this.codeCat, libelleCat: this.libelleCat, image: this.image})
                }
            },

            hideCreateOrEditCategory() {
                this.showModalCreateOrEditCategory = false
                this.creating = false
                this.editing = false
            },

            async getACategoryToEdit(category) {
                this.catToEdit = category
                this.editing = true
                this.showModalCreateOrEditCategory = true
            },

            async confirmEditCategory(codeCat) {
                await this.getACategory(codeCat)
               if(this.categories.categories.categorySelected.category.codeCat === this.catToEdit.codeCat) {
                    if(this.categories.categories.categorySelected.category.libelleCat !== this.catToEdit.libelleCat && this.catToEdit.libelleCat !== ''
                        || this.categories.categories.categorySelected.category.image !== this.catToEdit.image && this.catToEdit.image !== '') {
                        this.editing = false
                        this.showModalCreateOrEditCategory = false
                        return this.editCategory({category: this.categories.categories.categorySelected.category, codeCat: this.catToEdit.codeCat,
                            libelleCat: this.catToEdit.libelleCat, image: this.catToEdit.image})
                    }
                }
                this.editing = false
                this.showModalCreateOrEditCategory = false
            },

            deleteACategory(codeCat) {
                if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
                    return this.deleteCategory(codeCat)
                } else {
                    return false
                }
            }
        }
    }
</script>

<style scoped>
    .category-card {
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