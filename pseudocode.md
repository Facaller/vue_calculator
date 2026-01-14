Plan to Get the Key from the Value

Loop Through the Object: You’ll need to loop through the operatorMap object to find the key that matches the current value stored in mathOperator.

Check Each Key-Value Pair: For each key-value pair in operatorMap, check if the value matches mathOperator.value. When you find a match, you can use that key as your display value.

High-Level Steps:

Iterate through operatorMap: Since you know that operatorMap is an object, you’ll want to iterate over its keys to find the key that corresponds to the value of mathOperator.value.

Comparison: For each key in operatorMap, compare its corresponding value to mathOperator.value.

Return the Key: Once you find the matching value, return the key. This will give you the symbol (the key) that you want to display.

What You Need:

A loop (like a for...in loop or Object.entries() if you prefer) to go through the keys of operatorMap.

An if condition inside the loop to check if the current value matches mathOperator.value.

Once a match is found, return the key associated with that value.

Potential Edge Cases:

No match: You’ll need to handle cases where there’s no match (though in your case, it’s unlikely since mathOperator.value will always be one of the known values from operatorMap).

Multiple matches: Ensure that mathOperator.value matches only one key in operatorMap. Since it seems like each operator has a unique value, this should not be a problem.

Final Thoughts:

This approach works because you're essentially reversing the relationship: the key (which is your display value) is derived from the value (the logic operator). Since the operatorMap is a simple mapping with one-to-one correspondence, this method is efficient and straightforward.