import { parse } from './index'
import { createInterface } from 'readline'
import SweetRollsError from './exceptions/sweet-rolls-error'

const PROMPT = 'SR> '

const main = async () => {
  const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const getPromiseOfPromptResponse = (): Promise<string> => new Promise(
    (resolve) => readlineInterface.question(PROMPT, resolve)
  )

  let input
  while (true) {
    input = (await getPromiseOfPromptResponse()).toLowerCase()

    if (input === 'exit') break

    try {
      console.log(parse(input).run())
    } catch (error) {
      if (!(error instanceof SweetRollsError)) throw Error
      console.log(error.message)
    }
  }

  readlineInterface.close()
}

main()
