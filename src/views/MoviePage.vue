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
                <h1>{{ movie.MovieName }} <span v-if="token" class="logBtn"><v-btn variant="tonal" @click="showModal = true">Log Movie</v-btn></span></h1>
                <p>{{ movie.Release_Date }} {{ movie.Certification }}</p>
                <h5>{{ movie.Tagline }}</h5>
                <p>{{ movie.Description }}</p>
                <h5>Directed By {{ movie.Director }}</h5>
                <!-- NOT STYLED BUT IT WORKS -->
                <v-btn @click="addToWatchlist" variant="tonal">Add to Watchlist</v-btn>
            </div>
            <div class="container">
                <h4>REVIEWS</h4>
                <v-divider class="divider" color="#adb5bd"></v-divider>
                <GetMovieReviews/>
            </div>
            <div>
                <!-- <img :src="unwatched" @click="AddToWatched" alt="Image" /> -->
                <!-- <span v-if="token"><v-btn class="watchlistBtn" variant="tonal" @click="addToWatchlist">Add to Watchlist</v-btn></span> -->
                <!-- <v-container>
                    
                    <v-row dense>
                        <v-col cols="4">
                            <v-icon>mdi-home</v-icon>
                        </v-col>
                        <v-col cols="4">
                            <v-icon>mdi-account</v-icon>
                        </v-col>
                        </v-row>

                        <v-row dense>
                        <v-col cols="12">
                            <v-btn variant="tonal" @click="addToWatchlist">Add to Watchlist</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-btn variant="tonal" @click="showModal = true">Log Movie</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-btn>Button</v-btn>
                        </v-col>
                    </v-row>
                </v-container> -->
            </div>
        </div>

        <transition name="fade" appear>
            <div class="modal-overlay" 
                v-if="showModal" 
                @click="showModal = false">
            </div>
        </transition>
        <transition name="pop" appear>
            <div class="modal" 
            role="dialog" 
            v-if="showModal"
            >
                <AddToWatched/>
            </div>
        </transition>

        <div class="footer">
            <PageFooter/>
        </div>
    </div>
</template>

<script>
import SignedInHeader from '@/components/SignedInHeader.vue'
import PageHeader from '@/components/PageHeader.vue'
import AddToWatched from '@/components/AddToWatched.vue'
import GetMovieReviews from '@/components/GetMovieReviews.vue'
import PageFooter from '@/components/PageFooter.vue'
import axios from "axios";
import cookies from 'vue-cookies';


    export default {
        name: "MoviePage",
        components: {
            SignedInHeader,
            PageHeader,
            AddToWatched,
            GetMovieReviews,
            PageFooter
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                movieName: this.$route.params.movieName,
                movieId: this.$route.params.movieId,
                movie: [],
                active: false,
                showModal: false,
                // unwatched: "../assets/cat2.png",
                // watched: "../assets/cat1.png"
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
            addToWatchlist() {
                axios.request({
                    url: this.apiUrl+"/user-watchlist",
                    method: "POST",
                    headers: {
                        token: this.token = cookies.get(`sessionToken`)
                    },
                    data: {
                        movieId: this.$route.params.movieId,
                    }
                }).then(()=>{
                    this.markWatched();
                }).catch((error)=>{
                    console.log(error);
                })
            },
            markWatched(){
                this.unwatched = this.watched;
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.backdropFade{
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
    position: absolute;
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
.logBtn{
    margin-left: 150px;
}
.watchlistBtn{
    margin-left: 235px;
}
.v-btn{
    margin-top: 25px;
    width: 150px;
}
.v-btn:hover {
    color: white;
    background-color: rgb(1, 139, 139);
}
.v-btn:active {
    color: white;
    background-color: rgb(1, 139, 139);
}
.feedbackContainer{
    margin-top: 30px;
}
.infoContainer{
    color: white;
    position: absolute;
    z-index: 2;
    left: 350px;
    top: 380px;
}
h5{
    margin-block: 20px;
}
/* ----------------------------------- */
.container{
    margin-top: 250px;
    color: #adb5bd;
    background-color: #212529;
    position: relative;
    left: 30%;
    width: 70%;
}
/* --------------------------------- */
.footer{
    padding-top: 100%;
    position: absolute;
    bottom: -100vh;
    width: 100%;
    background-color: #212529;
    z-index: -1;
}
/* Pop Up for Sign In */
.modal {
    position: fixed;
    top: 20%;
    right: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: auto;
    text-align: center;
    border-radius: 1rem;
    z-index: 999;
}

.modal-overlay {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #505153;
    opacity: 0.6;
    cursor: pointer;
}

/* Modal Overlay Transition */

.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}
</style>