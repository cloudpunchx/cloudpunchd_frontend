<template>
    <v-form v-model="valid">
        <v-container class="signUpForm">
            <h3>JOIN CLOUDPUNCHD</h3>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    :counter="20"
                    label="Username"
                    required
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                    v-model="firstName"
                    :rules="nameRules"
                    :counter="10"
                    label="First Name"
                    required
                    ></v-text-field>
                </v-col>
        
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                    v-model="lastName"
                    :rules="nameRules"
                    :counter="10"
                    label="Last Name"
                    required
                    ></v-text-field>
                </v-col>
        
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
            <v-btn @click="userSignUp" variant="tonal">
                SUBMIT
            </v-btn>
            <div v-if="errorMsg">
                <p class="errorText">{{ errorMsg }}</p>
            </div>
        </v-container>
    </v-form>
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
        username: "",
        usernameRules: [
        value => {
            if (value) return true

            return 'Username is required.'
            },
            value => {
            if (value?.length <= 20) return true

            return 'Username must be less than 20 characters.'
            },
        ],
        nameRules: [
            value => {
            if (value) return true

            return 'Name is required.'
            },
            value => {
            if (value?.length <= 10) return true

            return 'Name must be less than 10 characters.'
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
        password: "",
        errorMsg: "",
        methods: {
            userSignUp() {
                axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "POST",
                    data: {
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                    }
                }).then((response)=>{
                    this.clearTextBox();
                    // update push when page is created
                    router.push("/")
                    cookies.set(`sessionToken`, response.data.token);
                    cookies.set(`userId`, response.data.userId);
                }).catch((error)=>{
                    this.errorMsg = error;
                    this.clearTextBox();
                })
            },
            clearTextBox(){
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.username = "";
                this.password = "";
            }
        }
    }
</script>

<style scoped>
.signUpForm{
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    padding: 40px;
}
h3{
    margin-bottom: 20px;
    color: rgb(81, 80, 80);
}
.v-btn{
    margin-top: 25px;
    width: 150px;
}
.errorText{
    margin-top: 30px;
}
</style>