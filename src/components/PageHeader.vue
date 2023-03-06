<template>
    <div>
        <!-- NO TOOLBAR -->
        <!-- SECTION TO HOLD ITEMS -->
        <!-- IMAGE, BRING TO TOP OF PAGE AND FADE OUT (THE DIV UNDER FADES OVER IT) -->


        <v-app-bar app color="#03181f">
            <img class="logo" src="../assets/cloudpunchdLogo.png" alt="Cloudpunchd Logo">
        </v-app-bar>


    </div>
</template>

<script>
    export default {
        name: "PageHeader"
    }
</script>

<style scoped>
.logo{
    width: 17vw;
    padding: 15px;
}
</style>