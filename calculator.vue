<script setup>
    import {ref} from 'vue';

    const ValueOne = ref(null);
    const ValueTwo = ref(null);
    const mathOperator = ref('');

    function add (a, b) {
        return a + b;
    }

    function subtract (a, b) {
        return a - b;
    }

    function multiply (a, b) {
        return a * b;
    }

    function divide (a, b) {
        return a / b;
    }

    function operate (a, operator, b) {
        
    }

</script>

<template>

</template>

<style scoped>

</style>