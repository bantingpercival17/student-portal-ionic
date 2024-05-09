<template>
    <div>
        <!-- <ion-title class="display-6 fw-bolder text-primary text-header"></ion-title> -->
        <div class="row">
            <div class="col-lg-4 col-md-6 col-xs-12" v-for="n in 5" :key="n">
                <ion-card>
                    <ion-card-content>
                        <div class="header-title">
                            <div class="d-flex flex-wrap">
                                <div class="media-support-info mt-2">
                                    <h5 class="mb-0 fw-bolder text-white stepper-header-text"></h5>
                                    <br>
                                    <p class="mb-0 text-white stepper-content">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
                <!-- <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between pb-4">
                        <div class="header-title">
                            <div class="d-flex flex-wrap">
                                <div class="media-support-info mt-2">
                                    <h5 class="mb-0 fw-bolder text-white stepper-header-text"></h5>
                                    <p class="mb-0 text-white stepper-content">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                    </div>
                </div> -->

            </div>
        </div>
    </div>
</template>
<style scoped>
.text-header {
    width: 500px;
    height: 50px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.stepper-header-text {
    width: 240px;
    height: 20px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}

.stepper-content {
    width: 200px;
    height: 12px;
    background-color: #EEE;
    animation: pulse-bg 1s infinite;
}


@keyframes pulse-bg {
    0% {
        background-color: #ddd;
    }

    50% {
        background-color: #d0d0d0;
    }

    100% {
        background-color: #ddd;
    }
}
</style>
<script>
import { IonTitle, IonLabel, IonCard, IonCardContent } from '@ionic/vue';
export default {
    name: 'SubjectsLoading',
    components: {
        IonTitle, IonLabel, IonCard, IonCardContent
    }
}
</script>