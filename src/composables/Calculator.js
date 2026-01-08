import { ref } from 'vue'

export function useCalculator() {

    const valueOne = ref(null);
    const valueTwo = ref(null);
    const mathOperator = ref(null);
    const result = ref(null);
    const currentPhase = ref('enteringFirst');

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
        mathOperator.value = null;
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
        if (valueOne.value !== null && valueTwo.value !== null) {
            operate();
        }
        if (result.value !== null) {
            valueOne.value = result.value;
            valueTwo.value = null;
            result.value = null;
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
        if (valueOne.value === null) return;
        mathOperator.value = operator;
    }

    const getDisplayValue = () => {
        switch (currentPhase.value) {
            case 'enteringFirst':
                return valueOne.value !== null ? valueOne.value : '';
            case 'enteringOperator':
                return mathOperator.value;
            case 'enteringSecond':
                return valueTwo.value !== null ? valueTwo.value : '';
            case 'showingResult':
                return result.value;
            default:
                return '';
        }
    };

    return {
        currentPhase,
        operate,
        clear,
        continueOperation,
        setOperand,
        setOperator,
        getDisplayValue
    };
}