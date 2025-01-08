<template>
    <div v-if="subjectLists.length > 0" class="page-content">
        <div class="row">
            <div class="col-lg-4 col-md-12 col-xs-12" v-for="(data, index) in subjectLists" :key="index">
                <ion-card>
                    <ion-card-content class="row">
                        <ion-avatar class="col-md-4">
                            <img class="img-fluid avatar avatar-70 rounded-circle"
                                src="http://one.bma.edu.ph/assets/img/staff/avatar.png" alt="teacher-image">

                        </ion-avatar>

                        <ion-label class="col-md">
                            <h2 class="fw-bolder text-primary">{{ data.curriculum_subjects.subject.subject_code }}</h2>
                            <p class="fw-bolder text-muted"> {{ data.staff.first_name + " " + data.staff.last_name }}
                            </p>
                        </ion-label>
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
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
    IonAvatar, IonCardContent

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
        IonAvatar, IonCardContent
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