<template>
    <div>
        <div class="header">
            <SignedInHeader />
        </div>
        <v-container class="titleContainer">
            <v-row>
                <v-col>
                    <p class="pageTitle">
                        Welcome back {{ username }}, let's find something to
                        watch.
                    </p>
                </v-col>
            </v-row>
            <v-row align-content="center" justify="center">
                <v-col cols="12" sm="9" md="11" lg="9">
                    <FeaturedMovies />
                </v-col>
            </v-row>
            <v-row align-content="center" justify="center">
                <v-col cols="12" sm="9" md="11" lg="9">
                    <h4 class="heading">HORROR</h4>
                    <v-divider class="divider" color="#adb5bd"></v-divider>
                    <MovieDisplay />
                </v-col>
            </v-row>
        </v-container>

        <div class="footer">
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
    import PageFooter from "@/components/PageFooter.vue";

    export default {
        name: "SignedInHome",
        components: {
            SignedInHeader,
            FeaturedMovies,
            MovieDisplay,
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
        },
        mounted() {
            this.getToken();
            this.get_user_profile();
        },
    };
</script>

<style scoped>
    .header {
        background-color: #11161d;
    }
    .divider {
        width: 100%;
        margin-bottom: 15px;
    }
    .footer {
        padding-top: 100%;
        position: absolute;
        bottom: -100vh;
        width: 100%;
        z-index: -1;
    }

    @media (min-width: 1px) {
        /* Mobile / Small size */
        .titleContainer {
            color: white;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 150px;
        }
        .pageTitle {
            font-size: 1.5rem;
            text-align: center;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */
        .pageTitle {
            font-size: 1.6rem;
        }
    }

    @media (min-width: 800px) {
        /* Desktop / Large size */
        .pageTitle {
            font-size: 1.7rem;
        }
    }
</style>
