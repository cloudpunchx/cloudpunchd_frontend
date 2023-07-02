<template>
    <div>
        <div v-if="movies.length > 0" class="container">
            <v-row 
            dense
            no-gutters
            justify="start"
            >
                <v-col
                v-for="movie in movies"
                :key="movie.ID"
                sm="3"
                lg="3"
                >
                    <router-link
                    :to="'/movie/' + movie.MovieName + '/' + movie.ID"
                    >
                        <v-img
                        :src="movie.Poster"
                        :width="getPosterWidth"
                        class="poster"
                        >
                        </v-img>
                        <v-rating
                        :value="parseFloat(movie.Rating)"
                        align="center"
                        half-increments
                        color="grey"
                        size="15"
                        dense
                        readonly
                        empty-icon
                        />
                    </router-link>
                </v-col>

                <!-- Placeholder content -->
                <v-col 
                v-for="index in 4 - movies.length" 
                :key="index"
                sm="3"
                lg="3"
                >
                    <div class="placeholderDiv"
                    :style="{ width: getPosterWidth + 'px', height: getPosterHeight + 'px' }"
                    >

                    </div>
                </v-col>
            </v-row>
        </div>

        <!-- Show 2nd container if there is no data for user (eg. new user) -->
        <v-container v-else class="container">
            <v-row 
            dense 
            no-gutters
            justify="start"
            sm="3"
            lg="3"
            >
                <v-col
                v-for="n in 4"
                :key="n"
                >  
                    <div class="placeholderDiv">

                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "RecentlyWatched",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movies: [],
            }
        },
        computed: {
            getPosterWidth() {
                if (this.$vuetify.breakpoint.smAndDown) {
                    return 90;
                } else if (this.$vuetify.breakpoint.mdAndDown) {
                    return 100; 
                } else {
                    return 130; 
                }
            },
            getPosterHeight() {
                // Adjust the height based on the aspect ratio of the poster
                return (this.getPosterWidth / 2) * 3;
            },
        },
        methods: {
            getRecentlyWatched() {
                axios.request({
                    url: this.apiUrl+"/user-recently-watched",
                    method: "GET",
                    headers: {
                        token: cookies.get(`sessionToken`)
                    }
                }).then((response)=>{
                    this.movies = response.data;
                }).catch((error)=>{
                    console.log(error);
                })
            },
        },
        created () {
            this.getRecentlyWatched();
        },
    }
</script>

<style scoped>
.container{
    overflow: visible;
}
.poster{
    height: 100%;
    border: 1px rgb(97, 97, 97) solid;
    transition: transform 0.5s;
}
.poster:hover{
    transform: scale(1.05);
}
.v-application a {
    color: grey;
    text-decoration: none;
}
.placeholderDiv{
    margin: 5px;
    background-color: #101b1fc9;
    border: 1px rgb(97, 97, 97) solid;
}
</style>