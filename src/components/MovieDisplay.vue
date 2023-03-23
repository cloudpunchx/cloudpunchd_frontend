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
        name: "MovieDisplay",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                slicedResults: [],
                movies: [],
            }
        },
        methods: {
            get_horror_movies(){
                axios.request({
                    url: this.apiUrl+"/movie-search",
                    method: "GET",
                    params: {
                        query: 'Horror'
                    },
                }).then((response)=>{
                    this.slicedResults = response.data.slice(0,10)
                    this.movies = this.slicedResults;
                }).catch((error)=>{
                    this.errorMsg = error;
                })
            },
        },
        mounted () {
            this.get_horror_movies();
        },
    }
</script>

<style scoped>
.poster{
    /* height: 100%; */
    border: 1px rgb(97, 97, 97) solid;
}
.poster:hover{
    transform: scale(1.05);
}
.boxContainer{
    background-color: #212529;
    padding: 50px;
    width: 100vw;
    margin-bottom: 500px;
}