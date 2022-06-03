import Num from './Num';
import TokenType from '../TokenType';
export default class Sin {
	constructor(){
		this.associative ="left";
		this.tokenType = TokenType.FUNCTION;
		this.operandCount=1;
		this.precedence = 5;
		this.operatorString="sin";		
	}
	setOperand(degree) {
		this.degree = degree[0];
		
	}

	evaluate(context) {
		let result=new Num(
			Math.sin(this.degree.evaluate(context).value*Math.PI/180)
		);
		
		return result;
	}
}