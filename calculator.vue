<script setup>
    import {ref} from 'vue';

    const ValueOne = ref(null);
    const ValueTwo = ref(null);
    const mathOperator = ref('');
    const resultRef = ref(null);

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
    }

</script>

<template>

</template>

<style scoped>

</style>