import BaseNode from './base-node'

/**
 * The base interface for nodes that return individual values. Essentially,
 * everything other than sequences. They must have a run method that returns
 * a number array. They are still arrays as the output of a function is an
 * individual node, but may contain multiple values.
 */
export default interface IndividualNode extends BaseNode {
  /**
   * Evaluate this node and get the result.
   * @returns {number[]} The result of evaluating this node.
   */
    run(): number[]
}
