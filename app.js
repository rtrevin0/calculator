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

function getDecimalPart(number) {
    const absoluteNumber = Math.abs(number);
    const integerPart = Math.trunc(absoluteNumber);
    const decimalPart = absoluteNumber - integerPart;
    return decimalPart;
}

function handleButtonClick(value) {
    const result = document.getElementById('result');

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
        } else if (operator) {
            num2 = parseFloat(result.value);
            try {
                num1 = operate(operator, num1, num2);
                result.value = num1;
            } catch (error) {
                alert(error.message);
                clearCalculator();
                return;
            }  
        } 
        operator = value;
        operatorPressed = true;
    } else if (value === '=') {
        if (operator && num1 !== undefined) {
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
            } catch (error) {
                alert(error.message);
                clearCalculator();
                return;
            }
        }
    } else if (value === 'AC') {
        clearCalculator();
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