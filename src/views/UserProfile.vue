<template>
    <div>
        <SignedInHeader/>

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
        <section class="topFourContainer">
            <h4>FAVOURITE FILMS</h4>
            <v-divider class="divider" color="#adb5bd"></v-divider>
            <UserTopFour/>
        </section>
        <section class="recentlyWatchedContainer">
            <h4>RECENTLY WATCHED</h4>
            <v-divider class="divider" color="#adb5bd"></v-divider>
            <RecentlyWatched/>
        </section>
        <PageFooter/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
// import router from '@/router';
import SignedInHeader from '@/components/SignedInHeader.vue'
import UserTopFour from '@/components/UserTopFour.vue'
import RecentlyWatched from '@/components/RecentlyWatched.vue'
import PageFooter from '@/components/PageFooter.vue'

    export default {
        name: "UserProfile",
        components: {
            SignedInHeader,
            UserTopFour,
            RecentlyWatched,
            PageFooter
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
                    url: this.apiUrl+"/user",
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
    padding: 10px;
    width: 50%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
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
    background-color: #4c9e9e;
}
.settingsLink{
    text-decoration: none;
}
.topFourContainer{
    color: #adb5bd;
    margin-top: 30px;
    position: fixed;
    left: 500px;
}
.divider{
    width: 34%;
}
.recentlyWatchedContainer{
    color: #adb5bd;
    margin-top: 300px;
    position: fixed;
    left: 500px;
}
</style>