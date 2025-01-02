<template>
    <div v-if="isLoading">
        <LoadingView />
    </div>
    <div v-else>
        <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
            data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
            <div class="card-header">
                <div class="header-title">
                    <h4 class="card-title fw-bold text-primary">PRE-ONBOARD REQUIREMENTS</h4>
                </div>
            </div>
            <div class="card-body row">
                <!--  <div v-for="(data, index) in documents" :key="index">
                    <div class="form-group">
                        <label for="example-text-input" class="form-control-label fw-bolder">
                            <small>{{ data }}<span class="text-danger">*</span></small>
                        </label>
                        <input type="file" class="form-control border border-primary" />

                    </div>
                </div> -->
                <div class="col-lg-12 col-md-6 mb-4" v-for="(data, index) in documentLists" :key="index">
                    <h5 class="text-primary fw-bolder">
                        {{ data.document_name }}
                    </h5>
                    <div class="check" v-if="checkFileUpload(data.id, index)">
                        <div v-if="form.documentDetails[index].document_status === '0'">
                            <label for="" class="text-info">This Documents is under Verification</label> <br>
                            <span class="badge bg-primary">File Uploaded Date: {{
                                getFormatDate(form.documentDetails[index].created_at) }}</span>
                        </div>
                        <div v-else>
                            <div v-if="form.documentDetails[index].document_status === '1'">
                                <div class="row">
                                    <div class="col-md-12">
                                        <span class="text-muted">Status: </span>
                                        <span class="text-primary fw-bolder">APPROVED DOCUMENT</span>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-group">
                                            <small for="" class="badge bg-secondary me-3">
                                                <span>Verified By: </span>
                                                <span class="fw-bolder">
                                                    {{ this.staffName(form.documentDetails[index].staff) }}
                                                </span>
                                            </small>
                                            <small for="" class="badge bg-secondary">
                                                <span>Verified Date: </span>
                                                <span class="fw-bolder">
                                                    {{ getFormatDate(form.documentDetails[index].updated_at) }}
                                                </span>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="row">
                                    <div class="col-md-12">
                                        <span class="text-muted">Status: </span>
                                        <span class="text-danger fw-bolder">DISAPPROVED DOCUMENT</span>
                                        <p class="text-info">
                                            <span>Remarks: </span>
                                            <span class="fw-bolder">{{ form.documentDetails[index].feedback }}</span>
                                        </p>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-group">
                                            <small for="" class="badge bg-secondary me-3">
                                                <span>Verified By: </span>
                                                <span class="fw-bolder">
                                                    {{ this.staffName(form.documentDetails[index].staff) }}
                                                </span>
                                            </small>
                                            <small for="" class="badge bg-secondary">
                                                <span>Verified Date: </span>
                                                <span class="fw-bolder">
                                                    {{ getFormatDate(form.documentDetails[index].updated_at) }}
                                                </span>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div class="file-content">
                                    <div v-if="form.fileUploaded[index]" class="form-file">
                                        <label for="" class="text-info">This Documents is under Verification</label>
                                        <br>
                                        <span class="text-primary fw-bolder" v-if="form.uploadLoading[index]">
                                            FILE UPLOADED
                                        </span>
                                    </div>
                                    <div v-else>
                                        <input type="file" class="form-control form-control-sm border border-primary"
                                            required v-on:change="handleFileChange($event, data.id, index)" />
                                        <span class="text-info fw-bolder" v-if="form.uploadLoading[index]">Uploading
                                            Files....</span>
                                        <small v-if="form.fileError[index]" class="badge bg-danger">{{
                                            form.fileError[index]
                                        }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="file-content">
                        <div v-if="form.fileUploaded[index]" class="form-file">
                            <label for="" class="text-info">This Documents is under Verification</label>
                            <br>
                            <span class="text-primary fw-bolder" v-if="form.uploadLoading[index]">
                                FILE UPLOADED
                            </span>
                        </div>
                        <div v-else>
                            <input type="file" class="form-control form-control-sm border border-primary" required
                                v-on:change="handleFileChange($event, data.id, index)" />
                            <span class="text-info fw-bolder" v-if="form.uploadLoading[index]">Uploading
                                Files....</span>
                            <small v-if="form.fileError[index]" class="badge bg-danger">{{ form.fileError[index]
                            }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'PreDocuments',
    /* components: {
        LoadingView
    }, */
    data() {
        return {
            isLoading: false,
            documentLists: [],
            onboardRequirements: [],
            documents: [
                'Proof of Registration to MISMO Portal',
                'Valid SRIB with validity of at least 18 months or more',
                'Valid Passport (for International) wtih validity of at least 18 months or more',
                'Transcript of Record'
            ],
            form: {
                uploadLoading: [],
                fileError: [],
                fileUploaded: [],
                documentDetails: []
            }
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/onboard/pre-onboard', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.documentLists = response.data.document_requirements
            this.onboardRequirements = response.data.onboard_requirements
            console.log(this.documentLists)
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        })
    },
    methods: {
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