<template>
    <div class="uploaded-file row">
        <div class="document-status col-lg-6 col-md-12">
            <div v-if="attribure.content.is_approved">
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <small class="fw-bolder text-muted">DOCUMENT STATUS</small><br>
                        <div v-if="attribure.content.is_approved === 1">
                            <p class="badge bg-primary h5">APPROVED DOCUMENTS</p>
                        </div>
                        <div v-else>
                            <p class="badge bg-danger h5">DISAPPROVED DOCUMENTS</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <small class="fw-bolder text-muted">DOCUMENT
                            VERIFIER:</small><br>
                        <p class="badge bg-info h5">{{ staffName(attribure.content.staff) }}</p>
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <small class="fw-bolder text-muted">DATE VERIFIED:</small><br>
                        <p class="badge bg-info h5">{{ getFormatDate(attribure.content.updated_at)
                            }}
                        </p>
                    </div>
                </div>

                <div v-if="attribure.content.feedback != null" class="col-lg-12 col-md-12">
                    <small class="fw-bolder text-muted">REMARKS:</small><br>
                    <label for="" class="form-control border border-danger text-danger">{{ attribure.content.feedback
                        }}</label>
                </div>
            </div>
            <div v-else>
                <p class="badge bg-info h5">DOCUMENTS IS UNDER VERIFICATION OF OBT
                    OFFICER
                </p>
            </div>
        </div>
        <div class="document-verification col-lg-6 col-md-12">
            <a v-if="!reUploadForm" class="btn btn-outline-info btn-xs float-end" @click="showReupload">REVISION
                UPLOAD</a>
            <a v-else class="btn btn-outline-danger btn-xs float-end" @click="hideReupload">HIDE REVISION UPLOAD</a>
            <div v-if="attribure.input === true">
                <small class="form-label"><b>REMARKS<sup class="text-danger">*</sup></b></small>
                <label for="" class="form-control">{{ attribure.content.remark }}</label>
            </div>
            <div class="form-group">
                <small class="form-label"> <b> ATTACH FILES <sup class="text-danger">*</sup></b></small>
                <table>
                    <tbody>
                        <tr>
                            <td v-for="(document, index) in JSON.parse(attribure.content.file_links)" :key="index">
                                <label for="" data-bs-toggle="modal" data-bs-target="#view-documents"
                                    @click="documentViewer(document)">
                                    <iconComponent :fileType="getFileType(document)" />
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="attribure.content.is_approved === 2" class="uploading-form">
                <FileAttachmentForm :token="token" :attribure="attribure" :fileID="attribure.content.id" />
            </div>
            <div v-if="reUploadForm" class="uploading-form">
                <FileAttachmentForm :token="token" :attribure="attribure" :fileID="attribure.content.id" />
            </div>
        </div>

    </div>
    <modal id="view-documents" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xl"
        ariaLabelled="exampleModalLabel" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">DOCUMENT VIEWER
            </h5>
        </model-header>
        <model-body>
            <model-body>
                <div v-if="link && checkFileType(link) === 'image'" class="text-center">
                    <img :src="link" alt="Document Image" class="img-fluid" />
                </div>
                <div v-else>
                    <iframe class="iframe-container form-view" width="100%" height="70%" :src="link"></iframe>
                </div>
            </model-body>

        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal>
</template>
<script>

import iconComponent from '@/components/main-layouts/components/widgets/file-icon.vue'
import FileAttachmentForm from './FileAttachmentForm.vue'
import Modal from '@/components/bootstrap/modal/modal.vue'
export default {
    name: 'FileAttachmentValidationView',
    data() {
        return {
            isLoading: false,
            remarks: '',
            files: [],
            errors: [],
            reUploadForm: false,
            link: ''
        }
    },
    components: {
        FileAttachmentForm,
        iconComponent,
        Modal
    },
    props: {
        token: { type: String, required: true },
        attribure: { type: Object, required: true }
    },
    methods: {
        getFileType(data) {
            const extension = data.split('.').pop()
            return 'icon-' + extension.toLowerCase()
        },
        checkFileType(data) {
            const extension = data.split('.').pop().toLowerCase()
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
            if (imageExtensions.includes(extension)) {
                return 'image'
            }
            return 'icon-' + extension // For non-image files, return a default icon class
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
        showReupload() {
            this.reUploadForm = true
        },
        hideReupload() {
            this.reUploadForm = false
        },
        documentViewer(file) {
            const extension = file.split('.').pop().toLowerCase()
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
            if (imageExtensions.includes(extension)) {
                this.link = file // Set the file link for the modal
            } else {
                this.link = '' // Clear the link for non-image files
            }
        }

    }
}
</script>