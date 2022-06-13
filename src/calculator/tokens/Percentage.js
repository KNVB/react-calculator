import Num from './Num';
import TokenType from '../TokenType';
export default class Percentage {
    constructor() {
        let operand;
        this.associative = "left";
        this.tokenType = TokenType.UNARYOPERATOR;
        this.operandCount = 1;
        this.precedence = 5;
        this.operatorString = "%";

        this.setOperand = (o) => {
            operand = o;
        }
        this.evaluate = (context) => {
            return new Num(operand.evaluate(context).value / 100);
        }
    }
}