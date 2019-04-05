import { parse } from '../source/index'
import SweetRollsSyntaxError from
  '../source/exceptions/sweet-rolls-syntax-error'

test('An empty string fails to parse', () => {
  const rootNode = parse('')
  expect(rootNode.run).toThrow(SweetRollsSyntaxError)
})

test('Numbers result in themselves', () => {
  const rootNode = parse('42')
  expect(rootNode.run()).toEqual(42)
})
