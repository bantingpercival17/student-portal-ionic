<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <div class="header-title">
                <p class="card-title text-primary h4">
                    <b>{{ monthReport() }}</b>
                </p>
                <small class="text-muted"><b>MONTH JOURNAL</b></small>
            </div>
            <div class="card-tool">
                <a href="" class="btn btn-danger btn-sm mt-2"><svg xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="4" y1="7" x2="20" y2="7"></line>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    <modal id="exampleModal" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xlg" ariaLabelled="exampleModalLabel"
        :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">DOCUMENT VIEWER
            </h5>
        </model-header>
        <model-body>
            <iframe class="iframe-container form-view" width="100%" height="70%" :scr="this.link">
            </iframe>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal>
</template>
<style scoped>
.document-title {
    width: 20%;
    height: 25px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.document-remarks {
    width: 15%;
    height: 20px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.document-remarks-text {
    width: 100%;
    height: 100px;
}

.document-remarks-file {
    width: 100%;
    height: 50px;
}

@keyframes pulse-bg {
    0% {
        background-color: #ddd;
    }

    50% {
        background-color: #d0d0d0;
    }

    100% {
        background-color: #ddd;
    }
}
</style>
<script>
import modal from '@/components/bootstrap/modal/modal.vue'
import iconComponent from '@/components/main-layouts/components/widgets/file-icon.vue'
import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import textAreaComponent from '@/components/main-layouts/components/widgets/text-area-component.vue'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name: 'ShipboardMonitoringOverview',
    props: {
        propsData: Object
    },
    data() {
        return {
            isLoading: true,
            isEdit: false,
            errors: [],
            performanceReport: [],
            documents: [],
            tasks: [],
            formLoading: '',
            forms: {
                remarks: [],
                files: [],
                loading: [],
                errors: []
            },
            link: '',
            version1: []
        }
    },
    components: {
        modal
        /* labelComponent,
        inputComponentV2,
        textAreaComponent,
        iconComponent */
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        handleFileUpload(event, index) {
            const files = Array.from(event.target.files)
            /* this.forms.files[index] = this.$refs.fileInput.files */
            this.forms.files[index] = files
            console.log(files)
            /* const files = this.$refs.fileInput.files */
        },
        async submitForm(form, document) {
            const formData = new FormData()
            const file = this.forms.files[form] ? this.forms.files[form] : ''
            const remarks = this.forms.remarks[form] ? this.forms.remarks[form] : ''
            // Set the input Data
            formData.append('document', document)
            console.log(this.forms.files[form])
            if (this.forms.files[form]) {
                this.forms.files[form].forEach(file => {
                    formData.append('files[]', file)
                })
            } else {
                formData.append('files', '')
            }
            formData.append('remarks', remarks)
            formData.append('shipboard', this.$route.query.v)
            // Enable the loading layout
            this.forms.loading[form] = true
            // Set the Error Message into null
            this.forms.errors[form] = null
            // Send data to Server
            axios.post('/student/onboard/performance/view', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.forms.loading[form] = false
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data.data)
                    window.location.reload()
                }
            }).catch((error) => {
                this.forms.loading[form] = false
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.forms.errors[form] = error.response.data.errors
                } else {
                    this.showAlertError(error)
                }
            })
        },
        getFileType(data) {
            const extension = data.split('.').pop()
            return 'icon-' + extension.toLowerCase()
        },
        documentViewer(file) {
            this.link = ''
            this.link = file
        },
        checkDocument(data) {
            let status = true
            this.documents.forEach((item, index) => {
                if (item.journal_type === data) {
                    status = false
                }
            })
            return status
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
            const name = data.first_name + ' ' + data.last_name
            return name.toUpperCase()
        },
        convertToText(data) {
            return data === 1 ? 'Yes' : 'No'
        },
        getFormatMonthYear(inputDate) {
            // create a new Date object with the input date string
            const date = new Date(inputDate)
            // define an array of month names
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            const month = monthNames[date.getMonth()] // add 1 to adjust for 0-indexed months
            const year = date.getFullYear()
            // format the date as 'dd/mm/yyyy'
            const formattedDate = month + ' ' + year
            return formattedDate
        },
        monthReport() {
            const month = atob(this.$route.query.v)
            return this.getFormatMonthYear(month)
        }
    }
}
</script>