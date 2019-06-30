import IndividualNode from './individual-node'
import NumberNode from './number-node'
import { rollDice } from '../roll'

export default class RollNode implements IndividualNode {
  private diceNumberNode: NumberNode
  private sidesNumberNode: NumberNode
  private sumRolls: boolean

  constructor (
    diceNumberNode: NumberNode, sidesNumberNode: NumberNode, sumRolls: boolean
  ) {
    this.diceNumberNode = diceNumberNode
    this.sidesNumberNode = sidesNumberNode
    this.sumRolls = sumRolls
  }

  run () {
    const numberOfDiceToRoll = this.diceNumberNode.run()[0]
    const numberOfSidesOnDice = this.sidesNumberNode.run()[0]
    let result = rollDice(numberOfDiceToRoll, numberOfSidesOnDice)
    if (this.sumRolls) result = [result.reduce((previous, current) => previous + current)]
    return result
  }
}
