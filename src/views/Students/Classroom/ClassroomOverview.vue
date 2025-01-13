<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="fw-bolder text-primary">
                    CLASSROOM
                </ion-title>
                <ion-buttons v-if="!isMobile" slot="end">
                    <ion-button id="dropdown-button" class="modern-dropdown">
                        <b>{{ currentAcademic }}</b>
                        <ion-icon :icon="chevronDownOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-popover trigger="dropdown-button" dismiss-on-select="true" class="wide-popover">
                <ion-list>
                    <ion-item class="dropdown-item-active" v-for="item in enrollmentHistory" :key="item.id"
                        :value="item.id" button @click="changeSubjectList(item)">
                        <ion-label> {{ item.semester.toUpperCase() }} <br>
                            {{ item.school_year }}
                        </ion-label>
                    </ion-item>
                </ion-list>
            </ion-popover>
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
            <!-- Floating Action Button for Academic -->
            <ion-fab v-if="isMobile" vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button id="dropdown-button-float" color="primary">
                    <ion-icon :icon="chevronDownOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
            <!-- Popover for Academic List -->
            <ion-popover trigger="dropdown-button-float" dismiss-on-select="true" alignment="center"
                class="wide-popover">
                <ion-list>
                    <ion-item class="text-center" v-for="item in enrollmentHistory" :key="item.id" :value="item.id"
                        button @click="changeSubjectList(item)">
                        {{ academicName(item) }}
                    </ion-item>
                </ion-list>
            </ion-popover>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonBadge, loadingController, IonRefresher, IonRefresherContent, IonCardHeader, IonSpinner, IonGrid, IonCol, IonRow, IonPopover, IonList, IonItem, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonFab, IonFabButton } from '@ionic/vue';
import SubjectsLoading from '@/components/widgets/PreLoadingLayout/SubjectsLoading.vue'
import { ApiController } from '../../../controller/ApiController';
import { chevronDownOutline, grid, clipboard } from 'ionicons/icons';
import SubjectListView from '@/views/Students/Classroom/WidgetScreen/SubjectListView.vue'
import SemestralGradeView from '@/views/Students/Classroom/WidgetScreen/SemestralGradeView.vue'
export default {
    name: 'ClassroomOverview',
    components: {
        IonPage, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonBadge, IonCardHeader, IonButtons, IonFab, IonFabButton,
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
            selectedTab: 'subjects',
            isMobile: false,
        }
    },
    async created() {
        this.apiController = new ApiController();
        this.isMobile = window.innerWidth <= 500;
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
        }
    }
}
</script>
<style scoped>
.modern-dropdown {
    /* background-color: var(--ion-color-light); */
    color: var(--ion-color-primary);
    border: 1px solid var(--ion-color-primary);
    border-radius: 8px;
    padding: 0 12px;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.2s ease-in-out;
}

.modern-dropdown:hover {
    background-color: var(--ion-color-primary);
    color: white;
    transform: scale(1.05);
}

.dropdown-item,
.active {
    --background: var(--ion-color-primary);
    /* Highlight background */
    --color: white;
    /* Highlight text color */
    font-weight: bold;
    /* Optional for emphasis */
    border-radius: 4px;
    /* Optional for rounded appearance */
}

.dropdown-item:hover {
    --background: var(--ion-color-primary);
    /* Highlight background */
    --color: white;
    /* Highlight text color */
    font-weight: bold;
    /* Optional for emphasis */
    border-radius: 4px;
    /* Optional for rounded appearance */
}
</style>