import { parse } from '../source/index'

test('Long maths expression works', () => {
  const rootNode = parse('(3 + (5 * 8)) - (3 / 2)')
  expect(rootNode.run()).toBe(41.5)
})
