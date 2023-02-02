<template>
    <v-dialog v-model="dialog" max-width="500" :persistent="success === null" @update:model-value="resetForm()">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
                Contact us
            </v-btn>
        </template>
        <v-card class="pa-5 rounded">
            <v-card-text class="text-center" v-if="success">
                <v-icon class="mb-5" color="success" size="64">mdi-checkbox-marked-circle-outline</v-icon>
                <span class="d-block font-weight-bold mb-2 text-h5">
                    Message received
                </span>
                <span class="d-block">
                    Thank you! We'll go through your message and get back to you soon!
                </span>
            </v-card-text>
            <v-card-text class="text-center" v-else-if="success === false">
                <v-icon class="mb-5" color="error" size="64">mdi-close-circle-outline</v-icon>
                <span class="d-block font-weight-bold mb-2 text-h5">
                    Message was not received
                </span>
                <span class="d-block">
                    We're sorry, but something went wrong. Please try again later or contact us at
                    <a class="font-weight-medium" href="mailto:support@leyr.io">support@leyr.io</a>
                </span>
            </v-card-text>
            <template v-else>
                <v-card-title class="font-weight-bold pa-0 pb-5 text-h5">
                    Contact Us
                </v-card-title>
                <v-card-text class="pa-0 pb-2">
                    <v-form ref="form" v-model="valid">
                        <span class="d-block mb-5 text-body-1">
                            Hey! We'd love to get in touch! Please drop us your email and message below and we'll get back to you very soon.
                        </span>
                        <v-text-field v-model="email.value" label="Email" required :rules="email.rules" type="email" variant="outlined" />
                        <v-textarea v-model="message.value" label="Message" required :rules="message.rules" variant="outlined" />
                    </v-form>
                </v-card-text>
                <v-card-actions class="pa-0">
                    <v-btn color="primary" :disabled="!valid || loading" :loading="loading" variant="flat" @click="contactUs()">
                        Send message
                    </v-btn>
                    <v-btn color="primary" variant="outlined" @click="dialog = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </template>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { FormType } from '@/types'

const dialog = ref(false)
const form = ref(null)
const valid = ref(true)
const loading = ref(false)
const success = ref(null)

const email = ref({
    value: null,
    rules: [
        (value) => !!value || 'E-mail is required',
        (value) => /.+@.+\..+/.test(value) || 'Invalid e-mail'
    ]
})
const message = ref({
    value: null,
    rules: [
        (value) => !!value || 'Please provide your message',
    ]
})

const contactUs = async () => {
    const payload = {
        email: email.value.value,
        type: FormType.CONTACT_US,
        message: message.value.value
    }

    try {
        loading.value = true
        await $fetch(`/api/notion/form`, {
            method: 'POST',
            body: payload
        })
        success.value = true
    } catch (error) {
        success.value = false
    } finally {
        loading.value = false
    }
}

const resetForm = () => {
    email.value.value = null
    message.value.value = null
    success.value = null
}
</script>