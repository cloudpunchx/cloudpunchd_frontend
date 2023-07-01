<template>
    <div class="boxContainer">
        <v-row dense align-content="center" justify="center">
            <v-col
            v-for="movie in movies"
            :key="movie.id"
            cols="3"
            sm="1"
            md="1"
            lg="1"
            >   
                <router-link
                :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                >
                    <v-img
                    :src="movie.Poster"
                    :width="getPosterWidth"
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
        computed: {
            getPosterWidth() {
                if (this.$vuetify.breakpoint.smAndDown) {
                    return 150; // Width for small screens (sm)
                } else if (this.$vuetify.breakpoint.mdAndDown) {
                    return 190; // Width for medium-sized screens (md)
                } else {
                    return 200; // Width for large screens (lg)
                }
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
        },
    }
</script>

<style scoped>

@media (min-width: 1px) {
    /* Mobile / Small size */
    .poster{
        height: 100%;
        border: 1px rgb(97, 97, 97) solid;
    }
    .poster:hover{
        transform: scale(1.05);
    }
    .boxContainer{
        background-color: #001219;
        width: 100vw;
        margin-bottom: 300px;
    }

}


@media (min-width: 480px) {
    /* Tablet / Med size */
}


@media (min-width: 800px) {
    /* Desktop / Large size */
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

}

</style>