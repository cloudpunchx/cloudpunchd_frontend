<template>
    <div>
        <div v-if="token" class="header">
            <SignedInHeader/>
        </div>
        <div v-else>
            <PageHeader class="header"/>
        </div>

        <div class="resultsContainer">
            <h3>FOUND MATCHES</h3>
            <v-divider class="divider" color="#adb5bd"></v-divider>
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
                                :width="1000"
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
    </div>
</template>

<script>
import SignedInHeader from '@/components/SignedInHeader.vue'
import PageHeader from '@/components/PageHeader.vue'
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "SearchResults",
        components: {
            SignedInHeader,
            PageHeader,
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                movieName: this.$route.params.query,
                movies: [],
            }
        },
        methods: {
            search_movies(){
                axios.request({
                    url: "http://127.0.0.1:5000/api/movie-search",
                    method: "GET",
                    data: {
                        movieName: this.movieName
                    },
                }).then((response)=>{
                    this.movies = response.data;
                }).catch((error)=>{
                    // need to update this
                    this.errorMsg = error;
                })
            },
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
        },
        mounted (){
            this.getToken();
            this.search_movies();
        }
    }
</script>

<style scoped>
.resultsContainer{
    color: #adb5bd;
    margin-top: 150px;
    position: absolute;
    left: 27%;
}
.divider{
    width: 800px;
}
</style>