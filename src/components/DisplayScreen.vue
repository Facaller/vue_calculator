<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    displayValue: {
        type: [String, Number],
        default: ''
    }
});
</script>

<template>
    <div class="display">
        <p>{{ props.displayValue }}</p>
    </div>
</template>

<style scoped>

    p {
        padding: 0px 1px 10px 0px;
    }

    .display {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 2px;
        font: 60px 'calculator';
    }
</style>