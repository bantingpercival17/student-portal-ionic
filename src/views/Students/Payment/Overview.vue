<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title slot="start" class="fw-bolder text-primary ">PAYMENT OVERVIEW</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div class="ion-padding">
                Payment Content
            </div>

        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonImg, IonSearchbar, IonAvatar, IonTitle, IonContent, IonBadge } from '@ionic/vue';
export default {
    name: 'ListenView',
    components: {
        IonPage, IonHeader, IonToolbar, IonButtons, IonImg, IonSearchbar, IonAvatar, IonTitle, IonContent, IonBadge,
    },
    data() {
        const data = [{
            "title": "English",
            "singer": "Artist Name 1",
            "coverImage": "https://picsum.photos/200/300?random=46",
            "audioLink": "/assets/audio/English Audio.mp3"
        },
        {
            "title": "History",
            "singer": "Artist Name 2",
            "coverImage": "https://picsum.photos/200/300?random=47",
            "audioLink": "/assets/audio/History Audio.mp3"
        },
        {
            "title": "Humanity",
            "singer": "Artist Name 3",
            "coverImage": "https://picsum.photos/200/300?random=48",
            "audioLink": "/assets/audio/Humanity Audio.mp3"
        },
        {
            "title": "Mathematics",
            "singer": "Artist Name 4",
            "coverImage": "https://picsum.photos/200/300?random=49",
            "audioLink": "/assets/audio/Mathematics Audio.mp3"
        },
        {
            "title": "Music",
            "singer": "Artist Name 5",
            "coverImage": "https://picsum.photos/200/300?random=50",
            "audioLink": "/assets/audio/Music Audio.mp3"
        }]
        const video = [
            { title: 'Civilization', coverImage: "https://picsum.photos/200/300?random=50", videoLink: '/assets/video/Civilization.mp4' },
            { title: 'Human Origin 101', coverImage: "https://picsum.photos/200/300?random=51", videoLink: '/assets/video/Human Origin 101.mp4' },
            { title: 'Practice Speaking English', coverImage: "https://picsum.photos/200/300?random=52", videoLink: '/assets/video/Practice Speaking English.mp4' },
            { title: 'Pythagorean Theorem', coverImage: "https://picsum.photos/200/300?random=53", videoLink: '/assets/video/Pythagorean Theorem.mp4' },
            { title: 'Religion - John 1', coverImage: "https://picsum.photos/200/300?random=54", videoLink: '/assets/video/Religion - John 1.mp4' },
            { title: 'Supply and Demand Explained in One Minute', coverImage: "https://picsum.photos/200/300?random=55", videoLink: '/assets/video/Supply and Demand Explained in One Minute.mp4' },
            { title: 'What is Culture', coverImage: "https://picsum.photos/200/300?random=56", videoLink: '/assets/video/What is Culture.mp4' },
            { title: 'What is Economics？', coverImage: "https://picsum.photos/200/300?random=57", videoLink: '/assets/video/What is Economics？.mp4' },
            { title: 'What is Social Study', coverImage: "https://picsum.photos/200/300?random=58", videoLink: '/assets/video/What is Social Study.mp4' },
            { title: 'Civilization', coverImage: "https://picsum.photos/200/300?random=59", videoLink: null },
            { title: 'Practice Speaking English', coverImage: "https://picsum.photos/200/300?random=52", videoLink: null },
            { title: 'Pythagorean Theorem', coverImage: "https://picsum.photos/200/300?random=53", videoLink: '/assets/video/Pythagorean Theorem.mp4' },
        ]
        return {
            data,
            video
        }
    }
}
</script>