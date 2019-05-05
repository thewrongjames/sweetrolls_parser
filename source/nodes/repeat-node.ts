import FunctionNode from './function-node'
import SweetRollsRuntimeError from '../exceptions/sweet-rolls-runtime-error'
import IndividualNode from './individual-node'

export default class RepeatNode extends FunctionNode {
  protected nodeFunction (argumentNodes: IndividualNode[]): number[] {
    if (argumentNodes.length !== 2) {
      throw new SweetRollsRuntimeError(
        `Repeat takes 2 arguments, got ${argumentNodes.length}`
      )
    }

    const repetitions = argumentNodes[1].run()
    if (repetitions.length !== 1) {
      throw new SweetRollsRuntimeError(`
        Second argument of repeat must be of length 1, got ${repetitions.length}
      `)
    }

    return (new Array(repetitions[0])).fill(0).map(() => {
      const result = argumentNodes[0].run()
      if (result.length !== 1) {
        throw new SweetRollsRuntimeError(`
          Repeated value must be of length 1, got ${result.length}
        `)
      }
      return result[0]
    })
  }
}
