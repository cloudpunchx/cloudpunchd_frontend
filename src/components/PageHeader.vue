<!-- Need to design header for resize -->

<template>
    <div>
        <v-app-bar color="transparent" dark elevation="0" absolute class="nav-bar">
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
            <button 
            class="signIn" 
            @click="showModal = true"
            >SIGN IN</button>
            <button 
            class="signIn" 
            @click="showModal2 = true"
            >CREATE ACCOUNT</button>
            <v-text-field 
            v-model="search" 
            hide-details 
            clearable 
            append-icon="mdi-magnify" 
            background-color="rgba(148, 148, 148, 0.63)" 
            class="textField"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </v-app-bar>

        <!-- Pop Out for Log In -->
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
        
        <!-- Pop Out for Sign Up -->
        <transition name="fade" appear>
            <div class="modal-overlay" 
                v-if="showModal2" 
                @click="showModal2 = false">
            </div>
        </transition>
        <transition name="pop" appear>
            <div class="modal" 
            role="dialog" 
            v-if="showModal2"
            >
                <UserSignup/>
            </div>
        </transition>
        
    </div>
</template>

<script>
import UserLogin from '@/components/UserLogin.vue'
import UserSignup from '@/components/UserSignup.vue'

    export default {
        name: "PageHeader",
        components: {
            UserLogin,
            UserSignup
        },
        data() {
            return {
                // active: false,
                showModal: false,
                showModal2: false,
            }
        },
    }
</script>

<style scoped>
.logo {
    width: 250px;
    margin-top: 5px;
    cursor: pointer;
}
.v-app-bar{
    z-index: 2;
}
button{
    color: rgb(224, 224, 224);
    padding: 5px;
    border-radius: 5px;
}
button:hover{
    color: white;
}
.signIn{
    margin-right: 20px;
}
.textField{
    border-radius: 15px;
}

/* CHECKBOX */

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