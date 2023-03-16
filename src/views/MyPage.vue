<template>

    <!-- TEST PAGE  -->
        <div class="page">
        <header>
            <h1>Welcome to my page</h1>
        </header>
        <div class="background-image">
            <div class="overlay"></div>
        </div>
        <div class="content">
            <div class="image-container">
            <img src="https://pusheen.com/wp-content/uploads/2021/04/Plant-Hero.jpg" alt="Image description">
            </div>
            <div class="text-container">
            <h2>Image Title</h2>
            <p>Image description text goes here.</p>
            </div>
        </div>
        </div>
</template>

<script>
    export default {
        name: "MyPage",
    };
</script>

<style scoped>
    .page {
        font-family: sans-serif;
    }
    
    header {
        background-color: #222;
        color: #fff;
        padding: 1em;
    }
    
    h1 {
        margin: 0;
    }
    
    .background-image {
        height: 50vh;
        background: url('https://pusheen.com/wp-content/uploads/2021/04/Plant-Hero.jpg') no-repeat center top;
        background-size: cover;
        position: relative;
    }
    
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    }
    
    .content {
        display: flex;
        flex-direction: row;
        padding: 2em;
        box-sizing: border-box;
    }
    
    .image-container {
        width: 50%;
    }
    
    img {
        width: 100%;
    }
    
    .text-container {
        width: 50%;
        padding-left: 2em;
        box-sizing: border-box;
    }
    
    h2 {
        margin: 0;
    }
    
    p {
        font-size: 1.2em;
    }
</style>
