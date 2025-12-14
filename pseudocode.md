Great question 👍
You’re very close—the main issue is how emitted events are listened to and handled in the parent.

Let’s break this down step by step, fix a few small mistakes, and show exactly how to use your emitted values.

1️⃣ Big picture (important concept)

Buttons.vue
👉 emits a value when a button is clicked ('7', '+', '=', etc.)

App.vue (parent)
👉 listens for that emitted event
👉 receives the value
👉 passes it to your calculator composable

Display.vue
👉 receives result as a prop and displays it

This is the correct Vue data flow:

Buttons (emit) → App (handle) → Calculator logic → Display (props)

2️⃣ Fix #1: Components must be in separate files

Right now you pasted two <script setup> and <template> blocks in one file.
That won’t work in Vue.

You should have:

App.vue

components/Buttons.vue

components/Display.vue

I’ll show each one.

3️⃣ Buttons.vue (emit values correctly)
✅ Buttons.vue
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['button-click']);

const buttonClick = (value) => {
  emit('button-click', value);
};
</script>

<template>
  <div>
    <div>
      <button @click="buttonClick('7')">7</button>
      <button @click="buttonClick('8')">8</button>
      <button @click="buttonClick('9')">9</button>
      <button @click="buttonClick('÷')">÷</button>
    </div>
    <div>
      <button @click="buttonClick('4')">4</button>
      <button @click="buttonClick('5')">5</button>
      <button @click="buttonClick('6')">6</button>
      <button @click="buttonClick('×')">×</button>
    </div>
    <div>
      <button @click="buttonClick('1')">1</button>
      <button @click="buttonClick('2')">2</button>
      <button @click="buttonClick('3')">3</button>
      <button @click="buttonClick('−')">−</button>
    </div>
    <div>
      <button @click="buttonClick('=')">=</button>
      <button @click="buttonClick('0')">0</button>
      <button @click="buttonClick('C')">C</button>
      <button @click="buttonClick('+')">+</button>
    </div>
  </div>
</template>


✅ This emits:

emit('button-click', value)

4️⃣ App.vue (use the emitted value)

This is the part you’re missing:
you must create a handler function that receives the emitted value.

✅ App.vue
<script setup>
import { useCalculator } from './composables/calculator';
import Buttons from './components/Buttons.vue';
import Display from './components/Display.vue';

const {
  ValueOne,
  ValueTwo,
  mathOperator,
  result,
  operate,
  clear
} = useCalculator();

// 👇 THIS receives emitted values
const handleButtonClick = (value) => {
  if (value === 'C') {
    clear();
  } else {
    operate(value);
  }
};
</script>

<template>
  <div>
    <!-- Pass result to Display -->
    <Display :result="result" />

    <!-- Listen to emitted event -->
    <Buttons @button-click="handleButtonClick" />
  </div>
</template>

🔑 Key idea
<Buttons @button-click="handleButtonClick" />


means:

“When Buttons emits button-click, call handleButtonClick(value)”

5️⃣ Display.vue (use props)
✅ Display.vue
<script setup>
const props = defineProps({
  result: {
    type: [Number, String],
    default: 0
  }
});
</script>

<template>
  <div class="display">
    {{ result }}
  </div>
</template>


💡 In <script setup>, you can use result directly — no props.result needed in the template.

6️⃣ Common mistakes you had (totally normal)

❌ Importing components like this:

import { Buttons } from './components/buttons.vue'


✅ Correct:

import Buttons from './components/Buttons.vue'


❌ Listening to @click on the component:

<Buttons @click="handleButtonClick" />


✅ Correct (custom event name):

<Buttons @button-click="handleButtonClick" />

7️⃣ Mental model (this will help a LOT)

emit = “Hey parent, something happened”

props = “Here child, display this data”

composable = “Put logic here, not in components”

You’re actually using Vue the right way already — you just needed the last wiring step.