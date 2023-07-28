<template>
    <div>
        <v-row>
            <v-container class="boxContainer">
                <v-row dense>
                    <v-col v-for="movie in movies" :key="movie.id">
                        <router-link
                            :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                            class="movieLink"
                        >
                            <v-img :src="movie.Poster" class="poster"> </v-img>
                        </router-link>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "FeaturedMovies",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                movies: [],
            };
        },
        methods: {
            getFeaturedMovies() {
                axios
                    .request({
                        url: this.apiUrl + "/movies-featured",
                        method: "GET",
                    })
                    .then((response) => {
                        this.movies = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
        mounted() {
            this.getFeaturedMovies();
        },
    };
</script>

<style scoped>
    @media (min-width: 1px) {
        /* Mobile / Small size */
        .boxContainer {
            justify-content: center;
            margin-bottom: 25px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
        .poster {
            min-width: 150px;
            max-width: 150px;
            min-height: 225px;
            max-height: 225px;
            border: 1px rgb(97, 97, 97) solid;
        }
    }

    @media (min-width: 800px) {
        /* Tablet / Med size */
        .poster {
            min-width: 139px;
            max-width: 139px;
            min-height: 250px;
            max-height: 250px;
        }
    }

    @media (min-width: 1264px) {
        /* Desktop / Large size */
        .poster {
            min-width: 180px;
            max-width: 180px;
            min-height: 280px;
            max-height: 280px;
        }
    }
</style>
