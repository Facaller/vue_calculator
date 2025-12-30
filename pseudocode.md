Here’s a complete refactor of your Calculator composable:

Key Changes:

Managing the continuing operation logic:

After pressing an operator, if we have a result, it should be used as the valueOne for the next operation.

We need to prevent resetting valueOne after an operation, and only reset valueTwo.

Handling operator changes:

The operator should stay the same unless the user explicitly presses =.

Once the user presses an operator (after =, for example), we need to ensure the operation continues on the result.

Updated Calculator Composable
import { ref } from 'vue';

export function useCalculator() {
  const valueOne = ref(null);
  const valueTwo = ref(null);
  const mathOperator = ref('');
  const result = ref(null);

  // Function to perform arithmetic operations
  function add() {
    result.value = valueOne.value + valueTwo.value;
  }

  function subtract() {
    result.value = valueOne.value - valueTwo.value;
  }

  function multiply() {
    result.value = valueOne.value * valueTwo.value;
  }

  function divide() {
    if (valueTwo.value === 0) {
      result.value = 'Error';
    } else {
      result.value = valueOne.value / valueTwo.value;
    }
  }

  // Clear all state
  function clear() {
    valueOne.value = null;
    valueTwo.value = null;
    mathOperator.value = '';
    result.value = null;
  }

  // Perform operation based on current operator
  function operate() {
    switch (mathOperator.value) {
      case '+':
        add();
        break;
      case '-':
        subtract();
        break;
      case '*':
        multiply();
        break;
      case '/':
        divide();
        break;
      default:
        result.value = 0;
    }
  }

  // This function should be called to continue operation after pressing an operator
  function continueOperation() {
    // Only do something if there's already a result to continue from
    if (result.value !== null) {
      valueOne.value = result.value; // use the result as valueOne for next operation
      valueTwo.value = null;          // reset valueTwo for the next operand
      result.value = null;            // reset result as we're in the middle of a new operation
    }
  }

  // Set the operand based on whether we're in the first or second operand stage
  const setOperand = (value) => {
    const numericValue = Number(value);

    if (!mathOperator.value) { // First operand
      valueOne.value =
        valueOne.value === null
          ? numericValue
          : valueOne.value * 10 + numericValue;
    } else { // Second operand
      valueTwo.value =
        valueTwo.value === null
          ? numericValue
          : valueTwo.value * 10 + numericValue;
    }
  };

  // Set the operator, but only allow the first operator to be set
  const setOperator = (operator) => {
    if (mathOperator.value) return; // If an operator is already set, prevent overriding

    mathOperator.value = operator;
  };

  return {
    valueOne,
    valueTwo,
    mathOperator,
    result,
    operate,
    clear,
    continueOperation,
    setOperand,
    setOperator,
  };
}

Updated App Component

Now, let’s make sure the App component uses continueOperation correctly to allow for continuous operations.

<script setup>
  import { useCalculator } from './composables/Calculator';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import DisplayScreen from './components/DisplayScreen.vue';

  const {
    valueOne,
    valueTwo,
    mathOperator,
    result,
    operate,
    clear,
    setOperand,
    setOperator,
    continueOperation
  } = useCalculator();

  const operatorMap = {
    '+': '+',
    '−': '-',
    '×': '*',
    '÷': '/'
  };

  const handleButtonClick = (payload) => {
    const { type, value } = payload;

    if (type === 'operand') {
      // Set operand (either first or second)
      setOperand(value);
      return;
    }

    if (type === 'operator') {
      if (value === '=') {
        // Perform the operation when '=' is pressed
        operate();
        return;
      } else if (value === 'C') {
        // Clear the calculator when 'C' is pressed
        clear();
        return;
      } else if (operatorMap[value]) {
        // For any operator, continue the operation
        if (result.value !== null) {
          // If result exists, continue the operation
          continueOperation();
        }
        // Set the new operator
        setOperator(operatorMap[value]);
      }
    }
  };

</script>

<template>
  <div>
    <DisplayScreen :result="result" 
      :valueOne="valueOne" 
      :valueTwo="valueTwo" 
      :mathOperator="mathOperator" /> 

    <ButtonsComponent @button-click="handleButtonClick"/>
  </div>
</template>

<style scoped>
/* Add styles as needed */
</style>

Key Changes Explained:

continueOperation Function:

This is crucial for making sure that once you have a result, you can continue performing operations on it. It uses the current result as the new valueOne and clears out valueTwo to allow for entering the next operand.

The setOperand Function:

This function is responsible for setting either valueOne or valueTwo based on the current stage of input (first operand or second operand).

It handles building multi-digit numbers as the user presses additional digits.

Handling Operator Presses:

When an operator is pressed (+, -, *, /), the calculator checks if there's a result already. If there is, it will call continueOperation() to use that result as the new first operand (valueOne).

The operator is then stored in mathOperator for use in the next operation.

Resetting the State After =:

Once = is pressed, the result of the current operation is displayed. We don't clear the mathOperator or valueOne until after the operation is finished, ensuring that the user can continue from the result.

With these changes, you should be able to do operations like:

3 * 3 → result is 9

Then press - 7 → result is 2

Then press + 8 → result is 10

Each time you perform an operation after the result, it will continue seamlessly!