import IndividualNode from './individual-node'
import NumberNode from './number-node'
import { rollDice } from '../roll'

export default class RollNode implements IndividualNode {
  private diceNumberNode: NumberNode
  private sidesNumberNode: NumberNode

  constructor (diceNumberNode: NumberNode, sidesNumberNode: NumberNode) {
    this.diceNumberNode = diceNumberNode
    this.sidesNumberNode = sidesNumberNode
  }

  run () {
    const diceNumber = this.diceNumberNode.run()[0]
    const sidesNumber = this.sidesNumberNode.run()[0]
    return [
      rollDice(diceNumber, sidesNumber)
        .reduce((previous, current) => previous + current)
    ]
  }
}
