import BaseNode from './nodes/base-node'
import NumberNode from './nodes/number-node'
import BinaryOperationNode from './nodes/binary-operation-node'

import SweetRollsError from './exceptions/sweet-rolls-error'
import SweetRollsSyntaxError from './exceptions/sweet-rolls-syntax-error'

import BinaryOperator from './binaryOperator'

import BINARY_OPERATORS from './binaryOperators'

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
   * @returns {BaseNode} The root of the tree resulting from the parse. Calling
   * run() on this node will evaluate the input.
   */
  public parse (): BaseNode {
    this.positionInInput = 0

    return this.parseExpression(false)
  }

  private next (): string {
    return this.input[this.positionInInput]
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

  private consumeNumber (): number {
    const startPosition = this.positionInInput

    let stringOfNumber = ''

    while (DIGITS.includes(this.next())) {
      stringOfNumber += this.consumeCharacter()
    }

    if (!stringOfNumber) this.throwExpectionError('number', startPosition)

    return parseInt(stringOfNumber)
  }

  private parseExpression (isBracketed: boolean): BaseNode {
    const termNode = this.parseTerm()

    let finished = this.finished()
    if (isBracketed && this.next() === ')') {
      finished = true
      this.consumeCharacter()
    }
    if (finished) return termNode

    const binaryOperationNode = this.parseRestOfBinaryOperation(termNode)

    if (isBracketed && this.next() === ')') this.consumeCharacter()

    return binaryOperationNode
  }

  private parseTerm (): BaseNode {
    if (this.next() === '(') {
      this.consumeCharacter()
      return this.parseExpression(true)
    }
    return this.parseNumber()
  }

  private parseNumber (): NumberNode {
    const number = this.consumeNumber()
    return new NumberNode(number)
  }

  private parseRestOfBinaryOperation (
    leftNode: BaseNode
  ): BinaryOperationNode {
    const startPosition = this.positionInInput

    if (!BINARY_OPERATORS.includes(this.next())) {
      this.throwExpectionError('one of ' + BINARY_OPERATORS, startPosition)
    }

    const operator: BinaryOperator = this.consumeCharacter() as BinaryOperator

    let rightNode: BaseNode
    try {
      rightNode = this.parseTerm()
    } catch (error) {
      if (!(error instanceof SweetRollsError)) throw Error
      this.throwExpectionError('number', startPosition)
    }

    return new BinaryOperationNode(leftNode, operator, rightNode)
  }
}
