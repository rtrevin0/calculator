var num1;
var operator;
var num2;
var operatorPressed = false;

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
}

function handleButtonClick(value) {
    const result = document.getElementById('result');

    if (!isNaN(value) || value === '.') {
        if (operatorPressed) {
            result.value = '';
            operatorPressed = false;
        }
        if (result.value === '0' && value !== '.') {
            result.value = '';
        }
        result.value += value;
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (num1 === undefined) {
            num1 = parseFloat(result.value);
        } else if (operator) {
            // num2 = parseFloat(result.value);
            // num1 = operate(operator, num1, num2);
            result.value = num1;
        } 
        operator = value;
        operatorPressed = true;
    } else if (value === '=') {
        if (operator && num1 !== undefined) {
            num2 = parseFloat(result.value);
            const computation = operate(operator, num1, num2);
            result.value = computation;
            num1 = computation;
            operator = undefined;
        }
    } else if (value === 'AC') {
        clearCalculator();
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.dataset.id);
    });
});
window.onload = clearCalculator;