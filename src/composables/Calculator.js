import { ref } from 'vue'

export function useCalculator() {

    const valueOne = ref(null);
    const valueTwo = ref(null);
    const mathOperator = ref(null);
    const displayMathOp = ref(null);
    const result = ref(null);
    const currentPhase = ref('enteringFirst');

    const setPhase = (newPhase) => {
        currentPhase.value = newPhase;
    };
    const transitionPhases = () => {
        switch (currentPhase.value) {
            case 'enteringFirst':
                if (valueOne.value !== null && mathOperator.value !== null) {
                    setPhase('enteringOperator');
                }
                break;
            case 'enteringOperator':
                if (mathOperator.value !== null && valueOne.value !== null) {
                    setPhase('enteringSecond');
                }
                break;
            case 'enteringSecond':
                if (valueTwo.value !== null) {
                    setPhase('showingResult');
                }
                break;
            case 'showingResult':
                setPhase('enteringFirst');
                break;
            default:
                setPhase('enteringFirst');
        }
        console.log(valueOne.value);
        console.log(valueTwo.value);
        console.log(mathOperator.value);    
    };
    // const currentPhase = computed(() => {
    //     if (result.value !== null) return 'showingResult';
    //     if (displayMathOp.value && valueTwo.value === null) return 'enteringOperator';
    //     if (valueTwo.value !== null) return 'enteringSecond';
    //     console.log(currentPhase.value);
    //     console.log(valueOne.value);
    //     console.log(valueTwo.value);
    //     console.log(mathOperator.value);
    //     return 'enteringFirst';
    // });

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
        displayMathOp.value = null;
        result.value = null;
    }

    function operate () {
        switch (mathOperator.value) {
            case '+': add(); break;
            case '-': subtract(); break;
            case '*': multiply(); break;
            case '/': divide(); break;
            default: result.value = 0;
        }
    }

    function applyAppendingOperation () {
        if (valueOne.value !== null &&
            valueTwo.value !== null &&
            mathOperator.value
        ) {
            operate();
            valueOne.value = result.value;
            valueTwo.value = null;
            result.value = null;
        }
    }
    
    const setOperand = (value) => {
        const numericValue = Number(value);

        switch (currentPhase.value) {
            case 'enteringFirst':
                valueOne.value = valueOne.value === null
                    ? numericValue
                    : valueOne.value * 10 + numericValue;
                break;
            case 'enteringSecond':
                valueTwo.value = valueTwo.value === null 
                    ? numericValue
                    : valueTwo.value * 10 + numericValue;
                    console.log('reach here in operator')
                break;
            case 'showingResult':
                valueOne.value = numericValue;
                valueTwo.value = null;
                mathOperator.value = null;
                result.value = null;
                break;
            case 'enteringOperator':
                break;
            default:
                break;
        }
        console.log(currentPhase.value)
    }
    
    const setOperator = (operator) => {
        switch (currentPhase.value) {
            case 'enteringFirst':
                if (valueOne.value === null) return;
                mapOperator(operator);
                transitionPhases();
                break;
            case 'enteringSecond':
                applyAppendingOperation();
                mapOperator(operator);
                transitionPhases();
                break;
            case 'showingResult':
                valueOne.value = result.value;
                valueTwo.value = null;
                result.value = null;
                mapOperator(operator);
                transitionPhases();
                break;
            case 'enteringOperator':
                console.log('reach here in operator')
                mapOperator(operator);
                transitionPhases();
                break;
            default:
                break;
        }
        console.log(currentPhase.value)
    }

    const operatorMap = {
        '+': '+',
        '−': '-',
        '×': '*',
        '÷': '/'
    };

    const mapOperator = (operator) => {
        Object.entries(operatorMap).forEach(([operatorKey, operatorValue]) => {
            if (operator === operatorKey) {
                displayMathOp.value = operatorKey;
                mathOperator.value = operatorValue;
            }
        });
    };

    const getDisplayValue = () => {
        switch (currentPhase.value) {
            case 'enteringFirst':
                return valueOne.value !== null ? valueOne.value : '';
            case 'enteringOperator':
                return displayMathOp.value;
            case 'enteringSecond':
                return valueTwo.value !== null ? valueTwo.value : '';
            case 'showingResult':
                return result.value;
            default:
                return '';
        }
    };

    return {
        transitionPhases,
        operate,
        clear,
        setOperand,
        setOperator,
        getDisplayValue
    };
}