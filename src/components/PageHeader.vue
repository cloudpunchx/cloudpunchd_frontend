<template>
    <div>
        <nav class="navbar">
            <!-- LOGO -->
            <router-link class="logo" to="/">
                <img class="logo" src="../assets/cloudpunchdLogo.png" alt="Cloudpunchd Logo">
            </router-link>
            <!-- NAVIGATION MENU -->
            <ul class="nav-links">
            <!-- USING CHECKBOX HACK -->
                <input type="checkbox" id="checkbox_toggle"/>
                <label for="checkbox_toggle" class="hamburger">&#9776;</label>
                <!-- NAVIGATION MENUS -->
                <div class="menu">
                    <li><button @click="showModal = true">SIGN IN</button></li>
                </div>
            </ul>   
        </nav>

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
.logo{
    width: 14vw;
    left: 22%;
    position: relative;
    z-index: 2;
}
/* NAVBAR STYLING STARTS */

.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: transparent;
    color: #fff;
}
.nav-links{
    margin-right: 25%;
    position: relative;
    z-index: 2;
}

.nav-links a {
    color: #fff;
    text-decoration: none;
}

li{
    list-style-type: none;
}

/* NAVBAR MENU */

.menu {
    display: flex;
    gap: 1em;
    font-size: 22px;
}

.menu li:hover {
    background-color: #4c9e9e;
    border-radius: 5px;
    transition: 0.3s ease;
}

.menu li {
    padding: 5px 14px;
}

/* DROPDOWN MENU */

.services {
    position: relative; 
}

.dropdown {
    background-color: rgb(1, 139, 139);
    padding: 1em 0;
    position: absolute; /*WITH RESPECT TO PARENT*/
    display: none;
    border-radius: 8px;
    top: 35px;
}

.dropdown li + li {
    margin-top: 10px;
}

.dropdown li {
    padding: 0.5em 1em;
    width: 8em;
    text-align: center;
}

.dropdown li:hover {
    background-color: #4c9e9e;
}

.services:hover .dropdown {
    display: block;
}
/*RESPONSIVE NAVBAR MENU STARTS*/

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

/*HAMBURGER MENU*/

.hamburger {
    display: none;
    font-size: 24px;
    user-select: none;
}

/* APPLYING MEDIA QUERIES */

@media (max-width: 1120px) {
    .menu { 
        display:none;
        position: absolute;
        background-color:teal;
        right: 0;
        left: 0;
        text-align: center;
        padding: 16px 0;
    }

.menu li:hover {
    display: inline-block;
    background-color:#4c9e9e;
    transition: 0.3s ease;
}

.menu li + li {
    margin-top: 12px;
}

input[type=checkbox]:checked ~ .menu{
    display: block;
}

.hamburger {
    display: block;
}

.dropdown {
    left: 50%;
    top: 30px;
    transform: translateX(35%);
}

.dropdown li:hover {
    background-color: #4c9e9e;
}

}
</style>