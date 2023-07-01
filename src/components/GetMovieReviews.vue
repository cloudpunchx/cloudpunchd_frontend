<template>
    <div>
        <!-- change depending on if movie has reviews or not -->
        <div v-if="reviews.length > 0">
            <v-container v-for="review in reviews" :key="review.ID">
                <v-row no-gutters>
                    <v-col cols="auto">
                        <v-avatar size="50">
                            <v-img :src="review.profileImg"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col cols class="contentBox">
                        <h5>Review by {{ review.Username }}<span class="dateSpan"> on {{ review.watchedOn }}</span></h5>
                        <v-rating
                            :value="parseFloat(review.Rating)"
                            half-increments
                            color="red"
                            size="15"
                            dense
                            readonly
                            empty-icon
                        />
                        <p>Watched {{ review.watchedOn }}</p>
                        <p class="bodyText">{{ review.Review }}</p>
                    </v-col>
                </v-row>
                <v-divider class="divider" color="#adb5bd"></v-divider>
            </v-container>
        </div>

        <div v-else>
            <p class="altText">Be the first to review this!</p>
        </div>

    </div>
</template>

<script>
import axios from "axios";

    export default {
        name: "GetMovieReviews",
                data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movieId: this.$route.params.movieId,
                reviews: []
            }
        },
        methods: {
            getMovieReviews() {
                axios.request({
                    url: this.apiUrl+"/movie-reviews",
                    method: "GET",
                    params: {
                        movieId: this.$route.params.movieId,
                    }
                }).then((response)=>{
                    this.reviews = response.data
                }).catch((error)=>{
                    console.log(error);
                })
            },
        },
        mounted () {
            this.getMovieReviews();
        },
    }
</script>

<style scoped>
.contentBox{
    margin-left: 20px;
}
.divider{
    width: 100%;
}
.altText{
    font-size: 15pt;
    margin: 15px;
}
</style>