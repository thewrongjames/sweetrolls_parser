import { parse } from '../source/index'
import SweetRollsSyntaxError from
  '../source/exceptions/sweet-rolls-syntax-error'

test('An empty string fails to parse', () => {
  expect(() => parse('')).toThrow(SweetRollsSyntaxError)
})

test('Numbers result in themselves', () => {
  const rootNode = parse('42')
  expect(rootNode.run()).toEqual(42)
})

test('Spaces don\'t ruin things', () => {
  const rootNode = parse(' \t  42 \n ')
  expect(rootNode.run()).toEqual(42)
})
