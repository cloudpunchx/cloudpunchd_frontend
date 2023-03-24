<template>
    <div>
        <v-card
            class="mx-auto"
            max-width="600"
            title="User Registration"
        >
            <v-container class="signUpForm">
                <h3>Join Cloudpunchd</h3>
                <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    color="rgb(1, 139, 139)"
                    label="Username"
                    variant="underlined"
                ></v-text-field>

                <v-text-field
                    v-model="firstName"
                    :rules="nameRules"
                    color="rgb(1, 139, 139)"
                    label="First Name"
                    variant="underlined"
                ></v-text-field>

                <v-text-field
                    v-model="lastName"
                    :rules="nameRules"
                    color="rgb(1, 139, 139)"
                    label="Last Name"
                    variant="underlined"
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    color="rgb(1, 139, 139)"
                    label="Email"
                    variant="underlined"
                ></v-text-field>

                <!-- Not working -->
                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    color="rgb(1, 139, 139)"
                    label="Password"
                    variant="underlined"
                    @click="togglePassword"
                ></v-text-field>

                <v-checkbox
                    v-model="terms"
                    color="rgb(1, 139, 139)"
                    label="I agree to site terms and conditions"
                ></v-checkbox>
                <v-btn
                block
                variant="tonal"
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
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "UserSignup",
        data: () => ({
        apiUrl : process.env.VUE_APP_API_URL,
        valid: false,
        firstName: '',
        lastName: '',
        username: '',
        usernameRules: [
            value => {
            if (value) return true

            return 'Username is required.'
            },
        ],
        nameRules: [
            value => {
            if (value) return true

            return 'Name is required.'
            },
        ],
        email: '',
        emailRules: [
            value => {
            if (value) return true

            return 'E-mail is required.'
            },
            value => {
            if (/.+@.+\..+/.test(value)) return true

            return 'E-mail must be valid.'
            },
        ],
        }),
        password: '',
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
                    this.feedbackMsg = error;
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
        }
    }
</script>

<style scoped>
.signUpForm{
    background-color: white;  
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    padding: 40px;
}
h3{
    margin-bottom: 20px;
    color: black;
}
.v-btn{
    margin-top: 15px;
}
.v-btn:hover{
    color: white;
    background-color: rgb(1, 139, 139);
    margin-top: 15px;
}
.feedbackMsg{
    margin-top: 30px;
}
</style>