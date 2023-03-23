<template>
    <div>
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

                <!-- this is not working -->
                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    color="rgb(1, 139, 139)"
                    :rules="[required]"
                    label="Password"
                    clearable
                    placeholder="Enter your password"
                    variant="underlined"
                    @click="togglePassword"
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
                show1: false
            }
        },
        methods: {
            userLogin(){
                axios.request({
                    url: this.apiUrl+"/user-login",
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
            togglePassword() {
                this.show = !this.show;
            }
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