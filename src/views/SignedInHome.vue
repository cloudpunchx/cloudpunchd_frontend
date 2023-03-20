<template>
    <div>
        <div class="header">
            <SignedInHeader/>
        </div>
        <div class="titleContainer">
            <div class="title">
                <h2>Welcome back {{ username }}, let's find something to watch.</h2>
            </div>
            <div>
                <FeaturedMovies/>
            </div>
            
        </div>

        <PageFooter/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import FeaturedMovies from '@/components/FeaturedMovies.vue'

    export default {
        name: "SignedInHome",
        components: {
            SignedInHeader,
            FeaturedMovies,
            PageFooter
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                username: "",
            }
        },
        methods: {
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            get_user_profile(){
                axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "GET",
                    headers: {
                        token: this.token
                    },
                }).then((response)=>{
                    this.username = response.data.username;
                }).catch((error)=>{
                    this.feedbackMsg = error;
                })
            },
        },
        mounted (){
            this.getToken();
            this.get_user_profile();
        }
    }
</script>

<style scoped>
.header{
    background-color: #252422;
}
.titleContainer{
    color: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 150px;
}
.title{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>