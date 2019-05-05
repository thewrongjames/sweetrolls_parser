/**
 * A base interface for SweetRolls nodes. They should all have a run method
 * that returns an array of either numbers, or arrays containing numbers.
 */
export default interface BaseNode {
  /**
   * Evaluate this node and get the result.
   * @returns {number[] | number[][]} The result of evaluating this node.
   */
  run(): number[] | number[][]
}
