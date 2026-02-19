<script setup>
  import { useCalculator } from './composables/Calculator';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import DisplayScreen from './components/DisplayScreen.vue';

  const { 
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
    padding: .2rem;
    backdrop-filter: blur(6px);
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 0, 255, 0.5);
    box-shadow:
    0 0 10px rgba(255, 0, 255, 0.6),
    0 0 40px rgba(255, 0, 255, 0.4);
  }
</style>
