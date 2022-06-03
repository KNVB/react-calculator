import Num from './Num';
import TokenType from '../TokenType';
export default class Max {
	constructor(){
		this.associative ="left";
		this.tokenType = TokenType.FUNCTION;
		this.operandCount=2;
		this.precedence = 5;
		this.operatorString="max";		
	}
	setOperand(operands) {
		this.operands= operands;
	}

	evaluate(context) {
		let valueList=[];
		for (let i=0;i<this.operands.length;i++){
			valueList.push(this.operands[i].evaluate(context).value);
		}
		let result=new Num(Math.max(...valueList));
		return result;
	}
}