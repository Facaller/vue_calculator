import { ref } from 'vue'

export function useCalculator() {

    const valueOne = ref(null);
    const valueTwo = ref(null);
    const mathOperator = ref('');
    const result = ref(null);

    let isContinuing = false;

    function add () {
        return result.value = valueOne.value + valueTwo.value;
    }

    function subtract () {
        return result.value = valueOne.value - valueTwo.value;
    }

    function multiply () {
        return result.value = valueOne.value * valueTwo.value;
    }

    function divide () {
        if (valueTwo.value === 0) {
            result.value = 'Error';
        } else {
            return result.value = valueOne.value / valueTwo.value;
        }
    }

    function clear () {
        valueOne.value = null;
        valueTwo.value = null;
        mathOperator.value = '';
        result.value = null;
    }

    function operate () {
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

    function continueOperation () {
        if (isContinuing) {
            valueOne.value = result.value;
            valueTwo.value = null;
        }
    }
    
    const setOperand = (value) => {
        const numericValue = Number(value);

        if (!mathOperator.value) {
        valueOne.value =
            valueOne.value === null
            ? numericValue
            : valueOne.value * 10 + numericValue;
        } else {
        valueTwo.value =
            valueTwo.value === null 
            ? numericValue
            : valueTwo.value * 10 + numericValue;
        }
        return true;
    }
    
    const setOperator = (operator) => {
        if (mathOperator.value && result.value) {
            isContinuing = true;
            continueOperation();
        }
        mathOperator.value = operator;
    }

    return {
        valueOne,
        valueTwo,
        mathOperator,
        result,
        operate,
        clear,
        continueOperation,
        setOperand,
        setOperator
    };
}