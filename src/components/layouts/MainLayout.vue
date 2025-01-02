<template>
    <ion-split-pane when="(min-width: 500px)" content-id="main-content">
        <StudentSideNavigationBar  class="nav-buttom" :minisidebar="sidebarmini" @makeminisidebar="onsidebarmini">
        </StudentSideNavigationBar>
        <ion-page id="main-content">
            <ion-header>
                <StudentNavigationBar :fullsidebar="sidebarmini" @makefullsidebar="onfullsidebar"
                    :pageTitle="headerTitle">
                </StudentNavigationBar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-router-outlet id="main"></ion-router-outlet>
            </ion-content>
        </ion-page>
    </ion-split-pane>
</template>
<style>
.tab-bar {
    display: none;
}

@media (max-width: 500px) {
    .tab-bar {
        display: flex;
    }

    .nav-buttom {
        display: none;
    }
}
</style>
<script>
import StudentNavigationBar from '../widgets/StudentNavigationBar.vue';
import StudentSideNavigationBar from '../widgets/StudentSideNavigation/StudentSideNavigationBar.vue';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonSplitPane, IonRouterOutlet } from '@ionic/vue';
import { close, grid } from 'ionicons/icons';
export default {
    name: 'MainLayout',
    components: {
        StudentNavigationBar,
        StudentSideNavigationBar,
        IonButtons,
        IonContent,
        IonHeader,
        IonMenu,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonIcon,
        IonSplitPane,
        IonRouterOutlet
    },
    data() {
        return {
            close,
            grid,
            sidebarmini: false,
            user: null,
            menuOpen: false,
            menuSide: 'start', // 'start' or 'end', depending on where you want the menu to appear
            menuContentId: 'main-content',
            menuSwipeGesture: true,


        }
    },
    computed: {
        headerTitle() {
            return this.$route.meta.name
        }
    },
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        onsidebarmini(e) {
            this.sidebarmini = e
        },
        onfullsidebar(e) {
            this.sidebarmini = e
        }
    }
}
</script>