import IndividualNode from './individual-node'

export default class NegativeNode implements IndividualNode {
  private nodeToNegate: IndividualNode

  constructor (nodeToNegate: IndividualNode) {
    this.nodeToNegate = nodeToNegate
  }

  run () {
    return this.nodeToNegate.run().map(result => -result)
  }
}
