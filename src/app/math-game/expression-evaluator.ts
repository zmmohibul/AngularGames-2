export class ExpressionEvaluator {
    private static validNumbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    private static validSymbols: string[] = ['+', '-', '*']

    public static infixToPostfix(expression: string) {
        let postfixExpression = '';
        const operatorStack: string[] = [];

        for (let i = 0; i < expression.length; i++) {
            let op: string = expression[i];
            
            if (!this.validSymbols.includes(op) && !this.validNumbers.includes(op) && op !== ' ') {
                console.log(op);
                
                throw new Error('Invalid expression');
            }
            
            if (this.validNumbers.includes(op)) {
                postfixExpression += op;
            } else if (this.validSymbols.includes(op)) {
                while (operatorStack.length > 0) {
                    let lastOp = operatorStack.pop();
                    if (['+', '-'].includes(op)) {
                        if (['*', '/', '+', '-'].includes(lastOp!)) {
                            postfixExpression += lastOp;
                        }
                    } else if (['*', '/'].includes(op)) {
                        if ( ['*', '/',].includes(lastOp!)) {
                            postfixExpression += lastOp;
                        } else {
                            operatorStack.push(lastOp!)
                            break;
                        }
                    }
                }
                operatorStack.push(op);
            }
        }

        while (operatorStack.length > 0) {
            postfixExpression += operatorStack.pop();
        }

        return postfixExpression;
    }

    public static evaluateInfixExpression(expression: string) {
        const operandStack: number[] = [];

        for (let i = 0; i < expression.length; i++) {
            let op = expression[i];

            if (this.validNumbers.includes(op)) {
                operandStack.push(parseFloat(op));
            } else if (this.validSymbols.includes(op)) {
                let operand1 = operandStack.pop();
                let operand2 = operandStack.pop();
                let result = 0;

                if (op === '+') {
                    result = operand2! + operand1!;
                } else if (op === '-') {
                    result = operand2! - operand1!;
                } else if (op === '*') {
                    result = operand2! * operand1!;
                } else if (op === '/') {
                    result = operand2! / operand1!;
                }

                operandStack.push(result);
            }
        }
        
        return operandStack.pop();
    }

    public static evaluate(expression: string) {
        return this.evaluateInfixExpression(this.infixToPostfix(expression));
    }
}
