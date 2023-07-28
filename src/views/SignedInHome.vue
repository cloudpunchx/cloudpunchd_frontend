<template>
    <div class="pageContainer">
        <div>
            <SignedInHeader />
        </div>

        <v-main class="titleContainer">
            <!-- Intro -->
            <v-row>
                <v-col>
                    <p class="pageTitle">
                        Welcome back,
                        <span class="username" @click="goToUserProfile">{{
                            username
                        }}</span>
                        . Let's find something to watch...
                    </p>
                </v-col>
            </v-row>

            <!-- Featured Movies -->
            <v-container class="featuredContainer">
                <v-row align-content="center" justify="center">
                    <v-col class="featuredContainer">
                        <FeaturedMovies />
                    </v-col>
                </v-row>
            </v-container>

            <!-- Horror Movies -->
            <v-container class="featuredContainer">
                <v-row align-content="center" justify="center">
                    <v-col class="featuredContainer">
                        <h4 class="heading">HORROR</h4>
                        <v-divider class="divider" color="#adb5bd"></v-divider>
                        <MovieDisplay />
                    </v-col>
                </v-row>
            </v-container>

            <!-- Blog Post Previews -->
            <v-row align-content="center" justify="center">
                <v-container class="blogPostContainer">
                    <v-col>
                        <h4 class="heading">RECENT STORIES...</h4>
                        <v-divider class="divider" color="#adb5bd"></v-divider>
                        <BlogPreview />
                    </v-col>
                </v-container>
            </v-row>
        </v-main>

        <!-- Footer -->
        <div>
            <PageFooter />
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import FeaturedMovies from "@/components/FeaturedMovies.vue";
    import MovieDisplay from "@/components/MovieDisplay.vue";
    import BlogPreview from "@/components/BlogPreview.vue";
    import PageFooter from "@/components/PageFooter.vue";

    export default {
        name: "SignedInHome",
        components: {
            SignedInHeader,
            FeaturedMovies,
            MovieDisplay,
            BlogPreview,
            PageFooter,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                token: "",
                username: "",
            };
        },
        methods: {
            getToken() {
                this.token = cookies.get(`sessionToken`);
            },
            get_user_profile() {
                axios
                    .request({
                        url: this.apiUrl + "/user",
                        method: "GET",
                        headers: {
                            token: this.token,
                        },
                    })
                    .then((response) => {
                        this.username = response.data.username;
                    })
                    .catch((error) => {
                        this.feedbackMsg = error;
                    });
            },
            goToUserProfile() {
                this.$router.push("/user/" + this.username);
            },
        },
        mounted() {
            this.getToken();
            this.get_user_profile();
        },
    };
</script>

<style scoped>
    .pageContainer {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    .username {
        color: whitesmoke;
        border-bottom: 1px solid #99aabb;
        /* Transition for smooth hover effect */
        transition: border-color 0.2s;
    }
    .username:hover {
        cursor: pointer;
        border-color: white;
    }
    .divider {
        width: 100%;
        margin-bottom: 15px;
    }

    @media (min-width: 1px) {
        /* Mobile / Small size */
        .titleContainer {
            color: white;
            margin-top: 150px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            flex: 1;
        }
        .pageTitle {
            color: #dbebfa;
            padding: 5px;
            font-size: 1.5rem;
            font-weight: lighter;
            text-align: center;
        }
        .featuredContainer {
            width: 350px;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */
        .pageTitle {
            font-size: 1.6rem;
        }
        .blogPostContainer {
            width: 450px;
        }
    }

    @media (min-width: 600px) {
        /* Desktop / Large size */
        .pageTitle {
            font-size: 1.7rem;
        }
        .featuredContainer {
            width: 500px;
        }
        .blogPostContainer {
            width: 550px;
        }
    }

    @media (min-width: 800px) {
        /* Desktop / Large size */
        .titleContainer {
            position: relative;
            left: 0%;
            transform: translateX(-0%);
        }
        .pageTitle {
            font-size: 1.7rem;
        }
        .blogPostContainer {
            width: 500px;
        }
    }

    @media (min-width: 960px) {
        /* Desktop / Large size */
        .featuredContainer {
            width: 960px;
        }
        .blogPostContainer {
            width: 900px;
        }
    }

    @media (min-width: 1264px) {
        /* Desktop / Large size */
        .featuredContainer {
            width: 1200px;
        }
        .blogPostContainer {
            width: 1200px;
        }
    }
</style>
