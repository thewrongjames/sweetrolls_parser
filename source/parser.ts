import BaseNode from './nodes/base-node'
import NumberNode from './nodes/number-node'

import SweetRollsSyntaxError from './exceptions/sweet-rolls-syntax-error'

const digits = '0123456789'

export default class Parser {
  input: string
  positionInInput = 0

  constructor (input: string) {
    this.input = input
  }

  parse (): BaseNode {
    return this.parseNumber()
  }

  next (): string {
    return this.input[this.positionInInput]
  }

  consumeCharacter (): string {
    if (!this.next()) {
      throw new SweetRollsSyntaxError(
        `Unexpected end of input at ${this.positionInInput}`
      )
    }

    const consumedCharacter = this.next()
    this.positionInInput += 1
    return consumedCharacter
  }

  consumeNumber (): number {
    let stringOfNumber = ''

    while (digits.includes(this.next())) {
      stringOfNumber += this.consumeCharacter()
    }

    if (!stringOfNumber) {
      let invalidInput = this.input.substring(
        this.positionInInput, this.positionInInput + 10
      )
      if (!invalidInput) {
        invalidInput = 'end of input'
      }
      throw new SweetRollsSyntaxError(
        `Expected number but got ${invalidInput} at ${this.positionInInput}`
      )
    }

    return parseInt(stringOfNumber)
  }

  parseNumber (): NumberNode {
    const number = this.consumeNumber()
    return new NumberNode(number)
  }
}
