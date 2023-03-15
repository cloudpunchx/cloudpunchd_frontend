<template>
    <div>
        <nav class="navbar">
            <!-- LOGO -->
            <router-link to="/home" class="logo">
                <img class="logo" src="../assets/cloudpunchdLogo.png" alt="Cloudpunchd Logo">
            </router-link>
            <!-- NAVIGATION MENU -->
            <ul class="nav-links">
            <!-- USING CHECKBOX HACK -->
                <input type="checkbox" id="checkbox_toggle" />
                <label for="checkbox_toggle" class="hamburger">&#9776;</label>
                <!-- NAVIGATION MENUS -->
                <div class="menu">
                    <li class="services">
                        <router-link :to="'/user/'+username">{{ username }}</router-link>
                        <!-- DROPDOWN MENU -->
                        <ul class="dropdown">
                            <li><router-link :to="username+'/watchlist'">WATCHLIST</router-link></li>
                            <li><UserLogout/></li>
                        </ul>
                    </li>
                </div>
            </ul>   
        </nav>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import UserLogout from '@/components/UserLogout.vue'

    export default {
        name: "SignedInHeader",
        components: {
            UserLogout,
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                username: "",
            }
        },
        methods: {
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            get_user_profile(){
                axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "GET",
                    headers: {
                        token: this.token
                    },
                }).then((response)=>{
                    this.username = response.data.username;
                }).catch((error)=>{
                    this.errorMsg = error;
                })
            },
        },
        created (){
            this.getToken();
            this.get_user_profile();
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
    text-transform: uppercase;
}

/* NAVBAR MENU */

.menu {
    display: flex;
    gap: 1em;
    /* font-size: 18px; */
    font-size: 1em;
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