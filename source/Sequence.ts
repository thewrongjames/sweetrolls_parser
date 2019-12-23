/*
 * An arbitrarially nested array of numbers.
 */
export default interface Sequence extends Array<Sequence | number>{}
