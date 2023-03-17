<template>
    <div>
        <v-card class="mx-auto px-6 py-8" max-width="400">
            <h3>Are you sure you want to delete your account? This action cannot be undone and you will lose access to all your data and account information. Please confirm that you want to proceed with the deletion of your account.</h3>
            <v-form
            v-model="form"
            @submit.prevent="onSubmit"
            >
                <br>
                <v-checkbox
                    v-model="confirmDelete"
                    color="rgb(1, 139, 139)"
                    label="CONFIRM"
                ></v-checkbox>
                <v-btn color="#d90429" @click="delete_account">
                    DELETE ACCOUNT
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
        name: "DeleteAccount",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
                feedbackMsg: "",
                form: false,
                loading: false,
                confirmDelete: false,
            }
        },
        methods: {
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            delete_account(){
                if (this.confirmDelete == false){
                    this.feedbackMsg = "Please click check box to confirm account deletion."
                } else if (this.confirmDelete == true){
                        axios.request({
                        url: this.apiUrl+"/user",
                        method: "DELETE",
                        headers: {
                            token: this.token
                        },
                    }).then(()=>{
                        cookies.remove(`userId`);
                        cookies.remove(`sessionToken`);
                        router.push("/");
                    }).catch((error)=>{
                        this.feedbackMsg = error;
                    })
                } else{
                    this.feedbackMsg = "Something unexpected has gone wrong, please try again."
                }
            },
        },
        created (){
            this.getToken();
        }
    }
</script>

<style scoped>
.v-btn{
    margin-top: 25px;
    width: 150px;
}
.v-btn:hover {
    color: #c5c6c7;
    background-color: #250902;
}
.feedbackContainer{
    margin-top: 15px;
}
</style>