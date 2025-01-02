<template>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom" class="tab-bar">
            <ion-tab-button v-for="(item, index) in items" :key="index" :tab="item.tab" :href="item.link">
                <ion-icon :icon="item.icon" />
                <ion-label>{{ item.name }}</ion-label>
            </ion-tab-button>
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
import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonRouterOutlet,
} from '@ionic/vue';
import { chevronDownOutline, grid, boat, cash, clipboard } from 'ionicons/icons';

export default {
    name: 'Tabs',
    components: {
        IonLabel,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonRouterOutlet,
    },
    setup() {
        const items = [
            { name: 'Home', tab: 'home', link: '/student/home', icon: grid },
            { name: 'Classroom', tab: 'classroom', link: '/student/classroom', icon: clipboard },
            { name: 'Payment', tab: 'payment', link: '/student/payment', icon: cash },
            { name: 'Onboard', tab: 'onboard', link: '/student/onboard', icon: boat },
        ];
        return {
            items,
        };
    },
};
</script>
