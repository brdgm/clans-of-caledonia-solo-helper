import calculateTieredScores from './calculateTieredScores'

/**
 * Calculate each players score for export contracts.
 * @param amounts Amount of export contracts for each player
 * @returns Scores for each player
 */
export default function getFinalScoreExportContract(amounts: number[]) : number[] {
  const scores = new Array(amounts.length).fill(0)

  if (amounts.length < 2) {
    return scores
  }

  if (amounts.length === 2) {
    // 2P automa rules: winner always gets 8 VP.
    // Loser gets 4 VP only if they fulfilled exactly one contract less; otherwise 0 VP.
    // In case of a tie both players get 4 VP.
    const [a, b] = amounts
    if (a === b) {
      return [4, 4]
    }
    const winner = a > b ? 0 : 1
    const loser = 1 - winner
    scores[winner] = 8
    scores[loser] = amounts[winner] - amounts[loser] === 1 ? 4 : 0
    return scores
  }

  // 3-4P: 12 VP for most, 6 VP for second most.
  return calculateTieredScores(amounts, [12, 6])
}
