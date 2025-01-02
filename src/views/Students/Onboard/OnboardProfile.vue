<template>
    <div v-if="isLoading">
        <LoadingView />
    </div>
    <div v-else>
        <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
            data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
            <div class="card-header">
                <div class="header-title">
                    <h4 class="card-title fw-bold text-primary">OBT INFORMATION SHEET</h4>
                </div>
            </div>
            <div class="card-body">

                <div class="row">
                    <div class="col-lg-4 col-md-12">
                        <labelComponent label="student number" :value="studentNumber" />
                    </div>
                    <div class="col-lg-8 col-md-12">
                        <router-link class="btn btn-sm btn-primary float-end" aria-current="page"
                            :to="{ name: 'student-layout.update-information' }">
                            UPDATE INFORMATION
                        </router-link>
                        <labelComponent label="course" :value="course" />
                    </div>
                    <div class="col-lg-12 col-md-12">
                        <labelComponent label="full name" :value="fullName" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <labelComponent label="date of birth" :value="birth_date" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <labelComponent label="email" :value="email" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <labelComponent label="contact number" :value="contactNumber" />
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <inputComponentV2 label="Facebook account link" type="text" v-model:value="facebookAccount"
                            :error="errors.birth_date" />
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <selectComponentV2 label="Batch" :data="batchList" v-model:value="batchNo"
                            :error="errors.agency" columName="batch_number" />
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <inputComponentV2 label="Mismo account" type="text" v-model:value="mismoAccount"
                            :error="errors.birth_date" />
                        <small class="text-muted mt-0 fw-bolder">
                            If don't have a Mismo Account, Please register on this Link <a
                                href="https://online-appointment.marina.gov.ph/register-new">Register Now</a>
                        </small>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <br>
                        <button class="btn btn-primary float-end btn-sm w-100" @click="submitProfile()">SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import selectComponentV2 from '@/components/main-layouts/components/widgets/select-component-v2.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue'
import axios from 'axios'
export default {
    name: 'OnboardTrainingStudentProfile',
    components: {
        inputComponentV2,
        selectComponentV2,
        labelComponent
    },
    data() {
        const formDetails = new FormData()
        return {
            isLoading: true,
            fullName: '',
            studentNumber: '',
            course: '',
            birth_date: '',
            email: '',
            contactNumber: '',
            facebookAccount: '',
            mismoAccount: '',
            batchNo: '',
            batchList: [],
            errors: [],
            form: {
                uploadLoading: [],
                fileError: [],
                fileUploaded: [],
                documentDetails: []
            },
            formDetails
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('/student/onboard/profile', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            console.log(response.data)
            const value = response.data
            this.studentNumber = value.student.account.student_number
            console.log(this.studentNumber)
            this.email = value.student.account.email
            this.contactNumber = value.student.contact_number
            this.fullName = value.student.first_name + ' ' + value.student.last_name
            this.course = value.student.enrollment_assessment.course.course_name
            this.birth_date = value.student.birthday
            this.batchList = value.batch
            if (value.student.onboard_profile) {
                this.facebookAccount = value.student.onboard_profile.facebook_link
                this.mismoAccount = value.student.onboard_profile.mismo_account
            }
            if (value.student.batch) {
                this.batchNo = value.student.batch.batch_id
            }
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        })
    },
    methods: {
        ...mapActions('alert', {
            successAlert: SUCCESS_ALERT,
            infoAlert: INFO_ALERT,
            errorAlert: ERROR_ALERT,
            encrypt: ENCRYPT_DATA
        }),
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        submitProfile() {
            const formData = {
                facebookAccount: this.facebookAccount,
                batchNo: this.batchNo,
                mismoAccount: this.mismoAccount
            }
            axios.post('/student/onboard/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.successAlert(response.data)
                console.log(response)
            }).catch((error) => {
                this.showLoading(false)
                console.log(error)
                if (error.response.status === 422) {
                    this.error = error.response.data
                } else {
                    this.error = error.response.data
                }
            })
        },
        handleFileChange(event, documentValue, index) {
            this.form.uploadLoading[index] = true
            this.form.fileError[index] = null
            let fileUpload = event.target.files[0] // Get the Files in Event
            const formData = {
                document: documentValue,
                file: fileUpload
            }
            console.log(formData)
            axios.post('student/onboard/pre-onboard', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                console.log(response)
                this.form.fileUploaded[index] = true
                fileUpload = ''
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 422) {
                    const err = error.response.data
                    this.form.fileError[index] = err.errors.file[0]
                } else {
                    const err = error.response.data
                    this.form.fileError[index] = err.message
                }
                this.form.uploadLoading[index] = false
            })
        },
        checkFileUpload(id, index) {
            let value = false
            /*  console.log(id) */
            this.onboardRequirements.forEach(element => {
                if (element.document_id === id) {
                    this.form.documentDetails[index] = element
                    value = true
                }
            })
            return value
        },
        getFormatDate(inputDate) {
            // create a new Date object with the input date string
            const date = new Date(inputDate)
            // define an array of month names
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            // get the day, month, and year values from the date object
            const day = date.getDate()
            const month = monthNames[date.getMonth()] // add 1 to adjust for 0-indexed months
            const year = date.getFullYear()
            // format the date as 'dd/mm/yyyy'
            const formattedDate = month + ' ' + day + ', ' + year
            return formattedDate
        },
        staffName(data) {
            return data != null ? data.first_name + ' ' + data.last_name : ''
        }
    }
}
</script>