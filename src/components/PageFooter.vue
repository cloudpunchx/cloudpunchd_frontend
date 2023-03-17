<template>
    <v-footer
        class="text-center d-flex flex-column"
    >
        <div>
            <img src="../assets/cloudpunchMedia.png" alt="Cloudpunch Media">
        </div>
    </v-footer>
</template>

<script>

    export default {
        name: "PageFooter",
    }
</script>

<style scoped>
.v-footer{
    color: white;
    background-color: #252422;  
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 5px;
}
img{
    width: 200px;
}
</style>