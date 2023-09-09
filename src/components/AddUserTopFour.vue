<!-- Reformat to move movie posters here and placeholders are a button to open pop up to add film -->

<template>
    <div>
        <div>
            <h3>Pick A Favourite Film</h3>
            <v-text-field
                v-model="query"
                hide-details
                dark
                clearable
                append-icon="mdi-magnify"
                background-color="#2C3440"
                class="searchQuery"
                filled
                @click:append="searchMovies"
            ></v-text-field>

            <v-dialog v-model="showResults" persistent max-width="500">
                <template v-slot:activator="{on}">
                    <div v-on="on">
                        <!-- Dialog activator element (hidden) -->
                    </div>
                </template>
                <v-card>
                    <h3 class="heading">Pick A Favourite Film</h3>
                    <v-card-text>
                        <ul class="dropdown">
                            <li
                                v-for="result in searchResults"
                                :key="result.id"
                                @click="addTopFour(result)"
                            >
                                {{ result.MovieName }} ({{
                                    result.Release_Date
                                }})
                                <v-divider
                                    class="divider"
                                    color="#adb5bd"
                                ></v-divider>
                            </li>
                        </ul>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            text
                            color="white"
                            @click="showResults = false"
                            class="button"
                            >Close</v-btn
                        >
                        <div v-if="errorMsg">
                            <p class="errorMsg">{{ errorMsg }}</p>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "AddUserTopFour",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                query: "",
                searchResults: [],
                showResults: false,
                username: "",
                showDropdown: false,
                movies: [],
                movieId: "",
                errorMsg: "",
            };
        },
        methods: {
            // Function to Search movie
            searchMovies() {
                axios
                    .request({
                        url: this.apiUrl + "/movie-search",
                        method: "GET",
                        params: {
                            query: this.query,
                        },
                    })
                    .then((response) => {
                        this.searchResults = response.data;
                        console.log("Search Results:", this.searchResults);
                        this.showResults = true;
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                    });
            },
            // Function to Add Movie to Top 4
            addTopFour(result) {
                axios
                    .request({
                        url: this.apiUrl + "/user-top-four",
                        method: "POST",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                        data: {
                            movieId: result.ID,
                        },
                    })
                    .then(() => {
                        this.showResults = false;
                        location.reload();
                    })
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                    });
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
    .searchQuery {
        padding: 10px;
    }
    .v-card {
        background-color: #242730;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 25px;
        padding: 40px;
    }

    .divider {
        width: 100%;
    }
    .dropdown {
        list-style-type: none;
        background-color: #242730;
        border: 1px solid #adb5bd;
        padding: 0;
        margin: 0;
    }

    .dropdown li {
        padding: 8px;
        cursor: pointer;
        color: #adb5bd;
    }

    .dropdown li:hover {
        color: whitesmoke;
    }
    .button:hover {
        color: white;
        background-color: #ffd60a;
    }
    .errorMsg {
        margin-top: 20px;
        color: white;
    }

    @media (min-width: 1px) {
        /* Mobile / Small size */
        .heading {
            color: #adb5bd;
            font-size: 1.3rem;
            font-weight: lighter;
            margin-bottom: 10px;
            text-align: center;
        }
    }

    @media (min-width: 480px) {
        /* Mobile / Small size */
    }

    @media (min-width: 600px) {
        /* Tablet / Med size */
    }

    @media (min-width: 800px) {
        /* Tablet / Med size */
    }

    @media (min-width: 960px) {
        /* Desktop / Large size */
    }

    @media (min-width: 1264px) {
        /* Desktop / Large size */
    }
</style>
