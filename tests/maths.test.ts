import { parse } from '../source/index'

test('Long maths expression works', () => {
  const rootNode = parse('(3 + (5 * 8)) - (3 / 2)')
  expect(rootNode.run()).toEqual([41.5])
})

test('Taking the negative of an arbitrary term works', () => {
  const rootNode = parse('-(8 / 4) + -3')
  expect(rootNode.run()).toEqual([-5])
})
