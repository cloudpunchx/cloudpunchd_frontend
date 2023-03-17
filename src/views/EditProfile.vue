<template>
    <div>
        <div class="header">
            <SignedInHeader/>
        </div>
        <v-form color="#adb5bd">
            <v-container class="editProfile">
                <h3>EDIT YOUR PROFILE</h3>
                <v-divider class="divider1" color="#adb5bd"></v-divider>
                <v-row>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        background-color="#495057"
                        v-model="username"
                        :rules="usernameRules"
                        label="Username"
                        required
                        class="textField"
                        >
                            <template v-slot:label>
                                <span class="label">Username</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        background-color="#495057"
                        v-model="firstName"
                        :rules="nameRules"
                        label="First Name"
                        required
                        class="textField"
                        >
                            <template v-slot:label>
                                <span class="label">First Name</span>
                            </template>
                        </v-text-field>
                    </v-col>
            
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        background-color="#495057"
                        v-model="lastName"
                        :rules="nameRules"
                        label="Last Name"
                        required
                        class="textField"
                        >
                            <template v-slot:label>
                                <span class="label">Last Name</span>
                            </template>
                        </v-text-field>
                    </v-col>
            
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        background-color="#495057"
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        class="textField"
                        >
                            <template v-slot:label>
                                <span class="label">Email</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        background-color="#495057"
                        v-model="password"
                        label="Password"
                        required
                        class="textField"
                        >
                            <template v-slot:label>
                                <span class="label">Password</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        background-color="#495057"
                        v-model="bio"
                        label="Bio"
                        required
                        class="textField"
                        >
                            <template v-slot:label>
                                <span class="label">Bio</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field
                        background-color="#495057"
                        v-model="profile_img"
                        label="Profile Image URL"
                        required
                        class="textField"
                        >
                            <template v-slot:label>
                                <span class="label">Profile Image Url</span>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-btn @click="edit_user_profile" variant="tonal">
                    SUBMIT
                </v-btn>
                <div v-if="feedbackMsg">
                    <p class="feedback">{{ feedbackMsg }}</p>
                </div>
            </v-container>
        </v-form>
        <section class="topFourContainer">
            <h4>FAVOURITE FILMS</h4>
            <v-divider class="divider2" color="#adb5bd"></v-divider>
            <UserTopFour/>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'
import UserTopFour from '@/components/UserTopFour.vue'

    export default {
        name: "EditProfile",
        components: {
            SignedInHeader,
            UserTopFour
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
                feedbackMsg: "",
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
                    this.feedbackMsg = error;
                })
            },
            edit_user_profile(){
                axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "PATCH",
                    headers: {
                        token: this.token
                    },
                    data: {
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                        bio: this.bio,
                        profileImg: this.profile_img
                    }
                }).then(()=>{
                    this.feedbackMsg = "Successfully edited profile";
                    this.password = ""
                }).catch((error)=>{
                    this.feedbackMsg = error;
                })
            }
        },
        created (){
            this.getToken();
            this.get_user_profile();
        }
    }
</script>

<style scoped>
.header{
    background-color: #212120;
}
.editProfile{
    width: 930px;
    padding: 40px;
}
h3{
    color: #adb5bd;
}
.label{
    color: #adb5bd;
}
.divider1{
    width: 100%;
}
.textField{
    border-radius: 5px;
}
.v-btn{
    margin-top: 25px;
    width: 150px;
}
.v-btn:hover {
    background-color: #4c9e9e;
}
.feedback{
    margin-top: 30px;
}
.topFourContainer{
    color: #adb5bd;
    margin-top: 30px;
    position: fixed;
    left: 500px;
}
.divider2{
    width: 34%;
}
</style>