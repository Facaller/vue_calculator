<script setup>
  import { useCalculator } from './composables/Calculator';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import DisplayScreen from './components/DisplayScreen.vue';

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
    
    if (!mathOperator.value) {
      ValueOne.value = ValueOne.value === null ? Number(value) : ValueOne.value * 10 + Number(value);
      console.log(ValueOne.value);
    } else {
      ValueTwo.value = ValueTwo.value === null ? Number(value) : ValueTwo.value * 10 + Number(value);
      console.log(ValueTwo.value);
    }

    if (value === '=') {
      operate(mathOperator.value)
      console.log(mathOperator.value);
      console.log(result.value);
    }

    if (['+', '-', '*', '/'].includes(value)) {
      mathOperator.value = value;
    }
  };

</script>

<template>
  <div>
    <DisplayScreen :result="result" /> 

    <ButtonsComponent @button-click="handleButtonClick"/>
  </div>
</template>

<style scoped>

</style>