<template>
    <div>
        <PageHeader/>
        <ImageFadeTemplate/>
        <section class="description">
            <h1>Track Your Films</h1>
            <h1>Share With Friends</h1>
            <div class="buttonContainer">
                <v-btn @click="showModal = true" class="signUpPopOut" variant="tonal">
                CREATE AN ACCOUNT
                </v-btn>
            </div>
            <div v-if="active" class="signUpPopOut">
                <UserSignup/>
            </div>
            <div class="featuredContainer">
                <FeaturedMovies/>
            </div>
        </section>

        <transition name="fade" appear>
            <div class="modal-overlay" 
                v-if="showModal" 
                @click="showModal = false"></div>
        </transition>
        <transition name="pop" appear>
            <div class="modal" 
            role="dialog" 
            v-if="showModal"
            >
                <UserSignup/>
            </div>
        </transition>

    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import ImageFadeTemplate from '@/components/ImageFadeTemplate.vue'
import FeaturedMovies from '@/components/FeaturedMovies.vue'
import UserSignup from '@/components/UserSignup.vue'

    export default {
        name: "HomePage",
        data() {
            return {
                active: false,
                showModal: false,
            }
        },
        components: {
            PageHeader,
            ImageFadeTemplate,
            FeaturedMovies,
            UserSignup
        },
        methods: {
            signUpPopOut() {
                this.active = !this.active;
            }
        }
        
    }
</script>

<style scoped>
h1{
    color: white;
    font-size: 30pt;
}
.description{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}
.buttonContainer{
    margin-top: 30px;
    position: inherit;
    left: 50%;
    transform: translateX(-50%);
}
.v-btn{
    width: 300px;
}
.signUpPopOut{
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
    z-index: 1;
}

.featuredContainer{
    margin-top: 100px;
}

.modal {
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    width: fit-content;
    height: fit-content;
    max-width: 22em;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #FFF;
    z-index: 999;
    transform: none;
}

.modal-overlay {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #505153;
    opacity: 0.6;
    cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}
</style>