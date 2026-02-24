<script setup>
    import { defineProps, ref, watch } from 'vue';

    const props = defineProps({
        displayValue: {
            type: [String, Number],
            default: ''
        }
    });

    const symbols = ref([]);

    watch(() => props.displayValue, (newValue) => {
        if (newValue) {
            const newSymbol = {
                id: Date.now(),
                value: newValue,
                type: typeof newValue === 'number' ? 'operand' : 'operator',
                left: Math.random() * 100,
            };

            symbols.value.push(newSymbol);

            setTimeout(() => {
                symbols.value = symbols.value.filter(symbol => symbol.id !== newSymbol.id)
            }, 1000);
        }
    });
</script>

<template>
    <div class="symbol-layer">
        <div
            v-for="symbol in symbols"
            :key="symbol.id"
            class="floating-symbol"
            :class="symbol.type"
            :style="{ left: symbol.left + '%'}"
        >
        {{ symbol.value }}
        </div>   
    </div>
</template>

<style scoped>
.symbol-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-symbol {
  position: absolute;
  top: 40%; /* Position from the top of the screen */
  transform: translateX(-50%) scale(0.4); /* Center the symbol and shrink it */
  font-size: 2rem;
  font-weight: bold;
  animation: flyTowardUser 1s linear forwards; /* Animation to make the symbol fly */
}

.operand {
  color: #4cc9f0; /* Blue glow for operand */
  text-shadow:
    0 0 5px #4cc9f0,
    0 0 15px #4cc9f0,
    0 0 30px #4cc9f0;
}

.operator {
  color: #f72585; /* Pink glow for operator */
  text-shadow:
    0 0 5px #f72585,
    0 0 15px #f72585,
    0 0 30px #f72585;
}

@keyframes flyTowardUser {
  0% {
    transform: translateX(-50%) translateY(-20px) scale(0.4); /* Start off-screen */
    opacity: 0;
  }

  15% {
    opacity: 1; /* Fade in */
  }

  100% {
    transform: translateX(-50%) translateY(400px) scale(2); /* Move and grow */
    opacity: 0; /* Fade out */
  }
}
</style>
