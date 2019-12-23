import Variable from './Variable'
import Terminal, { digits, functionNames } from './Terminal'

type Production = (Terminal | Variable)[]

// This had to be pulled out, as Typescript didn't seem to be able to
// implicitly work out that the '$' was okay. These are the reasonably common
// productions for something that could derive ε,and does when it hits close
// bracket of either kind
const productionsForEndings: ([Terminal | '$', Production])[] = [
  [Terminal.CloseCurvedBracket, []],
  [Terminal.CloseSquareBracket, []],
  ['$', []]
]

/**
 * Produce an array of key value pairs that maps the terminals that can start a
 * term (along with many other variables) to a given production. This is useful
 * as these values are repeated a few times.
 */
const termFirstsWith = (production: Production): [Terminal, Production][] => [
  Terminal.Plus, Terminal.Minus, Terminal.OpenCurvedBracket,
  Terminal.OpenSquareBracket, ...functionNames, Terminal.CapitalD,
  Terminal.LowerCaseD, ...digits
].map(terminal => [terminal, production])

const parseTable: Map<Variable, Map<Terminal | '$', Production>> = new Map([
  [Variable.S, new Map(termFirstsWith([Variable.E, Variable.M]))],
  [Variable.M, new Map([
    [Terminal.Comma, [Terminal.Comma, Variable.E, Variable.M]],
    ...productionsForEndings
  ])],
  [Variable.E, new Map(termFirstsWith([Variable.T, Variable.A]))],
  [Variable.A, new Map([
    [Terminal.Comma, []],
    [Terminal.Plus, [Terminal.Plus, Variable.E]],
    [Terminal.Minus, [Terminal.Minus, Variable.E]],
    ...productionsForEndings
  ])],
  [Variable.T, new Map(termFirstsWith([Variable.I, Variable.P, Variable.O]))],
  [Variable.O, new Map([
    ...[Terminal.Comma, Terminal.Plus, Terminal.Minus]
      .map((terminal): [Terminal, Production] => [terminal, []]),
    ...productionsForEndings,
    [Terminal.Times, [Terminal.Times, Variable.T]],
    [Terminal.Divide, [Terminal.Times, Variable.T]]
  ])],
  [Variable.I, new Map([
    [Terminal.Plus, [Terminal.Plus]],
    [Terminal.Minus, [Terminal.Minus]],
    ...[
      Terminal.OpenCurvedBracket, Terminal.OpenSquareBracket, ...functionNames,
      Terminal.CapitalD, Terminal.LowerCaseD, ...digits
    ].map((terminal): [Terminal, Production] => [terminal, []])
  ])],
  [Variable.P, new Map([
    [Terminal.OpenCurvedBracket, [Terminal.OpenCurvedBracket, Variable.E, Terminal.CloseCurvedBracket]],
    [Terminal.OpenSquareBracket, [Terminal.OpenSquareBracket, Variable.S, Terminal.CloseSquareBracket]],
    [Terminal.CapitalD, [Variable.V]],
    [Terminal.LowerCaseD, [Variable.V]],
    ...digits.map((digit): [Terminal, Production] => [digit, [Variable.V]]),
    ...functionNames.map((name): [Terminal, Production] => [name, [Variable.F]])
  ])],
  [Variable.F, new Map(functionNames.map(functionName => [functionName, [
    functionName,
    Terminal.OpenCurvedBracket,
    Variable.S,
    Terminal.CloseCurvedBracket
  ]]))],
  [Variable.V, new Map([
    [Terminal.CapitalD, [Terminal.CapitalD, Variable.N]],
    [Terminal.LowerCaseD, [Terminal.LowerCaseD, Variable.N]],
    ...digits
      .map((digit): [Terminal, Production] => [digit, [digit, Variable.R]])
  ])],
  [Variable.R, new Map([
    ...[
      Terminal.Comma, Terminal.Plus, Terminal.Minus, Terminal.Times,
      Terminal.Divide
    ].map((terminal): [Terminal, Production] => [terminal, []]),
    ...productionsForEndings,
    [Terminal.CapitalD, [Terminal.CapitalD, Variable.N]],
    [Terminal.LowerCaseD, [Terminal.LowerCaseD, Variable.N]]
  ])],
  [Variable.N, new Map(digits.map((digit): [Terminal, Production] => [
    digit, [Variable.D, Variable.G]
  ]))],
  [Variable.D, new Map(digits.map(digit => [digit, [digit]]))],
  [Variable.G, new Map([
    ...[
      Terminal.Comma, Terminal.Plus, Terminal.Minus, Terminal.Times,
      Terminal.Divide, Terminal.CapitalD, Terminal.LowerCaseD
    ].map((terminal): [Terminal, Production] => [terminal, []]),
    ...productionsForEndings,
    ...digits
      .map((digit): [Terminal, Production] => [digit, [Variable.D, Variable.G]])
  ])]
])

export default parseTable
