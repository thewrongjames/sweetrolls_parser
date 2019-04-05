import BaseNode from './base-node'

export default class NumberNode implements BaseNode {
  value: number

  constructor (value: number) {
    this.value = value
  }

  run () {
    return this.value
  }
}
