import Num from './Num';
import TokenType from '../TokenType';
export default class Power{
  constructor(){
		this.associative ="right";
		this.tokenType = TokenType.BINARYOPERATOR;
		this.operandCount=2;
		this.operatorString="^";
		this.precedence = 4;		
	}
	setOperand(left, right) {
		this.left = left;
		this.right = right;   
	}

	evaluate(context) {
		return new Num(
			Math.pow(this.left.evaluate(context).value, this.right.evaluate(context).value)
		);
	}
}