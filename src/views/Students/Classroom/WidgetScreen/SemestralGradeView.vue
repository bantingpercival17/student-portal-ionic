<template>
    <div v-if="subjectLists.length > 0" class="page-content">
        <ion-grid>
            <ion-row>
                <ion-col size="12" size-sm="6" size-md="4" v-for="(data, index) in subjectLists" :key="index">
                    <ion-card class="grade-card">
                        <ion-card-content>
                            <ion-grid>
                                <ion-row>
                                    <ion-col class="card-header">
                                        <h2 class="fw-bolder text-primary">{{ data.subjectCode }}</h2>
                                        <p class="fw-bold text-muted truncated-text">
                                            {{ truncatedSubjectName(data.subjectName) }}
                                            <span v-if="!isTextShort(data.subjectName)" @click="toggleFullText(index)"
                                                class="see-more">
                                                {{ isFullText[index] ? "Show Less" : "See More" }}
                                            </span>
                                        </p>
                                    </ion-col>
                                    <ion-col>
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
                                    </ion-col>

                                </ion-row>
                            </ion-grid>

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
    IonRow

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
        IonAvatar, IonCardContent, IonGrid, IonCol, IonRow
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
.page-content {
    padding: 1rem;
}

.grade-card {
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    overflow: hidden;
}

.grade-card:hover {
    transform: scale(1.02);
}

.card-header {
    background-color: #f1f5f9;
    padding: 10px;
    border-bottom: 1px solid #e2e8f0;
}

.truncated-text {
    display: inline;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.see-more {
    color: #3880ff;
    cursor: pointer;
    text-decoration: underline;
}

.text-primary {
    color: #3880ff;
}

.text-dark {
    color: #222428;
}

.text-muted {
    color: #8c8c8c;
}

.text-success {
    color: #10b981;
    /* Green for grades */
}

.fw-bold {
    font-weight: 600;
}

.fw-bolder {
    font-weight: 700;
}
</style>
