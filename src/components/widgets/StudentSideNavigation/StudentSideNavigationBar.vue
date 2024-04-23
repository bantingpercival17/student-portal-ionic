<template>
    <ion-menu side="start" :class="minisidebar ? 'sidebar-mini' : ''">
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <router-link to="/student" class="navbar-brand">
                        <span class="font-weight-bold text-primary"><b>Student Portal</b></span>
                    </router-link>
                </ion-title>
                <div class="sidebar-toggle d-xl-none" data-toggle="sidebar" data-active="true" @click="SidebarMini">
                    <i class="icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor"
                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </i>
                </div>
                <ion-buttons slot="start">
                    <ion-button @click="SidebarMini()">
                        <IonIcon :icon="grid" />
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <div class="sidebar-body pt-0 data-scrollbar">
            <div class="sidebar-list">
                <StudentSideNavigationBarItem></StudentSideNavigationBarItem>
            </div>
            <div class="p-2"></div>
        </div>
    </ion-menu>

</template>

<script>
import { IonHeader, IonToolbar, IonButton, IonButtons, IonMenu, IonMenuButton, IonIcon, IonTitle, IonBreadcrumb, IonLabel } from '@ionic/vue';
import StudentSideNavigationBarItem from './StudentSideNavigationBarItem.vue';
import { grid } from 'ionicons/icons';
import Scrollbar from 'smooth-scrollbar'
export default {
    name: 'StudentSideNavigationBar',
    data() {
        return {
            grid
        }
    },
    components: {
        IonHeader, IonToolbar, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonTitle, IonBreadcrumb, IonLabel, StudentSideNavigationBarItem
    },
    props: {
        minisidebar: { type: Boolean, default: false }
    },
    mounted() {
        this.SmoothScrollbar()
    },
    methods: {
        SmoothScrollbar() {
            const elementExistMain = document.querySelector('.data-scrollbar')
            if (elementExistMain) {
                Scrollbar.init(document.querySelector('.data-scrollbar'), {
                    continuousScrolling: false
                })
            }
        },
        SidebarMini() {
            this.$emit('makeminisidebar', !this.minisidebar)
        }
    }
}
</script>