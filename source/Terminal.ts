enum Terminal {
  Comma = ',',
  Plus = '+',
  Minus = '-',
  OpenCurvedBracket = '(',
  CloseCurvedBracket = ')',
  OpenSquareBracket = '[',
  CloseSquareBracket = ']',
  Min = 'min',
  Max = 'max',
  Repeat = 'repeat',
  Sum = 'sum',
  Times = '*',
  Divide = '/',
  CapitalD = 'D',
  LowerCaseD = 'd',
  Zero = '0',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9'
}

export default Terminal

export const isTerminal = (maybeTerminal: any): maybeTerminal is Terminal =>
  Object.values(Terminal).includes(maybeTerminal)

export const digits = [
  Terminal.Zero,
  Terminal.One,
  Terminal.Two,
  Terminal.Three,
  Terminal.Four,
  Terminal.Five,
  Terminal.Six,
  Terminal.Seven,
  Terminal.Eight,
  Terminal.Nine
]

export const functionNames = [
  Terminal.Min, Terminal.Max, Terminal.Repeat, Terminal.Sum
]
