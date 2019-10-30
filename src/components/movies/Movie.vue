<template>
    <div class="column is-2 has-text-centered">
        <div class="card">
            <div class="card-content">
                <h1>{{titre}}</h1>
                <p>durée: {{duree}}</p>
                <p>dateSortie: {{dateSortie}}</p>
                <p>budget: {{budget}}</p>
                <p>montant recette: {{montantRecette}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Movie",
        props:{
            titre: String,
            duree: Number,
            dateSortie: Date,
            budget: Number,
            montantRecette: Number,
        }
    }
</script>

<style scoped>
.card{
    border: dimgray 3px solid;
}
</style>