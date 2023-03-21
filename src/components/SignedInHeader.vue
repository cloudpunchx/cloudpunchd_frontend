<template>
    <div>
        <v-app-bar color="transparent" dark elevation="0" absolute class="nav-bar">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                <router-link to="/home">
                    <img src="../assets/cloudpunchdLogo.png" alt="Logo" class="logo">
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field 
                v-model="query" 
                hide-details 
                clearable 
                append-icon="mdi-magnify" 
                @click:append="search_movies"
                background-color="rgba(148, 148, 148, 0.63)" 
                class="textField"
                >
            </v-text-field>
            <v-avatar size="35"><v-img :src="profileImg"></v-img></v-avatar>
            <v-menu offset-y class="my-menu">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on" @mouseover="showDropdown = true">
                        {{ usernameUppercase }}
                        <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list v-show="showDropdown" @mouseover="showDropdown = true" @mouseout="showDropdown = false">
                    <v-list-item><router-link :to="'/user/'+username" tag="div">PROFILE</router-link></v-list-item>
                    <v-list-item><router-link :to="username+'/watchlist'" tag="div">WATCHLIST</router-link></v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                        <UserLogout/>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </v-app-bar>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';
import UserLogout from '@/components/UserLogout.vue'

    export default {
        name: "SignedInHeader",
        components: {
            UserLogout,
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                username: "",
                usernameUppercase: "",
                profileImg: "",
                showDropdown: false,
                query: ""
            }
        },
        methods: {
            get_user_profile(){
                axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "GET",
                    headers: {
                        token: cookies.get(`sessionToken`)
                    },
                }).then((response)=>{
                    this.username = response.data.username;
                    this.usernameUppercase = this.username.toUpperCase();
                    this.profileImg = response.data.profileImg;
                }).catch((error)=>{
                    this.errorMsg = error;
                })
            },
            toggleDropdown() {
                this.showDropdown = !this.showDropdown
            },
            handleItemClick(item) {
                console.log(item);
            },
            search_movies(){
                router.push({name: 'SearchResults', params: {query: this.query}});
            },
        },
        created (){
            this.get_user_profile();
        }
    }
</script>

<style scoped>
.my-menu .v-list {
    background-color: #f5f5f5;
}
.v-list-item:hover{
    cursor: pointer;
    background-color: #4c9e9e;
}
.nav-bar {
    border: none !important;
    padding: 10px;
}
.logo {
    margin-top: 5px;
    cursor: pointer;
    width: 300px;
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
    margin-right: 25px;
}
</style>