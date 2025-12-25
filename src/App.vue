<script setup>
  import { useCalculator } from './composables/Calculator';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import DisplayScreen from './components/DisplayScreen.vue';

  const { valueOne,
          valueTwo,
          mathOperator,
          result,
          operate,
          clear,
          continueOperation,
          setOperand,
          setOperator }
        = useCalculator();

  const operatorMap = {
    '+': '+',
    '−': '-',
    '×': '*',
    '÷': '/'
  };

  const handleButtonClick = (payload) => {
    const { type, value } = payload;
  
    if (type === 'operand') {
      setOperand(value);
      return;
    }
    if (type === 'operator') {
      if (value === '=') {
        operate();
        return;
      } else if (value === 'C') {
        clear();
        return;
      } else if (operatorMap[value]) {
        setOperator(operatorMap[value]);
        continueOperation();
      }
    }
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