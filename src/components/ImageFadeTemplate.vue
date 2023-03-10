<template>
    <div>
        <div class="backdropContainer">
            <div class="grad1">
                <img class="backdropFade" src="https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2022/10/12/Barbarian-Digital-Movie-HD-Stills-.jpg?quality=80&zoom=1&ssl=1">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ImageFadeTemplate"
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