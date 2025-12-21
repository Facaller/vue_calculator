<script setup>
  import { useCalculator } from './composables/Calculator';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import DisplayScreen from './components/DisplayScreen.vue';

  const { valueOne,
          valueTwo,
          mathOperator,
          result,
          operate,
          clear }
        = useCalculator();

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