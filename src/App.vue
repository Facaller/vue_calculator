<script setup>
  import { ref, defineProps } from 'vue';
  import { useCalculator } from './composables/calculator';
  import { Buttons } from './components/buttons.vue'
  import { Display} from './components/display.vue'

  const displayResult = ref(null);
  const { ValueOne,
          ValueTwo,
          mathOperator,
          result,
          operate,
          clear } = useCalculator();

</script>

<template>
  <div>
    <Display :result = "result" /> 

    <Buttons @click = "handleButtonClick">
  </div>
</template>

<style scoped>

</style>