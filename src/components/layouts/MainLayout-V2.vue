<template>
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