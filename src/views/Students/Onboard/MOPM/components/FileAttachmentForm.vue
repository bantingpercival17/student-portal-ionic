<template>
    <div v-if="isLoading" class="loading-section">
        <div class="form-group">
            <p class="document-title">Uploading...</p>
            <div class="document-form">
                <div v-if="attribure.input !== false">
                    <div class="mb-">
                        <label for="" class="document-remarks"></label>
                        <div class="document-remarks-text form-control"></div>
                    </div>
                </div>
                <label for="" class="document-remarks"></label>
                <div class="document-remarks-file form-control"></div>
            </div>

        </div>
    </div>
    <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data" v-else>
        <div class="form-group">
            <small class="form-label"><b>ATTACH FILES<sup class="text-danger">*</sup></b></small>
            <div class="form-group">
                <input type="file" class="form-control border border-primary" multiple accept="image/*,application/pdf"
                    v-on:change="handleFileUpload($event)">
                <div v-if="errors">
                    <span class="badge bg-danger mt-2" v-if="errors">
                        {{ errors.message }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="attribure.input !== false">
            <div class="form-group">
                <small class="form-label"><b>REMARKS<sup class="text-danger">*</sup></b></small>
                <textarea class="form-control border border-primary" v-model="remarks" cols="30" rows="3"></textarea>
                <div v-if="errors.errors">
                    <span class="badge bg-danger mt-2" v-if="errors.errors.remarks">
                        {{ errors.errors.remarks[0] }}
                    </span>
                </div>
            </div>
        </div>
        <div class="mb-2">
            <button class="btn btn-primary w-100 mt-2" type="submit">SUBMIT</button>
        </div>
    </form>
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
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'FileAttachmentForm',
    data() {
        return {
            isLoading: false,
            remarks: '',
            files: [],
            errors: []
        }
    },
    props: {
        token: { type: String, required: true },
        attribure: { type: Object, required: true },
        fileID: { type: Number, required: false }
    },
    methods: {
        handleFileUpload(event) {
            const files = Array.from(event.target.files)
            const validFiles = files.filter(file =>
                file.type.startsWith('image/') || file.type === 'application/pdf'
            )

            if (validFiles.length !== files.length) {
                this.errors.files[0] = 'Only image and PDF files are allowed.'
                this.files = ''
            }

            this.files = validFiles
            console.log(validFiles) // Only valid files will be logged
        },
        async submitForm() {
            const formData = new FormData()
            // Set the input Data
            formData.append('journalType', this.attribure.name)
            formData.append('input', this.attribure.input)
            formData.append('journalId', this.fileID)
            // Append the files
            if (this.files.length > 0) {
                this.files.forEach(file => {
                    formData.append('files[]', file)
                })
            } else {
                formData.append('files[]', [])
            }
            formData.append('remarks', this.remarks)
            formData.append('shipboard', this.$route.query.v)
            console.log(formData)
            // Enable the loading layout
            this.isLoading = true
            // Set the Error Message into null
            this.errors = null
            // Send data to Server
            axios.post('/student/onboard/performance/view/v2', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.isLoading = false
                Swal.fire('Uploaded!', response.data.message, 'success')
                window.location.reload()
            }).catch((error) => {
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data
                } else {
                    alert(error)
                }
                this.isLoading = false
            })
        }
    }
}
</script>
