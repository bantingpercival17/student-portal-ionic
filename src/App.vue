<template>
  <ion-app>
    <ion-content>
      <router-view></router-view>
    </ion-content>
  </ion-app>
</template>

<script>
import {
  IonApp, IonContent
} from '@ionic/vue';
export default {
  name: 'App',
  components: {
    IonApp, IonContent
  }
}
</script>
<style>
@import "@/theme/scss/gigz.scss";
@import "@/theme/scss/custom.scss";
@import url("./theme/plugins/Leaflet/leaflet.css");
@import url("./theme/plugins/icons/@fortawesome/fontawesome-free/css/all.min.css");
</style>
