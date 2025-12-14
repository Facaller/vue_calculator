<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    result: {
        type: [Number, String],
        default: 0,
    },
});

</script>

<template>
    <div>
        <p>{{ result }}</p>
    </div>
</template>

<style scoped>

</style>