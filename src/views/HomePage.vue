<template>
    <div class="pageContainer">
        <div>
            <PageHeader />
        </div>

        <!-- This is the 'cover img' on the front page -->
        <FrontPageImg />

        <!-- Main Section, including Header Text (intro), FeaturedMovies display, Information display, Blog Post Previews -->
        <v-main class="section1">
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
            <v-container class="featuredContainer">
                <v-row align-content="center" justify="center">
                    <v-col class="featuredContainer">
                        <FeaturedMovies />
                    </v-col>
                </v-row>
            </v-container>

            <!-- Info Section -->
            <v-row align-content="center" justify="center">
                <v-container class="siteHighlights">
                    <h4 class="heading">CLOUDPUNCHD LETS YOU...</h4>
                    <v-row dense>
                        <v-col
                            v-for="card in cards"
                            :key="card.id"
                            sm="6"
                            md="4"
                            lg="4"
                        >
                            <v-card class="infoCard" color="#456" dark>
                                <v-card-text> {{ card.text }}</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>

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
        <div class="footer">
            <PageFooter />
        </div>

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

    .footer {
        margin-top: 20px;
    }

    /* Pop Out Modal */
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
        /* Mobile / Small size */

        .pageContainer {
            display: flex;
            flex-direction: column;
            padding-top: 300px;
            min-height: 100vh;
        }
        .section1 {
            flex: 1;
            background-color: #11161d;
            text-align: center;
            padding-bottom: 80px;
            margin-top: -20%;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }

        .text1 {
            color: #eaebec;
            font-size: 1.5rem;
            font-family: Georgia, "Times New Roman", Times, serif;
            font-weight: bold;
        }

        .text2 {
            font-size: 0.8rem;
        }
        .featuredContainer {
            width: 350px;
        }
        .siteHighlights {
            width: 100vw;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
        .infoCard {
            font-size: 0.8rem;
            width: 155px;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */
        .pageContainer {
            padding-top: 290px;
        }
        .text2 {
            font-size: 1rem;
            color: whitesmoke;
        }
        .section1 {
            margin-top: 0;
        }
        .siteHighlights {
            width: 450px;
            position: relative;
            left: 0%;
            transform: translateX(-0%);
        }
        .infoCard {
            width: 120px;
        }
        .blogPostContainer {
            width: 450px;
        }
    }

    @media (min-width: 600px) {
        /* Extra sizing for mid size */

        .pageContainer {
            padding-top: 300px;
        }
        .text1 {
            font-size: 2rem;
        }
        .featuredContainer {
            width: 500px;
        }
        .siteHighlights {
            width: 550px;
        }
        .infoCard {
            font-size: 0.9rem;
            width: 300px;
        }
        .blogPostContainer {
            width: 550px;
        }
    }

    @media (min-width: 800px) {
        /* Desktop / Large size */
        .pageContainer {
            padding-top: 380px;
        }
        .text2 {
            font-size: 1.2rem;
        }
        .siteHighlights {
            width: 500px;
        }
        .infoCard {
            font-size: 1rem;
            width: 250px;
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
        .siteHighlights {
            width: 900px;
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
        .siteHighlights {
            width: 1000px;
        }
        .infoCard {
            font-size: 1rem;
            width: 300px;
        }
        .blogPostContainer {
            width: 1200px;
        }
    }
</style>
