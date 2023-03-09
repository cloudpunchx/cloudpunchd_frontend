<template>
    <div>
        <PageHeader/>
        <ImageFadeTemplate/>
        <section class="description">
            <h1>Track Your Films</h1>
            <h1>Share With Friends</h1>
            <v-btn @click="signUpPopOut" variant="tonal">
                CREATE AN ACCOUNT
            </v-btn>
            <div v-if="active" class="signUpPopOut">
                <UserSignup/>
            </div>

        </section>
    </div>
</template>

<script>
// import axios from "axios";
// import cookies from 'vue-cookies';
import PageHeader from '@/components/PageHeader.vue'
import ImageFadeTemplate from '@/components/ImageFadeTemplate.vue'
import UserSignup from '@/components/UserSignup.vue'

    export default {
        name: "HomePage",
        data() {
            return {
                active: false
            }
        },
        components: {
            PageHeader,
            ImageFadeTemplate,
            UserSignup
        },
        methods: {
            signUpPopOut() {
                this.active = !this.active;
            }
        }
        
    }
</script>

<style scoped>
h1{
    color: white;
    font-size: 2vw;
}
.description{
    text-align: center;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}
.v-btn{
    margin-top: 30px;
    width: 300px;
}
.signUpPopOut{
    position: absolute;
    top: -220%;
    left: 50%;
    transform: translateX(-50%);
    width: 30vw;
}
</style>