<template>
  <div class="d-flex flex-column mr-0 ml-auto min-vh-100" style="background-color: #BB0B0B; font-family: 'Avenir', Helvetica, Arial, sans-serif;">
    <header>
      <Menu/>
    </header>

    <router-view></router-view>

    <br />

    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import Menu from './components/menu/Menu'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Menu,
    Footer
  },
}
</script>

<style lang="scss">
  @import "./assets/custom.scss";
  @import "../node_modules/bootstrap/scss/bootstrap.scss";

  /*#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
    margin-top: 60px;
  }

  .layout {
    /*display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }

  html, body {
    height: 100%;
    min-height: 100%;
    background-color: #BB0B0B;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }*/
</style>
