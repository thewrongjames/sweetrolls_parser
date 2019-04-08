import { parse } from '../source/index'

test('Basic sequences work', () => {
  const rootNode = parse('4, (8 + 9) - (2 * 5), 6 * 3, 5 / 3')
  expect(rootNode.run()).toEqual([4, 7, 18, 1.6666666666666667])
})
