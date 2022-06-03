import TokenType from '../TokenType';
export default class Num {
  constructor(value) {
    this.value = value;
    this.tokenType=TokenType.NUMBER;
  }

  evaluate(context) {
    return this;
  }
}
