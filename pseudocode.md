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

What is v-for?

v-for is a directive in Vue that allows you to loop over an array (or an object) and render a list of elements in the template based on the data. It’s commonly used when you want to repeat a set of elements for each item in an array or object.

In Vue, v-for is most often used to render:

Lists of items.

Multiple components.

Repeated DOM elements based on an array.

Basic Syntax:
v-for="(item, index) in array"


item: This is the current item in the iteration. It can be any variable name you choose (like symbol, task, user, etc.).

index: The index (optional) represents the position of the current item in the array (starting from 0).

array: The array or object you're looping through.

How Does v-for Work?

Let’s break it down with some simple examples.

1. Iterating Over an Array of Strings:

Let’s say we have an array of numbers, and we want to display each number in a list:

<template>
  <ul>
    <li v-for="(number, index) in numbers" :key="index">{{ number }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';

const numbers = ref([1, 2, 3, 4, 5]);
</script>

Explanation:

v-for="(number, index) in numbers": This tells Vue to loop through the numbers array and for each element (in this case, each number), create an <li> element.

number: This is the variable that will hold the value of each item in the array (1, 2, 3, etc.).

index: This represents the position of the item in the array, useful when you need to reference the item’s index (like when applying styles or keys).

:key="index": The key is important in Vue when using v-for. It helps Vue efficiently update the DOM when the list changes (e.g., when items are added, removed, or reordered). It's a way for Vue to uniquely identify each element in the list.

2. Iterating Over an Array of Objects:

Now, let’s look at an example where we loop through an array of objects:

<template>
  <ul>
    <li v-for="(task, index) in tasks" :key="task.id">
      {{ index + 1 }}. {{ task.name }} - {{ task.completed ? 'Done' : 'Pending' }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([
  { id: 1, name: 'Learn Vue', completed: true },
  { id: 2, name: 'Build a project', completed: false },
  { id: 3, name: 'Write blog post', completed: false },
]);
</script>

Explanation:

(task, index): Each task in the tasks array will be assigned to the variable task. The index is just the position of that task in the array.

task.name: We access the properties of each task object using dot notation.

:key="task.id": The key should be a unique identifier for each element. Here, we’re using the id of each task to ensure that Vue can track each item individually. This is important for performance and proper reactivity.

What Happens?

For each item in the tasks array, Vue will create an <li> element and display the task name, and based on the completed property, it will display whether it’s "Done" or "Pending."

Using the key attribute ensures Vue can efficiently handle changes in the list.

3. Iterating Over an Object:

You can also iterate over objects using v-for, but the syntax is a bit different. When looping over an object, you can use both the key and value:

<template>
  <ul>
    <li v-for="(value, key) in person" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';

const person = ref({
  name: 'John Doe',
  age: 30,
  occupation: 'Developer',
});
</script>

Explanation:

(value, key): This time, we loop through the object, where key is the property name (name, age, etc.), and value is the corresponding value ('John Doe', 30, etc.).

:key="key": Again, the key helps Vue efficiently manage the DOM.

What Happens?

For each property in the person object, Vue will create an <li> element displaying the property name and its value.

4. Dynamic Lists and Performance:

When working with dynamic lists, the key attribute becomes very important.

Why is key important?

Vue uses key to track individual DOM elements. When the list changes (e.g., items are added, removed, or moved), Vue can efficiently update the DOM without re-rendering the entire list.

Without key, Vue may not be able to optimize re-rendering correctly, especially in large lists, leading to unnecessary DOM manipulations.

How Does v-for Work in the FloatingSymbols Example?

In the FloatingSymbols component, we are using v-for to loop through the symbols array, which holds each floating symbol object. Here's the key part:

<template>
  <div class="symbol-layer">
    <div
      v-for="symbol in symbols"
      :key="symbol.id" <!-- Unique key for each symbol -->
      class="floating-symbol"
      :class="symbol.type" <!-- Apply different classes based on symbol type -->
      :style="{ left: symbol.left + '%'}" <!-- Apply dynamic left position -->
    >
      {{ symbol.value }} <!-- Display the symbol value (e.g., '7', '+', etc.) -->
    </div>
  </div>
</template>

Breakdown:

v-for="symbol in symbols": Loops through the symbols array and creates a <div> element for each symbol.

symbol: This refers to the current item in the loop (i.e., the current symbol).

symbols: This is the array we are looping over, which contains the symbol objects.

:key="symbol.id": Each symbol has a unique id property (created using Date.now() or another method). This helps Vue track each symbol efficiently, especially when adding/removing symbols.

:class="symbol.type": We add dynamic classes based on the type of the symbol (either 'operand' or 'operator').

:style="{ left: symbol.left + '%'}": Dynamically sets the horizontal position for each symbol.

Key Takeaways for v-for:

Syntax: The basic syntax is v-for="(item, index) in array", where you loop over an array (or object) and create elements based on each item.

key Attribute: Always use a key to ensure Vue efficiently manages the list of elements and can update the DOM without unnecessary re-renders.

Reactivity: v-for works in conjunction with Vue’s reactivity system. When the array or object changes, the DOM will automatically update based on the new data.