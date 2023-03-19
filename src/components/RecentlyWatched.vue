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
                    :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                    >
                        <v-img
                            :src="movie.Poster"
                            :width="2000"
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
                        <v-rating
                        :value="parseFloat(movie.Rating)"
                        align="center"
                        half-increments
                        color="grey"
                        size="15"
                        dense
                        readonly
                        empty-icon
                        />
                    </router-link>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "RecentlyWatched",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movies: [],
            }
        },
        methods: {
            getRecentlyWatched() {
                axios.request({
                    url: this.apiUrl+"/user-recently-watched",
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
            this.getRecentlyWatched();
        },
    }
</script>

<style scoped>
.container{
    overflow: visible;
}
.poster{
    height: 100%;
    border: 1px rgb(97, 97, 97) solid;
    transition: transform 0.5s;
}
.poster:hover{
    transform: scale(1.05);
}
.v-application a {
    color: grey;
    text-decoration: none;
}
</style>