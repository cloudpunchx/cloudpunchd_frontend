<template>
    <div>
        <button @click="userLogout">Sign Out</button>
    </div>
</template>

<script>
import axios from "axios";
import cookies from 'vue-cookies';
import router from '@/router';

    export default {
        name: "UserLogout",
        data() {
            return {
                apiUrl : process.env.VUE_APP_API_URL,
                token: "",
            }
        },
        methods: {
            getToken(){
                this.token = cookies.get(`sessionToken`);
            },
            userLogout(){
                axios.request({
                    url: this.apiUrl+"/user-login",
                    method: "DELETE",
                    headers: {
                        token: this.token
                    },
                }).then(()=>{
                    cookies.remove(`userId`);
                    cookies.remove(`sessionToken`);
                    router.push("/");
                }).catch((error)=>{
                    console.log(error);
                })
            },
            onSubmit () {
                if (!this.form) return
                this.loading = true
                setTimeout(() => (this.loading = false), 2000)
            },
            // required (v) {
            //     return !!v || 'Field is required'
            // },
        },
        created (){
            this.getToken();
        }
    }
</script>

<style scoped>

</style>