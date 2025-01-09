<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- <ion-title slot="start" class="fw-bolder text-primary">CLASSROOM</ion-title> -->
                <ion-button expand="block" class="p-2" id="dropdown-button">
                    <b> {{ currentAcademic }} </b> <ion-icon :icon="chevronDownOutline"></ion-icon>
                </ion-button>
                <ion-popover trigger="dropdown-button" dismiss-on-select="true" alignment="center" class="wide-popover">
                    <ion-list>
                        <ion-item class="text-center" v-for='item in enrollmentHistory' :key='item.id' :value='item.id'
                            button @click="changeSubjectList(item)">
                            {{ academicName(item) }}
                        </ion-item>
                    </ion-list>
                </ion-popover>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div v-if="!isLoading" class="content">
                <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
                    <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                        refreshing-text="Refreshing...">
                    </ion-refresher-content>
                </ion-refresher>

                <ion-header>
                    <ion-segment v-model="selectedTab" class="top-tabs" scrollable="true">
                        <ion-segment-button v-for="(item, index) in items" :key="index" :value="item.tab">
                            <!--  <ion-icon :icon="item.icon" /> -->
                            <ion-label>{{ item.name }}</ion-label>
                        </ion-segment-button>
                    </ion-segment>
                </ion-header>

                <SubjectListView v-if="selectedTab === 'subjects'" :subjectLists="subjectLists"
                    :apiController="apiController" />
                <SemestralGradeView v-if="selectedTab === 'semestral-grades'" :subjectLists="subjectLists"
                    :apiController="apiController" />
            </div>
            <div v-else>
                <SubjectsLoading />
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonBadge, loadingController, IonRefresher, IonRefresherContent, IonCardHeader, IonSpinner, IonGrid, IonCol, IonRow, IonPopover, IonList, IonItem, IonIcon, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import SubjectsLoading from '@/components/widgets/PreLoadingLayout/SubjectsLoading.vue'
import { ApiController } from '../../../controller/ApiController';
import { chevronDownOutline, grid, clipboard } from 'ionicons/icons';
import SubjectListView from '@/views/Students/Classroom/WidgetScreen/SubjectListView.vue'
import SemestralGradeView from '@/views/Students/Classroom/WidgetScreen/SemestralGradeView.vue'
export default {
    name: 'ClassroomOverview',
    components: {
        IonPage, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonBadge, IonCardHeader,
        IonSpinner, IonPopover, IonList, IonItem, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonGrid, IonCol, IonRow,
        loadingController, IonRefresher, IonRefresherContent, SubjectsLoading, IonCardHeader, SubjectListView, SemestralGradeView
    },
    data() {
        const items = [
            { name: 'Subjects', tab: 'subjects', icon: grid },
            { name: 'Semestral Grades', tab: 'semestral-grades', icon: clipboard },
        ];
        return {
            isLoading: true,
            subjectLists: [],
            currentAcademic: '',
            enrollmentHistory: [],
            currentAcademic: '',
            enrollmentHistory: [],
            dropdownOpen: false,
            dropdownVisible: true,
            chevronDownOutline, items,
            selectedTab: 'subjects'
        }
    },
    async created() {
        this.apiController = new ApiController();
    },
    async mounted() {
        this.loadData()
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.loadData()
        },
        async loadData() {
            this.isLoading = true
            const parameter = this.$route.query.enrollment
            const link = parameter ? `student/subject-lists?key=${parameter}` : 'student/subject-lists'
            const classroom = await this.apiController.retrieveDataGET(link, 'classroom')
            this.enrollmentHistory = classroom.enrollmentHistory
            this.currentAcademic = this.academicName(classroom.currentEnrollment.academic)
            console.log(classroom.currentEnrollment.student_section_v2)
            if (classroom.currentEnrollment.student_section_v2) {
                this.subjectLists = classroom.subjectLists
            }
            this.isLoading = false

        },
        encrypt(data) {
            return btoa(data)
        },
        academicName(data) {
            const name = data.semester + ' | ' + data.school_year
            return name.toUpperCase()
        },
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        async changeSubjectList(selectedItem) {
            this.isLoading = true
            const link = `student/subject-lists?key=${this.encrypt(selectedItem.id)}`;
            const classroom = await this.apiController.retrieveDataGET(link, 'classroom');
            this.currentAcademic = this.academicName(classroom.currentEnrollment.academic)
            if (classroom) {
                this.subjectLists = classroom.subjectLists;
            }
            this.isLoading = false
        },
    }
}
</script>
<style>
.wide-popover {
    --min-width: 90%;
    /* Make the popover span the full width */
    --max-width: 90%;
    /* Ensure it doesn't exceed the full width */
}

.wide-popover ion-list {
    width: 100%;
    /* Ensure the list inside the popover also spans the full width */
}
</style>