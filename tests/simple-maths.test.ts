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
