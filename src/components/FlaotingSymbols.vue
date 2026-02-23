<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        displayValue: {
            type: [String, Number],
            default: ''
        }
    });
</script>

<template>
    <div class="floating-symbols">
        <p class="symbol">{{ props.displayValue }}</p>
    </div>
</template>