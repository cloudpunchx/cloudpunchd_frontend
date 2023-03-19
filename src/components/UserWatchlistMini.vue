<template>
    <div>
        <div class="container">
            <v-row dense justify="start">
                <v-col
                v-for="movie in movies"
                :key="movie.ID"
                cols="1"
                >
                    <router-link
                    :to="username+'/watchlist'"
                    >
                        <v-img
                            :src="movie.Poster"
                            :width="100"
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
                    </router-link>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<!-- WANT TO LIMIT THIS TO 4 - slice? -->

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "UserWatchlistMini",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movies: [],
            }
        },
        methods: {
            getUserWatchList() {
                axios.request({
                    url: this.apiUrl+"/user-watchlist",
                    method: "GET",
                    headers: {
                        token: cookies.get(`sessionToken`)
                    }
                }).then((response)=>{
                    this.movies = response.data;
                }).catch((error)=>{
                    console.log(error);
                })
            },
        },
        created () {
            this.getUserWatchList();
        },
    }
</script>

<style scoped>
.poster{
    height: 100%;
    border: 1px rgb(97, 97, 97) solid;
}
.poster:hover{
    transform: scale(1.05);
}
.watchlistContainer{
    margin-top: 50px;
}
</style>