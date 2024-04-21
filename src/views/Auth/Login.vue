<template>
    <ion-label>Login</ion-label>
    <label for="" class="text-primary display-3">Hello Ionic</label>F
</template>

<script>
import {
    IonApp, IonContent, IonPage
} from '@ionic/vue';
export default {
    name: 'StudentLoginPage',
    components: {
        IonApp, IonContent, IonPage
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
    /*  async mounted() {
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
         ...mapMutations({
             showLoading: SHOW_LOADING_MUTATION
         }),
         async getToken() {
             return await axios.get('/token')
         },
         async onLogin() {
             const validation = new LoginValidation(this.username, this.password)
             this.errors = validation.checkValidations()
             if ('email' in this.errors || 'password' in this.errors) {
                 return false
             }
             this.errorMessage = ''
             this.showLoading(true)
             const data = {
                 email: this.username,
                 password: this.password,
                 remember_me: this.rememberMe
             }
             try {
                 await this.login(data)
                 this.$router.push('/student/dashboard')
             } catch (error) {
                 this.errorMessage = error
                 this.showLoading(false)
             }
             this.showLoading(false)
         }
     } */
}

</script>