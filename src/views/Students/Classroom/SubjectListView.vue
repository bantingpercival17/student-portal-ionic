<template>
    <div v-if="!isLoading" class="content">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <ion-button id="popover-button" class="w-100" fill="outline" color="success">
            Academic Year :
            <ion-label class="fw-bolder">{{ currentAcademic }}</ion-label>
        </ion-button>
        <ion-popover trigger="popover-button" :dismiss-on-select="true" size="cover" alignment="center">
            <ion-content>
                <ion-list>
                    <ion-item v-for='item in enrollmentHistory' :key='item' :value='item.id'>
                        <ion-label>
                            <router-link @click='mountedData(encrypt(item.id))' class='dropdown-item' :to="{
        name: 'student-layout.subjects-view',
        query: { key: encrypt(item.id) },
    }">
                                {{ academicName(item.academic) }}
                            </router-link>
                        </ion-label>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-popover>
        <div v-if="subjectLists.length > 0" class="page-content">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-xs-12" v-for="(data, index) in subjectLists" :key="index">
                    <router-link
                        :to="{ name: 'student-layout.subject-view-subject', params: { subject: encrypt(data.id) } }">
                        <ion-card class="bg-primary">
                            <ion-card-header>
                                <div class="header-title">
                                    <div class="d-flex flex-wrap">
                                        <div class="media-support-user-img me-3">
                                            <img :src="teacherImage(data.staff)" alt="teacher-image"
                                                class="img-fluid avatar avatar-70 rounded-circle">
                                        </div>
                                        <div class="media-support-info mt-2">
                                            <h5 class="mb-0 fw-bolder text-white">
                                                {{ data.curriculum_subjects.subject.subject_code }}
                                            </h5>
                                            <p class="mb-0 text-white">
                                                {{ data.staff.first_name + " " + data.staff.last_name }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ion-card-header>
                        </ion-card>
                    </router-link>

                </div>
            </div>
        </div>
        <div v-else class="">
            <ion-card>
                <ion-card-header>
                    <div class="header-title">
                        <div class="d-flex ">
                            <div class="">
                                <h5 class="mb-0 fw-bolder">
                                    EMPTY SUBJECT
                                </h5>
                            </div>
                        </div>
                    </div>
                </ion-card-header>
            </ion-card>
        </div>

    </div>
    <div v-else class="content">
        <subjects-loading></subjects-loading>
    </div>
</template>
<script>
import {
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    loadingController, IonRefresher, IonRefresherContent,
    IonPopover,
    IonItemGroup,
    IonContent
} from "@ionic/vue";
import SubjectsLoading from '@/components/widgets/PreLoadingLayout/SubjectsLoading.vue'
import { LOGOUT_ACTION, GET_USER_TOKEN } from '@/store/storeConstants'
import { ERROR_ALERT, SUCCESS_ALERT } from '@/store/storeAlertConstants'
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
    name: 'SubjectListView',
    data() {
        return {
            isLoading: true,
            subjectLists: [],
            currentAcademic: '',
            enrollmentHistory: [],
            currentAcademic: '',
            enrollmentHistory: [],
            dropdownOpen: false
        }
    },
    mounted() {
        const parameter = this.$route.query.key
        this.mountedData(parameter)
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
        })
    },
    components: {
        IonTitle,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonButton,
        IonList,
        IonItem,
        IonLabel,
        loadingController, IonRefresher, IonRefresherContent, SubjectsLoading, IonCardHeader,
        IonPopover,
        IonItemGroup,
        IonContent
    },
    methods: {
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        ...mapActions('alert', {
            error: ERROR_ALERT,
            success: SUCCESS_ALERT
        }),
        toggleDropdown() {

            this.dropdownOpen = !this.dropdownOpen;
            console.log(this.dropdownOpen)
        },
        async handleScroll(event) {
            event.target.complete();
            const parameter = this.$route.query.key
            this.mountedData(parameter)
        },
        async mountedData(parameter) {
            this.isLoading = true
            try {
                const link = parameter ? `student/subject-lists?key=${parameter}` : 'student/subject-lists'
                const response = await axios.get(link, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                this.enrollmentHistory = response.data.enrollmentHistory
                this.currentAcademic = this.academicName(response.data.enrollment.academic)
                if (response.data.section.student_section) {
                    this.subjectLists = response.data.section.student_section.subject_details
                }
                this.isLoading = false
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.logout()
                }
                this.error(error)
                this.isLoading = false
                console.error('Error fetching data:', error)
                // Handle error or display error message
            }
        },
        async teacherImage(staff) {
            try {
                const response = await axios.post('/staff/image', { id: staff.id }, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                }) // Make sure response data is what you expect
                return response.data.image
            } catch (error) {
                console.error('Error fetching teacher image:', error)
                return 'http://one.bma.edu.ph/assets/img/staff/avatar.png' // Default image URL or handle error as needed
            }
        },
        encrypt(data) {
            return btoa(data)
        },
        academicName(data) {
            const name = data.semester + ' | ' + data.school_year
            return name.toUpperCase()
        },
    }
}
</script>