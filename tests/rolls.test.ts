import { parse } from '../source/index'

jest.mock('../source/roll.ts')

test('Dice work as individual terms', () => {
  const rootNode = parse('2d4, 1d7, 5d2, 2d6, 1d20')
  expect(rootNode.run()).toEqual([[3], [1], [7], [3], [1]])
})

test('Dice work in expressions', () => {
  const rootNode = parse('(3d8 / 2) + (1d11 * (9 - 2d3))')
  expect(rootNode.run()).toEqual([[9]])
})

test('Dice work in functions', () => {
  const rootNode = parse('sum(max(repeat(1d6, 4), 3))')
  expect(rootNode.run()).toEqual([[3]])
})

test('Capital D splits up the rolls', () => {
  const rootNode = parse('5D3')
  expect(rootNode.run()).toEqual([[1, 2, 3, 1, 2]])
})
