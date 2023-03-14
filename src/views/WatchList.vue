<template>
    <div>
        <SignedInHeader/>

        <!-- API CALL NOT WORKING -->
        <div>
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
                watchList: []
            }
        },
        methods: {
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            // FUNCTION NOT WORKING
            getUserWatchList() {
                axios.request({
                    // url: this.apiUrl+"/watchlist",
                    url: "http://127.0.0.1:5000/api/user-watchlist",
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
        },
        mounted () {
            this.getToken();
            this.getUserWatchList;
        },
    }
</script>

<style scoped>
.poster{
    height: 100%;
}
</style>