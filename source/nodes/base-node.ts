interface runMethod {
  (): number
}

export default interface BaseNode {
  run: runMethod
}
