<template>
    <div class="row m-0 align-items-center vh-100">

        <div class="col-lg-5 col-md-12">
            <div class="card-body">
                <div class="text-center">
                    <img src="@/resources/logo/bma-logo-1.png" class="img-fluid avatar avatar-100 rounded-circle"
                        alt="logo">
                </div>
                <h2 class="mb-2 text-center"><b>STUDENT PORTAL</b></h2>
                <p class="text-center">FORGET PASSWORD</p>
                <p>Enter your email address and we'll send you an email with instructions to reset your password.
                </p>
                <form @submit.prevent="forgetPassword" class="row">
                    <div class="">
                        <div class="col-lg-12">
                            <input-component type="email" label="email" v-model:value="username"
                                :error="errors.email" />
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary w-100" type="submit">RESET</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="res-hide col-lg-7 col-md-0 d-md-block d-none p-0">
            <img src="@/resources/banner/banner-login-2.jpg" class="img-fluid gradient-main vh-100" alt="images">
        </div>
    </div>
</template>

<script>
import {
    IonApp, IonContent, IonPage, loadingController
} from '@ionic/vue';
import axios from 'axios';
import { mapActions } from 'vuex'
import { LOGIN_ACTION } from '@/store/storeConstants.js'
import InputComponent from '@/components/InputComponents.vue'
import LoginValidation from '@/services/validation/LoginValidation'
export default {
    name: 'StudentLoginPage',
    components: {
        IonApp, IonContent, IonPage, InputComponent
    },
    data() {
        return {
            username: '',
            password: '',
            rememberMe: '',
            errors: [],
            message: [],
            errorMessage: '',
            url: '',
            crsf: ''
        }
    },
    async mounted() {
        axios.get('checker').then((response) => {
            console.log(response.data.bot)
        }).catch((error) => {
            console.log(error)
        })
        this.url = axios.defaults.baseURL
        this.crsf = axios.defaults.xsrfHeaderName
    },
    methods: {
        ...mapActions('auth', {
            login: LOGIN_ACTION
        }),
        async getToken() {
            return await axios.get('/token')
        },
        async forgetPassword() {

            this.errorMessage = ''
            const loading = await loadingController.create({
                message: 'Loading...',
                cssClass: 'custom-loading',
            });

            loading.present();
            const data = {
                email: this.username,
            }
            this.errors = []
            axios.post('student/forget-password', data)
                .then((response) => {
                    console.log(response.data)
                    if (response.status === 200) {
                        this.$router.push('/student/login')
                    }
                }).catch((error) => {
                    console.log(error)
                    if (error.response.status === 422) {
                        console.log(error.response.data)
                        this.errors = error.response.data.errors
                    } else {
                        console.log(error)
                    }
                })
            loading.dismiss()
        }
    }
}

</script>