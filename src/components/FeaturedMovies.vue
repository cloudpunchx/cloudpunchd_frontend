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
                    </v-img>
                </router-link>
            </v-col>
        </v-row>
        <v-row dense align-content="center" justify="center">
            <v-col
            v-for="movie in movies2"
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
                movies2: [],
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
            getFeaturedMovies2() {
                axios.request({
                    url: this.apiUrl+"/movies-featured",
                    method: "GET",
                }).then((response)=>{
                    this.movies2 = response.data;
                }).catch((error)=>{
                    console.log(error);
                })
            },
        },
        mounted () {
            this.getFeaturedMovies();
            this.getFeaturedMovies2();
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
.boxContainer{
    background-color: #001219;
    padding: 50px;
    width: 100vw;
    margin-bottom: 500px;
}
</style>