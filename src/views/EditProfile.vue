<template>
    <div>
        <SignedInHeader/>
        <v-form>
        <v-container class="editProfile">
            <h3>Edit Your Profile</h3>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                    v-model="username"
                    :rules="usernameRules"
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

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                    v-model="bio"
                    label="Bio"
                    required
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                    v-model="profile_img"
                    label="Profile Image URL"
                    required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn @click="editProfile" variant="tonal">
                SUBMIT
            </v-btn>
            <div v-if="errorMsg">
                <p class="errorText">{{ errorMsg }}</p>
            </div>
        </v-container>
    </v-form>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'

    export default {
        name: "EditProfile",
        components: {
            SignedInHeader
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                bio: "",
                profile_img: "",
                errorMsg: "",
            }
        },
        methods: {
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            get_user_profile(){
                axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "GET",
                    headers: {
                        token: this.token
                    },
                }).then((response)=>{
                    this.username = response.data.username;
                    this.firstName = response.data.firstName;
                    this.lastName = response.data.lastName;
                    this.email = response.data.email;
                    this.bio = response.data.bio;
                    this.profile_img = response.data.profile_img;
                }).catch((error)=>{
                    this.errorMsg = error;
                })
            },
        },
        created (){
            this.getToken();
            this.get_user_profile();
        }
    }
</script>

<style scoped>
.editProfile{
    width: 930px;
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
.v-btn:hover {
    background-color: #ffc300;
}
.errorText{
    margin-top: 30px;
}
</style>