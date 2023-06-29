<template>
    <div>
        <v-card
        class="mx-auto"
        max-width="600"
        title="User Registration"
        shaped
        >
            <v-container class="signUpForm">
                <h3>Join Cloudpunchd</h3>
                <v-text-field
                required
                v-model="username"
                color="secondary"
                label="Username"
                filled
                shaped
                ></v-text-field>

                <v-text-field
                required
                v-model="firstName"
                color="secondary"
                label="First Name"
                filled
                shaped
                ></v-text-field>

                <v-text-field
                required
                v-model="lastName"
                color="secondary"
                label="Last Name"
                filled
                shaped
                ></v-text-field>

                <v-text-field
                required
                v-model="email"
                color="secondary"
                label="Email"
                filled
                shaped
                ></v-text-field>

                <v-text-field
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
                color="secondary"
                label="I agree to site terms and conditions"
                ></v-checkbox>

                <v-btn
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


<!-- FIX EMAIL FORMAT FOR CREATE ACCOUNT -->


<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "UserSignup",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                valid: false,
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                show: false,
                feedbackMsg: '',
                userId: null,
            }
        },
        methods: {
            userSignUp() {
                if (this.terms == false){
                    this.feedbackMsg = "Please click check box to agree to terms and conditions."
                } else if (this.terms == true){
                    axios.request({
                    url: this.apiUrl+"/user",
                    method: "POST",
                    data: {
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                    }
                }).then((response)=>{
                    cookies.set(`userId`, response.data[0]);
                    cookies.set(`sessionToken`, response.data[1]);
                    router.push({name: 'UserProfile', params: {username: this.username}})
                }).catch((error)=>{
                    this.feedbackMsg = error.response.data;
                    this.clearTextBox();
                })
                }
            },
            clearTextBox(){
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.username = "";
                this.password = "";
            },
            togglePassword() {
                this.show = !this.show;
            }
        },
        mount() {
            setTimeout(() => {
                this.feedbackMsg = '';
                }, 60000); // Hide after 1 minute
        },
        beforeDestroy() {
            // hide message when page is closed
            this.feedbackMsg = "";
        }
    }
</script>

<style scoped>
.signUpForm{
    background-color: #A2A3BB;  
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 25px;
    padding: 40px;
}
h3{
    color: whitesmoke;
    font-size: 25pt;
    font-family: lobster;
    margin-bottom: 20px;
}
.v-btn:hover{
    color: white;
    background-color: #ffd60a;
}
.passwordField:hover { 
    cursor: pointer;
}
.feedbackMsg{
    margin-top: 20px;
}
</style>