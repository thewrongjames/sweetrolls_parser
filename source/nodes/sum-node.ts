import FunctionNode from './function-node'
import IndividualNode from './individual-node'
import BinaryOperationNode from './binary-operation-node'

export default class SumNode extends FunctionNode {
  protected nodeFunction (argumentNodes: IndividualNode[]): number[] {
    if (argumentNodes.length === 0) return [0]
    // If sum receives just one node, it sums the elements of that node.
    if (argumentNodes.length === 1) {
      return [
        argumentNodes[0].run().reduce((previous, current) => previous + current)
      ]
    }

    let nodeToEvaluate: IndividualNode =
      new BinaryOperationNode(argumentNodes[0], '+', argumentNodes[1])
    for (const argumentNode of argumentNodes.slice(2)) {
      nodeToEvaluate =
        new BinaryOperationNode(nodeToEvaluate, '+', argumentNode)
    }
    return nodeToEvaluate.run()
  }
}
