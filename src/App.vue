<script setup>
  import { ref, defineProps } from 'vue';
  import { useCalculator } from './composables/calculator';
  import { buttons } from './components/buttons.vue'
  import { display} from './components/display.vue'

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
    <display :result = "result" /> 

    <buttons @click = "handleButtonClick">
  </div>
</template>

<style scoped>

</style>