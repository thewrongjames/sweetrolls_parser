enum Variable {
  S = 'sequence of expressions',
  M = 'maybe more expressions',
  E = 'expression',
  A = 'maybe the rest of a plus or minus operation',
  T = 'term',
  O = 'maybe the rest of a times or divide operation',
  I = 'maybe plus or minus',
  P = 'term without a sign',
  F = 'function call',
  V = 'value',
  R = 'maybe a die roll',
  N = 'whole number',
  D = 'digit',
  G = 'maybe more digits'
}

export default Variable

export const isVariable = (maybeVariable: any): maybeVariable is Variable =>
  Object.values(Variable).includes(maybeVariable)
