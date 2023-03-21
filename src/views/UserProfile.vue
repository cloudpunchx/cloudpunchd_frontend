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
        <section class="container">
            <div class="topFourContainer">
                <h4>FAVOURITE FILMS</h4>
                <v-divider class="divider" color="#adb5bd"></v-divider>
                <UserTopFour/>
            </div>
            <div class="recentlyWatchedContainer">
                <h4>RECENTLY WATCHED</h4>
                <v-divider class="divider" color="#adb5bd"></v-divider>
                <RecentlyWatched/>
            </div>
            <div class="reviewContainer">
                <h4>RECENT REVIEWS</h4>
                <v-divider class="divider3" color="#adb5bd"></v-divider>
                <UserReviews/>
            </div>
            <div class="sideSection">
                <div>
                    <h4>FILM LOG</h4>
                    <v-divider class="divider" color="#adb5bd"></v-divider>
                    <UserFilmLog/>
                </div>
                <div class="watchlistContainer">
                    <h4>WATCHLIST</h4>
                    <v-divider class="divider" color="#adb5bd"></v-divider>
                    <UserWatchlistMini/>
                </div>
            </div>
        </section>
        <div class="footer">
            <PageFooter/>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'
import UserTopFour from '@/components/UserTopFour.vue'
import RecentlyWatched from '@/components/RecentlyWatched.vue'
import UserReviews from '@/components/UserReviews.vue'
import UserFilmLog from '@/components/UserFilmLog.vue'
import UserWatchlistMini from '@/components/UserWatchlistMini.vue'
import PageFooter from '@/components/PageFooter.vue'

    export default {
        name: "UserProfile",
        components: {
            SignedInHeader,
            UserTopFour,
            RecentlyWatched,
            UserReviews,
            UserFilmLog,
            UserWatchlistMini,
            PageFooter
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
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
            getUserProfile(){
                axios.request({
                    url: this.apiUrl+"/user",
                    method: "GET",
                    headers: {
                        token: cookies.get(`sessionToken`)
                    },
                }).then((response)=>{
                    this.username = response.data.username;
                    this.firstName = response.data.firstName;
                    this.lastName = response.data.lastName;
                    this.email = response.data.email;
                    this.bio = response.data.bio;
                    this.profile_img = response.data.profileImg;
                }).catch((error)=>{
                    this.errorMsg = error;
                })
            },
        },
        created (){
            this.getUserProfile();
        }
    }
</script>

<style scoped>
.profileContainer{
    color: white;
    padding: 10px;
    position: relative;
    width: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 100px;
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
h4{
    color: #adb5bd;
}
.container{
    position: relative;
    width: 100%;
    background-color: #252422;
}
.divider{
    width: 34%;
}
.divider3{
    width: 100%;
}
.topFourContainer{
    margin-top: 30px;
    position: absolute;
    left: 20%;
}
.recentlyWatchedContainer{
    margin-top: 300px;
    position: absolute;
    left: 20%;
    flex: 1;
}
.reviewContainer{
    width: 600px;
    margin-top: 615px;
    position: absolute;
    left: 20%;
}
.sideSection{
    width: 50%;
    position: absolute;
    left: 60%;
}
.watchlistContainer{
    margin-top: 80px;
}
.footer{
    position: absolute;
    bottom: -100vh;
    width: 100%;
    background-color: #252422;
}
</style>