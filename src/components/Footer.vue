<template>
    <div class="container-fluid footer">
        <p>&copy; {{ new Date().getFullYear() }} — <strong>Tous droits réservés</strong></p>
        <p>Réalisé par : GANNE Antoine, MARSANGY Dylan, Laura PHILIBERT, Alicia ROCCHIA et Pierre-Eliott THIBOUD</p>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .footer {
        position: fixed;
        bottom: 0;
        height: 80px;
        background-color: #353A40;
        text-align: center;
        color: darkgrey;
    }

    p{
        margin-top: 20px;
        line-height:5px;
    }
</style>