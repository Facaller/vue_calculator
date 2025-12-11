<script setup>
import {ref, defineEmits} from 'vue';

const emit = defineEmits();
const buttonClick = (value) => {
    emit('button-click', value)
};
</script>

<template>
    <div>
        <div>
            <button @click="buttonClick('7')">7</button>
            <button @click="buttonClick('8')">8</button>
            <button @click="buttonClick('9')">9</button>
            <button @click="buttonClick('÷')">÷</button>
        </div>
        <div>
            <button @click="buttonClick('4')">4</button>
            <button @click="buttonClick('5')">5</button>
            <button @click="buttonClick('6')">6</button>
            <button @click="buttonClick('×')">×</button>
        </div>
        <div>
            <button @click="buttonClick('1')">1</button>
            <button @click="buttonClick('2')">2</button>
            <button @click="buttonClick('3')">3</button>
            <button @click="buttonClick('−')">−</button>
        </div>
        <div>
            <button @click="buttonClick('=')">=</button>
            <button @click="buttonClick('0')">0</button>
            <button @click="buttonClick('C')">C</button>
            <button @click="buttonClick('+')">+</button>
        </div>
    </div>
</template>

<style scoped>

</style>