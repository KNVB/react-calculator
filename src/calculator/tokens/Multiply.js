import Num from './Num';
import TokenType from '../TokenType';
export default class Multiply{
  constructor(){
		this.associative ="left";
		this.tokenType = TokenType.OPERATOR;
		this.operandCount=2;
		this.precedence = 3;
		this.operatorString="*";		
	}
	setOperand(left, right) {
		this.left = left;
		this.right = right;   
	}

	evaluate(context) {
		return new Num(
			this.left.evaluate(context).value * this.right.evaluate(context).value
		);
	}
}