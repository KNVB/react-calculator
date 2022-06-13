import Num from './Num';
import TokenType from '../TokenType';
export default class Factorial {
    constructor() {
        let operand;
        this.associative = "left";
        this.tokenType = TokenType.UNARYOPERATOR;
        this.operandCount = 1;
        this.precedence = 5;
        this.operatorString = "!";
        this.setOperand = (o) => {
            operand = o;
        }
        this.evaluate = (context) => {
            if (Number.isInteger(Number(operand.value)) && operand.value > 0) {
                return new Num(factorial(operand.evaluate(context).value));
            } else {
                throw new Error("The operand is not a positive integer.")
            }
        }

        let factorial = (n) => {
            let answer = 1;
            if (n === 0 || n === 1) {
                return answer;
            } else {
                for (let i = n; i >= 1; i--) {
                    answer = answer * i;
                }
                return answer;
            }
        }
    }
}