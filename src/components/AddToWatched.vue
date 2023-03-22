<template>
    <div>
        <v-container class="d-flex justify-center align-center container" style="background-color: whitesmoke; border-radius: 10px; max-width: 600px;">
            <v-form @submit.prevent="submitForm" class="form">
                <h2>{{ movieName }}</h2>
                <v-text-field v-model="movieId" label="Movie ID"></v-text-field>
                <v-text-field v-model="date" label="Date" :mask="'####-##-##'" hint="YYYY-MM-DD"></v-text-field>
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
                <v-checkbox 
                color="#adb5bd"
                background-color="whitesmoke"
                v-model="loved" 
                label="Loved"
                @click="toggleLoved"
                >
                </v-checkbox>
                <v-btn 
                type="submit" 
                variant="tonal"
                @click="addToWatched"
                >SUBMIT
                </v-btn>
                <div v-if="feedbackMsg">
                    <p class="feedbackContainer">{{ feedbackMsg }}</p>
                </div>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';

    export default {
        name: "AddToWatched",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                movieName: this.$route.params.movieName,
                movieId: this.$route.params.movieId,
                watchedOn: "",
                rating: null,
                loved: false,
                feedbackMsg: "",
                date: new Date().toISOString().substr(0, 10),
            }
        },
        methods: {
            addToWatched() {
                axios.request({
                    url: this.apiUrl+"/user-film-log",
                    method: "POST",
                    headers: {
                        token: cookies.get(`sessionToken`)
                    },
                    data: {
                        movieId: this.$route.params.movieId,
                        watchedOn: this.date,
                        rating: this.rating,
                        loved: this.loved
                    }
                }).then((response)=>{
                    this.feedbackMsg = response.data
                }).catch((error)=>{
                    console.log(error);
                })
            },
            toggleLoved() {
                this.loved = !this.loved;
            },
        },
    }
</script>

<style scoped>
.form {
    color: #212529;
    width: 50%;
    margin-top: 50px;
    padding: 20px;
    border-radius: 5px;
}
.rating{
    margin-top: 25px;
}
.v-btn{
    margin-top: 25px;
    width: 150px;
    background-color: whitesmoke;
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
</style>