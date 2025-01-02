<template>
    <ion-content class="error-page">
        <div class="container text-center">
            <div class="row justify-content-center align-items-center vh-100">
                <div class="col-md-6">
                    <h1 class="display-1 text-primary">404</h1>
                    <p class="lead">Oops! The page you're looking for doesn't exist.</p>
                    <ion-button expand="block" color="primary" href="/" class="mt-3 btn-lg">
                        Go Home
                    </ion-button>
                </div>
            </div>
        </div>
    </ion-content>
</template>

<script>
import { IonContent, IonButton } from "@ionic/vue";

export default {
    name: '404',
    components: {
        IonContent,
        IonButton,
    },
};
</script>

<style scoped>
.error-page {
    --background: #f8f9fa;
}
</style>