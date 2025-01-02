<template>
    <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
        <div class="row">
            <div class="col-lg-12">
                <selectComponent label="Shipping Company" :data="propsCompany" v-model:value="agency"
                    :error="errors.agency" columName='agency_name' />
                <div class="form-check mt-0">
                    <input class="form-check-input" type="checkbox" value="0" v-model="otherShipping">
                    <small class="form-check-label validate-checkbox" for="flexCheckDefault1">
                        Other Shipping Company
                    </small>
                </div>
            </div>
            <div v-if="otherShipping" class="col-lg-6 col-md-12">
                <inputComponentV2 label="Shipping Company" v-model:value="shippingCompany"
                    :error="errors.shipping_company" />
            </div>
            <div v-if="otherShipping" class="col-lg-6 col-md-12">
                <inputComponentV2 label="Company Address" v-model:value="companyAddress"
                    :error="errors.company_address" />
            </div>
            <div class="col-lg-12">
                <inputComponentV2 label="Vessel Name" v-model:value="vessleName" :error="errors.vessel_name" />
            </div>
            <div class="col-lg-12">
                <selectComponentV2 label="Vessel Type" :data="vesselType" v-model:value="vessel"
                    :error="errors.vessel_type" />
            </div>
            <div class="col-lg-12">
                <selectComponentV2 label="Area of Deployment" :data="ship" v-model:value="seaExperience"
                    :error="errors.sea_experience" />
            </div>
            <div class="col-lg-12">
                <inputComponentV2 type="Date" label="Date of Embarkation" v-model:value="embarked"
                    :error="errors.embarked" />
            </div>
        </div>
        <label class="text-primary fw-bolder">DOCUMENT REQUIREMENTS</label>
        <div class="row">
            <div class="col-lg-6 col-md-12" v-for="(item, index) in propsDocuments" :key="index">
                <div class="form-group">
                    <label for="example-text-input" class="form-control-label fw-bolder">
                        <small>{{ item.document_name }}<span class="text-danger">*</span></small>
                    </label>
                    <input type="hidden" :value="item.id" name="documents">
                    <input type="file" class="form-control border border-primary" :name="`file${index}`" ref="files"
                        @change="onFileChange(index, item.document_name.replaceAll(' ', '_').toLowerCase())" />
                    <span class="badge bg-danger mt-2"
                        v-if="errors[item.document_name.toLowerCase().replaceAll(' ', '_')]">{{
                            errors[item.document_name.toLowerCase().replaceAll(' ', '_')][0] }}</span>
                </div>
            </div>
        </div>
        <div class="form-group float-right">
            <button class="btn btn-primary w-100" type="submit">SUBMIT</button>
        </div>
    </form>
</template>
<script>
import axios from 'axios'
import { mapActions, mapMutations } from 'vuex'
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import selectComponent from '@/components/main-layouts/components/widgets/select-component-v2.vue'
import selectComponentV2 from '@/components/main-layouts/components/widgets/select-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import { ApiController } from '../../../../controller/ApiController'
export default {
    name: 'ShipboardApplicationForm',
    components: {
        selectComponent,
        selectComponentV2,
        inputComponentV2
    },
    data() {
        const formData = new FormData()
        var shippingCompany = ''
        if (this.deployment) {
            if (this.deployment.shipboard_companies) {
                shippingCompany = this.deployment.shipboard_companies.agency_name
                console.log(shippingCompany)
            }
        }
        return {
            viewName: 'STEP 1 : DOCUMENT REQUIREMENTS',
            ship: ['International Shipping', 'Domestic Shipping'],
            files: [],
            errors: [],
            error: '',
            agency: '',
            vessel: '',
            vessleName: '',
            seaExperience: '',
            embarked: '',
            formData,
            otherShipping: false,
            shippingCompany,
            companyAddress: ''
        }
    },
    async created() {
        this.apiController = new ApiController();

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
        onFileChange(index, id) {
            const file = this.$refs.files[index].files[0]
            this.formData.append(id.toString(), file)
        },
        handleFileChange(event, document, deployment) {
            const file = event.target.files[0] // Get the Files in Event
            this.formData.append('file', file) // Set the File on FormData
            this.formData.append('document', document) // Set the Document on FormData
            this.formData.append('deployment', deployment)
        },
        async submitForm() {
            if (this.otherShipping === false) {
                this.formData.append('agency', this.agency)
            } else {
                this.agency = 'NA'
                this.formData.append('agency', 'NA')
                this.formData.append('shipping_company', this.shippingCompany)
                this.formData.append('company_address', this.companyAddress)
            }
            this.formData.append('vessel_name', this.vessleName)
            this.formData.append('vessel_type', this.vessel)
            this.formData.append('sea_experience', this.seaExperience)
            this.formData.append('embarked', this.embarked)
            this.showLoading(true)
            this.errors = []
            this.apiController.storeItem('/student/onboard/enrollment'.this.formData)
                .then((response) => {
                    this.showLoading(false)
                    this.successAlert(response.data)
                    window.location.reload()
                    console.log(response)
                }).catch((error) => {
                    this.showLoading(false)
                    console.log(error)
                    if (error.response.status === 422) {
                        console.log(error.response.data)
                        this.errors = error.response.data.errors
                    } else {
                        this.errorAlert(this.error)
                    }
                })
            /*   axios.post('/student/onboard/enrollment', this.formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: 'Bearer ' + this.token
                  }
              }).then((response) => {
                  this.showLoading(false)
                  this.successAlert(response.data)
                  window.location.reload()
                  console.log(response)
              }).catch((error) => {
                  this.showLoading(false)
                  console.log(error)
                  if (error.response.status === 422) {
                      console.log(error.response.data)
                      this.errors = error.response.data.errors
                  } else {
                      this.errorAlert(this.error)
                  }
              }) */
        }
    },
    props: { propsCompany: Object, propsDocuments: Object, deployment: Object, vesselType: Object }
}
</script>