<script setup>
import {defineEmits} from 'vue';

const emit = defineEmits(['button-click']);
const numberClick = (value) => {
    emit('button-click', { type: 'operand', value: value})
}
const operatorClick = (value) => {
    emit('button-click', { type: 'operator', value: value})
}
</script>

<template>
    <div>
        <div>
            <button @click="numberClick('7')">7</button>
            <button @click="numberClick('8')">8</button>
            <button @click="numberClick('9')">9</button>
            <button @click="operatorClick('÷')">÷</button>
        </div>
        <div>
            <button @click="numberClick('4')">4</button>
            <button @click="numberClick('5')">5</button>
            <button @click="numberClick('6')">6</button>
            <button @click="operatorClick('×')">×</button>
        </div>
        <div>
            <button @click="numberClick('1')">1</button>
            <button @click="numberClick('2')">2</button>
            <button @click="numberClick('3')">3</button>
            <button @click="operatorClick('−')">−</button>
        </div>
        <div>
            <button @click="operatorClick('=')">=</button>
            <button @click="numberClick('0')">0</button>
            <button @click="operatorClick('C')">C</button>
            <button @click="operatorClick('+')">+</button>
        </div>
    </div>
</template>

<style scoped>

</style>