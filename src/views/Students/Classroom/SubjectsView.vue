<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <p class='display-6 fw-bolder text-primary'>{{ subject.subject_code }}</p>
        <span class="fw-bolder text-muted">{{ subject.subject_name }}</span>
        <div class="row">
            <div class="col-md-8">
                <div v-if="topic">
                    <router-link
                        :to="{ name: 'student-layout.subject-view-lesson', params: { subject: this.$route.params.subject, lesson: encrypt(data.id) } }">
                        <ion-card v-for="(data, index) in topic" :key="index">
                            <ion-card-header class="text-primary">
                                <ion-card-subtitle>
                                    LESSON {{ index + 1 }}
                                </ion-card-subtitle>
                                <ion-card-title class="text-primary">
                                    {{ data.learning_outcomes }}
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </router-link>
                </div>
                <div v-else>
                    <p class="h4 fw-bolder text-primary">NO CONTENT</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <LessonLoading />
    </div>
</template>
<script>
import {
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    loadingController, IonRefresher, IonRefresherContent
} from "@ionic/vue";
import LessonLoading from "@/components/widgets/PreLoadingLayout/LessonLoading.vue"
import { LOGOUT_ACTION, GET_USER_TOKEN, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
    name: 'SubjectView',
    data() {
        return {
            isLoading: true,
            subject: [],
            topic: []
        }
    },
    mounted() {
        const dynamicValue = this.$route.params.subject
        this.mountedData(dynamicValue)
    },
    components: {
        LessonLoading
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        mountedData(data) {
            axios.get(`student/subject-lists/view?subject=${data}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.data = response.data
                if (this.data) {
                    this.subject = this.data.subject.curriculum_subjects.subject
                    if (this.data.subject.course_syllabus) {
                        this.course_syllabus = this.data.subject.course_syllabus
                        if (this.course_syllabus.syllabus_details) {
                            if (this.course_syllabus.syllabus_details.learning_outcomes) {
                                this.topic = this.course_syllabus.syllabus_details.learning_outcomes
                            }
                        }
                    }
                }
                console.log(this.topic)
                this.isLoading = false
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        this.logout()
                    }
                }
                console.log(error)
            })
        },
        async handleScroll(event) {
            event.target.complete();
            this.isLoading = true
            const dynamicValue = this.$route.params.subject
            this.mountedData(dynamicValue)
        },
        encrypt(data) {
            return btoa(data)
        }
    }
}
</script>