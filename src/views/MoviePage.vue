<template>
    <div>
        <SignedInHeader/>
        <div v-for="movie in movies" :key="movie.id">
            <div class="backdropContainer">
                <div class="grad1">
                    <img class="backdropFade" src="movie.cover_img">
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import SignedInHeader from '@/components/SignedInHeader.vue'

    export default {
        name: "MoviePage",
        components: {
            SignedInHeader
        }
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

.grad1 img {
    -webkit-mask-image: linear-gradient(black, transparent);
    mask-image: linear-gradient(black, transparent);
}
</style>