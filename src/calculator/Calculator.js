import Context from './Context';
import Reg from './Reg';
import TokenType from './TokenType';
import Utility from './Utility';
export default class Calculator {
  constructor() {
    let steps = [];
    this.getSolution = (expression) => {
      expression = expression.replace(/ /g, ''); //trim the expression
      if (Utility.isValidExpression(expression)){
        steps = [expression];
        console.log('==============================================');
        console.log('getSolution:0:expression=' + expression);

        resolveBracket(); // Resolve All Bracket in the given expression
        calculate(steps[steps.length - 1]); //Calculate the rest of the given expression
        console.log('==============================================');
      }
      return steps;
    };
    //=======================================================================================
    /**************************************************************
     * Calculate an expression that has no bracket                 *
     **************************************************************/
    let calculate = (expression) => {
      expression = simplify(expression);
      console.log('calculate:10:expression=' + expression);
      let tokensQueue = Utility.tokenize(expression);
      console.log('calculate:20:tokensQueue=' + JSON.stringify(tokensQueue));
      let shuntingYardQueue = shuntingYard(tokensQueue);
      console.log(
        'calculate:30:shuntingYardQueue=' + JSON.stringify(shuntingYardQueue)
      );
      return rPN(shuntingYardQueue);
    };
    /********************************************************************************
    *	Resolve All Bracket in the given expression                                   *
    ********************************************************************************/	
    let resolveBracket = () => {
      let myExp = steps[steps.length - 1];
      let innerMostBracketContents;
      innerMostBracketContents = Utility.getInnerMostBracketContent(myExp);
      if (innerMostBracketContents == null) {
        return;
      } else {
        let result = calculate(innerMostBracketContents);
        console.log('result=' + JSON.stringify(result));
        myExp = myExp.replace(innerMostBracketContents, result[0].value);
        steps.push(myExp);
        resolveBracket();
      }
    };
    /*************************************************************************
     *	Calculate the result from RPN and recording the calculation steps    *
     *	URL:http://en.wikipedia.org/wiki/Reverse_Polish_Notation             *
     *************************************************************************/
    let rPN = (shuntingYardQueue) => {
      let calculationQueue = [],
        myX;
      let operand1, operand2, result;
      shuntingYardQueue.forEach((token) => {
        let context = new Context();
        let temp = '';
        console.log('rPN token=' + JSON.stringify(token));
        switch (token.tokenType) {
          case TokenType.FUNCTION:
            let operandList = [];
            for (let i = 0; i < token.operandCount; i++) {
              operandList.push(calculationQueue.pop());
            }
            token.setOperand(operandList);
            result = token.evaluate(context);
            while (operandList.length) {
              temp = temp + operandList.pop().value + ',';
            }
            temp = temp.substring(0, temp.length - 1);
            console.log(
              'rPN1:' +
                token.operatorString +
                '(' +
                temp +
                ')' +
                '=' +
                result.value
            );
            myX = steps[steps.length - 1];
            myX = myX.replace(
              token.operatorString + '(' + temp + ')',
              result.value
            );
            steps.push(myX);
            calculationQueue.push(result);
            break;
          case TokenType.NUMBER:
            calculationQueue.push(token);
            break;
          case TokenType.OPERATOR:
            operand2 = calculationQueue.pop();
            operand1 = calculationQueue.pop();
            if (operand1 != null && operand2 != null) {
              token.setOperand(operand1, operand2);
              myX = steps[steps.length - 1];
              console.log(
                'rPN0:' +
                  'myX:' +
                  myX +
                  ',' +
                  JSON.stringify(operand1) +
                  token.operatorString +
                  JSON.stringify(operand2)
              );
              result = token.evaluate(context);
              console.log(
                'rPN1:' +
                  'myX:' +
                  myX +
                  ',' +
                  operand1.value +
                  token.operatorString +
                  operand2.value +
                  '=' +
                  result.value
              );
              myX = myX.replace(
                operand1.value + token.operatorString + operand2.value,
                result.value
              );
              steps.push(myX);
              calculationQueue.push(result);
            } else {
              throw new Error('The expression is missing operand.');
            }
            break;
        }
      });
      return calculationQueue;
    };
    /********************************************************************************************************
     *	Perform shunting yard operation to create RPN (Reverse Polish notation) for the inputted expression *
     *	URL:http://en.wikipedia.org/wiki/Shunting-yard_algorithm											*
     ********************************************************************************************************/
    let shuntingYard = (tokensQueue) => {
      let operatorStack = [];
      let resultQueue = [];

      tokensQueue.forEach((tokenObj) => {
        let preObj;
        switch (tokenObj.tokenType) {
          case TokenType.FUNCTION:
          case TokenType.OPENBRACKET:
            operatorStack.push(tokenObj);
            break;
          case TokenType.OPERATOR:
            while (operatorStack.length > 0) {
              preObj = operatorStack[operatorStack.length - 1];
              if (
                (tokenObj.associative == 'left' &&
                  tokenObj.precedence <= preObj.precedence) ||
                (tokenObj.associative == 'right' &&
                  tokenObj.precedence < preObj.precedence)
              ) {
                resultQueue.push(operatorStack.pop());
                continue;
              }
              break;
            }
            operatorStack.push(tokenObj);
            break;
          case TokenType.CLOSEBRACKET:
            let foundOpenBracket = false;
            while (operatorStack.length > 0 && !foundOpenBracket) {
              preObj = operatorStack.pop();
              console.log('preObj=' + JSON.stringify(preObj));
              if (preObj.tokenType === TokenType.OPENBRACKET) {
                foundOpenBracket = true;
              } else {
                resultQueue.push(preObj);
              }
            }
            if (!foundOpenBracket) {
              throw 'Missing "("';
            }
            break;
          case TokenType.NUMBER:
            resultQueue.push(tokenObj);
            break;
        }
      });
      resultQueue = resultQueue.concat(operatorStack.reverse());
      return resultQueue;
    };
    /******************************************************************
     * Simplify operators in the given expression                     *
     ******************************************************************/
    let simplify = (myX) => {
      let targets = myX.match(Reg.doubleSignPattern);
      if (targets == null) {
        return myX;
      } else {
        targets.forEach((target) => {
          console.log('simplify:0:myX=' + myX);
          switch (target) {
            case '++':
            case '--':
              myX = myX.replace(target, '+');
              steps.push(myX);
              break;
            case '+-':
            case '-+':
              myX = myX.replace(target, '-');
              steps.push(myX);
              break;
          }
          console.log('simplify:1:myX=' + myX);
        });
        return simplify(myX);
      }
    };    
  }
}
