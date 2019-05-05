import FunctionNode from './nodes/function-node'
import MaxNode from './nodes/max-node'
import MinNode from './nodes/min-node'
import RepeatNode from './nodes/repeat-node'
import SumNode from './nodes/sum-node'

export const FUNCTION_NAME_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'
export const functionNameMappings = {
  'max': MaxNode,
  'min': MinNode,
  'repeat': RepeatNode,
  'sum': SumNode
}
