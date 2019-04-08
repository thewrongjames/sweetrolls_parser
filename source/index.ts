import SequenceNode from './nodes/sequence-node'
import Parser from './parser'

/**
 * Take a string input in the SweetRolls language and parse it into a sequence
 * node, the root node that when run will evaluate to the resulting number
 * sequence.
 * @param input The SweetRolls language expression sequence to parse.
 * @returns {SequenceNode} The root node of the parse.
 */
export const parse = (input: string): SequenceNode => {
  // The language specification itself does not allow for whitespace, but, we
  // will be more lenient and just remove it here.
  const parser = new Parser(input.replace(/\s/g, ''))
  return parser.parse()
}
