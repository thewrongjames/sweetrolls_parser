import BaseNode from './base-node'

/**
 * The base interface for nodes that return individual values. Essentially,
 * everything other than sequences. They must have a run method that returns
 * a number.
 */
export default interface IndividualNode extends BaseNode {
  /**
   * Evaluate this node and get the result.
   * @returns {number} The result of evaluating this node.
   */
    run(): number
}
