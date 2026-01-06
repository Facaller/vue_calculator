<script setup>
import {defineProps, ref} from 'vue';

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

const currentDisplay = ref('showValueOne')
</script>

<template>
    <div class="display">
        <p v-if="currentDisplay === 'showValueOne'">{{ props.valueOne }}</p>
        <p v-if="currentDisplay === 'showOperator'">{{ props.mathOperator }}</p>
        <p v-if="currentDisplay === 'showValueTwo'">{{ props.valueTwo }}</p>
        <p v-if="currentDisplay === 'showResult'">{{ props.result }}</p>
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
        font: 32px 'mojang';
    }
</style>