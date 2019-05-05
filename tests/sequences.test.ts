import { parse } from '../source/index'
import SweetRollsRuntimeError from
  '../source/exceptions/sweet-rolls-runtime-error'

test('Basic sequences work', () => {
  const rootNode = parse('4, (8 + 9) - (2 * 5), 6 * 3, 5 / 3')
  expect(rootNode.run()).toEqual([[4], [7], [18], [1.6666666666666667]])
})

test('Operations on sequences of mismatched lengths fail', () => {
  const rootNode = parse('repeat(42, 3) + max((6*3, 4-(12/3), (12*2)-(3/(6-14))), 2)')
  expect(rootNode.run.bind(rootNode)).toThrow(SweetRollsRuntimeError)
})

test('Operations on sequences of the same length resolve componentwise', () => {
  const rootNode = parse('max((1, 2, 3), 2) + sum(repeat(5, 2), (5, 7))')
  expect(rootNode.run()).toEqual([[13, 14]])
})
