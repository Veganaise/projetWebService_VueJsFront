<template>
    <b-form
            id="movie"
            @submit="onSubmit"
    >
        <b-form-group
                id="nomAct-group"
                v-model="form.nomAct"
                label-for="nomAct"
        >
            <b-form-input
                    id="nomAct"
                    v-model="form.nomAct"
                    type="text"
                    placeholder="entrer nom"
            >
            </b-form-input>
        </b-form-group>

        <b-form-group
                id="prenAct-group"
                v-model="form.prenAct"
                label-for="prenAct"
        >
            <b-form-input
                    id="prenAct"
                    v-model="form.prenAct"
                    type="text"
                    placeholder="entrer prénom"
            >
            </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</template>

<script>
    import {HTTP} from '../../services/http-commons.js';

    export default {
        name: "InsertActorForm",
        data() {
            return{
                form: {
                    nomAct: '',
                    prenAct: '',
                    dateNaiss: '',
                    dateDeces: ''
                }
            }
        },
        methods:{
            onSubmit() {

                var data= "/actors/insertActor?";
                data=data+'nomAct='+ this.form.nomAct;
                data=data+'&prenAct='+ this.form.prenAct;
                data=data+'&dateNaiss'+ this.form.dateNaiss;
                data=data+'&dateDeces'+ this.form.dateDeces;
                // eslint-disable-next-line no-console
                console.log(data);


                HTTP.post( "/actors/insertActor?",{
                    nomAct: this.form.nomAct,
                    prenAct: this.form.prenAct,
                    dateNaiss: this.form.dateNaiss,
                    dateDeces: this.form.dateDeces
                })
                    .then(function (response) {
                        // eslint-disable-next-line no-console
                        console.log(response)
                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>

</style>