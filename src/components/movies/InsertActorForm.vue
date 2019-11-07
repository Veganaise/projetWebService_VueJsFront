<template>
    <b-form
            id="movie"
            action="http://localhost:8080/actors/insertActor"
            method="post"
    >
        <b-form-group
                id="nomAct-group"
                v-model="form.nomAct"
                label-for="nomAct"
                description="nom"
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
                description="nom"
        >
            <b-form-input
                    id="prenAct"
                    v-model="form.prenAct"
                    type="text"
                    placeholder="entrer nom"
            >
            </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</template>

<script>
    export default {
        name: "InsertActorForm",
        data() {
            return{
                form: {
                    nomAct: '',
                    prenAct: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>