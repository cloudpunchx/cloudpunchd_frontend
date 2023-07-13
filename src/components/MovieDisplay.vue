<template>
    <div class="boxContainer">
        <v-row dense>
            <v-col
            v-for="movie in movies"
            :key="movie.id"
            cols="2"
            sm="2"
            md="2"
            lg="2"
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
        name: "MovieDisplay",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                slicedResults: [],
                movies: [],
            }
        },
        computed: {
            getPosterWidth() {
                if (this.$vuetify.breakpoint.smAndDown) {
                    return 150; // Width for small screens (sm)
                } else if (this.$vuetify.breakpoint.mdAndDown) {
                    return 200; // Width for medium-sized screens (md)
                } else {
                    return 180; // Width for large screens (lg)
                }
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
                    this.slicedResults = response.data.slice(0,6)
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
    height: 100%;
    border: 1px rgb(97, 97, 97) solid;
}
.poster:hover{
    transform: scale(1.05);
}
.boxContainer {
    display: flex;
    justify-content: center;
}

</style>