class CalculatorController {
    constructor(calculator) {
        this.calculator = calculator;
        this.result = document.getElementById('result');  
        this.decimalButton = document.getElementById('decimal');
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // button click handlers
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', () => {
                this.handleButtonClick(button.dataset.id);
            });
        });

        // keyboard input handler
        document.addEventListener('keydown', (event) => {
            this.handleKeydown(event);
        });

        window.onLoad = () => this.clear();
    }

    handleButtonClick(value) {
        try {
            switch (value) {
                case 'AC':
                    this.clear();
                    break;
                case '<':
                    this.handleBackspace();
                    break;
                case '=':
                    this.handleEquals();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    this.handleOperator(value);
                    break;
                // handle other button clicks
                default:
                    this.handleNumberInput(value);
            }
            this.updateUI();
        } catch (error) {
            this.showError(error.message);
        }
    }

    handleNumberInput(value) {
        if (this.calculator.computationCompleted) {
            this.clear();
            this.calculator.computationCompleted = false;
            this.result.value = value;
            return;
        }

        if (this.calculator.operatorPressed) {
            this.result.value = value;
            this.calculator.operatorPressed = false;
        }

        if (this.result.value === '0' && value !== '.') {
            this.result.value = '';
        }
        this.result.value += value;

        if (this.calculator.num1 !== undefined) {
            this.calculator.num2 = parseFloat(this.result.value);
        }
    }

    handleBackspace() {
        if (this.calculator.computationCompleted) {
            if (this.result.value.length > 1) {
                this.result.value = this.result.value.slice(0, -1);
                this.calculator.num1 = parseFloat(this.result.value);
            } else {
                this.clear();
            }
        } else {
            if (this.result.value.length > 1) {
                this.result.value = this.result.value.slice(0, -1) ?? '0';
            } 
        }
    }

    handleOperator(value) {
        if (this.calculator.num1 === undefined) {
            this.calculator.num1 = parseFloat(this.result.value);
        } 
        this.calculator.operator = value;
        this.calculator.operatorPressed = true;
    }

    handleEquals() {
        if (this.calculator.operator && this.calculator.num1 !== undefined) {
            this.calculator.num2 = parseFloat(this.result.value);
            if (this.calculator.num2 === undefined) {
                return;
            }
            const computation = this.calculator.operate(this.calculator.operator, this.calculator.num1, this.calculator.num2);
            const roundedComputation = this.roundResult(computation);
            this.result.value = roundedComputation;
            this.calculator.num1 = computation;
            this.calculator.operator = undefined;
            this.calculator.operatorPressed = false;
            this.calculator.num2 = undefined;
            this.calculator.computationCompleted = true;
        }
    }

    roundResult(number) {
        const decimalPart = this.getDecimalPart(number);
        return decimalPart === 0 
            ? number.toFixed(0) 
            : number.toFixed(8);
    }

    getDecimalPart(number) {
        const absoluteNumber = Math.abs(number);
        const integerPart = Math.trunc(absoluteNumber);
        return absoluteNumber - integerPart;
    }

    clear() {
        this.calculator.clear();
        this.result.value = '0';
        this.decimalButton.disabled = false;
        this.result.style.fontSize = '1.75em';
    }

    updateUI() {
        // Update decimal button state
        const hasDecimal = this.result.value.includes('.');
        this.decimalButton.disabled = hasDecimal && 
            !this.calculator.computationCompleted && 
            !this.calculator.operatorPressed;

        // Update font size
        this.updateFontSize();
    }

    updateFontSize() {
        const length = this.result.value.length;
        if (length > Calculator.FONT_SIZE_THRESHOLDS.normal && length <= Calculator.FONT_SIZE_THRESHOLDS.medium) {
            this.result.style.fontSize = '1.5em';
        } else if (length > Calculator.FONT_SIZE_THRESHOLDS.medium && length <= Calculator.FONT_SIZE_THRESHOLDS.small) {
            this.result.style.fontSize = '1em'; 
        } else if (length > Calculator.FONT_SIZE_THRESHOLDS.small) {
            this.result.style.fontSize = '0.75em';
        } else {
            this.result.style.fontSize = '1.75em';
        }
    }

    showError(message) {
        alert(message);
        this.clear();
    }

    handleKeydown(event) {
        const keyMap = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '.': '.', '+': '+', '-': '-', '*': '*', '/': '/',
            'Enter': '=', 'Backspace': '←', 'Escape': 'AC'
        };

        const value = keyMap[event.key];
        if (value) {
            this.handleButtonClick(value);
        }
    }

    isValidIn
}