<template>
  <div class="layout" style="background-color: #BB0B0B;">
    <Menu/>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>

    <Footer/>
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

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
    margin-top: 60px;
  }

  footer {
    clear: both;
    position: relative;
    height: 200px;
    margin-top: -200px;
  }

  .layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  html {
    background-color: #BB0B0B;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
