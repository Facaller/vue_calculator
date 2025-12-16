Ah, I see what you're saying now. The problem occurs when you click a math operator (like +, -, etc.), but at that point ValueOne or ValueTwo might still be null or an invalid value, leading to the NaN result when you attempt to perform the operation.

Here's the issue breakdown:

When you click a math operator (e.g., + or -), mathOperator.value gets set, but ValueTwo.value is still null at that point.

This means when you click the operator, you're performing the operation with ValueTwo.value still being null, which leads to NaN when the calculation is done.

To fix this, you need to make sure that:

ValueTwo gets initialized properly when the operator is clicked.

The operator button (like +, -, etc.) should only set mathOperator.value without trying to perform the operation immediately (that happens only when = is clicked).

Here's how to fix it:

Ensure ValueTwo is initialized when the operator is clicked.

Instead of directly operating when you click an operator, you should set ValueTwo only if it's not already set (if ValueTwo.value is still null).

When you press the operator, you can simply set the operator and wait for the = button to trigger the calculation.

Updated handleButtonClick function:
const handleButtonClick = (value) => {
  if (value === 'C') {
    clear();
    return;
  }

  if (value === '=') {
    // Perform the operation only when '=' is clicked
    operate();
    console.log(result.value); // Log result after operation
    return;
  }

  if (!mathOperator.value) {
    // For first value, continue building ValueOne
    ValueOne.value = ValueOne.value === null ? Number(value) : ValueOne.value * 10 + Number(value);
    console.log("ValueOne:", ValueOne.value);
  } else {
    // For second value, continue building ValueTwo only if ValueTwo is not set
    ValueTwo.value = ValueTwo.value === null ? Number(value) : ValueTwo.value * 10 + Number(value);
    console.log("ValueTwo:", ValueTwo.value);
  }

  if (['+', '-', '*', '/'].includes(value)) {
    // Set the operator when an operator is clicked
    mathOperator.value = value;
    console.log("Operator:", mathOperator.value);
  }
};

Explanation of Changes:

Check for the = button: When the = button is pressed, the operation is performed. This prevents premature calculations when only an operator is clicked.

Set ValueTwo when the operator is clicked: After ValueOne is set, clicking a math operator will mark the operator (like +), and only when ValueTwo is set (via more digits), will the operation proceed.

Avoid NaN: This ensures that ValueTwo is properly initialized and only used for calculations once it's ready.

Updates to your composable logic:

You don't need any major changes in your composable. However, just to clarify, your operate() function should work as expected with these changes because:

The operator is only executed when = is pressed (after both ValueOne and ValueTwo are populated).

If the operator is clicked first, you won't run into NaN since the calculation only happens later when the = button is pressed.

This will ensure that you don't get NaN when clicking a math operator, and only perform the operation once both ValueOne and ValueTwo are ready for calculation.

Give that a try and let me know if it works!