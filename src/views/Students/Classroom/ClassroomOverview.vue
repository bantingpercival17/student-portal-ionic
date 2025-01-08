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
                        <ion-item class="text-center" v-for='item in enrollmentHistory' :key='item' :value='item.id'
                            button>
                            {{ academicName(item.academic) }}
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
            </div>
            <div v-else>
                <SubjectsLoading />
            </div>
        </ion-content>
    </ion-page>
</template>
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
<script>
import { IonPage, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonBadge, loadingController, IonRefresher, IonRefresherContent, IonCardHeader, IonSpinner, IonPopover, IonList, IonItem, IonIcon, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import SubjectsLoading from '@/components/widgets/PreLoadingLayout/SubjectsLoading.vue'
import { ApiController } from '../../../controller/ApiController';
import { chevronDownOutline, grid, clipboard } from 'ionicons/icons';
import SubjectListView from '@/views/Students/Classroom/WidgetScreen/SubjectListView.vue'
export default {
    name: 'ClassroomOverview',
    components: {
        IonPage, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonBadge, IonCardHeader,
        IonSpinner, IonPopover, IonList, IonItem, IonIcon, IonSegment, IonSegmentButton, IonLabel,
        loadingController, IonRefresher, IonRefresherContent, SubjectsLoading, IonCardHeader, SubjectListView
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
            const parameter = this.$route.query.key
        },
        async loadData() {
            const parameter = this.$route.query.key
            const link = parameter ? `student/subject-lists?key=${parameter}` : 'student/subject-lists'
            const classroom = await this.apiController.retrieveDataGET(link, 'classroom')
            this.enrollmentHistory = classroom.enrollmentHistory
            this.currentAcademic = this.academicName(classroom.enrollment.academic)
            console.log(classroom.section)
            if (classroom.section) {
                this.subjectLists = classroom.section.subject_classes
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
    }
}
</script>