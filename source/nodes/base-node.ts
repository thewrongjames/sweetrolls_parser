/**
 * A base interface for SweetRolls nodes. They should all have a run method
 * that returns a number or an array of numbers, in the case of sequences.
 */
export default interface BaseNode {
  /**
   * Evaluate this node and get the result.
   * @returns {number | number[]} The result of evaluating this node.
   */
  run(): number | number[]
}
