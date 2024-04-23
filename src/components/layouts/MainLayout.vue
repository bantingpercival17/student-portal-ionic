<template>
    <div class="main-content">
      <!--   <StudentSideNavigationBar :minisidebar="sidebarmini" @makeminisidebar="onsidebarmini">
        </StudentSideNavigationBar> -->
        <div class="position-relative">
            <!-- Nav Start -->
            <StudentNavigationBar :fullsidebar="sidebarmini" @makefullsidebar="onfullsidebar" :pageTitle="headerTitle">
            </StudentNavigationBar>
            <!--    <PageHeader [fullsidebar]="sidebarmini" (makefullsidebar)="onfullsidebar()" [pageTitle]="headerTitle">
                </PageHeader> -->
            <!-- Nav End -->
        </div>
        <div class="conatiner-fluid content-inner mt-6 py-0">
            <router-view></router-view>
        </div>
    </div>
    <!-- <ion-split-pane content-id="main-content">
            <ion-menu content-id="main-content" type="overlay">
                <ion-content>
                    <ion-list id="inbox-list">
                        <ion-list-header>Inbox</ion-list-header>
                        <ion-note>hi@ionicframework.com</ion-note>

                        <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
                            <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url"
                                lines="none" :detail="false" class="hydrated"
                                :class="{ selected: selectedIndex === i }">
                                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                                <ion-label>{{ p.title }}</ion-label>
                            </ion-item>
                        </ion-menu-toggle>
                    </ion-list>

                    <ion-list id="labels-list">
                        <ion-list-header>Labels</ion-list-header>

                        <ion-item v-for="(label, index) in labels" lines="none" :key="index">
                            <ion-icon aria-hidden="true" slot="start" :ios="bookmarkOutline"
                                :md="bookmarkSharp"></ion-icon>
                            <ion-label>{{ label }}</ion-label>
                        </ion-item>
                    </ion-list>
                </ion-content>
            </ion-menu>
              <ion-router-outlet></ion-router-outlet>
        </ion-split-pane> -->

</template>
<script>
import StudentNavigationBar from '../widgets/StudentNavigationBar.vue';
import StudentSideNavigationBar from '../widgets/StudentSideNavigation/StudentSideNavigationBar.vue';
export default {
    name: 'MainLayout',
    components: {
        StudentNavigationBar,
        StudentSideNavigationBar
    },
    data() {
        return {
            sidebarmini: false,
            user: null
        }
    },
    computed: {
        /*  ...mapState({
             showLoading: state => state.showLoading
         }), */
        headerTitle() {
            return this.$route.meta.name
        }
    },
    methods: {
        onsidebarmini(e) {
            this.sidebarmini = e
        },
        onfullsidebar(e) {
            this.sidebarmini = e
        }
    }
}
</script>