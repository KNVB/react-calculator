import React, { useReducer } from 'react';
import Calculator from './calculator/Calculator';
let reducer = (state, action) => {
  let result = { ...state };
  switch (action.type) {
    case 'getSolutions':
      result = { ...action.list };
      break;
    case 'updateItem':
      result.expressionList[action.index].expression = action.value;
      break;
    default:
      break;
  }
  return result;
};
export default function CalcluatorDemo() {
  const [objList, updateObjList] = useReducer(reducer, {
    expressionList: [
      { expression: '6!^2', steps: [] },
      { expression: '6*-(-2)+sin(30)', steps: [] },
      { expression: '1+2-3*4!/5^6', steps: [] },
      { expression: 'sin(-30)-50%', steps: [] },
      { expression: '-3-6.4+1', steps: [] },
      { expression: '(-1*0.3)', steps: [] },
      { expression: '((-1*0.3)+2^(6/8e+0))-5.9+3-4+1.3', steps: [] },
      { expression: '-1+2^(6/8e+0)', steps: [] },
      { expression: '((1+(2*3/4))+(4/5))', steps: [] },
      { expression: '6*-(-2e+1-3.5e-3)', steps: [] },
      { expression: '(1+(2-(3*(4/(5)))))', steps: [] },
      { expression: '1++2--2+-2-+2', steps: [] },
      { expression: '1**-2 ', steps: [] },
      { expression: '1//-2 ', steps: [] },
      { expression: '1^^-2 ', steps: [] },
      { expression: '1.2^(-2)', steps: [] },
      { expression: '2^-(6/8)', steps: [] },
      { expression: '6*-(-2)+sin(30)', steps: [] },
      { expression: 'max(0,3)', steps: [] },
      { expression: 'abcdE', steps: [] },
      { expression: 'cos(60)', steps: [] },
    ],
  });
  let getSolution = () => {
    let calculator = new Calculator();
    let temp = { expressionList: [] };
    objList.expressionList.forEach((item) => {
      try {
        let result = calculator.getSolution(item.expression);
        temp.expressionList.push({
          expression: item.expression,
          steps: result,
        });
      } catch (error) {
        temp.expressionList.push({
          expression: item.expression,
          steps: [error.message],
        });
        console.log(error.stack);
      }
    });
    updateObjList({ type: 'getSolutions', list: temp });
  };
  let handleChange = (index, value) => {
    updateObjList({ type: 'updateItem', index, value });
  };

  return (
    <table
      className="border-collapse-separate border border-dark">
      <thead>
        <tr>
          <td colSpan="2" className="border border-dark">
            Please enter an expression:
          </td>
        </tr>
      </thead>
      <tbody>
        {objList.expressionList.map((obj, index) => (
          <tr key={'exp_' + index}>
            <td className="border border-dark">
              <input
                onChange={(e) => handleChange(index, e.target.value)}
                type="text"
                value={obj.expression}
              />
            </td>
            <td className="border border-dark">
              {obj.steps.map((step, stepIndex) => (
                <div key={index + '_' + stepIndex}>{step}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2" className="border border-dark">
            <button onClick={getSolution}>Get Solution</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
