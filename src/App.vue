<script setup>
  import { useCalculator } from './composables/Calculator';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import DisplayScreen from './components/DisplayScreen.vue';

  const { currentPhase,
          operate,
          clear,
          continueOperation,
          setOperand,
          setOperator,
          getDisplayValue }
        = useCalculator();

  const operatorMap = {
    '+': '+',
    '−': '-',
    '×': '*',
    '÷': '/'
  };
//issue is here
  const handleButtonClick = (payload) => {
    const { type, value } = payload;
  
    if (type === 'operand') {
      if (currentPhase.value === 'enteringFirst') {
        setOperand(value);
        currentPhase.value = 'enteringOperator'
      } else if (currentPhase.value === 'enteringOperator') {
        setOperand(value);
        currentPhase.value = 'enteringSecond'
      } else if (currentPhase.value === 'enteringSecond') {
        setOperand(value);
      }
      return;
    }

    if (type === 'operator') {
      if (value === '=') {
        operate();
        currentPhase.value = 'showingResult';
      } else if (value === 'C') {
        clear();
        currentPhase.value = 'enteringFirst';
      } else if (operatorMap[value]) {
        continueOperation();
        setOperator(operatorMap[value]);
        currentPhase.value = 'enteringSecond';
      }
    }
  };

</script>

<template>
  <div class="container">
    <div class="calculator">
      <DisplayScreen :displayValue="getDisplayValue()" />
      <ButtonsComponent @button-click="handleButtonClick"/>
    </div>
  </div>
</template>

<style scoped>
  

  .container {
    display: grid;
    height: 100%;
    width: 100%;
    justify-items: center;
    align-content: center;
  }

  .calculator {
    display: grid;
    grid-template-rows: 1fr 4fr;
    border: 1px solid black;
    padding: .2rem;
    box-shadow: 5px 5px 12px 2px grey;
  }
</style>