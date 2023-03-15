<template>
    <div>
        <SignedInHeader/>

        <section class="profileContainer">
            <v-avatar size="80"><v-img :src="profile_img"></v-img></v-avatar>
            <div class="userInfo">
                <h4>{{ username }}</h4>
                <h4>you want to watch {{ watchListCount }} films</h4>
            </div>
        </section>
        
        <div class="watchlistContainer">
            <v-row dense align-content="center" justify="center">
                <v-col
                v-for="movie in watchList"
                :key="movie.id"
                cols="1"
                >
                    <v-img
                        :src="movie.poster"
                        class="poster"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align-content="center"
                                justify="center"
                            >
                                <v-progress-circular
                                indeterminate
                                color="grey-lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'

    export default {
        name: "WatchList",
        components: {
            SignedInHeader
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                username: "",
                profile_img: "",
                watchList: [],
                watchListCount: null
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
                    this.profile_img = response.data.profile_img;
                }).catch((error)=>{
                    this.errorMsg = error;
                })
            },
            getUserWatchList() {
                axios.request({
                    url: this.apiUrl+"/user-watchlist",
                    method: "GET",
                    headers: {
                        token: this.token
                    }
                }).then((response)=>{
                    this.watchList = response.data;
                }).catch((error)=>{
                    console.log(error);
                })
            },
            getWatchListCount() {
                axios.request({
                    url: this.apiUrl+"/user-watchlist-count",
                    method: "GET",
                    headers: {
                        token: this.token
                    }
                }).then((response)=>{
                    this.watchListCount = response.data;
                }).catch((error)=>{
                    console.log(error);
                })
            }
        },
        mounted () {
            this.getToken();
            this.getUserWatchList();
            this.getUserProfile();
            this.getWatchListCount();
        },
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
.poster{
    height: 100%;
}
.watchlistContainer{
    margin-top: 50px;
}
</style>