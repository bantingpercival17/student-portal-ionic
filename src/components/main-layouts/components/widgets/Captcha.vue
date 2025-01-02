<template>
    <div>
        <div class="captcha-challenge">
            {{ captchaText }}
        </div>
        <input v-model="userInput" @input="checkCaptcha" placeholder="Enter the text above" />
        <div v-if="showSuccessMessage" class="success-message">
            Captcha solved successfully!
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            captchaText: this.generateCaptchaText(),
            userInput: '',
            showSuccessMessage: false
        }
    },
    methods: {
        generateCaptchaText() {
            // Generate a random string for the CAPTCHA
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let captcha = ''
            for (let i = 0; i < 6; i++) {
                captcha += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            return captcha
        },
        checkCaptcha() {
            if (this.userInput === this.captchaText) {
                this.showSuccessMessage = true
            } else {
                this.showSuccessMessage = false
            }
        }
    }
}
</script>
<style>
.captcha-challenge {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.success-message {
    color: green;
    font-weight: bold;
}
</style>