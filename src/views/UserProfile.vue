<template>
    <div>
        <SignedInHeader/>
        <section class="profileContainer" v-for="user in users" :key="user.id">
            <v-avatar :src="user.profile_img" size="80"></v-avatar>
            <h3>{{ user.username }}</h3>
            <p>{{ user.bio }}</p>
        </section>
    </div>
</template>

<!-- cookies aren't saving in browser, so that why its not loading -->

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'

    export default {
        name: "UserProfile",
        components: {
            SignedInHeader
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                users: [],
                token: "",
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                bio: "",
                profile_img: "",
                errorMsg: "",
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
                    params: {
                        userId: this.$route.params.id
                    }
                }).then((response)=>{
                    this.users = response.data;
                }).catch((error)=>{
                    this.errorMsg = error;
                })
            },
        },
        created (){
            this.getToken();
            this.get_user_profile();
        }
    }
</script>

<style scoped>
.profileContainer{
    color: black;
    background-color: whitesmoke;
}
</style>