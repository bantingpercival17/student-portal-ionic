<template>
  <ion-app>
    <MainLayout v-if="isAuth" />
    <AuthLayout v-else />
  </ion-app>
</template>

<script>
import {
  IonApp, IonContent
} from '@ionic/vue';
import { AUTO_LOGIN_ACTION, GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import MainLayout from './components/layouts/MainLayout.vue';
import AuthLayout from './components/layouts/AuthLayout.vue';
export default {
  name: 'App',
  components: {
    IonApp, IonContent, MainLayout, AuthLayout
  },
  created() {
    //this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
    console.log(this.isAuth)

  }, computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN,
      isAuth: IS_USER_AUTHENTICATE_GETTER
    })
  },
}
</script>
<style>
@import "@/theme/scss/gigz.scss";
@import "@/theme/scss/custom.scss";
@import url("./theme/plugins/Leaflet/leaflet.css");
@import url("./theme/plugins/icons/@fortawesome/fontawesome-free/css/all.min.css");
</style>

<!-- <template>
  <ion-app>
    <ion-split-pane content-id="main">
      <ion-menu content-id="main">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item button router-link="/home">Home</ion-item>
            <ion-item button router-link="/settings">Settings</ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script>
import { IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet } from '@ionic/vue';

export default {
  components: {
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
  },
};
</script>
 -->