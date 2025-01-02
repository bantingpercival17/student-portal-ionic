<template>
    <div class="form-group">
        <label for="example-text-input" class="form-control-label fw-bolder">
            <small>{{ label.toUpperCase() }}<span v-if="required" class="text-danger">*</span></small>
        </label>
        <input type="text" class="form-control form-control-sm border border-primary" :value="value"
            @input="$emit('update:value', $event.target.value)" :disabled="disable" />
        <span class="badge bg-danger mt-2" v-if="error">{{
            error[0] }}</span>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            required: true
        },
        disable: {
            type: Boolean,
            default: false
        },
        error: Object
    },
    emits: ['update:value']
}
</script>