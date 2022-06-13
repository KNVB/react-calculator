import Num from './Num';
import TokenType from '../TokenType';
export default class Minus{
  constructor(){
		this.associative ="left";
		this.tokenType = TokenType.BINARYOPERATOR;
		this.operandCount=2;
		this.precedence = 2;
		this.operatorString="-";		
	}
	setOperand(left, right) {
		this.left = left;
		this.right = right;   
	}

	evaluate(context) {
		return new Num(
			this.left.evaluate(context).value - this.right.evaluate(context).value
		);
	}
}