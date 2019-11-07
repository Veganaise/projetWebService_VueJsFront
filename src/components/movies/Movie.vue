<template>
    <b-card
            style="max-width: 20rem;"
            :title="titre"
    >
        <b-card-text>durée: {{duree}}</b-card-text>
        <b-card-text>dateSortie: {{dateSortie}}</b-card-text>
        <b-card-text>montant recette: {{montantRecette}}</b-card-text>
    </b-card>
</template>

<script>
    export default {
        name: "Movie",
        props:{
            titre: String,
            duree: Number,
            dateSortie: String,
            budget: Number,
            montantRecette: Number,
        }
    }
</script>

<style scoped>

</style>