import BaseNode from './nodes/base-node'
import Parser from './parser'

export const parse = (string: string): BaseNode => {
  const parser = new Parser(string)
  return parser.parse()
}
