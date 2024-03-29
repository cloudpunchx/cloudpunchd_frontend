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
                <router-link to="/">
                    <img
                        src="../assets/cloudpunchdLogo.png"
                        alt="Logo"
                        class="logo"
                    />
                </router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <button v-show="!isMobile" class="signIn" @click="showModal = true">
                SIGN IN
            </button>

            <button
                v-show="!isMobile"
                class="signIn"
                @click="showModal2 = true"
            >
                CREATE ACCOUNT
            </button>

            <v-text-field
                v-show="!isMobile"
                class="textField"
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

        <!-- Pop Out for Log In -->
        <transition name="fade" appear>
            <div
                class="modal-overlay"
                v-if="showModal"
                @click="showModal = false"
            ></div>
        </transition>
        <transition name="pop" appear>
            <div class="modal" role="dialog" v-if="showModal">
                <UserLogin />
            </div>
        </transition>

        <!-- Pop Out for Sign Up -->
        <transition name="fade" appear>
            <div
                class="modal-overlay"
                v-if="showModal2"
                @click="showModal2 = false"
            ></div>
        </transition>
        <transition name="pop" appear>
            <div class="modal" role="dialog" v-if="showModal2">
                <UserSignup />
            </div>
        </transition>

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
                        <button class="listItem" @click="showModal = true">
                            SIGN IN
                        </button>
                    </v-list-item>

                    <v-list-item>
                        <button class="listItem" @click="showModal2 = true">
                            CREATE ACCOUNT
                        </button>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import router from "@/router";
    import UserLogin from "@/components/UserLogin.vue";
    import UserSignup from "@/components/UserSignup.vue";

    export default {
        name: "PageHeader",
        components: {
            UserLogin,
            UserSignup,
        },
        data() {
            return {
                showModal: false,
                showModal2: false,
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
    };
</script>

<style scoped>
    .v-app-bar {
        z-index: 2;
    }
    .nav-bar {
        background: linear-gradient(to bottom, #11161d, transparent);
    }
    button {
        color: rgb(224, 224, 224);
        padding: 5px;
        border-radius: 5px;
    }
    button:hover {
        color: white;
    }
    .signIn {
        margin-right: 20px;
    }

    .listItem {
        color: rgb(202, 221, 240);
    }
    .listItem:hover {
        color: whitesmoke;
        cursor: pointer;
    }

    /* CHECKBOX */

    input[type="checkbox"] {
        display: none;
    }

    /* Pop Up for Sign In/Sign Up */
    .modal {
        position: fixed;
        top: 50%; /* Center the modal vertically */
        left: 50%; /* Center the modal horizontally */
        transform: translate(-50%, -50%); /* Center the modal perfectly */
        margin: auto;
        text-align: center;
        border-radius: 1rem;
        z-index: 999;
    }

    .modal-overlay {
        content: "";
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
        transition: opacity 0.4s linear;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .pop-enter-active,
    .pop-leave-active {
        transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1),
            opacity 0.4s linear;
    }

    .pop-enter,
    .pop-leave-to {
        opacity: 0;
        transform: scale(0.3) translateY(-50%);
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

        .textField {
            width: 60px;
        }
    }
</style>
