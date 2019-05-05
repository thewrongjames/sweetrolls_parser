import { parse } from '../source/index'
import SweetRollsRuntimeError from
  '../source/exceptions/sweet-rolls-runtime-error'

test('Basic max case works', () => {
  const rootNode = parse('max((18, 6 * (9 - 2), -503 / 12), 2)')
  expect(rootNode.run()).toEqual([[42, 18]])
})

test('Max works amoungst other things', () => {
  const rootNode = parse('2 * 3, (max((6 * (6 + 3), -534), 1) / 2) + 5')
  expect(rootNode.run()).toEqual([[6], [32]])
})

test('Repeat fails with invalid argument structure', () => {
  const rootNode = parse('repeat((1, 2), 3)')
  expect(rootNode.run.bind(rootNode)).toThrow(SweetRollsRuntimeError)
})

test('Basic min case works', () => {
  const rootNode = parse('min((5340 / 546, (14 * 3) / 10, 53), 2)')
  expect(rootNode.run()).toEqual([[4.2, 9.780219780219781]])
})

test('Min works amoungst other things', () => {
  const rootNode = parse('(8 - min((-(1 / 1000), 3 * (5 + 2)), 1)) / 2')
  expect(rootNode.run()).toEqual([[4.0005]])
})

test('Min fails with incorrect number of arguments', () => {
  const rootNode = parse('min(6, 4, 2 + 3)')
  expect(rootNode.run.bind(rootNode)).toThrow(SweetRollsRuntimeError)
})

test('Basic repeat case works', () => {
  const rootNode = parse('repeat(42, 3)')
  expect(rootNode.run()).toEqual([[42, 42, 42]])
})

test('Basic sum case works', () => {
  const rootNode = parse('sum(3, 5 * 12, -12/3)')
  expect(rootNode.run()).toEqual([[59]])
})
