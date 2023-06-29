<template>
    <div>
        <div v-if="movies.length > 0" class="container">
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
                        </v-img>
                    </router-link>
                </v-col>

                <!-- Placeholder content -->
                <v-col v-for="index in 4 - movies.length" :key="index" cols="2" lg="3">
                    <div class="placeholderDiv">

                    </div>
                </v-col>
            </v-row>
        </div>

        <!-- Show 2nd container if there is no data for user (eg. new user) -->
        <div v-else class="container">
            <v-row dense justify="start">
                <v-col
                v-for="n in 4"
                :key="n"
                cols="2"
                lg="3"
                >  
                    <div class="placeholderDiv">

                    </div>
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
.placeholderDiv{
    width: 140px;
    height: 200px;
    margin: 5px;
    background-color: #101b1fc9;
    border: 1px rgb(97, 97, 97) solid;
}
</style>