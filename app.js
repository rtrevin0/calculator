const decimalButton = document.getElementById('decimal');
const result = document.getElementById('result');  

const calculator = new Calculator();

function handleButtonClick(value) {
    if (calculator.getComputationCompleted() && (!isNaN(value) || value === '.')) {
        calculator.clear();
        calculator.getComputationCompleted() = false;
        result.value = value;
        return;
    }

    if (calculator.getComputationCompleted() && calculator.getNum2() === undefined && (calculator.isValidOperator(value))) {
        calculator.setComputationCompleted = false;
    }

    if (value === '<') {
        if (calculator.getComputationCompleted()) {
            if (result.value.length > 1) {
                result.value = result.value.slice(0, -1);
                calculator.setComputationCompleted = false;
                calculator.setNum1(undefined);
            } else {
                calculator.clear();
                result.value = '0';
            }
        } else if (!calculator.getOperatorPressed) {
            if (result.value.length > 1) {
                result.value = result.value.slice(0, -1);
            } else {
                result.value = '0';
            }

            if (calculator.getNum1 !== undefined && calculator.getOperator() === undefined) {
                calculator.setNum1(parseFloat(result.value));
            } else if (calculator.getNum2 !== undefined) {
                calculator.setNum2(parseFloat(result.value));
            }
        }
        return;
    }


    if (!isNaN(value) || value === '.') {
        if (calculator.getOperatorPressed()) {
            result.value = '';
            calculator.setOperatorPressed(false);
            result.value += value;
            if (calculator.getNum1() !== undefined) {
                calculator.setNum2(parseFloat(result.value));
            }
        } else {
            if (result.value === '0' && value !== '.') {
                result.value = '';
            }
            result.value += value;
        }
    } else if (calculator.isValidOperator(value)) {
        if (calculator.getNum1() === undefined) {
            calculator.setNum1(parseFloat(result.value));
        } 
        calculator.setOperator(value);
        calculator.setOperatorPressed(true);
    } else if (value === '=') {
        if (calculator.getOperator() && calculator.getNum1() !== undefined) {
            calculator.setNum2(parseFloat(result.value));
            if (calculator.getNum2() === undefined) {
                return;
            }
            try {
                const computation = calculator.operate(operator, num1, num2);
                let roundedComputation
                let decimalPart = calculator.getDecimalPart(computation);
                if (decimalPart === 0) {
                    roundedComputation = computation.toFixed(0);
                } else {
                    console.log("Decimal part: " + decimalPart);
                    roundedComputation = computation.toFixed(8);
                }
                result.value = roundedComputation;
                calculator.setNum1(computation);
                calculator.setOperator(undefined);
                calculator.setOperatorPressed(false);
                calculator.setNum2(undefined);
                calculator.setComputationCompleted(true);
            } catch (error) {
                alert(error.message);
                calculator.clear();
                return;
            }
        }
    } else if (value === 'AC') {
        calculator.clear();
    }
    
    if (result.value.includes('.') && !calculator.getComputationCompleted() && !calculator.getOperatorPressed()) {
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

function resetCalculator() {
    calculator.clear();
    if (typeof window !== 'undefined') {
        result.value = '0';
        decimalButton.disabled = false;
        result.style.fontSize = '1.75em';
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
window.onload = calculator.clear();