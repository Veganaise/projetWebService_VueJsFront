<template>
    <div class="container-fluid footer">
        <p>&copy; {{ new Date().getFullYear() }} — <strong>Tous droits réservés</strong></p>
        <p>Réalisé par : GANNE Antoine, MARSANGY Dylan, PHILIBERT Laura, ROCCHIA Alicia et THIBOUD Pierre-Eliott</p>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .footer {
        position: relative;
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