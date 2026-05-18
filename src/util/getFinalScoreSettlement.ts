import calculateTieredScores from './calculateTieredScores'

/**
 * Calculate each players score for settlements.
 * @param amounts Amount of settlements for each player
 * @returns Scores for each player
 */
export default function getFinalScoreSettlement(amounts: number[]) : number[] {
  const scores = new Array(amounts.length).fill(0)

  if (amounts.length < 2) {
    return scores
  }

  if (amounts.length === 2) {
    // 2P automa rules: winner always gets 12 VP.
    // Loser gets 6 VP only if they have 1 or 2 fewer settlements; otherwise 0 VP.
    // In case of a tie both players get 6 VP.
    const [a, b] = amounts
    if (a === b) {
      return [6, 6]
    }
    const winner = a > b ? 0 : 1
    const loser = 1 - winner
    scores[winner] = 12
    scores[loser] = amounts[winner] - amounts[loser] <= 2 ? 6 : 0
    return scores
  }

  // 3-4P: 18 VP for most, 12 VP for second, 6 VP for third.
  return calculateTieredScores(amounts, [18, 12, 6])
}
