<template>
    <div class="grad1">
        <div v-for="movie in movie" :key="movie.id">
            <img class="backdropFade" :src="movie.coverImg" />
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "FrontPageImg",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                movie: [],
            };
        },
        methods: {
            getMovieCoverImg() {
                axios
                    .request({
                        url: this.apiUrl + "/movie-cover-img",
                        method: "GET",
                    })
                    .then((response) => {
                        this.movie = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
        mounted() {
            this.getMovieCoverImg();
        },
    };
</script>

<style scoped>
    @media (min-width: 1px) {
        /* Mobile / Small size */
        .backdropFade {
            height: 30vh;
            position: absolute;
            top: 0%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */

        .backdropFade {
            height: 40vh;
            position: absolute;
            top: 0%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }
    }

    @media (min-width: 800px) {
        /* Desktop / Large size */
        .backdropFade {
            height: 50vh;
            position: absolute;
            top: 0%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }
    }

    .grad1 img {
        -webkit-mask-image: linear-gradient(rgb(0, 0, 0), transparent);
        mask-image: linear-gradient(black, transparent);
    }
</style>
