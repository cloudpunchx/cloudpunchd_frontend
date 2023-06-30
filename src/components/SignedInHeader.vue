
<!-- what is this?             handleItemClick(item) {
                console.log(item);
            }, -->
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
            <v-spacer></v-spacer>
            <v-avatar size="40"><v-img :src="profileImg"></v-img></v-avatar>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                    text 
                    v-bind="attrs" 
                    v-on="on" 
                    @mouseover="showDropdown = true"
                    class="listItemBtn"
                    >
                        {{ usernameUppercase }}
                        <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list 
                v-show="showDropdown" 
                @mouseover="showDropdown = true" 
                @mouseout="showDropdown = false"
                class="listItem"
                >
                    <v-list-item><router-link :to="'/user/'+username" tag="div" class="listItem">Profile</router-link></v-list-item>
                    <v-list-item><router-link :to="username+'/watchlist'" tag="div" class="listItem">Watchlist</router-link></v-list-item>
                    <v-list-item>
                        <v-list-item-title class="listItem">
                            <UserLogout/>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-text-field 
                v-model="query" 
                hide-details 
                clearable 
                append-icon="mdi-magnify" 
                @click:append="search_movies"
                background-color="rgba(148, 148, 148, 0.63)" 
                filled
                shaped
                >
            </v-text-field>
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
                query: "",
            }
        },
        methods: {
            get_user_profile(){
                axios.request({
                    url: this.apiUrl+"/user",
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
.listItemBtn{
    color: whitesmoke;
}
.listItemBtn:hover{
    color: rgb(157, 157, 157);
}
.listItem{
    color: whitesmoke;
    background-color: #052938;
}
.listItem:hover{
    color: rgb(157, 157, 157);
    cursor: pointer;
}
.nav-bar {
    border: none;
    padding: 10px;
}
.logo {
    width: 250px;
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
    margin: 10px;
}
</style>