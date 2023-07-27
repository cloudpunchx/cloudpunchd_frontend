<template>
    <div class="pageContainer">
        <div v-if="token" class="header">
            <SignedInHeader />
        </div>
        <div v-else>
            <PageHeader class="header" />
        </div>

        <div class="parentContainer">
            <v-container class="profileContainer">
                <v-row dense no-gutters>
                    <v-col sm="4" lg="2">
                        <v-avatar size="150" class="avatar"
                            ><v-img :src="profile_img"></v-img
                        ></v-avatar>
                    </v-col>

                    <v-col sm="6" lg="5">
                        <div class="userInfo">
                            <h2>{{ username }}</h2>
                            <p class="bio">{{ bio }}</p>
                        </div>
                    </v-col>

                    <v-col sm="3" lg="3">
                        <div>
                            <router-link to="/settings">
                                <v-btn class="editBtn" x-small>
                                    EDIT PROFILE
                                </v-btn>
                            </router-link>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div class="parentContainer2">
            <v-container class="contentContainer">
                <v-row>
                    <v-col cols="auto" sm="10" md="8" lg="8">
                        <div>
                            <h4>FAVOURITE FILMS</h4>
                            <v-divider
                                class="divider"
                                color="#adb5bd"
                            ></v-divider>
                            <UserTopFour />
                        </div>
                        <div>
                            <h4>RECENTLY WATCHED</h4>
                            <v-divider
                                class="divider"
                                color="#adb5bd"
                            ></v-divider>
                            <RecentlyWatched />
                        </div>
                    </v-col>
                    <v-col cols="12" md="12" lg="4">
                        <v-row>
                            <v-col cols="12">
                                <div class="sideSection">
                                    <h4>FILM LOG</h4>
                                    <v-divider
                                        class="divider"
                                        color="#adb5bd"
                                    ></v-divider>
                                    <UserFilmLog />
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="watchlistContainer">
                                    <h4>WATCHLIST</h4>
                                    <v-divider
                                        class="divider"
                                        color="#adb5bd"
                                    ></v-divider>
                                    <UserWatchlistMini />
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" lg="8">
                        <div class="reviewContainer">
                            <h4>RECENT REVIEWS</h4>
                            <v-divider
                                class="divider3"
                                color="#adb5bd"
                            ></v-divider>
                            <UserReviews />
                        </div>
                    </v-col>
                    <v-col cols="12" md="12" lg="4">
                        <!-- Placeholder column for spacing -->
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div class="footer">
            <PageFooter />
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import PageHeader from "@/components/PageHeader.vue";
    import UserTopFour from "@/components/UserTopFour.vue";
    import RecentlyWatched from "@/components/RecentlyWatched.vue";
    import UserReviews from "@/components/UserReviews.vue";
    import UserFilmLog from "@/components/UserFilmLog.vue";
    import UserWatchlistMini from "@/components/UserWatchlistMini.vue";
    import PageFooter from "@/components/PageFooter.vue";

    export default {
        name: "UserProfile",
        components: {
            SignedInHeader,
            PageHeader,
            UserTopFour,
            RecentlyWatched,
            UserReviews,
            UserFilmLog,
            UserWatchlistMini,
            PageFooter,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                bio: "",
                profile_img: "",
                errorMsg: "",
            };
        },
        methods: {
            getUserProfile() {
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
                        this.firstName = response.data.firstName;
                        this.lastName = response.data.lastName;
                        this.email = response.data.email;
                        this.bio = response.data.bio;
                        this.profile_img = response.data.profileImg;
                    })
                    .catch((error) => {
                        this.errorMsg = error;
                    });
            },
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
        },
        created() {
            this.getUserProfile();
            this.getToken();
        },
    };
</script>

<style scoped>
    .parentContainer {
        color: white;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .profileContainer {
        border-radius: 10px;
        margin-top: 150px;
    }
    .contentContainer {
        width: 100%;
        background-color: #2c3440;
        border-radius: 10px;
        margin-top: 50px;
    }
    .parentContainer2 {
        color: white;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .contentContainer2 {
        background-color: #2c3440;
        border-radius: 10px;
    }
    .editBtn {
        font-size: 0.7rem;
        width: 100px;
    }
    .editBtn:hover {
        color: white;
        background-color: #ffd60a;
    }
    h4 {
        color: #adb5bd;
    }

    .footer {
        position: absolute;
        bottom: -100vh;
        width: 100%;
        z-index: -1;
    }

    @media (min-width: 1px) {
        /* Mobile / Small size */
        .parentContainer,
        .parentContainer2 {
            width: 70%;
        }

        .userInfo {
            width: 300px;
            padding: 20px 0px;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */
        .parentContainer,
        .parentContainer2 {
            width: 80%;
        }

        .avatar {
            margin-bottom: 20px;
        }

        .userInfo {
            width: 500px;
            padding: 0px 20px;
        }
    }

    @media (min-width: 800px) {
        .parentContainer,
        .parentContainer2 {
            width: 70%;
        }
    }

    @media (min-width: 1200px) {
        /* Desktop / Large size */

        .parentContainer,
        .parentContainer2 {
            width: 50%;
        }
    }
</style>
