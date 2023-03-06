<template>
    <div>
        <img class="logo" src="../assets/cloudpunchdLogo.png" alt="Cloudpunchd Logo">
        <div class="backdropContainer">
            <img class="backdropFade" src="../assets/barbarian.png" alt="Barbarian 2022 Still">
        </div>

    </div>
</template>

<script>
    export default {
        name: "SecondaryHeader"
    }
</script>

<style scoped>
.logo{
    width: 14vw;
    padding: 15px;
    position: relative;
    margin-left: 25%;
    z-index: 2;
}
.backdropFade{
    width: 65vw;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translateX(-50%);
    z-index: 1;
}

</style>