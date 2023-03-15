<template>
    <div>
        <!-- <v-form>
            <v-container class="signUpForm">
                <h3>Sign In</h3>
                <v-row>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-btn @click="userLogin" variant="tonal">
                    SUBMIT
                </v-btn>
                <div v-if="feedbackMsg">
                    <p class="feedbackContainer">{{ feedbackMsg }}</p>
                </div>
            </v-container>
        </v-form> -->

        <v-card class="mx-auto px-6 py-8" max-width="400">
            <h3>Sign In</h3>
            <v-form
            v-model="form"
            @submit.prevent="onSubmit"
            >
                <v-text-field
                    v-model="email"
                    :readonly="loading"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    label="Email"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :readonly="loading"
                    :rules="[required]"
                    clearable
                    label="Password"
                    placeholder="Enter your password"
                ></v-text-field>

                <br>

                <v-btn
                :disabled="!form"
                :loading="loading"
                block
                size="large"
                type="submit"
                variant="tonal"
                @click="userLogin" 
                >
                Sign In
                </v-btn>

                <div v-if="feedbackMsg">
                    <p class="feedbackContainer">{{ feedbackMsg }}</p>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "UserLogin",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                email: "",
                password: "",
                feedbackMsg: "",
                form: false,
                loading: false,
            }
        },
        methods: {
            userLogin(){
                axios.request({
                    url: this.apiUrl+"user-login",
                    method: "POST",
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                }).then((response)=>{
                    cookies.set(`userId`, response.data[0]);
                    cookies.set(`sessionToken`, response.data[1]);
                    router.push("/home");
                }).catch((error)=>{
                    this.email = "";
                    this.password = "";
                    this.feedbackMsg = error;
                })
            },
            onSubmit () {
                if (!this.form) return
                this.loading = true
                setTimeout(() => (this.loading = false), 2000)
            },
            required (v) {
                return !!v || 'Field is required'
            },
        }
    }
</script>

<style scoped>
.v-btn{
    margin-top: 25px;
    width: 150px;
}
.v-btn:hover {
    color: white;
    background-color: rgb(1, 139, 139);
}
.v-btn:active {
    color: white;
    background-color: rgb(1, 139, 139);
}
.feedbackContainer{
    margin-top: 30px;
}
</style>