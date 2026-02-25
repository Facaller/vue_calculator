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
                if (result.value !== null) {
                    setPhase('showingResult');
                    return;
                }    
            
                if (valueOne.value !== null) {
                    setPhase('enteringOperator');
                }    
                break;
            case 'showingResult':
                if (valueOne.value !== null) {
                    setPhase('enteringOperator');
                    return;
                }
                break;
            default:
                setPhase('enteringFirst');
        }  
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
        if (valueOne.value === null || valueTwo.value === null) {
            return;
        }
        
        switch (mathOperator.value) {
            case '+': add(); break;
            case '-': subtract(); break;
            case '*': multiply(); break;
            case '/': divide(); break;
            default: result.value = 0;
        }
        
        valueOne.value = null;
        valueTwo.value = null;
        mathOperator.value = null;
    }
    
    function applyAppendingOperation () {
        if (result.value !== null) {
            valueOne.value = result.value;
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
                clear();
                valueOne.value = numericValue;
                break;
            default:
                break;
        }
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
                operate();
                mapOperator(operator);
                if (mathOperator.value !== null) {
                    applyAppendingOperation();
                }
                transitionPhases();
                break;
            case 'showingResult':
                mapOperator(operator);
                if (mathOperator.value !== null) {
                    applyAppendingOperation();
                    transitionPhases();
                }
                break;
            default:
                break;
        }
    }

    const operatorMap = {
        '+': '+',
        '−': '-',
        '×': '*',
        '÷': '/',
        'C': clear,
        '=': operate
    };

    const mapOperator = (operator) => {
        const mappedValue = operatorMap[operator];
        if (!mappedValue) return;

        if (typeof mappedValue === 'function') {
            mappedValue();
            return;
        }
        displayMathOp.value = operator;
        mathOperator.value = mappedValue;
    }

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