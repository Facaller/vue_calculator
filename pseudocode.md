1. Setup: Defining the Array of Symbols

First, we’ll define an array of symbols inside the component. Each symbol will represent a value (either a number or an operator) that we want to animate.

In this approach, we watch the displayValue prop to detect when it changes (e.g., when the user clicks a number or operator). When it changes, we add a new symbol to the array.

<script setup>
import { ref, watch } from 'vue'; // We need `ref` for reactivity and `watch` to track changes

// Define the prop that will be passed to this component
const props = defineProps({
  displayValue: {
    type: [String, Number],
    default: ''
  }
});

// Create a reactive array to store the symbols that will animate
const symbols = ref([]);

// Watch for changes in the `displayValue` prop
watch(() => props.displayValue, (newValue) => {
  if (newValue) {
    // Add a new symbol object to the array when the displayValue changes
    symbols.value.push({
      id: Date.now(), // Unique ID for each symbol (you could use something more robust)
      value: newValue, // The symbol value (could be number or operator)
      type: typeof newValue === 'number' ? 'operand' : 'operator', // Determine symbol type
      left: Math.random() * 100, // Random position for the symbol (0-100%)
    });
  }
});
</script>

What’s Happening Here:

symbols array: This is where we’ll store the symbols that will float across the screen. It’s a reactive reference (ref), so Vue will automatically update the view whenever symbols changes.

watch: The watch function tracks changes in displayValue. Each time the value changes, we add a new symbol to the symbols array. The new symbol has:

id: A unique identifier (we’re using Date.now() here, but this could be more sophisticated).

value: The value of the symbol (either a number or operator).

type: We set the type of the symbol to either 'operand' or 'operator' based on whether the value is a number or a string.

left: A random horizontal position (to make them appear at different spots on the screen).

2. Rendering Multiple Symbols:

Now we’ll render all the symbols stored in the symbols array using v-for. Each symbol will be displayed as an animated element.

<template>
  <div class="symbol-layer">
    <div
      v-for="symbol in symbols"
      :key="symbol.id"  <!-- Using unique ID to track each symbol -->
      class="floating-symbol"
      :class="symbol.type" <!-- Dynamically applying classes based on type (operand/operator) -->
      :style="{ left: symbol.left + '%'}" <!-- Dynamically setting left position -->
    >
      {{ symbol.value }} <!-- Display the value of the symbol -->
    </div>
  </div>
</template>

What’s Happening Here:

v-for="symbol in symbols": This loops through the symbols array and creates a new element for each symbol.

:key="symbol.id": Using a unique id for each symbol helps Vue efficiently track each symbol and its position in the DOM.

:class="symbol.type": Dynamically adds a CSS class (operand or operator) based on the symbol type.

:style="{ left: symbol.left + '%'}": Dynamically sets the horizontal position of each symbol using the left property, which is random (0–100%).

3. Animating the Symbols:

Now, let's focus on adding animation to these symbols. When they are created, we want them to animate into view and then disappear after a short time.

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

What’s Happening Here:

position: absolute;: This positions the symbols on the screen so we can move them around.

transform: translateX(-50%): This centers each symbol horizontally.

animation: flyTowardUser 1s linear forwards;: This triggers the animation when the symbol is rendered. It makes the symbol appear, move down, grow, and fade out.

CSS classes (operand and operator): These add different glowing effects for the numbers (blue) and operators (pink).

4. Cleaning Up: Removing Old Symbols

Once a symbol has finished its animation (i.e., it has flown off the screen), we should remove it from the array to avoid cluttering the DOM.

We can do this using setTimeout to delay the removal after the animation finishes.

Here’s how you can adjust the watch to remove symbols:

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  displayValue: {
    type: [String, Number],
    default: ''
  }
});

const symbols = ref([]);

// Watch for changes in `displayValue`
watch(() => props.displayValue, (newValue) => {
  if (newValue) {
    const newSymbol = {
      id: Date.now(), // Unique ID
      value: newValue, 
      type: typeof newValue === 'number' ? 'operand' : 'operator',
      left: Math.random() * 100, // Random horizontal position
    };

    symbols.value.push(newSymbol); // Add new symbol

    // Remove the symbol after 1 second (after animation)
    setTimeout(() => {
      symbols.value = symbols.value.filter(symbol => symbol.id !== newSymbol.id);
    }, 1000); // Duration should match the CSS animation time
  }
});
</script>

What’s Happening Here:

setTimeout(): After 1 second (the duration of the animation), we remove the symbol from the array using filter(). This prevents the symbol from staying in the DOM after it finishes its animation.

Full Working Example:
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  displayValue: {
    type: [String, Number],
    default: ''
  }
});

const symbols = ref([]);

// Watch for changes in `displayValue`
watch(() => props.displayValue, (newValue) => {
  if (newValue) {
    const newSymbol = {
      id: Date.now(),
      value: newValue, 
      type: typeof newValue === 'number' ? 'operand' : 'operator',
      left: Math.random() * 100, // Random horizontal position
    };

    symbols.value.push(newSymbol); // Add new symbol

    // Remove symbol after animation completes (1 second)
    setTimeout(() => {
      symbols.value = symbols.value.filter(symbol => symbol.id !== newSymbol.id);
    }, 1000); // Ensure the timeout matches animation duration
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
      :style="{ left: symbol.left + '%' }"
    >
      {{ symbol.value }}
    </div>
  </div>
</template

**********************