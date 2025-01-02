<template>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom" class="tab-bar">
            <ion-tab-button :href="item.link" v-for="(item, index) in items" :key="index" :tabindex="index">
                <ion-icon :icon="item.icon" />
                <ion-label>{{ item.name }}</ion-label>
            </ion-tab-button>

            <!--  <ion-tab-button tab="tab1" href="/tabs/tab1">
                <ion-icon :icon="triangle" />
                <ion-label>Tab 1</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="tab2" href="/tabs/tab2">
                <ion-icon :icon="ellipse" />
                <ion-label>Tab 2</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="tab3" href="/tabs/tab3">
                <ion-icon :icon="square" />
                <ion-label>Tab 3</ion-label>
            </ion-tab-button> -->
        </ion-tab-bar>
    </ion-tabs>
</template>
<style>
.tab-bar {
    display: none;
}

@media (max-width: 500px) {
    .tab-bar {
        display: flex;
    }
}
</style>
<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { chevronDownOutline, ellipse, grid, boat, cash, clipboard, business } from 'ionicons/icons';

export default {
    name: 'Tabs',
    components: {
        IonLabel,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonPage,
        IonRouterOutlet,
    },
    setup() {
        const items = [
            { name: 'Home', link: '/student/dashboard', icon: grid },
            { name: 'Classroom', link: '/student/dashboard', icon: clipboard },
            { name: 'Payment', link: '/student/dashboard', icon: cash },
            { name: 'Onboard', link: '/student/dashboard', icon: boat }
        ]
        return {
            ellipse,
            chevronDownOutline,
            items
        };
    },
};
</script>