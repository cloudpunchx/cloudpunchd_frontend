<template>
    <div>
        <div class="backdropContainer">
            <div v-for="movie in movie" :key="movie.id" class="grad1">
                <img class="backdropFade" :src="movie.coverImg">
            </div>
        </div>

        <!-- <div class="container" ref="container">
            <img :src="imageUrl" class="image" ref="image" @load="handleLoad" />
            <div :style="gradientStyle" class="gradient"></div>
        </div> -->
    </div>
</template>

<!-- <script>
export default {
    props: {
        imageUrl: {
        type: String,
        required: true,
        },
    },
    data() {
        return {
        gradientStops: [0, 0.3, 0.6, 1],
        gradientColors: [
            'rgba(0, 0, 0, 0.8)',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.3)',
            'rgba(0, 0, 0, 0)',
        ],
        };
    },
    computed: {
        gradientStyle() {
        return {
            background: `linear-gradient(to top, ${this.gradientColors
            .map((color, i) => `${color} ${this.gradientStops[i] * 100}%`)
            .join(', ')})`,
        };
        },
    },
    methods: {
        handleLoad() {
        const container = this.$refs.container;
        const image = this.$refs.image;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        const widthRatio = containerWidth / imageWidth;
        const heightRatio = containerHeight / imageHeight;
        const minRatio = Math.min(widthRatio, heightRatio);

        this.gradientStops = [0, 0.3 * minRatio, 0.6 * minRatio, 1];
        },
    },
};
</script> -->

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
/* .container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; 
    overflow: hidden;
}

.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
} */


.backdropFade{
    height: 65vh;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translateX(-50%);
    z-index: 1;
}

.grad1{
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%),
                linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0) 100%),
                linear-gradient(to left, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0) 100%);
}

/* .grad1 img {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 1) 100%),
                linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%),
                linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
} */
</style>