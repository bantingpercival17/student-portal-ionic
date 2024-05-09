<template>
    <div class="mt-5">
        <ion-accordion-group>
            <ion-accordion v-for="(data, index) in items" :key="index" :value="index">
                <ion-item slot="header">
                    <ion-icon :icon="data.icon"></ion-icon> <ion-label class="ms-4">{{ data.name }}</ion-label>
                </ion-item>
                <ion-item v-for="(data1, index1) in data.child" :key="index1" slot="content">
                    <router-link :to="data1.url !== null ? { name: data1.url } : ''" class="ms-5">
                        <ion-label>{{ data1.name }}</ion-label>
                    </router-link>
                </ion-item>
            </ion-accordion>
        </ion-accordion-group>
    </div>
</template>

<script>
import {
    IonAccordion,
    IonAccordionGroup, IonList, IonItem, IonIcon, IonLabel, IonItemDivider, IonItemGroup
} from '@ionic/vue';
import { chevronDownOutline, ellipse, grid, boat, cash, clipboard, business } from 'ionicons/icons';
export default {
    name: 'StudentSideNavigationBar',
    components: {
        IonAccordion,
        IonAccordionGroup,
        IonList, IonItem, IonIcon, IonLabel,
        IonItemDivider,
        IonItemGroup,
    },
    data() {
        const dashboard = [
            { name: 'Profile', url: 'student-layout.dashboard' }
        ]
        const classroom = [
            { name: 'Subjects', url: 'student-layout.subjects-view' },
            { name: 'Semestral Grade', url: null }
        ]
        const enrollment = [
            { name: 'Current Enrollment', url: null },
            { name: 'History', url: null }
        ]
        const payment = [
            { name: 'Current Payment', url: null },
            /* { name: 'Payment History', url: 'student-layout.payment-history' }, */
            { name: 'Student Card', url: null }
        ]
        const onboard = [
            { name: 'Onboard Profile', url: null },
            { name: 'Pre Onboard', url: null },
            { name: 'Enrollment', url: null },
            { name: 'MOPM', url: null },
            { name: 'Assessment', url: null }
        ]
        const compre = [
            { name: 'Examination', url: 'student-layout.comprehesive-examination' }
        ]
        const items = [
            { name: 'Dashboard', child: dashboard, icon: grid },
            { name: 'Enrollment', child: enrollment, icon: business },
            { name: 'Classroom', child: classroom, icon: clipboard },
            { name: 'Payment', child: payment, icon: cash },
            { name: 'Onboard', child: onboard, icon: boat }
        ]
        const com = false
        if (com) {
            items.push({ name: 'Comprehensive', child: compre, icon: 'M7.81 2H16.191C19.28 2 21 3.78 21 6.83V17.16C21 20.26 19.28 22 16.191 22H7.81C4.77 22 3 20.26 3 17.16V6.83C3 3.78 4.77 2 7.81 2ZM8.08 6.66V6.65H11.069C11.5 6.65 11.85 7 11.85 7.429C11.85 7.87 11.5 8.22 11.069 8.22H8.08C7.649 8.22 7.3 7.87 7.3 7.44C7.3 7.01 7.649 6.66 8.08 6.66ZM8.08 12.74H15.92C16.35 12.74 16.7 12.39 16.7 11.96C16.7 11.53 16.35 11.179 15.92 11.179H8.08C7.649 11.179 7.3 11.53 7.3 11.96C7.3 12.39 7.649 12.74 8.08 12.74ZM8.08 17.31H15.92C16.319 17.27 16.62 16.929 16.62 16.53C16.62 16.12 16.319 15.78 15.92 15.74H8.08C7.78 15.71 7.49 15.85 7.33 16.11C7.17 16.36 7.17 16.69 7.33 16.95C7.49 17.2 7.78 17.35 8.08 17.31Z' })
        }
        return {
            ellipse,
            chevronDownOutline,
            items
        }
    },
    methods: {
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
            if (route.includes(this.$route.name)) {
                return true
            }
        }
    }
}
</script>