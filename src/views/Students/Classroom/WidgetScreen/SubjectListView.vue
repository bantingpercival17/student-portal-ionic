<template>
    <div v-if="subjectLists.length > 0" class="page-content">
        <ion-grid>
            <ion-row>
                <ion-col size="12" size-md="6" size-lg="4" v-for="(data, index) in subjectLists" :key="index">
                    <ion-card class="google-classroom-card">
                        <div class="card-image" :style="{ backgroundImage: `url(${data.subjectTeacherImage})` }"></div>
                        <ion-card-content class="card-content-overlay">
                            <ion-text>
                                <h1 class="text-light fw-bolder text-primary">{{ data.subjectCode }}</h1>
                                <h3 class="text-light fw-bold">{{ data.subjectName }}</h3>
                                <p class="text-light fw-medium">{{ data.subjectTeacher }}</p>
                            </ion-text>
                        </ion-card-content>
                    </ion-card>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
    <div v-else class="">
        <ion-card>
            <ion-card-header>
                <ion-label class="fw-bolder">NO SUBJECT YET</ion-label>
            </ion-card-header>
        </ion-card>
    </div>
</template>
<style scoped>
.google-classroom-card {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    height: 200px;
    /* Set a fixed height for uniform cards */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.google-classroom-card:hover {
    transform: scale(1.02);
}

.card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 1;
    filter: brightness(0.7);
    /* Darken the image for better text contrast */
}

.card-content-overlay {
    position: relative;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    /* Semi-transparent background for text */
    padding: 1rem;
    color: #fff;
    border-radius: 0 0 12px 12px;
    /* Match card border radius */
}

.text-light {
    color: #ffffff;
}

.fw-bold {
    font-weight: 600;
}

.fw-bolder {
    font-weight: 700;
}

.fw-medium {
    font-weight: 500;
}
</style>


<script>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonLabel,
    IonAvatar, IonCardContent, IonGrid,
    IonCol,
    IonRow,
    IonText

} from "@ionic/vue";
export default {
    name: 'SubjectListView',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonButton,
        IonLabel,
        IonAvatar, IonCardContent, IonGrid,
        IonCol,
        IonRow, IonText
    },
    props: {
        subjectLists: {
            type: Object,
            required: true
        },
        apiController: {
            type: Object,
            required: true
        }
    },
    methods: {
        async teacherImage(staff) {
            try {
                const response = await this.apiController.retrieveData('/staff/image', { id: staff.id }, 'image');
                if (response) {
                    return `http://one.bma.edu.ph/${response}`;
                } else {
                    return 'http://one.bma.edu.ph/assets/img/staff/avatar.png'; // Default image
                }
            } catch (error) {
                return 'http://one.bma.edu.ph/assets/img/staff/avatar.png'; // Default image URL
            }
        },
        encrypt(data) {
            return btoa(data)
        },
    }
}
</script>