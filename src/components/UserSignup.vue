<template>
    <div>
        <v-card
            class="mx-auto"
            min-width="260"
            max-width="600"
            title="User Registration"
            shaped
        >
            <v-container class="signUpForm">
                <h3>Join Cloudpunchd</h3>
                <v-text-field
                    dark
                    required
                    v-model="username"
                    color="secondary"
                    label="Username"
                    filled
                    shaped
                ></v-text-field>

                <v-text-field
                    dark
                    required
                    v-model="firstName"
                    color="secondary"
                    label="First Name"
                    filled
                    shaped
                ></v-text-field>

                <v-text-field
                    dark
                    required
                    v-model="lastName"
                    color="secondary"
                    label="Last Name"
                    filled
                    shaped
                ></v-text-field>

                <v-text-field
                    dark
                    required
                    v-model="email"
                    color="secondary"
                    label="Email"
                    filled
                    shaped
                ></v-text-field>

                <v-text-field
                    dark
                    required
                    @click="togglePassword"
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    color="secondary"
                    label="Password"
                    filled
                    shaped
                    class="passwordField"
                ></v-text-field>

                <v-checkbox
                    v-model="terms"
                    dark
                    color="secondary"
                    label="I agree to site terms and conditions"
                ></v-checkbox>

                <v-btn
                    :disabled="!isFormValid"
                    type="submit"
                    @click="userSignUp"
                >
                    SUBMIT
                </v-btn>

                <div v-if="feedbackMsg">
                    <p class="feedbackMsg">{{ feedbackMsg }}</p>
                </div>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import router from "@/router";

    export default {
        name: "UserSignup",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                valid: false,
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                terms: false,
                form: false,
                show: false,
                feedbackMsg: "",
                userId: null,
            };
        },
        computed: {
            isFormValid() {
                // Return true if all required fields are filled and terms are agreed
                return (
                    this.firstName &&
                    this.lastName &&
                    this.username &&
                    this.email &&
                    this.password &&
                    this.terms
                );
            },
        },
        methods: {
            userSignUp() {
                if (this.terms == false) {
                    this.feedbackMsg =
                        "Please click check box to agree to terms and conditions.";
                } else if (this.terms == true) {
                    axios
                        .request({
                            url: this.apiUrl + "/user",
                            method: "POST",
                            data: {
                                username: this.username,
                                firstName: this.firstName,
                                lastName: this.lastName,
                                email: this.email,
                                password: this.password,
                            },
                        })
                        .then((response) => {
                            cookies.set(`userId`, response.data[0]);
                            cookies.set(`sessionToken`, response.data[1]);
                            router.push({
                                name: "UserProfile",
                                params: {username: this.username},
                            });
                        })
                        .catch((error) => {
                            this.feedbackMsg = error.response.data;
                            this.clearTextBox();
                        });
                }
            },
            clearTextBox() {
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.username = "";
                this.password = "";
            },
            togglePassword() {
                this.show = !this.show;
            },
        },
        mount() {
            setTimeout(() => {
                this.feedbackMsg = "";
            }, 60000); // Hide after 1 minute
        },
        beforeDestroy() {
            // hide message when page is closed
            this.feedbackMsg = "";
        },
    };
</script>

<style scoped>
    .v-btn:hover {
        color: white;
        background-color: #ffd60a;
    }
    .passwordField:hover {
        cursor: pointer;
    }
    .feedbackMsg {
        margin-top: 20px;
    }

    @media (min-width: 1px) {
        /* Mobile / Small size */
        .signUpForm {
            background-color: #456;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            border-radius: 25px;
            padding: 10px;
        }
        h3 {
            color: #99aabb;
            font-size: 1.5rem;
            margin-bottom: 20px;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */
        .signUpForm {
            padding: 40px;
            width: 350px;
        }
    }

    @media (min-width: 800px) {
        /* Desktop / Large size */
        .signUpForm {
            padding: 40px;
            width: 450px;
        }
    }
</style>
