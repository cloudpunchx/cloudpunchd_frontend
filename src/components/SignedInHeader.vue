<template>
    <div>
        <v-app-bar
            color="transparent"
            dark
            elevation="0"
            absolute
            class="nav-bar"
        >
            <!-- Only show Icon when it isMobile -->
            <v-app-bar-nav-icon
                v-show="isMobile"
                @click="toggleDrawer"
                class="navIcon"
            ></v-app-bar-nav-icon>

            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                <router-link to="/home">
                    <img
                        src="../assets/cloudpunchdLogo.png"
                        alt="Logo"
                        class="logo"
                    />
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-menu v-show="!isMobile" offset-y>
                <template v-slot:activator="{on, attrs}">
                    <v-btn
                        text
                        v-show="!isMobile"
                        v-bind="attrs"
                        v-on="on"
                        @mouseover="showDropdown = true"
                        class="listItemBtn"
                    >
                        <v-avatar v-show="!isMobile" size="30" class="avatar"
                            ><v-img :src="profileImg"></v-img
                        ></v-avatar>
                        {{ usernameUppercase }}
                        <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list
                    v-show="showDropdown"
                    @mouseover="showDropdown = true"
                    @mouseout="showDropdown = false"
                    class="listItem"
                >
                    <v-list-item
                        ><router-link
                            :to="'/user/' + username"
                            tag="div"
                            class="listItem"
                            >Profile</router-link
                        ></v-list-item
                    >
                    <v-list-item
                        ><router-link
                            :to="username + '/watchlist'"
                            tag="div"
                            class="listItem"
                            >Watchlist</router-link
                        ></v-list-item
                    >
                    <v-list-item
                        ><router-link to="/settings" tag="div" class="listItem"
                            >Settings</router-link
                        ></v-list-item
                    >
                    <v-list-item>
                        <v-list-item-title class="listItem">
                            <UserLogout />
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-text-field
                v-show="!isMobile"
                v-model="query"
                hide-details
                clearable
                append-icon="mdi-magnify"
                @click:append="search_movies"
                background-color="rgba(148, 148, 148, 0.63)"
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </v-app-bar>

        <!-- Nav Drawer for Tablet/Mobile (smaller screens) -->
        <v-navigation-drawer
            color="grey"
            v-model="drawer"
            absolute
            temporary
            left
            :style="{position: drawer ? 'fixed' : 'absolute'}"
        >
            <v-list nav dense>
                <v-list-item-group>
                    <v-list-item>
                        <v-text-field
                            class="textField"
                            v-model="query"
                            dark
                            hide-details
                            clearable
                            append-icon="mdi-magnify"
                            @click:append="search_movies"
                            background-color="rgba(148, 148, 148, 0.63)"
                        >
                        </v-text-field>
                    </v-list-item>

                    <v-list-item>
                        <router-link
                            :to="'/user/' + username"
                            tag="div"
                            class="mobileListItem"
                            >Profile</router-link
                        >
                    </v-list-item>

                    <v-list-item>
                        <router-link
                            :to="username + '/watchlist'"
                            tag="div"
                            class="mobileListItem"
                            >Watchlist</router-link
                        >
                    </v-list-item>

                    <v-list-item>
                        <router-link
                            to="/settings"
                            tag="div"
                            class="mobileListItem"
                            >Settings</router-link
                        >
                    </v-list-item>

                    <v-list-item>
                        <UserLogout class="mobileListItem" />
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import router from "@/router";
    import UserLogout from "@/components/UserLogout.vue";

    export default {
        name: "SignedInHeader",
        components: {
            UserLogout,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                username: "",
                usernameUppercase: "",
                profileImg: "",
                showDropdown: false,
                query: "",
                drawer: false,
            };
        },
        computed: {
            isMobile() {
                const isMobile = this.$vuetify.breakpoint.smAndDown;
                console.log("isMobile:", isMobile);
                return isMobile;
            },
        },
        methods: {
            get_user_profile() {
                axios
                    .request({
                        url: this.apiUrl + "/user",
                        method: "GET",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                    })
                    .then((response) => {
                        this.username = response.data.username;
                        this.usernameUppercase = this.username.toUpperCase();
                        this.profileImg = response.data.profileImg;
                    })
                    .catch((error) => {
                        this.errorMsg = error;
                    });
            },
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },
            search_movies() {
                router.push({
                    name: "SearchResults",
                    params: {query: this.query},
                });
            },
            toggleDrawer() {
                this.drawer = !this.drawer;
            },
        },
        created() {
            this.get_user_profile();
        },
    };
</script>

<style scoped>
    .v-app-bar {
        z-index: 2;
    }
    .nav-bar {
        border: none;
        padding: 10px;
    }
    .avatar {
        margin: 10px;
    }
    .listItemBtn {
        margin-right: 5px;
    }
    .listItem {
        color: rgb(202, 221, 240);
        background-color: #2c3440;
    }
    .listItem:hover {
        color: whitesmoke;
        cursor: pointer;
    }
    .mobileListItem {
        color: rgb(202, 221, 240);
    }
    .mobileListItem:hover {
        color: whitesmoke;
    }

    @media (min-width: 1px) {
        /* Mobile Sizing */
        .logo {
            width: 150px;
            margin-top: 15px;
            cursor: pointer;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med Size */
        .logo {
            width: 200px;
        }
    }

    @media (min-width: 960px) {
        /* Desktop / Large */
        .logo {
            width: 250px;
            margin-top: 10px;
        }
    }
</style>
