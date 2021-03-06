import FunctionNode from './function-node'
import SweetRollsRuntimeError from '../exceptions/sweet-rolls-runtime-error'
import IndividualNode from './individual-node'

export default class MaxNode extends FunctionNode {
  protected nodeFunction (argumentNodes: IndividualNode[]): number[] {
    const argumentValues = argumentNodes.map(argumentNode => argumentNode.run())

    if (argumentValues.length !== 1 && argumentValues.length !== 2) {
      throw new SweetRollsRuntimeError(
        `Max takes 1 or 2 arguments, got ${argumentValues.length}`
      )
    }
    const valuesToTakeMaxOf = argumentValues[0]
    const numberToTake = argumentValues[1] || [1]
    if (numberToTake.length !== 1) {
      throw new SweetRollsRuntimeError(
        `Second argument of max must be of length 1, got ${numberToTake.length}`
      )
    }

    return valuesToTakeMaxOf.sort((a, b) => b - a).slice(0, numberToTake[0])
  }
}
