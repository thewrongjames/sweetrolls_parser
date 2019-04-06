import BaseNode from './base-node'
import BinaryOperator from '../binaryOperator'

/**
 * A node that takes two other nodes, a left an a right, and performs an
 * operation on them given a binary operator.
 */
export default class BinaryOperationNode implements BaseNode {
  private leftNode: BaseNode
  private operation: (left: number, right: number) => number
  private rightNode: BaseNode
  private operations = {
    '+': (left: number, right: number): number => left + right,
    '-': (left: number, right: number): number => left - right,
    '*': (left: number, right: number): number => left * right
  }

  /**
   * Create a BinaryOperationNode
   * @param {BaseNode} leftNode
   * @param {string} operator
   * @param {BaseNode} rightNode
   */
  constructor (leftNode: BaseNode, operator: BinaryOperator, rightNode: BaseNode) {
    this.leftNode = leftNode
    this.operation = this.operations[operator]
    this.rightNode = rightNode
  }

  public run (): number {
    return this.operation(this.leftNode.run(), this.rightNode.run())
  }
}
