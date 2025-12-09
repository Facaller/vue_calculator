<script setup>
    import {ref, defineEmits} from 'vue';

    const ValueOne = ref(null);
    const ValueTwo = ref(null);
    const mathOperator = ref('');
    const resultRef = ref(null);
    const emit = defineEmits();

    function add () {
        return resultRef.value = ValueOne.value + ValueTwo.value;
    }

    function subtract () {
        return resultRef.value = ValueOne.value - ValueTwo.value;
    }

    function multiply () {
        return resultRef.value = ValueOne.value * ValueTwo.value;
    }

    function divide () {
        return resultRef.value = ValueOne.value / ValueTwo.value;
    }

    function clear () {
        ValueOne.value = null;
        ValueTwo.value = null;
        mathOperator.value = null;
    }

    function operate () {
        const a = ValueOne.value;
        const b = ValueTwo.value;
        const operator = mathOperator.value;

        let result;
        
        switch (operator) {
            case '+':
                result = add(a, b);
                break;
            case '-':
                result = subtract(a, b);
                break;
            case '*':
                result = multiply(a, b);
                break;
            case '/':
                result = divide(a, b);
                break;
            default:
                result = 0;
        }
        resultRef.value = result;
        emit('result', resultRef.value);
    }

</script>

<template>

</template>

<style scoped>

</style>