<template>
    <div class="pageContainer">
        <div v-if="token" class="header">
            <SignedInHeader/>
        </div>
        <div v-else>
            <PageHeader class="header"/>
        </div>

        <div v-for="movie in movie" :key="movie.id">
            <div class="grad1">
                <img class="backdropFade" :src="movie.coverImg">
            </div>
        </div>

        <div v-for="movie in movie" :key="movie.id" class="parentContainer">
            <v-container 
            class="contentContainer"
            >
                <v-row
                >   
                    <v-col 
                    v-if="isSmallBreakpoint"
                    cols="auto" 
                    md="1"
                    lg="1"
                    >
                        <v-row>
                            <v-col>
                                <div class="placeholderDiv">

                                </div>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col 
                    cols="auto"
                    sm="1" 
                    md="3"
                    lg="4"
                    >
                        <v-row class="posterContainer">
                            <v-col>
                                <v-img
                                :src="movie.Poster"
                                :width="getPosterWidth"
                                class="poster"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col 
                    cols="auto"
                    sm="1"
                    md="2"
                    lg="5"
                    >
                        <div class="infoContainer">
                            <h1>{{ movie.MovieName }}</h1>
                            <p>{{ movie.Release_Date }} {{ movie.Certification }}</p>
                            <h5>{{ movie.Tagline }}</h5>
                            <p>{{ movie.Description }}</p>
                            <h5>Directed By {{ movie.Director }}</h5>
                        </div>
                    </v-col>
                    <v-col 
                    cols="auto" 
                    sm="2"
                    md="2"
                    lg="3"
                    >
                        <div class="logContainer">
                            <AddToWatched/>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col 
                    cols="auto"
                    sm="2"
                    md="2"
                    lg="7"
                    >
                        <div class="reviewContainer">
                            <h4>REVIEWS</h4>
                            <v-divider class="divider" color="#adb5bd"></v-divider>
                            <GetMovieReviews/>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
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
            }
        },
        computed: {
            getPosterWidth() {
                if (this.$vuetify.breakpoint.smAndDown) {
                    return 200; // Width for small screens (sm)
                } else if (this.$vuetify.breakpoint.mdAndDown) {
                    return 300; // Width for medium-sized screens (md)
                } else {
                    return 300; // Width for large screens (lg)
                }
            },
            isSmallBreakpoint() {
                return !this.$vuetify.breakpoint.xsOnly;
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
.header {
    margin-bottom: 100px;
}

.pageContainer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 100vh;
}
.parentContainer {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contentContainer {
    margin-top: -200px;
    /* max-width: 2000px; */
    /* width: 100%; */
}

.logContainer {
    margin-top: 50px;
}

.divider{
    width: 100%;
}

.grad1 img {
    -webkit-mask-image: linear-gradient(black, transparent);
    mask-image: linear-gradient(black, transparent);
}

.poster {
    border: 1px rgb(97, 97, 97) solid;
}

.poster:hover {
    transform: scale(1.05);
}

.footer {
    padding-top: 100%;
    position: relative;
    width: 100%;
    background-color: #001219;
}

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

@media (min-width: 1px) {
    /* Mobile / Small size */

    .backdropFade {
        height: 30vh;
        position: relative;
        top: -100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }

    .infoContainer {
        color: white;
        width: 200px;
    }

    .reviewContainer {
        color: #adb5bd;
        width: 300px;
    }
}


@media (min-width: 480px) {
    /* Tablet / Med size */

    .backdropFade {
        height: 40vh;
        position: relative;
        top: -100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }
    .infoContainer {
        color: white;
        width: 320px;
    }
}


@media (min-width: 800px) {
    /* Desktop / Large size */

    .backdropFade {
        height: 60vh;
        position: relative;
        top: -100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }

    .infoContainer {
        width: 350px;
    }

    .reviewContainer {
        width: 700px;
    }
}

</style>