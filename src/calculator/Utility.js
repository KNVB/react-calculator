import Add from './tokens/Add';
import Cos from './tokens/Cos';
import CloseBracket from './tokens/CloseBracket';
import Divide from './tokens/Divide';
import Max from './tokens/Max';
import Minus from './tokens/Minus';
import Multiply from './tokens/Multiply';
import Num from './tokens/Num';
import OpenBracket from './tokens/OpenBracket';
import Power from './tokens/Power';
import Reg from './Reg';
import Sin from './tokens/Sin';
import TokenType from './TokenType';
export default class Utility {
  /***********************************************************************
   *  Base on the token to instantiate an operator object                *
   ***********************************************************************/
  static getObj = (token) => {
    let result = null;
    try {
      switch (token.toLowerCase()) {
        case '+':
          result = new Add();
          break;
        case '/':
          result = new Divide();
          break;
        case '-':
          result = new Minus();
          break;
        case '*':
          result = new Multiply();
          break;
        case '^':
          result = new Power();
          break;
        case '(':
          result = new OpenBracket();
          break;
        case ')':
          result = new CloseBracket();
          break;
        case 'cos':
          result = new Cos();
          break;
        case 'max':
          result = new Max();
          break;
        case 'sin':
          result = new Sin();
          break;
        default:
          throw new Error('Token ' + token + ' is undefined.');
          break;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  /***********************************************************************
   *  Get the inner most bracket content                                 *
   ***********************************************************************/
  static getInnerMostBracketContent=(myExp)=>{
    let temp=myExp.match(Reg.innerMostBracketContentPattern);
    if (temp==null){
      return temp
    }else {
      return temp[0]
    }
  }
  /***********************************************************************
   *  Validate the given expression                                      *
   ***********************************************************************/
  static isValidExpression = (exp) => {
    if (Reg.invalidDecimalPointPattern.test(exp)) {
      throw new Error('The expression contains invalid decimal point pattern(s)');
    }
    if (exp.indexOf('..') > -1) {
      throw new Error('The expression contains 2 decimal point pattern(s)');
    }
    if (Reg.invalidEndsWithPattern.test(exp)) {
      throw new Error('The expression contains ends with invalid character(s)');
    }
    return true;
  };
  /******************************************************************
   * Tokenize the given expression                                  *
   ******************************************************************/
  static tokenize = (expression) => {
    let bracketCount = 0,
      flag,
      i;
    let preObj,
      operands,
      temp = '';
    let startIndex = 0,
      index = -1;
    let token,
      tokensQueue = [];
    preObj = '';
    operands = expression.match(Reg.noPattern);
    console.log('operands=' + operands + ',' + (operands == null));
    if (operands == null) {
      throw new Error('The entered expression has no operand (i.e. number).');
    } else {
      operands.forEach((operand) => {
        console.log('operand=' + operand);
        index = expression.indexOf(operand, startIndex);
        flag = true;
        for (i = startIndex; i < index; i++) {
          token = expression.substr(i, 1).trim();
          switch (token) {
            case '':
              break;
            case '+':
            case '-':
              preObj = tokensQueue[tokensQueue.length - 1];
              console.log('preObj=' + preObj + ',token=' + token);
              if (
                preObj === undefined ||
                preObj.tokenType === TokenType.OPENBRACKET ||
                preObj.tokenType === TokenType.OPERATOR
              ) {
                tokensQueue.push(new Num(token + operand));
                flag = false;
              } else {
                tokensQueue.push(Utility.getObj(token));
              }
              break;
            case '(':
              bracketCount++;
              if (temp !== '') {
                tokensQueue.push(Utility.getObj(temp));
                temp = '';
              }
              tokensQueue.push(Utility.getObj(token));
              break;
            case ')':
              bracketCount--;
              tokensQueue.push(Utility.getObj(token));
              break;
            case '*':
            case '/':
            case '^':
              tokensQueue.push(Utility.getObj(token));
              break;
            default:
              temp += token;
              break;
          }
        }

        if (flag) {
          flag = true;
          tokensQueue.push(new Num(operand));
        }
        startIndex = index + operand.length;
      });
      for (i = startIndex; i < expression.length; i++) {
        token = expression.substr(i, 1);
        switch (token) {
          case '(':
            bracketCount++;
            break;
          case ')':
            bracketCount--;
            break;
          default:break;  
        }
        tokensQueue.push(Utility.getObj(token));
      }
      if (bracketCount !== 0) {
        if (bracketCount > 0) {
          throw new Error('The entered expression missing ).');
        } else {
          throw new Error('The entered expression missing (.');
        }
      }
      return tokensQueue;
    }
  };
}
