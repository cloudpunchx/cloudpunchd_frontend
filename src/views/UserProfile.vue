<template>
    <div>
        <SignedInHeader/>

        <!-- LEAVING OFF STYLING PROFILE -->

        <section class="profileContainer">
            <v-avatar size="150"><v-img :src="profile_img"></v-img></v-avatar>
            <div class="userInfo">
                <h2>{{ username }}</h2>
                <p class="bio">{{ bio }}</p>
                <router-link to="/settings" class="settingsLink">
                    <v-btn variant="tonal">
                    EDIT PROFILE
                    </v-btn>
                </router-link>
            </div>
        </section>

    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'

    export default {
        name: "UserProfile",
        components: {
            SignedInHeader,
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
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
            getUserProfile(){
                axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "GET",
                    headers: {
                        token: this.token
                    },
                }).then((response)=>{
                    this.username = response.data.username;
                    this.firstName = response.data.firstName;
                    this.lastName = response.data.lastName;
                    this.email = response.data.email;
                    this.bio = response.data.bio;
                    this.profile_img = response.data.profile_img;
                }).catch((error)=>{
                    this.errorMsg = error;
                })
            },
        },
        created (){
            this.getToken();
            this.getUserProfile();
        }
    }
</script>

<style scoped>
.profileContainer{
    color: white;
    background-color: #212120;
    padding: 10px;
    width: 50%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
.userInfo{
    display: inline-block;
    vertical-align: middle;
    margin-left: 30px;
}
.bio{
    margin-top: 10px;
}
.v-btn{
    font-size: 8pt;
    width: 100px;
}
.v-btn:hover {
    background-color: #ffc300;
}
.settingsLink{
    text-decoration: none;
}

</style>