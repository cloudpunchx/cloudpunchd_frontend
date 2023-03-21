<template>
    <div>
        <v-app-bar color="transparent" dark elevation="0" absolute class="nav-bar">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        <v-toolbar-title>
            <router-link to="/">
            <img src="../assets/cloudpunchdLogo.png" alt="Logo" class="logo">
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
            <v-text-field v-model="search" hide-details clearable append-icon="mdi-magnify" background-color="rgba(148, 148, 148, 0.63)" class="textField"></v-text-field>
            <button class="signIn" @click="showModal = true">SIGN IN</button>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        </v-app-bar>

        <transition name="fade" appear>
            <div class="modal-overlay" 
                v-if="showModal" 
                @click="showModal = false">
            </div>
        </transition>
        <transition name="pop" appear>
            <div class="modal" 
            role="dialog" 
            v-if="showModal"
            >
                <UserLogin/>
            </div>
        </transition>
    </div>
</template>

<script>
import UserLogin from '@/components/UserLogin.vue'

    export default {
        name: "PageHeader",
        components: {
            UserLogin,
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

.nav-bar {
    border: none !important;
}
.logo {
    height: 32px;
    margin-top: 5px;
    cursor: pointer;
}
.v-app-bar{
    z-index: 2;
}
.search-box {
    margin-right: -200px;
}
button{
    padding: 5px;
    border-radius: 5px;
}
button:hover{
    background-color: #4c9e9e;
}
.signIn{
    margin-left: 20px;
}
.textField{
    border-radius: 5px;
}

/* CHECKBOX HACK */

input[type=checkbox]{
    display: none;
} 

/* Pop Up for Sign In */
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

/* Modal Overlay Transition */

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