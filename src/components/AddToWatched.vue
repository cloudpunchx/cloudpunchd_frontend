<template>
    <div>
        <v-card
        elevation="2"
        max-width="250px"
        class="container"
        >
            <v-row align="center" justify="center">
                <v-img max-width="50" class="img" src="../assets/watchIcon.png"></v-img>
                <v-img max-width="50" class="img" src="../assets/likeIcon.png"></v-img>
                <v-img max-width="50" class="img" src="../assets/watchlistIcon.png"></v-img>
            </v-row>
            <v-card-text>
                <v-row align="center" justify="center">
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
                <v-row align="center" justify="center">
                    <v-checkbox 
                    color="#adb5bd"
                    background-color="whitesmoke"
                    v-model="loved" 
                    label="Loved"
                    @click="toggleLoved"
                    >
                    </v-checkbox>
                </v-row>
                <v-row align="center" justify="center">
                    <v-btn 
                    type="submit" 
                    variant="tonal"
                    @click="addToWatched"
                    >SUBMIT
                    </v-btn>
                </v-row>
                <v-row align="center" justify="center">
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
.img{
    margin: 10px;
}
.container {
    background-color: #2f3337;
    padding: 20px;
}
.rating{
    margin-top: 25px;
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