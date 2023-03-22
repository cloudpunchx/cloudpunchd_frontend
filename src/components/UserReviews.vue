<template>
    <div class="container">
        <v-container v-for="movie in movies" :key="movie.ID">
            <v-row no-gutters>
                <v-col cols="auto">
                    <router-link
                    :to="'/movie/' + movie.MovieName + '/' + movie.movieId"
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
                <v-col class="textBox">
                    <h1 class="title">{{movie.MovieName }} <span class="dateSpan">{{ movie.Release_Date }}</span></h1>
                    <v-rating
                        :value="parseFloat(movie.Rating)"
                        half-increments
                        color="red"
                        size="15"
                        dense
                        readonly
                        empty-icon
                        />
                    <p>Watched {{ movie.WatchedOn }}</p>
                    <p class="bodyText">{{ movie.Review }}</p>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "UserReviews",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movies: [],
            }
        },
        methods: {
            getUserReviews() {
                axios.request({
                    url: this.apiUrl+"/user-reviews",
                    method: "GET",
                    headers: {
                        token: cookies.get(`sessionToken`)
                    }
                }).then((response)=>{
                    this.movies = response.data
                }).catch((error)=>{
                    console.log(error);
                })
            },
        },
        created () {
            this.getUserReviews();
        },
    }
</script>

<style scoped>
.container{
    color: #adb5bd;
    background-color: #212529;
}
.title{
    color: whitesmoke;
}
.textBox{
    margin-left: 15px;
}
.v-rating{
    margin-top: -5px;
}
.poster{
    height: 100%;
    border: 1px rgb(97, 97, 97) solid;
    transition: transform 0.5s;
}
.poster:hover{
    transform: scale(1.05);
}
.dateSpan{
    color: #adb5bd;
    font-size: 11pt;
}
</style>