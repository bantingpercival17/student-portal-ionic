<template>
    <button data-bs-toggle="modal" data-bs-target="#add-vessel" class="btn btn-sm btn-primary float-end">ADD
        VESSEL</button>
    <p class="display-6 fw-bolder text-primary">SEA SERVICE RECORD</p>
    <div v-if="isLoading" class="loading-section">
        <label for="">LOADING</label>
    </div>
    <div v-else class="content-section">
        <div class="card">
            <div class="nav-scroller ">
                <nav class=" nav nav-underline bg-soft-primary pb-0 text-center " aria-label="Secondary navigation">
                    <div v-if="vesselList.length > 0" class="d-flex" id="head-check">
                        <a :class="onActiveCard('nav-item-' + index)" v-for="(data, index) in vesselList" :key="index"
                            @click="choiceVessel(index, 'nav-item-' + index)">
                            {{ data.vessel_name }}
                        </a>
                    </div>
                    <div v-else>
                        <a class="nav-link">
                            NO VESSEL
                        </a>
                    </div>
                </nav>
            </div>
            <div v-if="vesselSelected" class="card-body">
                <div class="butto-action float-end">
                    <button class="btn btn-sm btn-primary me-3" data-bs-toggle="modal"
                        data-bs-target="#edit-vessel">EDIT</button>
                    <button class="btn btn-sm btn-outline-danger" @click="removeItem(vesselSelected.id)">REMOVE</button>
                </div>
                <h4 class="card-title fw-bolder text-primary">{{ vesselSelected.vessel_name }}</h4>
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <label-component label="COMPANY NAME" :value="vesselSelected.company_name" />
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <label-component label="VESSEL TYPE" :value="vesselSelected.vessel_type" />
                    </div>

                    <div class="col-lg col-md-12">
                        <label-component label="STATUS" :value="vesselSelected.shipboard_status" />
                    </div>
                    <div class="col-lg col-md-12">
                        <label-component label="DATE OF EMBARKING" :value="vesselSelected.embarked" />
                    </div>
                    <div class="col-lg col-md-12">
                        <label-component label="AREA OF DEPLOYMENT" :value="vesselSelected.shipping_company" />
                    </div>
                </div>
                <div class="monitoring-section mt-4">
                    <button class="btn btn-sm btn-primary me-3 float-end" data-bs-toggle="modal"
                        data-bs-target="#create-monthly-report">CREATE MONTHLY REPORT</button>
                    <label for="" class="fw-bolder text-primary h5">| MONTHLY ONBOARD PERFORMANCE REPORT</label>
                    <div class="table-responsive mt-4">
                        <table id="basic-table" class="table table-striped mb-0" role="grid" data-toggle="data-table">
                            <thead>
                                <tr>
                                    <th>Narrative Report</th>
                                    <!--  <th>Progress</th> -->
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody v-if="vesselSelected.performance_report.length > 0">
                                <tr v-for="(vessel, index2) in vesselSelected.performance_report" :key="index2">
                                    <td><span class="fw-bolder">{{ vessel.month }}</span></td>
                                    <!-- <td></td> -->
                                    <td>
                                        <router-link class="btn btn-sm btn-outline-primary me-2"
                                            :to="{ name: 'student-layout.onboard-mopm-view-v2', query: { v: encrypt(vessel.id) } }">view</router-link>
                                        <button class="btn btn-sm btn-outline-info me-2" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            @click="viewReport(vessel.id, 'v2')">report</button>
                                        <button class="btn btn-sm btn-outline-danger"
                                            @click="removeReport(vessel.id)">Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <th colspan="3">No Data</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <AddVesselModal :dataForm="addVesselData" />
        <!-- <EditVesselModal v-if="vesselSelected" :key="vesselSelected.id" :token="token" :dataForm="addVesselData"
            :vesselDetails="vesselSelected" />
        <CreateMonthlyReport v-if="vesselSelected" :key="vesselSelected.id" :token="token"
            :vesselDetails="vesselSelected" :showLoading="showLoading" /> -->
    </div>
</template>
<script>
import AddVesselModal from './components/AddVesselModal.vue'
// import EditVesselModal from './components/EditVesselModal.vue'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ApiController } from '../../../../controller/ApiController';
/* import CreateMonthlyReport from './components/CreateMonthlyReport.vue' */
export default {
    name: 'MonthlyMonitoringReport',
    components: {
        AddVesselModal,/*  EditVesselModal, CreateMonthlyReport */
    },
    data() {
        return {
            isLoading: true,
            vesselList: [],
            vesselSelected: [],
            cardStatus: 'nav-item-0',
            addVesselData: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        this.retrieveData()
    },
    async created() {
        this.apiController = new ApiController();

    },
    methods: {
        async retrieveData() {
            const data = await this.apiController.retriveData('/student/onboard/performance', 'data')
            this.vesselList = data.shipboard_information
            this.vesselSelected = this.vesselList[0]
            this.addVesselData = {
                companyList: data.shipping_company,
                documentRequirements: data.document_requirements,
                vesselType: data.vessel_type
            }
            console.log(this.addVesselData)
            this.isLoading = false
        },
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        onActiveCard(item) {
            return this.cardStatus === item ? 'nav-link active' : 'nav-link text-secondary'
        },
        encrypt(data) {
            return btoa(data)
        },
        choiceVessel(index, nav) {
            this.cardStatus = nav
            this.vesselSelected = this.vesselList[index]
            console.log(this.vesselList[index])
        },
        viewReport(data, version) {
            const link = '/student/onboard/performance/view-report/' + data + '/' + version
            console.log(link)
            axios.get(link, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                },
                responseType: 'blob'
            }).then(response => {
                // Create a Blob from the PDF data
                const blob = new Blob([response.data], { type: 'application/pdf' })

                // Convert Blob to a data URL
                const dataUrl = URL.createObjectURL(blob)
                /*  const blob = new Blob([response.data], { type: 'application/pdf' })
                 const url = window.URL.createObjectURL(blob) */
                console.log(dataUrl)
                this.reportViewLink = dataUrl
                console.log(this.reportViewLink)
                // window.open(url, '_blank')
            }).catch(error => {
                this.errorAlert(error)
                console.error('Error fetching PDF:', error)
            })
        },
        confirmAndRemove(url, data, successMessage) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to proceed?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(url, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + this.token
                        }
                    })
                        .then((response) => {
                            window.location.reload()
                            Swal.fire('Removed!', successMessage, 'success')
                        })
                        .catch((error) => {
                            alert(error)
                        })
                }
            })
        },
        removeItem(data) {
            this.confirmAndRemove(
                '/student/onboard/vessel-detials/remove',
                { vessel: data },
                'The vessel information has been removed.'
            )
        },
        removeReport(data) {
            this.confirmAndRemove(
                '/student/onboard/monthly-performance/remove',
                { report: data },
                'The monthly report has been removed.'
            )
        }

    }
}
</script>