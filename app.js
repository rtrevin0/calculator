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
    if (computationCompleted && (!isNaN(value) || value === '.')) {
        clearCalculator();
        computationCompleted = false;
        result.value = value;
        return;
    }

    if (computationCompleted && num2 === undefined && (value === '+' || value === '-' || value === '*' || value === '/')) {
        computationCompleted = false;
    }

    if (value === '<') {
        if (computationCompleted) {
            if (result.value.length > 1) {
                result.value = result.value.slice(0, -1);
                num1 = parseFloat(result.value);
            } else {
                clearCalculator();
                result.value = '0';
            }
        } else if (!operatorPressed) {
            if (result.value.length > 1) {
                result.value = result.value.slice(0, -1);
            } else {
                result.value = '0';
            }

            if (num1 !== undefined && operator === undefined) {
                num1 = parseFloat(result.value);
            } else if (num2 !== undefined) {
                num2 = parseFloat(result.value);
            }
        }
        return;
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
        if (num1 === undefined) {
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

function handleKeydown(event) {
    console.log(event.key);
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace', 'Escape'];
    if (validKeys.includes(event.key)) {
        let value = event.key;
        if (value === 'Enter') {
            value = '=';
        } else if (value === 'Backspace') {
            value = '<';
        } else if (value === 'Escape') {
            value = 'AC';
        }
        handleButtonClick(value);
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.dataset.id);
    }); 
});

document.addEventListener('keydown', (event) => {
    handleKeydown(event);
});
window.onload = clearCalculator;