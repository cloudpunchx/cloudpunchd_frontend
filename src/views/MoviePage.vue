<template>
    <div>
        <div v-if="token" class="header">
            <SignedInHeader/>
        </div>
        <div v-else>
            <PageHeader class="header"/>
        </div>
        <div v-for="movie in movie" :key="movie.id" class="parentContainer">
            <div class="grad1">
                <img class="backdropFade" :src="movie.coverImg">
            </div>
            <v-row class="posterContainer">
                <v-col
                >
                    <v-img
                    :src="movie.Poster"
                    :width="300"
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
                </v-col>
            </v-row>
            <div class="infoContainer">
                <h1>{{ movie.MovieName }}</h1>
                <p>{{ movie.Release_Date }} {{ movie.Certification }}</p>
                <h5>{{ movie.Tagline }}</h5>
                <p>{{ movie.Description }}</p>
                <h5>Directed By {{ movie.Director }}</h5>
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
        name: "MoviePage",
        components: {
            SignedInHeader,
            PageHeader
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                movieName: this.$route.params.movieName,
                movieId: this.$route.params.movieId,
                movie: [],
            }
        },
        methods: {
            getSelectedMovie() {
                axios.request({
                    url: this.apiUrl+"/movie",
                    method: "GET",
                    params: {
                        movieName: this.$route.params.movieName,
                        movieId: this.$route.params.movieId,
                    }
                }).then((response)=>{
                    this.movie = response.data;
                }).catch((error)=>{
                    console.log(error);
                })
            },
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
        },
        mounted () {
            this.getToken();
            this.getSelectedMovie();
        },
    }
</script>

<style scoped>
.header{
    margin-bottom: 100px;
}
.parentContainer{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    
}
.backdropFade{
    /* width: 100%; */
    height: 50vh;
    position: relative;
    left: 50%;
    top: -100px;
    transform: translateX(-50%);
    z-index: 1;
}

.grad1 img {
    -webkit-mask-image: linear-gradient(black, transparent);
    mask-image: linear-gradient(black, transparent);
}
.posterContainer{
    position: fixed;
    z-index: 2;
    left: 30px;
    top: 380px;
    width: 100%;
}
.poster{
    border: 1px rgb(97, 97, 97) solid;
}
.poster:hover{
    transform: scale(1.05);
}
.infoContainer{
    color: white;
    position: fixed;
    z-index: 2;
    left: 350px;
    top: 380px;
}
h5{
    margin-block: 20px;
}
</style>