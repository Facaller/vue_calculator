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
            <button class="button-box" @click="numberClick('7')">7</button>
            <button class="button-box" @click="numberClick('8')">8</button>
            <button class="button-box" @click="numberClick('9')">9</button>
            <button class="button-box" @click="operatorClick('÷')">÷</button>
        </div>
        <div>
            <button class="button-box" @click="numberClick('4')">4</button>
            <button class="button-box" @click="numberClick('5')">5</button>
            <button class="button-box" @click="numberClick('6')">6</button>
            <button class="button-box" @click="operatorClick('×')">×</button>
        </div>
        <div>
            <button class="button-box" @click="numberClick('1')">1</button>
            <button class="button-box" @click="numberClick('2')">2</button>
            <button class="button-box" @click="numberClick('3')">3</button>
            <button class="button-box" @click="operatorClick('−')">−</button>
        </div>
        <div>
            <button class="button-box" @click="operatorClick('=')">=</button>
            <button class="button-box" @click="numberClick('0')">0</button>
            <button class="button-box" @click="operatorClick('C')">C</button>
            <button class="button-box" @click="operatorClick('+')">+</button>
        </div>
    </div>
</template>

<style scoped>
    .button-box {
        padding: 32px 48px;
        font: 30px 'mojang';
    }
</style>