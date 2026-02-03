var num1;
var operator;
var num2;
var operatorPressed = false;
var computationCompleted = false;


const decimalButton = document.getElementById('decimal');
const result = document.getElementById('result');

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        throw new Error("Cannot divide by zero");
    }
    return x / y;
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x, y);
        default:
            throw new Error("Invalid operator");
    }
}

function clearCalculator() {
    console.log("Clear button pressed");
    num1 = undefined;
    operator = undefined;
    num2 = undefined;
    operatorPressed = false;
    const result = document.getElementById('result');
    result.value = '0';
    computationCompleted = false;
    decimalButton.disabled = false;
    result.style.fontSize = '1.75em';
}   

function getDecimalPart(number) {
    const absoluteNumber = Math.abs(number);
    const integerPart = Math.trunc(absoluteNumber);
    const decimalPart = absoluteNumber - integerPart;
    return decimalPart;
}

function handleButtonClick(value) {
    if (value === '<') {
        console.log("Backspace button pressed");
        if (result.value !== '0') {
            result.value = result.value.slice(0, -1);
            computationCompleted = false;
            if (result.value === '' || result.value === '-') {
                result.value = '0';
            }
        }
        return;
    }
    if (computationCompleted && (!isNaN(value) || value === '.')) {
        clearCalculator();
        computationCompleted = false;
        result.value = value;
        return;
    }

    if (computationCompleted && num2 === undefined && (value === '+' || value === '-' || value === '*' || value === '/')) {
        computationCompleted = false;
    }

    if (!isNaN(value) || value === '.') {
        if (operatorPressed) {
            result.value = '';
            operatorPressed = false;
            result.value += value;
            if (num1 !== undefined) {
                num2 = parseFloat(result.value);
            }
        } else {
            if (result.value === '0' && value !== '.') {
                result.value = '';
            }
            result.value += value;
        }
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (num1 === undefined || !operatorPressed) {
            num1 = parseFloat(result.value);
        } 
        operator = value;
        operatorPressed = true;
        console.log("Operator set to: " + operator);
    } else if (value === '=') {
        if (operator && num1 !== undefined) {
            num2 = parseFloat(result.value);
            if (num2 === undefined) {
                return;
            }
            try {
                const computation = operate(operator, num1, num2);
                let roundedComputation
                let decimalPart = getDecimalPart(computation);
                if (decimalPart === 0) {
                    roundedComputation = computation.toFixed(0);
                } else {
                    console.log("Decimal part: " + decimalPart);
                    roundedComputation = computation.toFixed(8);
                }
                console.log("Computation result: " + roundedComputation);
                result.value = roundedComputation;
                num1 = computation;
                operator = undefined;
                operatorPressed = false;
                num2 = undefined;
                computationCompleted = true;
            } catch (error) {
                alert(error.message);
                clearCalculator();
                return;
            }
        }
    } else if (value === 'AC') {
        clearCalculator();
    }
    if (result.value.includes('.') && !computationCompleted && !operatorPressed) {
        decimalButton.disabled = true;
    } else {
        decimalButton.disabled = false;
    }
    if (result.value.length > 7 && result.value.length <= 10) {
            result.style.fontSize = '1.5em';
    } else if (result.value.length > 10 && result.value.length <= 14) {
        result.style.fontSize = '1em'; 
    } else if (result.value.length > 14) {
        result.style.fontSize = '0.75em';
    } 
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.dataset.id);
    });
});
window.onload = clearCalculator;