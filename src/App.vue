<script setup>
  import { useCalculator } from './composables/Calculator';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import DisplayScreen from './components/DisplayScreen.vue';

  const { valueOne,
          valueTwo,
          mathOperator,
          result,
          operate,
          clear } = useCalculator();

  const handleClear = (value) => {
    if (value === 'C') {
      clear();
      return true;
    }
    return false;
  }

  const handleOperand = (type, value) => {
    if (type !== 'operand') return false;

    if (!mathOperator.value) {
      valueOne.value =
        valueOne.value === null
          ? Number(value) 
          : valueOne.value * 10 + Number(value);
    } else {
      valueTwo.value =
        valueTwo.value === null 
          ? Number(value) 
          : valueTwo.value * 10 + Number(value);
    }
    return true;
  }

  const handleEquals = (value) => {
    if (value === '=') {
      operate();
      return true;
    }
    return false;
  }

  const handleOperator = (type, value) => {
    if (type !== 'operator') return false;

    const operatorMap = {
      '+': '+',
      '−': '-',
      '×': '*',
      '÷': '/'
    };
    
    if (operatorMap[value]) {
      mathOperator.value = operatorMap[value];
      return true;
    }
    return false;
  }

  const handleButtonClick = (payload) => {
    const { type, value } = payload;
  
  if (handleClear(value)) return;
  if (handleOperand(type, value)) return;
  if (handleEquals(value)) return;
  if (handleOperator(type, value)) return;
  };

</script>

<template>
  <div>
    <DisplayScreen :result="result" 
      :valueOne="valueOne" 
      :valueTwo="valueTwo" 
      :mathOperator="mathOperator"
      /> 

    <ButtonsComponent @button-click="handleButtonClick"/>
  </div>
</template>

<style scoped>

</style>