import { ref } from 'vue'

export function useCalculator() {

    const ValueOne = ref(null);
    const ValueTwo = ref(null);
    const mathOperator = ref('');
    const result = ref(null);

    function add () {
        return result.value = ValueOne.value + ValueTwo.value;
    }

    function subtract () {
        return result.value = ValueOne.value - ValueTwo.value;
    }

    function multiply () {
        return result.value = ValueOne.value * ValueTwo.value;
    }

    function divide () {
        return result.value = ValueOne.value / ValueTwo.value;
    }

    function clear () {
        ValueOne.value = null;
        ValueTwo.value = null;
        mathOperator.value = '';
        result.value = null;
    }

    function operate () {
        switch (mathOperator.value) {
            case '+':
                result = add(a, b);
                break;
            case '-':
                result = subtract(a, b);
                break;
            case '*':
                result = multiply(a, b);
                break;
            case '/':
                result = divide(a, b);
                break;
            default:
                result = 0;
        }
    }

    return {
        ValueOne,
        ValueTwo,
        mathOperator,
        result,
        operate,
        clear
    };
}