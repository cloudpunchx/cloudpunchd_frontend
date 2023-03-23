<template>
    <div>
        <div v-if="token" class="header">
            <SignedInHeader/>
        </div>
        <div v-else>
            <PageHeader class="header"/>
        </div>
        <div class="container">
            <h3>FOUND MATCHES</h3>
            <v-divider class="divider" color="#adb5bd"></v-divider>
            <v-container v-for="movie in movies" :key="movie.ID">
                <v-row no-gutters>
                    <v-col cols="auto">
                        <router-link
                        :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                        >
                            <v-img
                                :src="movie.Poster"
                                :width="100"
                                class="poster"
                            >
                            </v-img>
                        </router-link>
                    </v-col>
                    <v-col class="textBox">
                        <router-link
                        :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                        class="noUnderline"
                        >
                            <h1 class="title">{{movie.MovieName }} <span class="dateSpan">{{ movie.Release_Date }}</span></h1>
                        </router-link>
                        <p>Directed By {{ movie.Director }}</p>
                        <p>Genre: {{ movie.Genres }}</p>
                    </v-col>
                </v-row>
                <v-divider class="divider2" color="#adb5bd"></v-divider>
            </v-container>
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
                query: this.$route.params.query,
                movies: [],
            }
        },
        methods: {
            search_movies(){
                axios.request({
                    url: this.apiUrl+"/movie-search",
                    method: "GET",
                    params: {
                        query: this.query
                    },
                }).then((response)=>{
                    this.movies = response.data;
                }).catch((error)=>{
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
.header{
    margin-bottom: 100px;
}
.container{
    width: 600px;
    position: relative;
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
.noUnderline{
    text-decoration: none;
}
.divider2{
    margin-top: 15px;
}
</style>