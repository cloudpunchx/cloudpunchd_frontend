<template>
    <div class="pageContainer">
        <div>
            <PageHeader />
        </div>

        <!-- This is the 'cover img' on the front page -->
        <FrontPageImg />

        <!-- Main Section, including Header Text (intro), FeaturedMovies display, Information display, Blog Post Previews -->
        <v-container class="section1">
            <v-row>
                <!-- Intro -->
                <v-col>
                    <h1 class="text1">Track Your Love For Movies.</h1>
                    <h1 class="text1">Share With Friends.</h1>
                </v-col>
            </v-row>

            <!-- Create Acct Btn - opens pop up Modal -->
            <v-row>
                <v-col>
                    <v-btn @click="showModal = true" color="white" text>
                        GET STARTED - IT'S FREE!
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <p class="text2">the social network for movie lovers</p>
                </v-col>
            </v-row>

            <!-- Featured Movies -->
            <v-row align-content="center" justify="center">
                <v-col cols="12" sm="9" md="11" lg="9">
                    <FeaturedMovies />
                </v-col>
            </v-row>

            <!-- Info Section -->
            <v-row align-content="center" justify="center">
                <v-container class="siteHighlights">
                    <h4 class="heading">CLOUDPUNCHD LETS YOU...</h4>
                    <v-row dense>
                        <v-col v-for="card in cards" :key="card.id" cols="4">
                            <v-card color="#456" dark>
                                <v-card-text> {{ card.text }}</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>

            <!-- Blog Post Previews -->
            <v-row align-content="center" justify="center">
                <v-col cols="12" sm="9" md="11" lg="9">
                    <h4 class="heading">RECENT STORIES...</h4>
                    <v-divider class="divider" color="#adb5bd"></v-divider>
                    <BlogPreview />
                </v-col>
            </v-row>

            <!-- Footer -->
            <div class="footer">
                <PageFooter />
            </div>
        </v-container>

        <!-- Pop Out for Sign Up -->
        <transition name="fade" appear>
            <div
                class="modal-overlay"
                v-if="showModal"
                @click="showModal = false"
            ></div>
        </transition>
        <transition name="pop" appear>
            <div class="modal" role="dialog" v-if="showModal">
                <UserSignup />
            </div>
        </transition>
    </div>
</template>

<script>
    import cookies from "vue-cookies";
    import PageHeader from "@/components/PageHeader.vue";
    import FrontPageImg from "@/components/FrontPageImg.vue";
    import FeaturedMovies from "@/components/FeaturedMovies.vue";
    import BlogPreview from "@/components/BlogPreview.vue";
    import UserSignup from "@/components/UserSignup.vue";
    import PageFooter from "@/components/PageFooter.vue";

    export default {
        name: "HomePage",
        components: {
            PageHeader,
            FrontPageImg,
            FeaturedMovies,
            BlogPreview,
            UserSignup,
            PageFooter,
        },
        data() {
            return {
                active: false,
                showModal: false,
                token: "",
                cards: [
                    {
                        id: 1,
                        text: "Keep track of every film you've ever watched (or just start from the day you join)",
                    },
                    {
                        id: 2,
                        text: "Show some love for your favourite films, lists and reviews with a 'like'",
                    },
                    {
                        id: 3,
                        text: "Write and share reviews, and follow friends and other members to read theirs",
                    },
                    {
                        id: 4,
                        text: "Rate each film on a five-star scale (with halves) to record and share your reaction",
                    },
                    {
                        id: 5,
                        text: "Keep a diary of your film watching",
                    },
                    {
                        id: 6,
                        text: "Compile and share lists of films on any topic and keep a watchlist of films to see",
                    },
                ],
            };
        },
        methods: {
            signUpPopOut() {
                this.active = !this.active;
            },
        },
        beforeRouteEnter(to, from, next) {
            const token = cookies.get("sessionToken");
            if (token) {
                next((vm) => {
                    vm.$router.replace("/home");
                });
            } else {
                next();
            }
        },
    };
</script>

<style scoped>
    /* Height 100 so the cards are all the same height even with smaller amount of content */
    .v-card {
        height: 100%;
    }
    .heading {
        color: #adb5bd;
        text-align: left;
    }
    .divider {
        width: 100%;
        margin-bottom: 15px;
    }
    .section1 {
        color: whitesmoke;
        background-color: #11161d;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }
    .buttonContainer {
        margin-top: 30px;
        left: 50%;
        transform: translateX(-50%);
    }
    .v-btn {
        font-size: 1rem;
        border: 1px solid #dd1c1a;
        background-color: #dd1d1a61;
    }
    .v-btn:hover {
        background-color: #dd1c1a;
    }

    .featuredContainer {
        margin-top: 100px;
    }

    .footer {
        position: absolute;
        bottom: -100vh;
        width: 100%;
        z-index: -1;
    }

    /* Pop Out Modal */
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
        /* Mobile / Small size */
        .section1 {
            margin-top: -20%;
        }

        .text1 {
            font-size: 2rem;
            font-family: Georgia, "Times New Roman", Times, serif;
            font-weight: bold;
        }

        .text2 {
            font-size: 0.8rem;
        }
        .siteHighlights {
            width: 100%;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */
        .text2 {
            font-size: 1rem;
            color: whitesmoke;
        }
        .section1 {
            margin-top: 0;
        }
        .siteHighlights {
            width: 100%;
        }
    }

    @media (min-width: 600px) {
        /* Extra sizing for mid size */

        .siteHighlights {
            width: 75%;
        }
    }

    @media (min-width: 800px) {
        /* Desktop / Large size */

        .text2 {
            font-size: 1.2rem;
        }
    }
</style>
