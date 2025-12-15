<script setup>
  import { useCalculator } from './composables/calculator';
  import Buttons from './components/buttons.vue'
  import Display from './components/display.vue'

  const { ValueOne,
          ValueTwo,
          mathOperator,
          result,
          operate,
          clear } = useCalculator();

  const handleButtonClick = (value) => {
    if (value === 'C') {
      clear();
      return;
    }
    
    while (!mathOperator.value) {
      ValueOne += value;
    }
    while (mathOperator) {
      ValueTwo += value
    }

    if (value === '=') {
      operate(mathOperator.value)
    }
  };

</script>

<template>
  <div>
    <Display :result="result" /> 

    <Buttons @button-click="handleButtonClick">
  </div>
</template>

<style scoped>

</style>