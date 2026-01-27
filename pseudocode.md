What’s actually happening (step-by-step)

Let’s trace the happy path you expect:

User enters digits → valueOne builds

User presses operator → phase should move toward entering second operand

User enters digits → valueTwo builds and displays

Now let’s compare that to what your app is really doing.

The key observation

Your phase only advances when transitionPhases is called — and you are not calling it at the moment the second operand should begin.

That’s the entire bug, in one sentence.

Where the flow stalls
1. You press an operator (this part works)

You are in enteringFirst

mapOperator runs

You call transitionPhases

Phase changes from enteringFirst → enteringOperator

So far, so good.

2. Now the user presses a number (this is where it breaks)

You are now in enteringOperator

setOperand runs

But in enteringOperator, you explicitly do nothing

You also do not call transitionPhases here

So:

The phase never advances

You never reach enteringSecond

Input is ignored

Display stays empty

App looks “frozen”

This matches your symptoms exactly.

Why your logic looks correct but still fails

Your transition rules themselves are fine.

The issue is when transitions are allowed to occur:

You transition on operator presses

But not on number presses

Yet the transition from enteringOperator → enteringSecond logically depends on user intent, not new data

Right now, you’re waiting for another operator press to move forward — which never comes.

The mental model mismatch

You currently have this implicit rule:

“Only operators can move phases forward.”

But the calculator UX rule is actually:

“Once an operator is chosen, the next number press begins the second operand.”

That means:

The number press is the event that should unlock enteringSecond

Not another operator press

Why your console logs are confusing (but truthful)

Your logs correctly show:

valueOne exists

mathOperator exists

Phase is still enteringOperator

So your brain says:

“But the transition conditions are satisfied!”

They are — but the function that checks them is never being called at that moment.

No call → no evaluation → no transition.

Secondary (but important) observations

These aren’t the main bug, but they will bite you later:

1. showingResult auto-resets immediately

If transitionPhases is ever called while in showingResult, it immediately jumps back to enteringFirst. That makes the result phase very fragile.

2. clear() doesn’t reset the phase

You clear all values, but the phase could still be enteringSecond or enteringOperator, which can cause weird behavior afterward.

3. Display depends on phase and value

So even when the phase is right, nothing renders until the value is non-null — which can make debugging feel misleading.

The core fix (conceptually, no code)

Think in terms of events, not functions:

Operator press → choose operator

First number press after operator → begin second operand

That moment is when the phase must advance

So ask yourself:

“What is the first moment the user intends to enter the second number?”

That’s where the transition belongs.

A good rule of thumb going forward

Transitions should respond to user intent

Operand updates respond to user data

If a user action changes meaning based on phase, that action probably needs to notify the state controller

You’re very close — this is exactly the kind of bug that shows up when your architecture is almost right.