<template>
    <div>
        <v-card
            class="mx-auto"
            min-width="260"
            max-width="600"
            title="User Sign In"
            shaped
        >
            <v-container class="loginForm">
                <h3>Sign In</h3>
                <v-form v-model="form" @submit.prevent="onSubmit">
                    <v-text-field
                        v-model="email"
                        :rules="[required]"
                        color="secondary"
                        clearable
                        label="Email"
                        dark
                        filled
                        shaped
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        color="secondary"
                        :rules="[required]"
                        label="Password"
                        placeholder="Enter your password"
                        dark
                        filled
                        shaped
                        @click="togglePassword"
                        class="passwordField"
                    ></v-text-field>

                    <v-btn :disabled="!form" type="submit" @click="userLogin">
                        SIGN IN
                    </v-btn>

                    <div v-if="feedbackMsg">
                        <p class="feedbackMsg">{{ feedbackMsg }}</p>
                    </div>
                </v-form>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import router from "@/router";

    export default {
        name: "UserLogin",
        data() {
            return {
                apiUrl: process.env.VUE_APP_API_URL,
                email: "",
                password: "",
                feedbackMsg: "",
                form: false,
                show: false,
            };
        },
        methods: {
            userLogin() {
                axios
                    .request({
                        url: this.apiUrl + "/user-login",
                        method: "POST",
                        data: {
                            email: this.email,
                            password: this.password,
                        },
                    })
                    .then((response) => {
                        cookies.set(`userId`, response.data[0]);
                        cookies.set(`sessionToken`, response.data[1]);
                        router.push("/home");
                    })
                    .catch((error) => {
                        this.email = "";
                        this.password = "";
                        this.feedbackMsg = error.response.data;
                    });
            },
            required(v) {
                return !!v || "Field is required";
            },
            togglePassword() {
                this.show = !this.show;
            },
        },
    };
</script>

<style scoped>
    h3 {
        color: #99aabb;
        font-size: 25pt;
        margin-bottom: 20px;
    }
    .passwordField:hover {
        cursor: pointer;
    }
    .v-btn:hover {
        color: white;
        background-color: #ffd60a;
    }
    .feedbackMsg {
        margin-top: 20px;
        color: white;
    }

    @media (min-width: 1px) {
        /* Mobile / Small size */
        .loginForm {
            background-color: #456;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            border-radius: 25px;
            padding: 5px;
        }
    }

    @media (min-width: 480px) {
        /* Tablet / Med size */
        .loginForm {
            padding: 40px;
        }
    }

    @media (min-width: 800px) {
        /* Desktop / Large size */
    }
</style>
