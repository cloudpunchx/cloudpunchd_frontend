<template>
    <div>
        <div  v-for="movie in movie" :key="movie.id"> 
            <img class="backdropFade" :src="movie.coverImg">
        </div>
    </div>
</template>

<script>
import axios from "axios";

    export default {
        name: "ImageFadeTemplate",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                movie: []
            }
        },
        methods: {
            getMovieCoverImg() {
                axios.request({
                    url: this.apiUrl+"/movie-cover-img",
                    method: "GET",
                }).then((response)=>{
                    this.movie = response.data;
                }).catch((error)=>{
                    console.log(error);
                })
            },
        },
        mounted () {
            this.getMovieCoverImg();
        },
    }
</script>

<style scoped>
.backdropFade{
    height: 65vh;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translateX(-50%);
    z-index: 1;
}
</style>