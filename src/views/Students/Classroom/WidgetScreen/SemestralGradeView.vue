<template>
     <div v-if="subjectLists.length > 0" class="page-content">
        <ion-grid>
            <ion-row class="ion-justify-content-center">
                <ion-col size="12" size-md="6" size-lg="4" v-for="(data, index) in subjectLists" :key="index">
                    <ion-card class="google-classroom-card">
                        <div class="card-image" >
                            <ion-grid>
                                            <ion-row>
                                                <ion-col class="text-center">
                                                    <small class="fw-bold text-muted">Units</small>
                                                    <h2 class="fw-bolder text-dark">{{ data.subjectUnit }}</h2>
                                                </ion-col>
                                                <ion-col class="text-center">
                                                    <small class="fw-bold text-muted">Grade</small>
                                                    <h2 class="fw-bolder text-success">{{ data.subjectGrade }}</h2>
                                                </ion-col>
                                            </ion-row>
                                        </ion-grid>
                        </div>
                        <ion-card-content class="card-content-overlay">
                            <ion-text>
                                <h1 class="text-light fw-bolder text-primary">{{ data.subjectCode }}</h1>
                                <h3 class="text-light fw-bold">{{ data.subjectName }}</h3>
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

<script>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonLabel,
    IonAvatar, IonCardContent,
    IonGrid,
    IonCol,
    IonRow, IonText

} from "@ionic/vue";
export default {
    name: 'SemestralGradeView',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonButton,
        IonLabel,
        IonAvatar, IonCardContent, IonGrid, IonCol, IonRow, IonText
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
    data() {
        return {
            isFullText: {}, // Track which items are expanded
        };
    },
    methods: {
        encrypt(data) {
            return btoa(data)
        },
        // Check if text needs truncation
        isTextShort(text) {
            return text.split(" ").length <= 3;
        },
        // Toggle full/short text for specific item
        toggleFullText(index) {
            this.$set(this.isFullText, index, !this.isFullText[index]);
        },
        // Return truncated or full text
        truncatedSubjectName(text, index) {
            if (this.isFullText[index]) return text; // Full text when expanded
            return text.split(" ").slice(0, 3).join(" ") + "..."; // Truncated text
        },
    }
}
</script>
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