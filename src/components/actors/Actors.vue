<template>
    <div class="actors">
        <h2>Liste des acteurs</h2>
        <div>
            <div v-for="actor in actors" :key="actor.noAct">
                <b-card class="actor-card" bg-variant="dark" text-variant="white" v-for="(element, index) in actor.items" :key="index">
                    <template v-slot:header>
                        <h4 class="mb-0">{{element.nomAct}} {{element.prenAct}}</h4>
                    </template>
                    <b-list-group flush>
                        <b-list-group-item variant="dark">Date de naissance : {{element.dateNaiss}}</b-list-group-item>
                        <b-list-group-item variant="dark">Date de décés : {{element.dateDeces}}</b-list-group-item>
                        <b-list-group-item variant="dark"> {{getCharacters(element)}} Personnages :
                            <p v-for="(character, ind) in element.actorCharacters" :key="ind">
                                {{character.nomPers}}
                            </p>
                        </b-list-group-item>
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
                displayCharacters: false
            }
        },
        created() {
            this.fetchActors()
        },
        computed: {
            ...mapState({actors: state => state.actors}),
        },
        methods: {
            ...mapActions('actors', {fetchActors: 'fetchActors'}),
            ...mapActions('actors', ['getActorCharacters']),

            getCharacters(actor) {
                this.displayCharacters = true
                this.getActorCharacters(actor)
            },
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
</style>