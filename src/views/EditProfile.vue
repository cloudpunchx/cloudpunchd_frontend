<template>
    <div>
        <div class="header">
            <SignedInHeader/>
        </div>
        <div class="pageContainer">
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
                            dark
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
                            dark
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
                            dark
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
                            dark
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
                            dark
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
                            dark
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
                        <v-file-input 
                        prepend-icon="mdi-camera"
                        label="Profile Image" 
                        v-model="selectedFile"
                        accept=".jpg,.jpeg,.png,.gif"
                        variant="underlined"
                        color="#495057"
                        dark
                        >
                        </v-file-input>
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
                    <div>
                        <v-btn @click="edit_user_profile" variant="tonal">
                            SUBMIT
                        </v-btn>
                        <v-btn @click="showModal = true" color="#d90429">
                            DELETE ACCOUNT
                        </v-btn>
                    </div>
                    <div v-if="feedbackMsg">
                        <p class="feedback">{{ feedbackMsg }}</p>
                    </div>
                </v-container>
            </v-form>
            <section class="topFourContainer">
                <h3>FAVOURITE FILMS</h3>
                <v-divider class="divider2" color="#adb5bd"></v-divider>
                <UserTopFour/>
            </section>
        </div>


        <transition name="fade" appear>
                <div class="modal-overlay" 
                    v-if="showModal" 
                    @click="showModal = false"></div>
            </transition>
            <transition name="pop" appear>
                <div class="modal" 
                role="dialog" 
                v-if="showModal"
                >
                    <DeleteAccount/>
                </div>
        </transition>

        <div class="footer">
            <PageFooter/>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import SignedInHeader from '@/components/SignedInHeader.vue'
import UserTopFour from '@/components/UserTopFour.vue'
import DeleteAccount from '@/components/DeleteAccount.vue'
import PageFooter from '@/components/PageFooter.vue'

    export default {
        name: "EditProfile",
        components: {
            SignedInHeader,
            UserTopFour,
            DeleteAccount,
            PageFooter
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                bio: "",
                profile_img: "",
                selectedFile: "",
                feedbackMsg: "",
                active: false,
                showModal: false,
            }
        },
        methods: {
            get_user_profile(){
                axios.request({
                    url: this.apiUrl+"/user",
                    method: "GET",
                    headers: {
                        token: cookies.get(`sessionToken`)
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
                    url: this.apiUrl+"/user",
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
            this.get_user_profile();
        }
    }
</script>

<style scoped>
.pageContainer{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 80px;
}
.editProfile{
    margin-top: 20px;
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
    margin: 25px;
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
    position: absolute;
}
.divider1{
    margin-bottom: 10px;
}
.divider2{
    width: 34%;
}

.footer{
    padding-top: 1000px;
    position: absolute;
    bottom: -100vh;
    width: 100%;
    background-color: #212529;
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
    content: '';
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
</style>