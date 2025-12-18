1. How to Break handleButtonClick Into Helpers
Goal (keep this in mind)

Each helper should:

Do one small thing

Have a clear name

Be easy to read without comments

We’ll end up with:

handleClear

handleOperand

handleEquals

handleOperator

Step 1: Create the Helpers

Put these above handleButtonClick in your <script setup>.

🔹 handleClear
const handleClear = (value) => {
  if (value === 'C') {
    clear();
    return true;
  }
  return false;
};


Why this is nice:

Returns true if it handled the click

Lets handleButtonClick exit early

🔹 handleOperand (numbers)
const handleOperand = (type, value) => {
  if (type !== 'operand') return false;

  if (!mathOperator.value) {
    ValueOne.value =
      ValueOne.value === null
        ? Number(value)
        : ValueOne.value * 10 + Number(value);
  } else {
    ValueTwo.value =
      ValueTwo.value === null
        ? Number(value)
        : ValueTwo.value * 10 + Number(value);
  }

  return true;
};


Why this helps:

Only cares about numbers

Doesn’t know anything about operators or equals

🔹 handleEquals
const handleEquals = (value) => {
  if (value === '=') {
    operate();
    return true;
  }
  return false;
};


Very simple, very readable.

🔹 handleOperator
const handleOperator = (type, value) => {
  if (type !== 'operator') return false;

  const operatorMap = {
    '+': '+',
    '−': '-',
    '×': '*',
    '÷': '/'
  };

  if (operatorMap[value]) {
    mathOperator.value = operatorMap[value];
    return true;
  }

  return false;
};

Step 2: Clean handleButtonClick

Now your main handler becomes tiny and readable:

const handleButtonClick = (payload) => {
  const { type, value } = payload;

  if (handleClear(value)) return;
  if (handleOperand(type, value)) return;
  if (handleEquals(value)) return;
  if (handleOperator(type, value)) return;
};

⭐ This is a big win

Even as a beginner, you can now:

Read this top-to-bottom like a checklist

Add new behavior without breaking old logic

Debug easily (you know where to look)

2. Operator Map — Explained Simply

This part:

const operatorMap = {
  '+': '+',
  '−': '-',
  '×': '*',
  '÷': '/'
};

What problem does this solve?

Your UI buttons use pretty symbols:

×

÷

−

But your calculator logic understands:

*

/

-

So we need a translation layer.

Think of it like a dictionary 📘

“When the user clicks this, use that internally.”

Examples:

operatorMap['×'] // '*'
operatorMap['÷'] // '/'
operatorMap['−'] // '-'


So when this runs:

mathOperator.value = operatorMap[value];


You’re saying:

“Take the symbol the user clicked and convert it into the operator my code understands.”

Why this is better than if / else

❌ Bad (hard to read, grows fast):

if (value === '×') mathOperator.value = '*';
else if (value === '÷') mathOperator.value = '/';
else if (value === '−') mathOperator.value = '-';


✅ Good (clear, scalable):

mathOperator.value = operatorMap[value];


If you add % later, you just add one line to the map.

Big Beginner Takeaway 🌱

What you’ve done here is learn three important habits:

Small functions are easier to reason about

Early returns simplify logic

Mapping values is cleaner than condition chains

These are habits professionals use every day.

If you want next, we can:

Move these helpers into the composable

Add operator chaining

Add decimal support

Or refactor the display logic cleanly