import BaseNode from './base-node'

/**
 * A simple node that just stores and returns a number.
 */
export default class NumberNode implements BaseNode {
  private value: number

  /**
   * Create a number node.
   * @param {number} value The number it should return when run.
   */
  constructor (value: number) {
    this.value = value
  }

  /**
   * Run this node, and return the number that it stores.
   */
  public run () {
    return this.value
  }
}
