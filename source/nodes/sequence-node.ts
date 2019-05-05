import BaseNode from './base-node'
import IndividualNode from './individual-node'

/**
 * A node that contains a list of other individual nodes. Use to simple evaluate
 * multiple things in the one expression, or as the arguments to a function.
 */
export default class SequenceNode implements BaseNode {
  private individualNodes: IndividualNode[]

  /**
   * Create a sequence node.
   * @param individualNodes The array of individual nodes to have this sequence
   * node evaluate to.
   */
  constructor (individualNodes: IndividualNode[]) {
    this.individualNodes = individualNodes
  }

  /**
   * Evaluate every individual node in the sequence and get the result as an
   * array.
   * @returns {number[][]} The array of the results of evaluating every individual
   * node in the sequence.
   */
  run (): number[][] {
    return this.individualNodes.map(individualNode => individualNode.run())
  }
}
