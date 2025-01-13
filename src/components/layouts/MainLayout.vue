<template>
    <ion-split-pane v-if="!isMobile" when="(min-width: 500px)" content-id="main-content">
        <StudentSideNavigationBar class="nav-buttom" :minisidebar="sidebarmini" @makeminisidebar="onsidebarmini">
        </StudentSideNavigationBar>
        <ion-page id="main-content">
            <ion-header>
                <StudentNavigationBar class="nav-buttom" :fullsidebar="sidebarmini" @makefullsidebar="onfullsidebar"
                    :pageTitle="headerTitle">
                </StudentNavigationBar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-router-outlet></ion-router-outlet>
            </ion-content>
        </ion-page>
    </ion-split-pane>
    <ion-router-outlet v-else></ion-router-outlet>
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
            isMobile: false,

        }
    },
    computed: {
        headerTitle() {
            return this.$route.meta.name
        }
    },
    created() {
        this.checkMobile();
        window.addEventListener("resize", this.checkMobile);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.checkMobile);
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
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 500;
        },
    }
}
</script>