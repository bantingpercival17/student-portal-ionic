<template>
    <ion-header>
        <ion-toolbar class="iq-navbar py-lg-0">
            <ion-buttons slot="start">
                <ion-button routerLink="/student-layout/dashboard">
                    <ion-title class="ms-3">
                        <span class="font-weight-bold text-primary">Student Portal</span>
                    </ion-title>
                </ion-button>
            </ion-buttons>
            <ion-buttons slot="start">
                <ion-button @click="opensidebar">
                    <!-- <ion-icon :icon="menu"></ion-icon> -->
                    menu
                </ion-button>
            </ion-buttons>
            <ion-breadcrumb class="search-input">
                <ion-label>{{ pageTitle }}</ion-label>
            </ion-breadcrumb>
            <ion-buttons slot="end">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <ion-button @click="toggleNavbar()">
                    menu-outline
                    <!--  <ion-icon name="menu-outline"></ion-icon> -->
                </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <ion-button @click="logOut">
                    Logout
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>

<script>
import { IonHeader, IonToolbar, IonButton, IonButtons, IonMenu, IonMenuButton, IonIcon, IonTitle, IonBreadcrumb, IonLabel } from '@ionic/vue';
import { menu } from 'ionicons/icons';
export default {
    name: 'StudentNavigationBar',
    components: {
        IonHeader, IonToolbar, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonTitle, IonBreadcrumb, IonLabel
    },
    props: {
        fullsidebar: { type: Boolean, default: false },
        pageTitle: { type: String }
    },
    /*  computed: {
         ...mapGetters('auth', {
             token: GET_USER_TOKEN,
             profilePicture: GET_USER_IMAGE,
             name: GET_USER_NAME
         })
     }, */
    methods: {
        /* ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }), */
        logOut() {
            this.logout()
            this.$router.replace('/')
        },
        opensidebar() {
            this.$emit('makefullsidebar', !this.fullsidebar)
        },
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
        }
    }
}
</script>