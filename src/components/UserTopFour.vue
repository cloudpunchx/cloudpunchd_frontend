<template>
    <div>
        <div class="container">
            <v-row dense justify="start">
                <v-col
                v-for="movie in movies"
                :key="movie.ID"
                cols="2"
                lg="3"
                >
                    <router-link
                    :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                    >
                        <v-img
                            :src="movie.Poster"
                            :width="200"
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
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "UserTopFour",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movies: [],
            }
        },
        methods: {
            getUserTopFour() {
                axios.request({
                    url: this.apiUrl+"/user-top-four",
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
            this.getUserTopFour();
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
</style>