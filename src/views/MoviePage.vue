<template>
    <div class="pageContainer">
        <!-- If token (user is signed in) show signed in header -->
        <div v-if="token" class="header">
            <SignedInHeader />
        </div>
        <div v-else>
            <PageHeader class="header" />
        </div>

        <!-- Cover Img for Movie -->
        <div v-for="movie in movie" :key="movie.id">
            <div class="grad1">
                <img class="backdropFade" :src="movie.coverImg" />
            </div>
        </div>

        <div v-for="movie in movie" :key="movie.id" class="parentContainer">
            <v-container class="contentContainer">
                <v-row>
                    <!-- Poster -->
                    <v-col sm="5" md="3" lg="3">
                        <div class="posterContainer">
                            <v-img :src="movie.Poster" class="poster"> </v-img>
                        </div>
                    </v-col>

                    <!-- Movie Info -->
                    <v-col sm="6" md="5" lg="6">
                        <div class="infoContainer">
                            <h1>{{ movie.MovieName }}</h1>
                            <p>
                                {{ movie.Release_Date }}
                                {{ movie.Certification }}
                            </p>
                            <h5>{{ movie.Tagline }}</h5>
                            <p>{{ movie.Description }}</p>
                            <h5>Directed By {{ movie.Director }}</h5>
                        </div>
                    </v-col>

                    <!-- Add To Watched component -->
                    <v-col sm="12" md="1" lg="1">
                        <div class="logContainer">
                            <AddToWatched />
                        </div>
                    </v-col>
                </v-row>

                <!-- Reviews -->
                <v-row>
                    <v-col sm="12" md="3" lg="6">
                        <div class="reviewContainer">
                            <h4>REVIEWS</h4>
                            <v-divider
                                class="divider"
                                color="#adb5bd"
                            ></v-divider>
                            <GetMovieReviews />
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div class="footer">
            <PageFooter />
        </div>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import PageHeader from "@/components/PageHeader.vue";
    import AddToWatched from "@/components/AddToWatched.vue";
    import GetMovieReviews from "@/components/GetMovieReviews.vue";
    import PageFooter from "@/components/PageFooter.vue";
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "MoviePage",
        components: {
            SignedInHeader,
            PageHeader,
            AddToWatched,
            GetMovieReviews,
            PageFooter,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                movieName: this.$route.params.movieName,
                movieId: this.$route.params.movieId,
                movie: [],
                active: false,
                showModal: false,
            };
        },
        methods: {
            getSelectedMovie() {
                axios
                    .request({
                        url: this.apiUrl + "/movie",
                        method: "GET",
                        params: {
                            movieName: this.$route.params.movieName,
                            movieId: this.$route.params.movieId,
                        },
                    })
                    .then((response) => {
                        this.movie = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            addToWatchlist() {
                axios
                    .request({
                        url: this.apiUrl + "/user-watchlist",
                        method: "POST",
                        headers: {
                            token: (this.token = cookies.get(`sessionToken`)),
                        },
                        data: {
                            movieId: this.$route.params.movieId,
                        },
                    })
                    .then(() => {
                        this.markWatched();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            markWatched() {
                this.unwatched = this.watched;
            },
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
        },
        mounted() {
            this.getToken();
            this.getSelectedMovie();
        },
    };
</script>

<style scoped>
    .header {
        margin-bottom: 100px;
    }

    .pageContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .contentContainer {
        margin-top: -200px;
    }

    .divider {
        width: 100%;
    }

    .grad1 img {
        -webkit-mask-image: linear-gradient(black, transparent);
        mask-image: linear-gradient(black, transparent);
    }

    .footer {
        position: absolute;
        bottom: -100vh;
        width: 100vw;
        z-index: -1;
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
        content: "";
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
        transition: opacity 0.4s linear;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .pop-enter-active,
    .pop-leave-active {
        transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1),
            opacity 0.4s linear;
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
        .poster {
            border: 1px rgb(97, 97, 97) solid;
            width: 200px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
        .infoContainer {
            color: white;
            width: 75vw;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
        }

        .logContainer {
            margin-top: 50px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }

        .reviewContainer {
            color: #adb5bd;
            width: 300px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
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
            text-align: start;
            width: 50vw;
        }
        .logContainer {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
        .reviewContainer {
            width: 80vw;
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
        .posterContainer {
            margin-left: 50px;
            position: relative;
            left: 0;
            transform: translateX(0%);
        }
        .poster {
            width: 250px;
        }
        .infoContainer {
            width: 45vw;
            left: 0%;
            transform: translateX(0%);
            text-align: start;
        }

        .reviewContainer {
            width: 75vw;
        }
    }

    @media (min-width: 960px) {
        /* Desktop / Large size */
        .posterContainer {
            margin-left: 0px;
        }
        .infoContainer {
            width: 30vw;
        }
        .reviewContainer {
            width: 50vw;
            position: relative;
            left: 0%;
            transform: translateX(-0%);
        }
    }

    @media (min-width: 2000px) {
        /* Larger size */

        .infoContainer {
            width: 25vw;
        }
    }
</style>
