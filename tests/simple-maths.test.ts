import { parse } from '../source/index'

test('Simple addition works', () => {
  const rootNode = parse('9 +10')
  expect(rootNode.run()).toEqual(19)
})

test('Simple multiplication works', () => {
  const rootNode = parse('6 * 9')
  expect(rootNode.run()).toEqual(54)
})

test('Simple subtraction works', () => {
  const rootNode = parse('12- 67')
  expect(rootNode.run()).toEqual(-55)
})

test('Simple division works', () => {
  const rootNode = parse('8 / 9')
  expect(rootNode.run()).toEqual(0.8888888888888888)
})
