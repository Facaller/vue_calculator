Conceptual Approach:
1. Track the Ongoing Result:

The first thing you'll need to do is ensure that the current result is always available to be used as an operand when the user clicks a new operator after an equals sign (=). After a calculation (e.g., 8 + 9), the result should not reset, but rather be available for further calculations.

If the user clicks = and gets the result, the result becomes valueOne (or the first operand) for the next operation.

If an operator is clicked after =, that result should be carried forward and used in the next operation.

2. Handle Immediate Operator Clicks After =:

Once the user clicks =, the result is displayed, but the next step is crucial: the user may click another operator directly. If they do, the result of the previous calculation (result) should be treated as the new valueOne (or first operand) for the next operation.

This means the operator needs to either:

Replace valueOne with the result of the previous calculation.

Reset valueTwo and mathOperator as appropriate for the next operation.

3. Resetting valueTwo When New Operation Begins:

After clicking an operator, you'll need to clear valueTwo because this operand will be replaced by the next number the user inputs. valueTwo represents the second operand for the current operation, and once the user switches operators or presses =, this should be reset to null until the next number is input.

For example, if the user presses +, they input the next number, and valueTwo will start accumulating that new number. But if they press - right after =, valueTwo needs to be cleared to start fresh with the new second operand.

4. Add a Flag or State to Indicate the Need to "Continue" a Calculation:

You'll want to keep track of whether the user is continuing a calculation after pressing = or just entering a new calculation. This can be achieved with a boolean flag (e.g., isContinuing).

If isContinuing is true, the next operator should continue using the result from the previous operation as the first operand.

If isContinuing is false, you can treat the next input as the start of a new calculation.

This flag can be set to true when the user presses =, and it can be reset whenever they start a new calculation (i.e., when a number is first pressed after an operator or result).

5. Flow When Pressing Operators After =:

After =, the result should replace valueOne, and valueTwo should be cleared.

The mathOperator should be set to the new operator.

The calculation should proceed with valueOne being the result of the previous operation, and valueTwo accumulating the new number(s).

For example:

"8 + 9 = 17" → Now, if the user clicks - and then 1, you treat the result 17 as valueOne and perform 17 - 1.

6. Flow When Operators Are Pressed Without =:

If the user presses an operator immediately (without pressing =), you'll simply treat the existing valueOne and valueTwo as the first and second operands for the operation. You reset valueTwo and begin adding the new number into it, just like how a normal calculation starts.

7. Managing Edge Cases (e.g., Consecutive = or Operators)

You'll want to make sure your calculator behaves well if the user presses = multiple times or presses multiple operators consecutively:

Multiple = clicks: After the first =, you should simply return the same result unless the user starts a new operation (via another operator click).

Consecutive operators: You might want to ignore a second operator unless the user has first entered a number. Alternatively, you could reset the operation and treat it like a fresh calculation.

Step-by-Step Workflow Concept:

User presses operand(s): The operand is accumulated (e.g., 8, 9, etc.).

User presses an operator: Set mathOperator and store the operand in valueOne (or valueTwo if the operator comes after the first operation).

User presses =: Perform the operation and display the result. Set isContinuing = true to allow continuing calculations.

User presses another operator after =:

Use the result of the last operation as valueOne.

Clear valueTwo (since it's ready to accumulate a new operand).

Set the new operator in mathOperator.

User continues entering operands: valueTwo starts accumulating the new number.

User clicks = again: Final result is computed and displayed, and valueOne and valueTwo are reset for the next operation.

Conclusion:

To sum it up, you're essentially building logic that:

Uses the result from the last operation as the starting point for the next operation if the user clicks an operator after =.

Resets valueTwo when a new operator is clicked, allowing the user to continue entering numbers for the next operand.

Makes sure to handle edge cases like consecutive = presses or consecutive operators.

By introducing a small flag like isContinuing and managing your operand values (valueOne, valueTwo) appropriately, you can ensure a smooth experience for users who want to chain operations together.