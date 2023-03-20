<template>
    <div>
        <div v-if="token" class="header">
            <SignedInHeader/>
        </div>
        <div v-else>
            <PageHeader class="header"/>
        </div>

        <!-- LEAVING OFF STYLING SEARCH RESULTS -->

        <div class="resultsContainer">
            <h3>FOUND MATCHES</h3>
            <v-divider class="divider" color="#adb5bd"></v-divider>
            <section class="profileContainer"                
            v-for="movie in movies"
            :key="movie.ID">
                <router-link
                    :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                    >
                        <v-img
                            :src="movie.Poster"
                            :width="125"
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
                <div class="movieInfo">
                    <h2>{{ movie.MovieName }}</h2>
                    <p ></p>
                </div>
            </section>
        
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
                    url: this.apiUrl+"/movie-search",
                    method: "GET",
                    params: {
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
        created (){
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
.profileContainer{
    color: white;
    padding: 10px;
    position: relative;
    width: 50%;
    left: 50%;
    transform: translateX(-50%);
    /* margin-top: 100px; */
}
.userInfo{
    display: inline-block;
    vertical-align: middle;
    margin-left: 30px;
}
</style>