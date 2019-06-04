import IndividualNode from './nodes/individual-node'
import SequenceNode from './nodes/sequence-node'
import NumberNode from './nodes/number-node'
import BinaryOperationNode from './nodes/binary-operation-node'
import NegativeNode from './nodes/negative-node'
import FunctionNode from './nodes/function-node'
import RollNode from './nodes/roll-node'

import SweetRollsError from './exceptions/sweet-rolls-error'
import SweetRollsSyntaxError from './exceptions/sweet-rolls-syntax-error'

import BinaryOperator from './binaryOperator'
import BINARY_OPERATORS from './binaryOperators'
import { FUNCTION_NAME_CHARACTERS, functionNameMappings } from './functions'

const ERROR_CONTEXT_LENGTH = 10
const DIGITS = '0123456789'

/**
 * An object oriented parser for the SweetRolls language. It takes a string to
 * parse on construction, and builds and returns a constructed node tree at a
 * call to parse().
 */
export default class Parser {
  input: string
  positionInInput = 0

  /**
   * Make a parser.
   * @param {string} input The string that this parser will parse.
   */
  constructor (input: string) {
    this.input = input
  }

  /**
   * Parse the input assigned to this parser.
   * @returns {SequenceNode} The root of the tree resulting from the parse.
   * Calling run() on this node will evaluate the input.
   */
  public parse (): SequenceNode {
    this.positionInInput = 0

    const result = this.parseSequence(false)
    if (this.next()) this.throwExpectionError('end of input', 0)

    return result
  }

  /**
   * Return the next unconsumed character in the input. Return null if there are
   * no characters left.
   * @returns {string} The next unconsumed character in the input, or null if
   * there are none left.
   */
  private next (): string {
    const nextCharacter =
      this.input.substring(this.positionInInput, this.positionInInput + 1)
    return nextCharacter || null
  }

  private finished (): boolean {
    return this.positionInInput === this.input.length
  }

  private consumeCharacter (): string {
    if (!this.next()) {
      throw new SweetRollsSyntaxError(
        `Unexpected end of input at ${this.positionInInput}`
      )
    }

    const consumedCharacter = this.next()
    this.positionInInput += 1
    return consumedCharacter
  }

  /**
   * Consume the next character in the input if it is equal to the given
   * character.
   * @param character The character to maybe consume.
   * @returns {boolean} Whether or not the next character was the given
   * character (and hence whether or not it was consumed).
   */
  private consumeCharacterIfItIs (character: string): boolean {
    if (this.next() !== character) return false
    this.consumeCharacter()
    return true
  }

  private consumeCharactersInString (
    acceptableCharacters: string, name: string
  ): string {
    const startPosition = this.positionInInput

    let consumedString = ''

    while (acceptableCharacters.includes(this.next())) {
      consumedString += this.consumeCharacter()
    }

    if (!consumedString) this.throwExpectionError(name, startPosition)

    return consumedString
  }

  /**
   * Throw a syntax error informing the user of what was received and what was
   * expected. Reset the position in the parse before doing it though, in case
   * this is going to be caught internally after a failed parse attempt of an
   * optional component.
   * @param {string} expected What to tell the user was expected at this
   * position.
   * @param {number} resetTo The position to move the parse back to just before
   * throwing the error.
   */
  private throwExpectionError (expected: string, resetTo: number): never {
    const invalidInput = this.input.substring(
      this.positionInInput, this.positionInInput + ERROR_CONTEXT_LENGTH
    )
    const errorContext = invalidInput ? `'${invalidInput}'` : 'end of input'
    const errorPosition = this.positionInInput
    this.positionInInput = resetTo
    throw new SweetRollsSyntaxError(
      `Expected ${expected} but got ${errorContext} at ${errorPosition}`
    )
  }

  private parseSequence (isBracketed: boolean): SequenceNode {
    const startPosition = this.positionInInput

    const individualNodes: IndividualNode[] = []
    do {
      individualNodes.push(this.parseExpression(false))
    } while (this.consumeCharacterIfItIs(','))

    if (isBracketed && !this.consumeCharacterIfItIs(')')) {
      this.throwExpectionError(')', startPosition)
    }

    return new SequenceNode(individualNodes)
  }

  private parseExpression (isBracketed: boolean): IndividualNode {
    const startPosition = this.positionInInput

    const termNode = this.parseTerm()

    let finished = this.finished() || this.next() === ',' || this.next() === ')'

    // We have reached what should be the end of an expression (the end of input
    // or a comma) but we didn't close the brackets containing this expression
    // first.
    if (finished && isBracketed) this.throwExpectionError(')', startPosition)

    if (isBracketed && this.consumeCharacterIfItIs(')')) {
      finished = true
    }
    if (finished) return termNode

    const binaryOperationNode = this.parseRestOfBinaryOperation(termNode)

    if (isBracketed && !this.consumeCharacterIfItIs(')')) {
      this.throwExpectionError(')', startPosition)
    }

    return binaryOperationNode
  }

  private parseTerm (): IndividualNode {
    const isNegative = this.consumeCharacterIfItIs('-')
    const makeResult = (node: IndividualNode) =>
      isNegative ? new NegativeNode(node) : node

    if (this.next() === '(') {
      this.consumeCharacter()
      return makeResult(this.parseExpression(true))
    }

    let numberNode: NumberNode
    try {
      numberNode = this.parseNumber()
      if (
        this.consumeCharacterIfItIs('d') || this.consumeCharacterIfItIs('D')
      ) {
        return makeResult(this.parseRestOfRoll(numberNode))
      }
    } catch (error) {
      if (!(error instanceof SweetRollsSyntaxError)) throw error
    }

    if (numberNode) return makeResult(numberNode)
    return makeResult(this.parseFunctionCall())
  }

  private parseNumber (): NumberNode {
    const number = parseInt(this.consumeCharactersInString(DIGITS, 'number'))
    return new NumberNode(number)
  }

  private parseRestOfRoll (diceNumberNode: NumberNode): RollNode {
    return new RollNode(diceNumberNode, this.parseNumber())
  }

  private parseFunctionCall (): FunctionNode {
    let startPosition = this.positionInInput
    const functionName = this.consumeCharactersInString(
      FUNCTION_NAME_CHARACTERS, 'function name'
    )
    if (!functionNameMappings[functionName]) {
      this.throwExpectionError('function', startPosition)
    }

    if (!this.consumeCharacterIfItIs('(')) {
      this.throwExpectionError('function', startPosition)
    }

    const argumentNodes: Array<IndividualNode | SequenceNode> = []
    do {
      let argumentNode: IndividualNode | SequenceNode
      if (this.consumeCharacterIfItIs('(')) {
        argumentNode = this.parseSequence(true)
      } else {
        argumentNode = this.parseExpression(false)
      }
      argumentNodes.push(argumentNode)
    } while (this.consumeCharacterIfItIs(','))

    if (!this.consumeCharacterIfItIs(')')) {
      this.throwExpectionError('function', startPosition)
    }

    return new functionNameMappings[functionName](argumentNodes)
  }

  private parseRestOfBinaryOperation (
    leftNode: IndividualNode
  ): BinaryOperationNode {
    const startPosition = this.positionInInput

    if (!BINARY_OPERATORS.includes(this.next())) {
      this.throwExpectionError('one of ' + BINARY_OPERATORS, startPosition)
    }

    const operator: BinaryOperator = this.consumeCharacter() as BinaryOperator

    let rightNode: IndividualNode
    try {
      rightNode = this.parseTerm()
    } catch (error) {
      if (!(error instanceof SweetRollsError)) throw Error
      this.throwExpectionError('number', startPosition)
    }

    return new BinaryOperationNode(leftNode, operator, rightNode)
  }
}
