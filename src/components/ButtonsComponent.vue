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
    <div class="button-box">
        <div class="button-box-rows">
            <button class="operands" @click="numberClick('7')">7</button>
            <button class="operands" @click="numberClick('8')">8</button>
            <button class="operands" @click="numberClick('9')">9</button>
            <button class="operators divide" @click="operatorClick('÷')">÷</button>
        </div>
        <div class="button-box-rows">
            <button class="operands" @click="numberClick('4')">4</button>
            <button class="operands" @click="numberClick('5')">5</button>
            <button class="operands" @click="numberClick('6')">6</button>
            <button class="operators multiply" @click="operatorClick('×')">×</button>
        </div>
        <div class="button-box-rows">
            <button class="operands" @click="numberClick('1')">1</button>
            <button class="operands" @click="numberClick('2')">2</button>
            <button class="operands" @click="numberClick('3')">3</button>
            <button class="operators subtract" @click="operatorClick('−')">−</button>
        </div>
        <div class="button-box-rows">
            <button class="operators" @click="operatorClick('=')">=</button>
            <button class="operands" @click="numberClick('0')">0</button>
            <button class="operators" @click="operatorClick('C')">C</button>
            <button class="operators add" @click="operatorClick('+')">+</button>
        </div>
    </div>
</template>

<style scoped>
    .button-box-rows {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .operators,
    .operands {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5rem;
        width: 8rem;
        padding: 24px 48px;
        border: 1px solid gray;
        border-radius: 6px;
        margin: .3rem;
        font: 50px 'calculator';
    }

    .multiply {
        font-size: 50px;
    }

    .divide {
        font-size: 50px;
    }

    .add {
        font-size: 50px;
    }

    .subtract {
        font-size: 50px;
    }
</style>