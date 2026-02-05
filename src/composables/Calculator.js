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
                if (valueOne.value !== null) {
                    setPhase('enteringOperator');
                }
                break;
            case 'enteringOperator':
                if (mathOperator.value !== null) {
                    setPhase('enteringSecond');
                }
                break;
            case 'enteringSecond':
                if (valueTwo.value !== null) {
                    setPhase('showingResult');
                }
                break;
            case 'showingResult':
                if (valueOne.value !== null && mathOperator.value !== null) {
                    setPhase('enteringSecond');
                }
                
                break;
            default:
                setPhase('enteringFirst');
        }
        console.log(`value one: ${valueOne.value}`);
        console.log(`value two: ${valueTwo.value}`);
        console.log(`mathOp : ${mathOperator.value}`);    
    };

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
        currentPhase.value = 'enteringFirst';
    }

    function operate () {
        transitionPhases();
        switch (mathOperator.value) {
            case '+': add(); break;
            case '-': subtract(); break;
            case '*': multiply(); break;
            case '/': divide(); break;
            default: result.value = 0;
        }
        console.log(currentPhase.value)
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

// current issues is continuing from showResult phase
// multiple operators being clicked but onyl first one registers
// appending operations without =
    const setOperand = (value) => {
        const numericValue = Number(value);
        
        switch (currentPhase.value) {
            case 'enteringFirst':
                valueOne.value = valueOne.value === null
                    ? numericValue
                    : valueOne.value * 10 + numericValue;
                break;
            case 'enteringOperator':
                transitionPhases();
                valueTwo.value = valueTwo.value === null 
                    ? numericValue
                    : valueTwo.value * 10 + numericValue;
                
                break;
            case 'enteringSecond':
                valueTwo.value = valueTwo.value === null 
                    ? numericValue
                    : valueTwo.value * 10 + numericValue;
                break;
            case 'showingResult':
                valueOne.value = numericValue;
                valueTwo.value = null;
                mathOperator.value = null;
                result.value = null;
                break;
            default:
                break;
        }
        console.log(currentPhase.value)
    }
    
    const setOperator = (operator) => {
        switch (currentPhase.value) {
            case 'enteringFirst':
                transitionPhases();
                mapOperator(operator);
                break;
            case 'enteringOperator':
                if (valueOne.value === null) return;
                mapOperator(operator);
                
                break;
            case 'enteringSecond':
                
                break;
            case 'showingResult':
                valueOne.value = result.value;
                valueTwo.value = null;
                result.value = null;
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
        '÷': '/',
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
        getDisplayValue,
        applyAppendingOperation
    };
}