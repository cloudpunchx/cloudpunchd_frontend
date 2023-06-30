<template>
    <div>
        <div>
            <v-text-field
                v-model="query"
                hide-details
                dark
                clearable
                append-icon="mdi-magnify"
                background-color="rgba(148, 148, 148, 0.63)"
                class="textField"
                filled
                shaped
                @click:append="searchMovies"
            ></v-text-field>

            <v-dialog v-model="showResults" persistent max-width="500">
                <template v-slot:activator="{ on }">
                    <div v-on="on">
                        <!-- Dialog activator element (hidden) -->
                    </div>
                </template>
                <v-card>
                    <h3 class="resultsTitle">
                        Movie Search Results
                    </h3>
                    <v-card-text>
                        <ul class="dropdown">
                            <li v-for="result in searchResults" :key="result.id" @click="addTopFour(result)">
                                {{ result.MovieName }} ({{ result.Release_Date }})
                                <v-divider class="divider" color="#adb5bd"></v-divider>
                            </li>
                        </ul>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                        text
                        color="white"
                        @click="showResults = false"
                        class="button"
                        >Close</v-btn>
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
import cookies from 'vue-cookies';

    export default {
        name: "AddUserTopFour",
        data() {
            return {
            apiUrl: process.env.VUE_APP_API_URL,
            token: "",
            query: '',
            searchResults: [],
            showResults: false,
            username: "",
            showDropdown: false,
            movies: [],
            movieId: "",
            errorMsg: "",
            }
        },
        methods: {
            // Function to Search movie
            searchMovies() {
                axios.request({
                    url: this.apiUrl + "/movie-search",
                    method: "GET",
                    params: {
                        query: this.query
                    },
                }).then((response) => {
                    this.searchResults = response.data;
                    console.log('Search Results:', this.searchResults);
                    this.showResults = true;
                }).catch((error) => {
                    this.errorMsg = error.response.data;
                })
            },
            // Function to Add Movie to Top 4
            addTopFour(result) {
                axios.request({
                    url: this.apiUrl + "/user-top-four",
                    method: "POST",
                    headers: {
                        token: cookies.get(`sessionToken`)
                    },
                    data: {
                        movieId: result.ID
                    },
                }).then(() => {
                    this.showResults = false;
                    location.reload();
                }).catch((error) => {
                    this.errorMsg = error.response.data;
                })
            },
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
        },
        mounted() {
            this.getToken();
        }
    }
</script>

<style scoped>
.textField {
    width: 40%;
    color: whitesmoke;
    padding: 10px;
}
.v-card{
    background-color: #242730;  
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 25px;
    padding: 40px;
}

/* Should resize for page resize */
.resultsTitle{
    color: whitesmoke;
    font-size: 25pt;
    font-family: lobster;
    margin-bottom: 20px;
    text-align: center;
}
.divider{
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
.button:hover{
    color: white;
    background-color: #ffd60a;
}
.errorMsg{
    margin-top: 20px;
    color: white;
}
</style>
