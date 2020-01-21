<template>
    <div class="categories">
        <!-- Modale pour créer ou modifier une catégorie -->
        <b-modal id="modalCreateOrEditCategory" header-bg-variant="dark" footer-bg-variant="dark" body-bg-variant="dark" hide-header-close>
            <template v-slot:modal-title>
                <!--Titre modale pour créer une catégorie-->
                <h1 class="text-white text-center" v-if="creating && !editing">Créer une catégorie</h1>
                <!--Titre modale pour modifier une catégorie-->
                <h1 class="text-white text-center" v-if="!creating && editing">Modifier la catégorie {{catToEdit.libelleCat}}</h1>
            </template>
            <b-container fluid>
                <div class="row">
                    <div class="col-md-12 ml-auto text-white">
                        <!--Titre modale pour créer une catégorie-->
                        <p v-if="creating && !editing">Code<b-form-input class="h-100" type="text" name="codeCat" v-model="codeCat"/></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 ml-auto text-white">
                        <!--Input pour créer une catégorie-->
                        <p v-if="creating && !editing">Libellé<b-form-input class="h-100" type="text" name="libelleCat" v-model="libelleCat"/></p>
                        <!--Input pour modifier une catégorie-->
                        <p v-if="!creating && editing">Libellé<b-form-input class="h-100" type="text" name="editLibelleCat" v-model="catToEdit.libelleCat"/></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 ml-auto text-white">
                        <!--Input pour créer une catégorie-->
                        <p v-if="creating && !editing">Image<b-form-input class="h-100" type="url" name="image" v-model="image"/></p>
                        <!--Input pour modifier une catégorie-->
                        <p v-if="!creating && editing">Image<b-form-input class="h-100" type="url" name="editImage" v-model="catToEdit.image"/></p>
                    </div>
                </div>
                <div class="row" v-if="errEmpty !== ''">
                    <div class="col-md-12 ml-auto text-danger text-center">
                        <span>{{errEmpty}}</span>
                    </div>
                </div>
            </b-container>
            <template v-slot:modal-footer>
                <b-button v-if="creating && !editing" @click="confirmCreateCategory()" style="background-color: #BB0B0B;" class="text-white">Créer</b-button>
                <b-button v-if="!creating && editing" @click="confirmEditCategory(catToEdit.codeCat)" style="background-color: #BB0B0B;" class="text-white">Modifier</b-button>
                <b-button @click="hideCreateOrEditCategory()" style="background-color: #BB0B0B;" class="text-white">Annuler</b-button>
            </template>
        </b-modal>

        <h2 class="mt-3 text-center"><strong>Liste des catégories  </strong><img src="../../assets/icon/plus_b.png" alt="plus" @click="onClickCreateCategory()"/></h2>
        <div>
            <div class="row justify-content-center" v-for="category in categories" :key="category.codeCat">
                <b-card class="text-center col-md-5 mt-3 mr-3 ml-3" bg-variant="dark" text-variant="white" v-for="(element, index) in category.items" :key="index">
                    <template v-slot:header>
                        <h4 class="mb-0">{{element.libelleCat}}
                            <img src="../../assets/icon/pencil-edit-button.png" @click="getACategoryToEdit(element)">
                            <img src="../../assets/icon/rubbish-bin.png" @click="deleteACategory(element.codeCat)">
                        </h4>
                    </template>
                    <img class="card-img-top" :src="element.image" :alt="element.libelleCat">
                    <br />
                    <router-link class="text-white pt-3" :to="`/moviesCategory/${element.codeCat}`">Voir les films de cette catégorie</router-link>
                </b-card>
                <br />
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
                creating: false,
                codeCat: '',
                libelleCat: '',
                image: '',
                errEmpty: '',

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
                this.$bvModal.show('modalCreateOrEditCategory')
                this.creating = true
            },

            confirmCreateCategory() {
                if(this.codeCat !== '' && this.libelleCat !== '' && this.image !== '') {
                    this.$bvModal.hide('modalCreateOrEditCategory')
                    this.creating = false
                    this.errEmpty = ''
                    return this.createCategory({codeCat: this.codeCat, libelleCat: this.libelleCat, image: this.image})
                } else {
                    this.errEmpty = "Veuillez renseigner correctement tous les champs svp"
                }
            },

            hideCreateOrEditCategory() {
                this.$bvModal.hide('modalCreateOrEditCategory')
                this.creating = false
                this.editing = false
            },

            async getACategoryToEdit(category) {
                this.catToEdit = category
                this.editing = true
                this.$bvModal.show('modalCreateOrEditCategory')
            },

            async confirmEditCategory(codeCat) {
                await this.getACategory(codeCat)
               if(this.categories.categories.categorySelected.category.codeCat === this.catToEdit.codeCat) {
                    if(this.categories.categories.categorySelected.category.libelleCat !== this.catToEdit.libelleCat
                        || this.categories.categories.categorySelected.category.image !== this.catToEdit.image) {

                        if(this.catToEdit.libelleCat !== '' && this.catToEdit.image !== '') {
                            this.editing = false
                            this.$bvModal.hide('modalCreateOrEditCategory')
                            return this.editCategory({category: this.categories.categories.categorySelected.category, codeCat: this.catToEdit.codeCat,
                                libelleCat: this.catToEdit.libelleCat, image: this.catToEdit.image})
                        } else {
                            this.catToEdit = this.categories.categories.categorySelected.category
                        }
                    }
                }
                this.editing = false
                this.$bvModal.hide('modalCreateOrEditCategory')
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
</style>