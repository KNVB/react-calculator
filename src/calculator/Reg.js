export default class Reg{
  static doubleSignPattern=/[+-]{2}/i
  static innerMostBracketContentPattern = /(?<![a-zA-Z])\([^()]*\)/i; //extract innermost bracket content
  static invalidCharacterPattern=/[^a-zA-Z+\-*/\d%!.^()]/ig;
  static invalidDecimalPointPattern=/\.\d+\./ig;    //2 decimal point between nos is not allowed	
  static invalidEndsWithPattern=/[^%!\d)]$/i; //The expression must be ends with number or right bracket  
  static noPattern = /\d+(\.\d+)?(e{1}[+-]?\d+)?/ig;//create real no. pattern for extract no. from the given expression  
}