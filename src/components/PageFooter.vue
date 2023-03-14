<template>
    <v-footer
        class="text-center d-flex flex-column"
    >
        <!-- <div> -->
            <!-- Leaving off on adding social media icons, but not sure if we need them since this website doesnt have other accounts? -->
            <!-- https://pictogrammers.com/library/mdi/ -->
            <!-- https://vuetifyjs.com/en/components/icons/#props -->
            <!-- <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4"
                :icon="icon"
                variant="text"
            ></v-btn>
        </div> -->

        <div>
            <img src="../assets/cloudpunchMedia.png" alt="Cloudpunch Media">
        </div>
    </v-footer>
</template>

<script>

    export default {
        name: "PageFooter",
        data() {
            return {
                icons: [
                    'mdi-facebook',
                    'mdi-twitter',
                    'mdi-linkedin',
                    'mdi-instagram',
                ],
            }
        },
    }
</script>

<style scoped>
.v-footer{
    color: white;
    background-color: #242423;  
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 30px;
}
img{
    width: 200px;
}
</style>