<template>
  <div id="app">
    <img class="img" alt="Vue logo" src="./assets/images/background.jpg">
    <h1> Projet WebServices sur le 7ème art! 🍿 </h1>
    <MoviesResultSet/>
  </div>
</template>

<script>
import MoviesResultSet from "@/components/movies/MoviesResultSet";


export default {
  name: 'app',
  components: {
    MoviesResultSet
  },
  created() {

  }
}
</script>

<style lang="scss">
  @import "./assets/custom.scss";
  @import "../node_modules/bootstrap/scss/bootstrap.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .img{
    max-width: 100%;
    max-height: 900px;
  }
</style>
