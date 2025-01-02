<template>
    <div class="sticky-top">
        <nav class="nav navbar navbar-expand-lg navbar iq-navbar py-lg-0 ">
            <div class="container-fluid navbar-inner">
                <router-link :to="{ name: 'app-layout.home' }" class="navbar-brand">
                    <img src="@/assets/resources/image/bma-logo-1.png" alt="image"
                        class="img-fluid rounded-circle avatar-70 me-2">
                    <h2 class="logo-title me-3 d-md-none">BMA</h2> <!-- Visible only on mobile -->
                    <h2 class="logo-title me-3 d-none d-md-block">BALIWAG MARITIME ACADEMY, INC.</h2>
                    <!-- Visible on larger screens -->
                </router-link>
                <button class="navbar-toggler float-end" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <span class="navbar-toggler-bar bar1 mt-2"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </span>
                </button>
                <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
                    <ul class="navbar-nav ms-auto top-menu navbar-nav align-items-center navbar-list mb-3 mb-lg-0">
                        <li class="nav-item me-2">
                            <router-link
                                :class="`${checkActive('app-layout.student-login') ? 'nav-link active text-primary fw-bolder' : 'nav-link text-muted'}`"
                                :to="{ name: 'app-layout.student-login' }">Student Portal </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                :class="`${checkActive('app-layout.applicant-login') ? 'nav-link active text-primary fw-bolder' : 'nav-link text-muted'}`"
                                :to="{ name: 'app-layout.applicant-login' }">Applicant Portal</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="nav-scroller ">
            <nav class="nav nav-underline bg-white pb-0 text-white border border-soft-primary"
                aria-label="Secondary navigation">
                <div class="d-flex" id="head-check">
                    <div v-for="(data, index) in headerLists" :key="index">
                        <router-link :to="{ name: data['route'] }"
                            :class="name == data['name'] ? 'nav-link active text-primary fw-bolder' : 'nav-link text-muted'"
                            :id="data['name']" :data-title="data['name']" @click="changename(data['name'])">
                            {{ data['name'] }}
                        </router-link>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>
<script>
import { mapActions/* , mapGetters */ } from 'vuex'
export default {
    name: 'PageHeader',
    data() {
        // Update the Headers Name into Array Data
        const headerLists = [
            { name: 'Home', route: 'app-layout.home' },
            { name: 'Achievements', route: 'app-layout.achievements' },
            { name: 'News and Events', route: 'app-layout.newsAndEvents' },
            { name: 'Admission', route: 'app-layout.admission' },
            { name: 'Onboard Training', route: 'app-layout.onboardTraining' },
            { name: 'Discipline & Drills', route: 'app-layout.disciplineAndDrills' },
            { name: 'Research', route: 'app-layout.research' }
        ]
        return {
            name: '',
            headerLists
        }
    },
    mounted() {
        this.name = this.$route.meta.name
    },
    methods: {
        ...mapActions({
            changenameaction: 'changenameaction'
        }
        ),
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
        },
        changename(name) {
            console.log(name)
            this.name = name
        }
    }
}
</script>
