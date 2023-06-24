<!-- need to remove writing from imgs -->
<!-- add text here and make it bigger/color on hover -->
<!-- connect button to img -->

<template>
    <div>
        <v-card
        elevation="2"
        class="container"
        >
            <v-row justify="center">
                <v-img class="img" src="../assets/watchIcon.png"></v-img>
                <v-img class="img" src="../assets/likeIcon.png"></v-img>
                <v-img class="img" src="../assets/watchlistIcon.png"></v-img>
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
                date: "",
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
.img{
    width: 65px;
    margin: 10px;
}
.container {
    width: 300px;
    background-color: #2f3337;
    padding: 30px;
}
.divider{
    width: 100%;
    margin: 20px auto;
}
.rating{
    margin-top: 15px;
}
.v-btn{
    width: 100px;
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