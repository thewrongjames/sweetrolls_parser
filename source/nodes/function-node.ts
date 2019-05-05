import IndividualNode from './individual-node'
import SequenceNode from './sequence-node'
import SweetRollsRuntimeError from '../exceptions/sweet-rolls-runtime-error'

export default abstract class FunctionNode implements IndividualNode {
  private argumentNodes: IndividualNode[]
  protected abstract nodeFunction(sequence: number[][]): number[]

  constructor (argumentNodes: Array<SequenceNode | IndividualNode>) {
    this.argumentNodes = argumentNodes.map(argumentNode => {
      if (argumentNode instanceof SequenceNode) {
        return new IndividualNodeFromSequenceNode(argumentNode)
      }
      return argumentNode
    })
  }

  run () {
    return this.nodeFunction(
      this.argumentNodes.map(argumentNode => argumentNode.run())
    )
  }
}

class IndividualNodeFromSequenceNode implements IndividualNode {
  private sequenceNode: SequenceNode

  constructor (sequenceNode: SequenceNode) {
    this.sequenceNode = sequenceNode
  }

  run () {
    return this.sequenceNode.run().map(result => {
      if (result.length === 1) return result[0]
      throw new SweetRollsRuntimeError(
        'Elements in a function argument sequence cannot be longer than one'
      )
    })
  }
}
