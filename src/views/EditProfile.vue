<template>
    <div>
        <div class="header">
            <SignedInHeader />
        </div>

        <div class="pageContainer">
            <v-container class="profileEditContainer">
                <h1 class="heading">Account Settings</h1>
                <h3 class="subHeading">EDIT YOUR PROFILE</h3>
                <v-divider class="divider1" color="#adb5bd"></v-divider>
                <v-row justify="center">
                    <v-col cols="11">
                        <v-text-field
                            background-color="#2C3440"
                            v-model="username"
                            label="Username"
                            :placeholder="usernameGet"
                            dark
                            filled
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="11">
                        <v-text-field
                            background-color="#2C3440"
                            v-model="firstName"
                            label="First Name"
                            dark
                            filled
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="11">
                        <v-text-field
                            background-color="#2C3440"
                            v-model="lastName"
                            label="Last Name"
                            dark
                            filled
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="11">
                        <v-text-field
                            background-color="#2C3440"
                            v-model="email"
                            label="Email Address"
                            dark
                            filled
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="11">
                        <v-text-field
                            background-color="#2C3440"
                            v-model="password"
                            label="Password"
                            dark
                            filled
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="11">
                        <v-text-field
                            background-color="#2C3440"
                            v-model="bio"
                            label="Bio"
                            dark
                            filled
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="11">
                        <v-text-field
                            background-color="#2C3440"
                            v-model="profile_img"
                            label="Profile Image URL"
                            dark
                            filled
                        >
                        </v-text-field>
                    </v-col>

                    <!-- Buttons -->
                    <v-col class="d-flex justify-center" cols="12">
                        <button @click="edit_user_profile" class="submitBtn">
                            SUBMIT
                        </button>
                        <button @click="showModal = true" class="delBtn">
                            DELETE ACCOUNT
                        </button>
                    </v-col>

                    <!-- User Top Four Section -->
                    <v-col>
                        <h3 class="subHeading">FAVOURITE FILMS</h3>
                        <v-divider class="divider2" color="#adb5bd"></v-divider>
                        <AddUserTopFour />
                        <UserTopFour />
                    </v-col>
                </v-row>
            </v-container>

            <!-- Feedback Dialog -->
            <v-dialog v-model="showFeedbackDialog" max-width="400">
                <v-card class="feedbackContainer">
                    <v-card-actions>
                        <v-card-text>{{ feedbackMsg }}</v-card-text>
                        <v-btn
                            text
                            color="rgb(202, 221, 240)"
                            @click="showFeedbackDialog = false"
                            class="closeBtn"
                            >Close</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- <v-container class="topFourContainer">
                <h3 class="subHeading">CHOOSE YOUR FAVOURITE FILMS</h3>
                <v-divider class="divider2" color="#adb5bd"></v-divider>
                <AddUserTopFour />
                <UserTopFour />
            </v-container> -->
        </div>

        <!-- Delete Account Modal -->
        <transition name="fade" appear>
            <div
                class="modal-overlay"
                v-if="showModal"
                @click="showModal = false"
            ></div>
        </transition>
        <transition name="pop" appear>
            <div class="modal" role="dialog" v-if="showModal">
                <DeleteAccount />
            </div>
        </transition>

        <div class="footer">
            <PageFooter />
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import AddUserTopFour from "@/components/AddUserTopFour.vue";
    import UserTopFour from "@/components/UserTopFour.vue";
    import DeleteAccount from "@/components/DeleteAccount.vue";
    import PageFooter from "@/components/PageFooter.vue";

    export default {
        name: "EditProfile",
        components: {
            SignedInHeader,
            AddUserTopFour,
            UserTopFour,
            DeleteAccount,
            PageFooter,
        },
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                username: "",
                usernameGet: "",
                firstName: "",
                firstnameGet: "",
                lastName: "",
                lastnameGet: "",
                email: "",
                emailGet: "",
                password: "",
                bio: "",
                profile_img: "",
                feedbackMsg: "",
                active: false,
                showModal: false,
                showFeedbackDialog: false,
            };
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
                        this.usernameGet = response.data.username;
                        this.firstnameGet = response.data.firstName;
                        this.lastnameGet = response.data.lastName;
                        this.emailGet = response.data.email;
                        this.bio = response.data.bio;
                    })
                    .catch((error) => {
                        this.feedbackMsg = error;
                    });
            },
            edit_user_profile() {
                axios
                    .request({
                        url: this.apiUrl + "/user",
                        method: "PATCH",
                        headers: {
                            token: cookies.get(`sessionToken`),
                        },
                        data: {
                            username: this.username,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            password: this.password,
                            bio: this.bio,
                            profileImg: this.profile_img,
                        },
                    })
                    .then((response) => {
                        this.feedbackMsg = response.data;
                        this.showFeedbackDialog = true;
                        this.clearTextBox();
                        this.get_user_profile();
                    })
                    .catch((error) => {
                        this.feedbackMsg = error.response.data;
                        this.showFeedbackDialog = true;
                        this.clearTextBox();
                    });
            },
            clearTextBox() {
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.username = "";
                this.password = "";
            },
        },
        created() {
            this.get_user_profile();
        },
    };
</script>

<style scoped>
    .topFourContainer {
        margin-top: 30px;
        position: absolute;
    }

    /* Dividers */
    .divider1 {
        width: 100%;
        margin-bottom: 15px;
    }
    .divider2 {
        width: 100%;
    }
    .closeBtn:hover {
        color: whitesmoke;
    }
    .footer {
        position: absolute;
        bottom: -50vh;
        width: 100%;
        background-color: #001219;
        z-index: -1;
    }
    /* Pop Up for Delete Account */
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

    @media (min-width: 1px) {
        /* Mobile / Small size */
        .pageContainer {
            margin-top: 80px;
        }
        .profileEditContainer {
            width: 350px;
        }
        .heading {
            color: #adb5bd;
            font-size: 1.5rem;
            font-weight: lighter;
            margin-bottom: 25px;
        }
        .subHeading {
            color: #adb5bd;
            font-size: 0.9rem;
        }
        .submitBtn {
            font-size: 1rem;
            color: whitesmoke;
            background-color: #c7aa14;
            padding: 5px 15px;
            border-radius: 6px;
            border: 1px solid #b59c12;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
            margin-right: 15px;
        }
        .delBtn {
            font-size: 1rem;
            color: whitesmoke;
            background-color: #dd1d1a61;
            padding: 5px 15px;
            border-radius: 6px;
            border: 1px solid #a40e0d;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
        }
        .feedbackContainer {
            color: rgb(202, 221, 240);
            background-color: #2c3440;
        }
        .feedback {
            color: #adb5bd;
            margin-top: 30px;
        }
    }

    @media (min-width: 480px) {
        /* Mobile / Small size */
    }

    @media (min-width: 600px) {
        /* Tablet / Med size */
    }

    @media (min-width: 800px) {
        /* Tablet / Med size */
    }

    @media (min-width: 960px) {
        /* Desktop / Large size */
    }

    @media (min-width: 1264px) {
        /* Desktop / Large size */
    }
</style>
