<template>
    <div>
        <v-card 
        class="deleteContainer mx-auto px-6 py-8" 
        max-width="500"
        color="accent"
        >
            <h1 class="heading">Deactivate Account</h1>
            <h4>This action cannot be undone and you will lose access to all your data and account information. Please confirm that you want to proceed with the deletion of your account.</h4>
            <v-form
            v-model="form"
            @submit.prevent="onSubmit"
            >
                <br>
                <v-checkbox
                    v-model="confirmDelete"
                    color="primary"
                    label="Confirm Deactivation"
                    dark
                >
                </v-checkbox>
                <v-btn color="primary" @click="delete_account">
                    DEACTIVATE ACCOUNT
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
.heading{
    font-family: lobster;
    margin-bottom: 10px;
}
.deleteContainer{
    color: whitesmoke;
}
.v-label {
    color: whitesmoke;
}
.v-btn:hover {
    color: #c5c6c7;
}
.feedbackContainer{
    margin-top: 10px;
}
</style>