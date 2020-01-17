<template>
    <div>
        <p>{{noAct}}</p>
        <div v-if="renderComponent && actors.actors.actorSelected === undefined">
            <a @click="forceRerender()">Force Reload</a>
        </div>
        <div v-if="renderComponent && actors.actors.actorSelected !== undefined">
            <p>{{actors.actors.actorSelected.actor.nomAct}}</p>
            <p>{{actors.actors.actorSelected.actor.prenAct}}</p>
            <p>{{actors.actors.actorSelected.actor.dateNaiss}}</p>
            <p>{{actors.actors.actorSelected.actor.dateDeces}}</p>
            <div v-for="character in characters" :key="character.noFilm">
                <p v-for="(element, index) in character.charactersSelected.character" :key="index" :value="element.nomPers">
                    A joué {{element.nomPers}} dans le film {{element.filmByNoFilm.titre}} du réalisateur {{element.filmByNoFilm.realisateurByNoRea.prenRea}} {{element.filmByNoFilm.realisateurByNoRea.nomRea}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "ActorDetails",
        data() {
            return {
                noAct: this.$route.params.id,
                renderComponent: true
            }
        },
        created() {
            this.getAnActor(this.noAct)
            this.getActorCharacters(this.noAct)
        },
        mounted() {
            this.forceRerender()
        },
        computed: {
            ...mapState({actors: state => state.actors}),
            ...mapState({characters: state => state.characters})
        },
        methods: {
            ...mapActions('actors', ['getAnActor']),
            ...mapActions('characters', ['getActorCharacters']),

            forceRerender() {
                // Remove my-component from the DOM
                this.renderComponent = false

                this.$nextTick(() => {
                    // Add the component back in
                    this.renderComponent = true
                });
            }
        },
    }
</script>

<style scoped>

</style>