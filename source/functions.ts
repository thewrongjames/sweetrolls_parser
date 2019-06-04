import MaxNode from './nodes/max-node'
import MinNode from './nodes/min-node'
import RepeatNode from './nodes/repeat-node'
import SumNode from './nodes/sum-node'

export const FUNCTION_NAME_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'
export const functionNameMappings: {
  [key: string]:
    typeof MaxNode | typeof MinNode | typeof RepeatNode | typeof SumNode
} = {
  'max': MaxNode,
  'min': MinNode,
  'repeat': RepeatNode,
  'sum': SumNode
}
