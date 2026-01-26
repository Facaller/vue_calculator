<script setup>
  import { useCalculator } from './composables/Calculator';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import DisplayScreen from './components/DisplayScreen.vue';

  const { transitionPhases,
          operate,
          clear,
          setOperand,
          setOperator,
          getDisplayValue }
        = useCalculator();

  const handleButtonClick = (payload) => {
    const { type, value } = payload;
  
    if (type === 'operand') {
      setOperand(value);
      return;
    }

    if (type === 'operator') {
      transitionPhases();
      if (value === '=') {
        operate();
        return;
      }

      if (value === 'C') {
        clear();
        return;
      }
      
      setOperator(value);
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
