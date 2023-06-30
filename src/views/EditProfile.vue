<template>
    <div>
        <div class="header">
            <SignedInHeader/>
        </div>
        
        <div class="pageContainer">
            <v-form>
                <v-container 
                class="editProfile"
                >
                    <h3>EDIT YOUR PROFILE</h3>
                    <v-divider class="divider1" color="#adb5bd"></v-divider>
                    <v-row>
                        <v-col
                        cols="12"
                        md="4"
                        lg="6"
                        >
                            <v-text-field
                            background-color="#495057"
                            v-model="username"
                            :label="usernameGet + ' (username) '"
                            dark
                            filled
                            shaped
                            >
                            </v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        lg="6"
                        >
                            <v-text-field
                            background-color="#495057"
                            v-model="firstName"
                            :label="firstnameGet + ' (first name) '"
                            dark
                            filled
                            shaped
                            >
                            </v-text-field>
                        </v-col>
                
                        <v-col
                        cols="12"
                        md="4"
                        lg="6"
                        >
                            <v-text-field
                            background-color="#495057"
                            v-model="lastName"
                            :label="lastnameGet + ' (last name) '"
                            dark
                            filled
                            shaped
                            >
                            </v-text-field>
                        </v-col>
                
                        <v-col
                        cols="12"
                        md="4"
                        lg="6"
                        >
                            <v-text-field
                            background-color="#495057"
                            v-model="email"
                            label="e-mail"
                            dark
                            filled
                            shaped
                            >
                            </v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        lg="6"
                        >
                            <v-text-field
                            background-color="#495057"
                            v-model="password"
                            label="password"
                            dark
                            filled
                            shaped
                            >
                            </v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        lg="6"
                        >
                            <v-text-field
                            background-color="#495057"
                            v-model="bio"
                            :label="bioGet + ' (bio)'"
                            dark
                            filled
                            shaped
                            >
                            </v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        lg="6"
                        >   
                            <v-text-field
                            background-color="#495057"
                            v-model="profile_img"
                            label="Profile Image URL"
                            dark
                            filled
                            shaped
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <div>
                        <v-btn @click="edit_user_profile">
                            SUBMIT
                        </v-btn>
                        <v-btn @click="showModal = true" color="#d90429">
                            DELETE ACCOUNT
                        </v-btn>
                    </div>

                    <!--Show when there is feedback from button click -->
                    <div v-if="feedbackMsg">
                        <p class="feedback">{{ feedbackMsg }}</p>
                    </div>
                </v-container>
            </v-form>
            
            <v-container class="topFourContainer">
                <h3>CHOOSE YOUR FAVOURITE FILMS</h3>
                <v-divider class="divider2" color="#adb5bd"></v-divider>
                <AddUserTopFour/>
                <UserTopFour/>
            </v-container>
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
import AddUserTopFour from "@/components/AddUserTopFour.vue";
import UserTopFour from '@/components/UserTopFour.vue'
import DeleteAccount from '@/components/DeleteAccount.vue'
import PageFooter from '@/components/PageFooter.vue'

    export default {
        name: "EditProfile",
        components: {
            SignedInHeader,
            AddUserTopFour,
            UserTopFour,
            DeleteAccount,
            PageFooter
        },
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                username: "",
                usernameGet: "",
                firstName: "",
                firstnameGet: "",
                lastName: "",
                lastnameGet: "",
                email: "",
                emailGet: "",
                password: "",
                bio: "",
                bioGet: "",
                profile_img: "",
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
                    this.usernameGet = response.data.username;
                    this.firstnameGet = response.data.firstName;
                    this.lastnameGet = response.data.lastName;
                    this.emailGet = response.data.email;
                    this.bioGet = response.data.bio;
                }).catch((error)=>{
                    this.feedbackMsg = error;
                })
            },
            edit_user_profile(){
                axios.request({
                    url: this.apiUrl+"/user",
                    method: "PATCH",
                    headers: {
                        token: cookies.get(`sessionToken`)
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
                }).then((response)=>{
                    this.feedbackMsg = response.data;
                    this.clearTextBox();
                    this.get_user_profile();
                }).catch((error)=>{
                    this.feedbackMsg = error.response.data;
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
            },
        },
        created() {
            this.get_user_profile();
        },
        mounted() {
            setTimeout(() => {
                this.feedbackMsg = '';
            }, 60000); // Hide after 1 minute
        },
        beforeDestroy() {
            // Hide message when page is closed
            this.feedbackMsg = '';
        }
    }
</script>

<style scoped>
.pageContainer{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 100px;
}
h3{
    color: #adb5bd;
}

/* Button */
.v-btn{
    margin: 0 10px;
}
.v-btn:hover{
    color: white;
    background-color: #ffd60a;
}

.feedback{
    color: #adb5bd;
    margin-top: 30px;
}

.topFourContainer{
    margin-top: 30px;
    position: absolute;
}

/* Dividers */
.divider1{
    width: 100%;
    margin-bottom: 15px;
}
.divider2{
    width: 100%;
}

.footer{
    position: absolute;
    bottom: -50vh;
    width: 100%;
    background-color: #001219;
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