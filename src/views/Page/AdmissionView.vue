<template>
    <ImageTitleHeader titleHeader="SCHOOL ADMISSION" banner="/src/resources/banner/banner-1.jpg" topValue="80%" />
    <div class="container">
        <div class="alert alert-left alert-success alert-dismissible fade show mt-5" role="alert">
            <span class="fw-bolder">REMINDERS TO ALL APPLICANTS:</span>

            <p class="mt-3">
                • Applicants with Tattoos are not allowed.
                <br>
                • Documentary Requirements of the Applicants shall be validated at the Registrar's Office prior to the
                uploading
                at BMA's Portal.
            </p>
        </div>
        <ion-card>
            <ion-card-content>
                <div class="row">
                    <div class="col-md-8">
                        <ion-label class="fw-bolder text-primary h4">
                            SENIOR HIGH SCHOOL ADMISSION REQUIREMENTS
                        </ion-label>
                        <ul class="contact-details">
                            <li> Grade 10 Report Card with Grades in English, Math,
                                Science and General Average of 80%</li>
                            <li>Certificate of Good Moral Conduct</li>
                            <li>PSA Birth Certificate (not over 19 yrs. Old)</li>
                            <li>Height Requirements: at least 5'2"</li>
                        </ul>
                        <ion-label class="fw-bolder text-primary h4">
                            COLLEGE ADMISSION REQUIREMENTS
                        </ion-label>
                        <ul class="contact-details">
                            <li> Grade 11 & 12 Card with Grades in English, Math,
                                Science and General Average of 80%
                            </li>
                            <li> Certificate of Good Moral Conduct</li>
                            <li> PSA Birth Certificate (not over 22 yrs. Old)</li>
                            <li> Barangay Clearance</li>
                            <li> Height Requirements: at least 5'4 for Marine Transportation and 5'2 for Marine
                                Engineering"
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <ApplicationForms />
                    </div>
                </div>
            </ion-card-content>
        </ion-card>
    </div>
</template>
<script>
/* import { mapMutations, mapActions } from 'vuex'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import { SHOW_LOADING_MUTATION, APPLICANT_REGISTRATION_ACTION } from '@/store/storeConstants.js' */
import axios from 'axios'
import ImageTitleHeader from '@/components/ImageTitleHeader.vue'
import { IonCard, IonCardContent, IonLabel } from '@ionic/vue'
import ApplicationForms from '../../components/widgets/Forms/ApplicationForms.vue'
export default {
    name: 'AdmissionPage',
    components: {
        IonCard, IonCardContent, IonLabel,
        ImageTitleHeader,
        ApplicationForms
    },
    data() {
        const formData = {
            firstName: '',
            lastName: '',
            email: '',
            course: '',
            contactNumber: '',
            birthday: '',
            agreement: '',
            captcha: '',
            message: 'Check you Email for your Password'

        }
        return {
            errors: [],
            networkError: [],
            validateClass: '',
            formData,
            captchaValue: ''
        }
    },
   /*  mounted() {
        this.recaptcha()
        axios.get('checker').then((response) => {
            console.log(response.data.bot)
        }).catch((error) => {
            console.log(error)
        })
    }, */
    methods: {
        /*  ...mapMutations({
             showLoading: SHOW_LOADING_MUTATION
         }),
         ...mapActions('alert', {
             successAlert: SUCCESS_ALERT,
             infoAlert: INFO_ALERT,
             errorAlert: ERROR_ALERT,
             encrypt: ENCRYPT_DATA
         }),
         ...mapActions('auth', {
             registration: APPLICANT_REGISTRATION_ACTION
         }), */
        async applicantRegister() {
            this.showLoading(true)
            this.networkError = []
            this.errors = []
            try {
                await this.registration(this.formData).then(response => {
                    const message = btoa(response.data.message)
                    this.$router.push({ path: '/applicant/login', query: { _m: message } })
                })
            } catch (error) {
                this.errorMessage = error
                if (error.code === 'ERR_NETWORK') {
                    this.networkError = error
                    this.errorAlert(error)
                } else {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
                        }
                    }
                }
                this.showLoading(false)
                this.formData.captcha = ''
                this.recaptcha()
            }
            this.showLoading(false)
        },
        async recaptcha() {
            this.captchaValue = ''
            axios.get('form-recaptcha').then((response) => {
                this.captchaValue = response.data.captcha
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
<style scope>
.admission-banner {
    background-image: url('~@/assets/admission-banner.png');
    background-repeat: no-repeat;
    width: 100%;
    text-align: center;
    background-color: rgba(44, 203, 23, 0.5);
    height: 40vh;
}
</style>