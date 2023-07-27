<!-- fix movie page sizing -->

<template>
    <div>
        <!-- If Logged In show this v-card -->
        <div v-if="token">
            <v-card elevation="2" class="container">
                <v-row justify="center">
                    <div class="textBox">
                        <v-img
                            class="img"
                            @click="addToWatched"
                            :src="watchedImg"
                        ></v-img>
                        <p class="buttonText" @click="addToWatched">Watch</p>
                    </div>
                    <div class="textBox">
                        <v-img class="img" src="../assets/likeIcon.png"></v-img>
                        <p class="buttonText">Like</p>
                    </div>
                    <div class="textBox">
                        <v-img
                            class="img"
                            src="../assets/watchlistIcon.png"
                        ></v-img>
                        <p class="buttonText">Watchlist</p>
                    </div>
                </v-row>
                <v-row>
                    <v-divider class="divider" color="#adb5bd"></v-divider>
                </v-row>
                <v-card-text>
                    <v-row justify="center">
                        <v-rating
                            v-model="rating"
                            hover
                            align="center"
                            half-increments
                            color="red"
                            background-color="amber"
                            size="25"
                            dense
                            class="rating"
                        >
                        </v-rating>
                    </v-row>
                    <v-row justify="center">
                        <v-checkbox
                            color="#adb5bd"
                            background-color="whitesmoke"
                            v-model="loved"
                            label="Loved"
                            @click="toggleLoved"
                        >
                        </v-checkbox>
                    </v-row>
                    <v-row justify="center">
                        <v-btn
                            type="submit"
                            variant="tonal"
                            @click="addToWatched"
                            >SUBMIT
                        </v-btn>
                    </v-row>
                    <v-row justify="center">
                        <div v-if="feedbackMsg">
                            <p class="feedbackContainer">{{ feedbackMsg }}</p>
                        </div>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>

        <!-- If not logged in show this v-card -->
        <div v-else>
            <v-card elevation="2" class="container">
                <v-row justify="center">
                    <!-- Add sign in ability here - just text for now -->
                    <p class="signIn">Sign in to log, rate or review.</p>
                </v-row>
                <v-row>
                    <v-divider class="divider" color="#adb5bd"></v-divider>
                </v-row>
                <v-card-text>
                    <v-row justify="center">
                        <img
                            src="../assets/cloudpunchdLogo.png"
                            alt="Logo"
                            class="logo"
                        />
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    // when you click on Watch - api send log movie with no date - DONE
    // need to check if a user has watched film before and if yes, keep Red img
    // add delete function by clicking img again

    // when you click log movie - api send log movie with chosen date

    // Like movie - api send movie to Like or remove from
    // watchlist - api send movie to watchlist or remove from

    export default {
        name: "AddToWatched",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                movieName: this.$route.params.movieName,
                movieId: this.$route.params.movieId,
                watchedImg: require("../assets/watchIcon.png"),
                watchedOn: "",
                rating: null,
                loved: false,
                feedbackMsg: "",
                date: "",
            };
        },
        methods: {
            // add to watched will not have a date, rating or loved (default is false). This is logged by clicking the 'watched' button/icon.
            addToWatched() {
                axios
                    .request({
                        url: this.apiUrl + "/user-film-log",
                        method: "POST",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                        data: {
                            movieId: this.$route.params.movieId,
                            loved: this.loved,
                        },
                    })
                    .then((response) => {
                        this.watchedImg = require("../assets/loggedIcon.png");
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            // add to log will have a date attached
            addToLog() {
                axios
                    .request({
                        url: this.apiUrl + "/user-film-log",
                        method: "POST",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                        data: {
                            movieId: this.$route.params.movieId,
                            watchedOn: this.date,
                            rating: this.rating,
                            loved: this.loved,
                        },
                    })
                    .then((response) => {
                        this.feedbackMsg = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            toggleLoved() {
                this.loved = !this.loved;
            },
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
        },
        mounted() {
            this.getToken();
        },
    };
</script>

<style scoped>
    .logo {
        width: 200px;
        margin-top: 25px;
    }
    /* .img{
    width: 65px;
    margin: 10px;
    cursor: pointer;
} */
    /* .container {
    width: 300px;
    background-color: #545a60;
    padding: 30px;
} */
    .textBox {
        text-align: center;
        display: grid;
        align-items: center;
        justify-items: center;
    }
    .buttonText {
        color: rgb(192, 192, 192);
    }
    .buttonText:hover {
        color: whitesmoke;
        cursor: pointer;
    }
    .divider {
        width: 100%;
    }
    .rating {
        margin-top: 15px;
    }
    .signIn {
        color: rgb(192, 192, 192);
    }
    .signIn:hover {
        color: whitesmoke;
        cursor: pointer;
    }
    .v-btn {
        width: 100px;
        background-color: whitesmoke;
    }
    .v-btn:hover {
        color: white;
        background-color: #ffd60a;
    }
    .v-btn:active {
        color: white;
        background-color: #ffd60a;
    }
    .feedbackContainer {
        margin-top: 30px;
    }

    @media only screen and (min-width: 1px) {
        /* Breakpoint for Mobile */
        .container {
            width: 300px;
            background-color: #456;
            padding: 30px;
        }

        .img {
            width: 65px;
            margin: 10px;
            cursor: pointer;
        }
    }

    @media only screen and (min-width: 700px) {
        /* Breakpoint for Tablet */

        .img {
            width: 50px;
        }
    }

    @media only screen and (min-width: 1000px) {
        /* Breakpoint for Desktop */

        .img {
            width: 65px;
        }
    }
</style>
