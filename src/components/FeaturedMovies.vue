<template>
    <div>
        <v-row>
            <v-col
            v-for="movie in movies"
            :key="movie.id"
            class="d-flex child-flex"
            cols="4"
            >
                <v-img
                    :src="movie.poster"
                    aspect-ratio=".6"
                    cover
                    class="bg-grey-lighten-2"
                >
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
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
                    url: "http://127.0.0.1:5000/api/movies-featured",
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

</style>