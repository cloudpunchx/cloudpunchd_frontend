<template>
    <div>
        <div v-for="movie in movies" :key="movie.id" class="filmLog">
            <ol>{{ movie.WatchedOn }} | {{ movie.MovieName }}</ol>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "UserFilmLog",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movies: [],
            }
        },
        methods: {
            getUserFilmLog() {
                axios.request({
                    url: this.apiUrl+"/user-film-log",
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
            this.getUserFilmLog();
        },
    }
</script>

<style scoped>
.filmLog{
    color: white;
}
</style>