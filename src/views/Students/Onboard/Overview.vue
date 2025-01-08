<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- Logo -->
                <ion-title slot="start" class="fw-bolder text-primary">ONBOARD TRAING</ion-title>
                <!-- User Image -->
                <!-- <ion-buttons slot="end">
                    <ion-avatar>
                        <ion-img src="/assets/profile.png" alt="User Image"></ion-img>
                    </ion-avatar>
                </ion-buttons> -->
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
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
            <!--  <div class="ion-padding">
                <div v-if="selectedTab === 'monthly-report'">
                    <MonthlyReport></MonthlyReport>
                </div>
                <div v-if="selectedTab === 'enrollment'">
                    <EnrollmentOverview />
                </div>
                <div v-if="selectedTab === 'profile'">
                    <OnboardProfile />
                </div>
                <div v-if="selectedTab === 'pre-documents'">
                    <PreDocuments />
                </div>
            </div> -->
        </ion-content>
    </ion-page>


</template>
<script>
import {
    IonContent, IonRefresher, IonRefresherContent, IonHeader,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    IonPage,
    IonToolbar,
    IonButtons,
    IonImg,
    IonAvatar,
    IonTitle,
} from '@ionic/vue';
import { chevronDownOutline, grid, boat, cash, clipboard } from 'ionicons/icons';
import MonthlyReport from './MOPM/MonthlyReport.vue';
import EnrollmentOverview from './enrollment/EnrollmentOverview.vue';
import PreDocuments from './PreDocuments.vue';
import OnboardProfile from './OnboardProfile.vue'
export default {
    name: 'OnboardOverview',
    data() {
        const items = [
            { name: 'Profile', tab: 'profile', icon: grid },
            { name: 'Pre-Documents', tab: 'pre-documents', icon: clipboard },
            { name: 'Enrollment', tab: 'enrollment', icon: cash },
            { name: 'Monthly Report', tab: 'monthly-report', icon: boat },
        ];
        return {
            isLoading: false,
            selectedTab: 'profile',
            items
        }
    },
    components: {
        IonContent, IonRefresher, IonRefresherContent, IonHeader,
        IonSegment, IonTitle,
        IonSegmentButton, IonPage, IonToolbar, IonButtons, IonImg, IonAvatar,
        IonLabel, IonIcon, MonthlyReport, EnrollmentOverview, PreDocuments, OnboardProfile

    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.isLoading = true
        },
    }
}
</script>