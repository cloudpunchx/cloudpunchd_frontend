<template>
    <div class="boxContainer">
        <v-row dense align-content="center" justify="center">
            <v-col
            v-for="movie in movies"
            :key="movie.id"
            cols="1"
            >   
                <router-link
                :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                >
                    <v-img
                    :src="movie.Poster"
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
</template>

<script>
import axios from "axios";

    export default {
        name: "FeaturedMovies",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movies: [],
            }
        },
        methods: {
            getFeaturedMovies() {
                axios.request({
                    url: this.apiUrl+"/movies-featured",
                    method: "GET",
                }).then((response)=>{
                    this.movies = response.data;
                }).catch((error)=>{
                    console.log(error);
                })
            },
        },
        mounted () {
            this.getFeaturedMovies();
        },
    }
</script>

<style scoped>
.poster{
    height: 100%;
    border: 1px rgb(97, 97, 97) solid;
}
.boxContainer{
    background-color: #212120;
    padding: 30px;
    width: 100vw;
    margin-top: 150px;
    margin-bottom: 500px;
}
</style>