<template>
    <div>
        <div v-if="token">
            <SignedInHeader/>
        </div>
        <div v-else>
            <PageHeader/>
        </div>
        <div v-for="movie in movie" :key="movie.id" class="parentContainer">
            <div class="grad1">
                <img class="backdropFade" :src="movie.coverImg">
            </div>
            <v-row dense align-content="center" justify="center" class="posterContainer">
                <v-col
                cols="2"
                >
                    <v-img
                    :src="movie.Poster"
                    :width="230"
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
                <p>{{ movie.Release_Date }}</p>
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
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
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
        },
        mounted () {
            this.getToken();
            this.getSelectedMovie();
        },
    }
</script>

<style scoped>
/* .parentContainer{
    position: relative;
    
}
.backdropFade{
    height: 65vh;
    position: absolute;
    left: 50%;
    top: -100%;
    transform: translateX(-50%);
    z-index: 1;
}

.grad1 img {
    -webkit-mask-image: linear-gradient(black, transparent);
    mask-image: linear-gradient(black, transparent);
}
.posterContainer{
    position: relative;
    z-index: 2;
    left: -18%;
    top: 80px;
    margin-top: 250px;
}
.poster{
    border: 1px rgb(97, 97, 97) solid;
}
.infoContainer{
    color: white;
    position: absolute;
    left: 39%;
    top: 85px;
    z-index: 2;
} */

.parentContainer{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
}
.backdropFade{
    height: 65vh;
    position: absolute;
    left: 50%;
    top: -100%;
    transform: translateX(-50%);
    z-index: 1;
}

.grad1 img {
    -webkit-mask-image: linear-gradient(black, transparent);
    mask-image: linear-gradient(black, transparent);
}
.posterContainer{
    position: relative;
    z-index: 2;
    left: -18%;
    top: 80px;
    margin-top: 250px;
}
.poster{
    border: 1px rgb(97, 97, 97) solid;
}
.infoContainer{
    color: white;
    position: absolute;
    left: 39%;
    top: 85px;
    z-index: 2;
}
</style>