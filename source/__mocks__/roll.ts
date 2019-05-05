const rollNSidedDie = (sides: number, counter: number): number => {
  const mockedRoll = (counter % sides) + 1
  counter += 1
  return mockedRoll
}

/**
 * Get the results of rolling a given number of dice with a given number of
 * sides.
 * @param numberOfDiceToRoll The number of dice to roll.
 * @param numberOfSidesOnDice The number of sides on the dice to roll.
 * @returns {number[]} An array of numbers, the results of each of the rolls.
 */
export const rollDice = (
  numberOfDiceToRoll: number, numberOfSidesOnDice: number
): number[] => {
  if (numberOfDiceToRoll < 0 || numberOfSidesOnDice < 0) {
    throw new Error(
      `Cannot roll ${numberOfDiceToRoll} dice with ${numberOfSidesOnDice} sides`
    )
  }

  return Array(numberOfDiceToRoll).fill(numberOfSidesOnDice).map(
    (sides, index) => rollNSidedDie(sides, index)
  )
}
