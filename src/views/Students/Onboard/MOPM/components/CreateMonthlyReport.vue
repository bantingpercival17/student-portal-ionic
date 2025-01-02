<template>
    <modal id="create-monthly-report" :tabindex="-1" role="dialog" mainClass="bd-example-modal-lg"
        dialogClass="modal-lg" ariaLabelled="MOPMLabel" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">CREATE MONTHLY PERFORMANCE
                REPORT
            </h5>
        </model-header>
        <model-body>
            <form @submit.prevent="submitForm" method="post">
                <div class="row">
                    <div class="col-md-12 col-lg-12">
                        <label for="example-text-input" class="form-control-label fw-bolder">
                            PERIOD COVERED
                        </label>
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <inputComponentV2 type="Date" label="Date Start" v-model:value="startDate"
                            :error="errors.start_date" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <inputComponentV2 label="Date End" type="date" v-model:value="endDate"
                            :error="errors.end_date" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 col-lg-12">
                        <inputComponentV2 label="Date Preferred" v-model:value="datePreferred"
                            :error="errors.date_preferred" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <inputComponentV2 label="Master Name" v-model:value="masterName" :error="errors.master_name" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <inputComponentV2 label="Master Name Email" v-model:value="masterEmail"
                            :error="errors.master_email" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <selectComponent label="Inputted to Daily Journal" :data="yesOrNo"
                            v-model:value="inputDailyJournal" :error="errors.input" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <selectComponent label="Signed by Officer/Master" :data="yesOrNo" v-model:value="signed"
                            :error="errors.signed" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <inputComponentV2 label="Trb Code" v-model:value="trbCode" :error="errors.trb_code" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <textAreaComponent label="task as per trb" v-model:value="trbTask" :error="errors.trb_tasks"
                            row="6" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <textAreaComponent label="remarks us learning acquired" v-model:value="remarks"
                            :error="errors.remarks" row="6" />
                    </div>
                </div>
                <div class="form-group float-right">
                    <button class="btn btn-primary" type="submit">SUBMIT</button>
                </div>
            </form>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>
    </modal>
</template>
<script>
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import textAreaComponent from '@/components/main-layouts/components/widgets/text-area-component.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
import axios from 'axios'
export default {
    name: 'CreateMonthlyReport',
    props: {
        token: { String, require },
        vesselDetails: { Object, require },
        showLoading: { Function, require }
    },
    components: {
        inputComponentV2, textAreaComponent, selectComponent
    },
    data() {
        return {
            yesOrNo: ['Yes', 'No'],
            isLoading: true,
            errors: [],
            shipboardId: '',
            startDate: '',
            endDate: '',
            trbTask: '',
            trbCode: '',
            inputDailyJournal: '',
            signed: '',
            remarks: '',
            datePreferred: '',
            masterEmail: '',
            masterName: ''
        }
    },
    methods: {
        async submitForm() {
            this.showLoading(true)
            const formData = new FormData()
            formData.append('shipboard_id', this.vesselDetails.id)
            formData.append('start_date', this.startDate)
            formData.append('end_date', this.endDate)
            formData.append('date_preferred', this.datePreferred)
            formData.append('input', this.inputDailyJournal)
            formData.append('trb_tasks', this.trbTask)
            formData.append('trb_code', this.trbCode)
            formData.append('signed', this.signed)
            formData.append('remarks', this.remarks)
            formData.append('master_name', this.masterName)
            formData.append('master_email', this.masterEmail)
            axios.post('/student/onboard/performance', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                window.location.reload()
            }).catch((error) => {
                this.showLoading(false)
                alert(error)
            })
        }
    }
}
</script>