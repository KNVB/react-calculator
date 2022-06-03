import Num from './Num';
import TokenType from '../TokenType';
export default class Add {
	constructor(){
		this.associative ="left";
		this.tokenType = TokenType.OPERATOR;
		this.operandCount=2;
		this.precedence = 2;
		this.operatorString="+";		
	}
	setOperand(left, right) {
		this.left = left;
		this.right = right;   
	}

	evaluate(context) {
		let result=new Num(
			Number(this.left.evaluate(context).value) + Number(this.right.evaluate(context).value)
		);
		console.log(this.left.evaluate(context).value+"+"+this.right.evaluate(context).value+"="+result.value); 
		return result;
	}
}