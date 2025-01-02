<template>
    <modal id="edit-vessel" :tabindex="-1" role="dialog" mainClass="bd-example-modal-lg" dialogClass="modal-lg"
        ariaLabelled="MOPMLabel" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">
                EDIT VESSEL INFORMATION
            </h5>
        </model-header>
        <model-body>
            <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-lg-12">
                        <selectComponent label="Shipping Company" :data="dataForm.companyList" v-model:value="agency"
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
                        <selectComponentV2 label="Vessel Type" :data="dataForm.vesselType" v-model:value="vesselType"
                            :error="errors.vessel_type" />
                    </div>
                    <div class="col-lg-12">
                        <selectComponentV2 label="Area of Deployment" :data="areaOfDeploymentList"
                            v-model:value="seaExperience" :error="errors.sea_experience" />
                    </div>
                    <div class="col-lg-12">
                        <inputComponentV2 type="Date" label="Date of Embarkation" v-model:value="embarked"
                            :error="errors.embarked" />
                    </div>
                    <div class="col-lg-12">
                        <inputComponentV2 type="Date" label="Date of Disembarkation" v-model:value="disembarked"
                            :error="errors.disembarked" />
                    </div>
                </div>
                <div class="form-group float-right">
                    <button class="btn btn-primary w-100" type="submit">UPDATE DETAILS</button>
                </div>
            </form>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>
    </modal>
</template>
<script>
import selectComponent from '@/components/main-layouts/components/widgets/select-component-v2.vue'
import selectComponentV2 from '@/components/main-layouts/components/widgets/select-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import axios from 'axios'
export default {
    name: 'EditVesselModal',
    props: {
        token: { String, require },
        dataForm: { Object, require },
        vesselDetails: { Object, require }
    },
    components: {
        selectComponent,
        selectComponentV2,
        inputComponentV2
    },
    data() {
        const formData = new FormData()
        var shippingCompany = ''
        return {
            viewName: 'STEP 1 : DOCUMENT REQUIREMENTS',
            areaOfDeploymentList: ['International Shipping', 'Domestic Shipping'],
            errors: [],
            error: '',
            agency: this.vesselDetails.company_id,
            vessleName: this.vesselDetails.vessel_name,
            vesselType: this.vesselDetails.vessel_type,
            seaExperience: this.vesselDetails.shipping_company,
            embarked: this.vesselDetails.embarked,
            disembarked: this.vesselDetails.disembarked,
            formData,
            otherShipping: false,
            companyAddress: ''
        }
    },
    methods: {
        submitForm() {
            this.formData.append('vessel', this.vesselDetails.id)
            this.formData.append('companyId', this.agency)
            this.formData.append('vesselName', this.vessleName)
            this.formData.append('vesselType', this.vesselType)
            this.formData.append('seaExp', this.seaExperience)
            this.formData.append('embarked', this.embarked)
            this.formData.append('disembarked', this.disembarked)
            axios.post('/student/onboard/vessel-detials/edit', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                window.location.reload()
                console.log(response)
            }).catch((error) => {
                alert(error)
            })
        }
    }
}
</script>