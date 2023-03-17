<template>
    <div>
        <div class="header">
            <SignedInHeader/>
        </div>
        <div class="titleContainer">
            <h1>Welcome back {{ username }}, let's find something to watch.</h1>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'

    export default {
        name: "SignedInHome",
        components: {
            SignedInHeader
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                username: ""
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
    background-color: #212120;
}
.titleContainer{
    color: white;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;
}
</style>