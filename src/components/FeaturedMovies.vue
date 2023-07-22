<template>
    <div class="boxContainer">
        <v-row dense>
            <v-col
                v-for="movie in movies"
                :key="movie.id"
                cols="2"
                sm="2"
                md="2"
                lg="2"
            >
                <router-link :to="'/movie/' + movie.MovieName + '/' + movie.ID">
                    <v-img
                        :src="movie.Poster"
                        :width="getPosterWidth"
                        class="poster"
                    >
                    </v-img>
                </router-link>
            </v-col>
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
        computed: {
            getPosterWidth() {
                if (this.$vuetify.breakpoint.smAndDown) {
                    return 150; // Width for small screens (sm)
                } else if (this.$vuetify.breakpoint.mdAndDown) {
                    return 170; // Width for medium-sized screens (md)
                } else {
                    return 170; // Width for large screens (lg)
                }
            },
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
        .poster {
            height: 100%;
            border: 1px rgb(97, 97, 97) solid;
        }
        .poster:hover {
            transform: scale(1.05);
        }
        .boxContainer {
            display: flex;
            justify-content: center;
            margin-bottom: 25px;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */
    }

    @media (min-width: 800px) {
        /* Desktop / Large size */
    }
</style>
