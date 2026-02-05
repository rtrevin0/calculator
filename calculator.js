class Calculator {
    static OPERATORS = ['+', '-', '*', '/'];
    static MAX_DISPLAY_LENGTH = 14;
    static FONT_SIZE_THRESHOLDS = {
        normal: 7,
        medium: 10,
        small: 14
    };
    constructor() {
        this.state = {
            num1 : undefined,
            operator : undefined,
            num2 : undefined,
            operatorPressed : false,
            computationCompleted : false
        };
    }

    get num1() { return this.state.num1; }

    get operator() { return this.state.operator; }

    get num2() { return this.state.num2; }

    get operatorPressed() { return this.state.operatorPressed; }

    get computationCompleted() { return this.state.computationCompleted; }

    set num1(value) { this.state.num1 = value; }

    set operator(value) { this.state.operator = value; }

    set num2(value) { this.state.num2 = value; }

    set operatorPressed(value) { this.state.operatorPressed = value; }

    set computationCompleted(value) { this.state.computationCompleted = value; }

    isValidOperator(value) {
        return this.operators.includes(value);
    }

    _add(x, y) { return x + y; }

    _subtract(x, y) { return x - y; }

    _multiply(x, y) { return x * y; }

    _divide(x, y) {
        if (y === 0) throw new Error("Cannot divide by zero");
        return x / y;
    }

    operate(operator, x, y) {
        switch (operator) {
            case '+':
                return this._add(x, y);
            case '-':
                return this._subtract(x, y);
            case '*':
                return this._multiply(x, y);
            case '/':
                return this._divide(x, y);
            default:
                throw new Error("Invalid operator");
        }
    }

    clear() {
        this.state = {
            num1: undefined,
            operator: undefined,
            num2: undefined,
            operatorPressed: false,
            computationCompleted: false
        };
    } 

    getDecimalPart(number) {
        const absoluteNumber = Math.abs(number);
        const integerPart = Math.trunc(absoluteNumber);
        const decimalPart = absoluteNumber - integerPart;
        return decimalPart;
    }
}