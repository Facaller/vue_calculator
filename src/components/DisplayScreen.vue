<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    valueOne: {
        type: [Number],
        default: 0
    },
    valueTwo: {
        type: [Number],
        default: 0
    },
    mathOperator: {
        type: [String],
        default: null
    },
    result: {
        type: [Number, String],
        default: 0,
    },
});

</script>

<template>
    <div class="display">
        <p>{{ props.valueOne }}</p>
        <p>{{ props.mathOperator }}</p>
        <p>{{ props.valueTwo }}</p>
        <p>{{ props.result }}</p>
    </div>
</template>

<style scoped>
    .display {
        border: 5px solid red;
    }
</style>