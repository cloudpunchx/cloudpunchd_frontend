<template>
    <div class="container">
        <div v-if="movies.length > 0">
            <v-container v-for="movie in movies" :key="movie.ID">
                <v-row no-gutters>
                    <v-col cols="auto">
                        <router-link
                            :to="
                                '/movie/' +
                                movie.MovieName +
                                '/' +
                                movie.movieId
                            "
                        >
                            <v-img
                                :src="movie.Poster"
                                :width="80"
                                class="poster"
                            >
                            </v-img>
                        </router-link>
                    </v-col>
                    <v-col class="textBox">
                        <h1 class="title">
                            {{ movie.MovieName }}
                            <span class="dateSpan">{{
                                movie.Release_Date
                            }}</span>
                        </h1>
                        <v-rating
                            :value="parseFloat(movie.Rating)"
                            half-increments
                            color="red"
                            size="15"
                            dense
                            readonly
                            empty-icon
                        />
                        <p>Watched {{ movie.watchedOn }}</p>
                        <p class="bodyText">{{ movie.Review }}</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider class="divider" color="#adb5bd"></v-divider>
                </v-row>
            </v-container>
        </div>

        <!-- Show 2nd container if there is no data for user review -->
        <div v-else>
            <v-container>
                <v-row>
                    <v-col cols="auto">
                        <h3 class="altText">write your first review</h3>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "UserReviews",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                movies: [],
            };
        },
        methods: {
            getUserReviews() {
                axios
                    .request({
                        url: this.apiUrl + "/user-reviews",
                        method: "GET",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                    })
                    .then((response) => {
                        this.movies = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
        created() {
            this.getUserReviews();
        },
    };
</script>

<style scoped>
    .container {
        color: #adb5bd;
        background-color: #2c3440;
    }
    .title {
        color: whitesmoke;
    }
    .textBox {
        margin-left: 15px;
    }
    .v-rating {
        margin-top: -5px;
    }
    .poster {
        height: 100%;
        border: 1px rgb(97, 97, 97) solid;
        transition: transform 0.5s;
    }
    .poster:hover {
        transform: scale(1.05);
    }
    .dateSpan {
        color: #adb5bd;
        font-size: 11pt;
    }
    .altText {
        font-family: Georgia, "Times New Roman", Times, serif;
    }
</style>
