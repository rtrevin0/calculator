var num1;
var operator;
var num2;

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

function updateNum1(value) {
    num1 = parseFloat(value);
}

function updateOperator(value) {
    operator = value;
}

function updateNum2(value) {
    num2 = parseFloat(value);
}

// Export functions for use in other modules
export { add, subtract, multiply, divide };