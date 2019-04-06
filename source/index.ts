import BaseNode from './nodes/base-node'
import Parser from './parser'

export const parse = (string: string): BaseNode => {
  // The language specification itself does not allow for whitespace, but, we
  // will be more lenient and just remove it here.
  const parser = new Parser(string.replace(/\s/g, ''))
  return parser.parse()
}
