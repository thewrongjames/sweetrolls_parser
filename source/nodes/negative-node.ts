import IndividualNode from './individual-node'

export default class NegativeNode implements IndividualNode {
  private nodeToNegate: IndividualNode

  constructor (nodeToNegate: IndividualNode) {
    this.nodeToNegate = nodeToNegate
  }

  run (): number {
    return -this.nodeToNegate.run()
  }
}
