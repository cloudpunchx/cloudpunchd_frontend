<!-- fix Create Acct pop up, modal not covering page -->

<template>
    <div class="pageContainer">
        <div>
            <PageHeader/>
        </div>

        <FrontPageImg/>

        <v-container class="description">
            <v-row>
                <v-col>
                    <h1 class="introText">Track Your Love For Movies</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h1 class="introText">Share With Friends</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn 
                    @click="showModal = true"
                    color="white"
                    text
                    rounded
                    >
                    CREATE AN ACCOUNT
                    </v-btn>
                </v-col>
            </v-row>

            <v-row align-content="center" justify="center">
                <v-col
                cols="12"
                sm="9"
                md="11"
                lg="9"
                >
                    <FeaturedMovies/>
                </v-col>
            </v-row>

            <div class="footer">
                <PageFooter/>
            </div>

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
        </v-container>
    </div>
</template>

<script>
import cookies from 'vue-cookies';
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
        token: "",
        }
    },
    methods: {
        signUpPopOut() {
        this.active = !this.active;
        },
    },
    beforeRouteEnter(to, from, next) {
        const token = cookies.get('sessionToken');
        if (token) {
        next(vm => {
            vm.$router.replace('/home');
        });
        } else {
        next();
        }
    },
}
</script>

<style scoped>
.description{
    background-color: #001219;
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
    font-size: 1rem;
    border: 1px solid #DD1C1A;
    background-color: #dd1d1a61;
}

.v-btn:hover {
    background-color: #DD1C1A;
}

.featuredContainer{
    margin-top: 100px;
}

.footer{
    padding-top: 100%;
    position: absolute;
    bottom: -100vh;
    width: 100%;
    background-color: #001219;
    z-index: -1;
}

@media (min-width: 1px) {
    /* Mobile / Small size */
    .description{
        margin-top: -20%;
    }
    
    .introText{
        font-size: 2rem;
        color: whitesmoke;
        font-family: lobster;
    }
}

@media (min-width: 480px) {
    /* Tablet / Med size */

    .description{
        margin-top: 0;
    }
}

@media (min-width: 800px) {
    /* Desktop / Large size */
    
    .introText{
        font-size: 2.5rem;
    }
}

/* Pop Out Modal */
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