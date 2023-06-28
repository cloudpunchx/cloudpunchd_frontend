<!-- leaving off styling profile -->

<template>
    <div>
        <div v-if="token" class="header">
            <SignedInHeader/>
        </div>
        <div v-else>
            <PageHeader class="header"/>
        </div>
        
        <div class="parentContainer">
            <v-container class="profileContainer">
                <v-row 
                dense
                >
                    <v-col
                    cols="2"
                    md="3"
                    lg="3"
                    >
                        <v-avatar size="150"><v-img :src="profile_img"></v-img></v-avatar>
                    </v-col>

                    <v-col
                    cols="2"
                    md="2"
                    lg="2"
                    >
                        <div class="userInfo">
                            <h2>{{ username }}</h2>
                            <p class="bio">{{ bio }}</p>
                        </div>
                    </v-col>

                    <v-col
                    cols="2"
                    md="1"
                    lg="1"
                    >
                        <div>
                            <router-link to="/settings">
                                <v-btn
                                small
                                >
                                EDIT PROFILE
                                </v-btn>
                            </router-link>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div class="parentContainer">
            <v-container class="contentContainer">
                <v-row>
                    <v-col cols="12" md="12" lg="8">
                    <div class="favFilmContainer">
                        <h4>FAVOURITE FILMS</h4>
                        <v-divider class="divider" color="#adb5bd"></v-divider>
                        <UserTopFour/>
                    </div>
                    </v-col>
                    <v-col cols="12" md="12" lg="4">
                    <v-row>
                        <v-col cols="12">
                        <div class="sideSection">
                            <h4>FILM LOG</h4>
                            <v-divider class="divider" color="#adb5bd"></v-divider>
                            <UserFilmLog/>
                        </div>
                        </v-col>
                        <v-col cols="12">
                        <div class="watchlistContainer">
                            <h4>WATCHLIST</h4>
                            <v-divider class="divider" color="#adb5bd"></v-divider>
                            <UserWatchlistMini/>
                        </div>
                        </v-col>
                    </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" lg="8">
                    <div class="recentlyWatchedContainer">
                        <h4>RECENTLY WATCHED</h4>
                        <v-divider class="divider" color="#adb5bd"></v-divider>
                        <RecentlyWatched/>
                    </div>
                    </v-col>
                    <v-col cols="12" md="12" lg="4">
                    <!-- Placeholder column for spacing -->
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" lg="8">
                    <div class="reviewContainer">
                        <h4>RECENT REVIEWS</h4>
                        <v-divider class="divider3" color="#adb5bd"></v-divider>
                        <UserReviews/>
                    </div>
                    </v-col>
                    <v-col cols="12" md="12" lg="4">
                    <!-- Placeholder column for spacing -->
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div class="footer">
            <PageFooter/>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'
import PageHeader from '@/components/PageHeader.vue'
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
            PageHeader,
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
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
        },
        created (){
            this.getUserProfile();
            this.getToken();
        },
    }
</script>

<style scoped>
.parentContainer{
    color: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.profileContainer{
    border-radius: 10px;
    margin-top: 150px;
}
.contentContainer{
    width: 50%;
    background-color: #242730e3;
    border-radius: 10px;
    margin-top: 380px;
}
.parentContainer2 {
    position: absolute;
    right: 23%;
    top: 150px;
    margin-top: 230px;
}

.contentContainer2 {
    background-color: #242730e3;
    border-radius: 10px;
    padding: 20px;
}
.userInfo{
    width: 500px;
}
.v-btn{
    font-size: .7rem;
    width: 100px;
}
.v-btn:hover{
    color: white;
    background-color: #ffd60a;
}
h4{
    color: #adb5bd;
}
.footer{
    padding-top: 1000px;
    position: absolute;
    bottom: -100vh;
    width: 100%;
    background-color: #001219;
    z-index: -1;
}

</style>