import IndividualNode from './individual-node'
import BinaryOperator from '../binaryOperator'

/**
 * A node that takes two other nodes, a left an a right, and performs an
 * operation on them given a binary operator.
 */
export default class BinaryOperationNode implements IndividualNode {
  private leftNode: IndividualNode
  private operation: (left: number, right: number) => number
  private rightNode: IndividualNode
  private operations = {
    '+': (left: number, right: number): number => left + right,
    '-': (left: number, right: number): number => left - right,
    '*': (left: number, right: number): number => left * right,
    '/': (left: number, right: number): number => left / right
  }

  /**
   * Create a BinaryOperationNode
   * @param {IndividualNode} leftNode
   * @param {string} operator
   * @param {IndividualNode} rightNode
   */
  constructor (leftNode: IndividualNode, operator: BinaryOperator, rightNode: IndividualNode) {
    this.leftNode = leftNode
    this.operation = this.operations[operator]
    this.rightNode = rightNode
  }

  public run (): number {
    return this.operation(this.leftNode.run(), this.rightNode.run())
  }
}
