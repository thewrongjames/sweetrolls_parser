import IndividualNode from './individual-node'
import BinaryOperator from '../binaryOperator'
import SweetRollsRuntimeError from '../exceptions/sweet-rolls-runtime-error'

type SingleOperation = (left: number, right: number) => number
type ArrayOperation = (left: number[], right: number[]) => number[]
const buildOperation = (indivdualOperation: SingleOperation): ArrayOperation =>
  (left: number[], right: number[]): number[] => {
    if (left.length !== right.length) {
      throw new SweetRollsRuntimeError(`
        Arguments to a binary operator must have the same length, got lengths
        ${left.length} and ${right.length}
      `)
    }
    return (new Array(left.length).fill(0))
      .map((_, index) => indivdualOperation(left[index], right[index]))
  }

/**
 * A node that takes two other nodes, a left an a right, and performs an
 * operation on them given a binary operator.
 */
export default class BinaryOperationNode implements IndividualNode {
  private leftNode: IndividualNode
  private operation: (left: number[], right: number[]) => number[]
  private rightNode: IndividualNode
  private operations = {
    '+': buildOperation((left: number, right: number): number => left + right),
    '-': buildOperation((left: number, right: number): number => left - right),
    '*': buildOperation((left: number, right: number): number => left * right),
    '/': buildOperation((left: number, right: number): number => left / right)
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

  public run () {
    return this.operation(this.leftNode.run(), this.rightNode.run())
  }
}
