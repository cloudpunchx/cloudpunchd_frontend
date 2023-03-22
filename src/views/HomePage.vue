<template>
    <div class="pageContainer">
        <div>
            <PageHeader/>
        </div>
        <div>
            <FrontPageImg/>
            <section class="description">
                <h1>Track Your Love For Movies</h1>
                <h1>Share With Friends</h1>
                <div class="buttonContainer">
                    <v-btn @click="showModal = true" variant="tonal">
                    CREATE AN ACCOUNT
                    </v-btn>
                </div>
                <div class="featuredContainer">
                    <FeaturedMovies/>
                </div>
                <PageFooter/>
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
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import FrontPageImg from '@/components/FrontPageImg.vue'
import FeaturedMovies from '@/components/FeaturedMovies.vue'
import UserSignup from '@/components/UserSignup.vue'
import PageFooter from '@/components/PageFooter.vue'

    export default {
        name: "HomePage",
        components: {
            PageHeader,
            FrontPageImg,
            FeaturedMovies,
            UserSignup,
            PageFooter
        },
        data() {
            return {
                active: false,
                showModal: false,
            }
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
    background-color: #212529;
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
    width: 270px;
}

.v-btn:hover {
    background-color: #4c9e9e;
}

.featuredContainer{
    margin-top: 100px;
}

.modal {
    position: fixed;
    top: 20%;
    right: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: auto;
    text-align: center;
    border-radius: 1rem;
    z-index: 999;
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