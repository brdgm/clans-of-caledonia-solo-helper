/**
 * Calculate each players score for export contracts.
 * @param amounts Amount of export contracts for each player
 * @returns Scores for each player
 */
export default function getFinalScoreExport(amounts: number[]) : number[] {
  const scores = new Array(amounts.length).fill(0)

  if (amounts.length === 2) {
    const [a, b] = amounts
    if (a === b) {
      // tie: both get 4 VP
      return [4, 4]
    }
    const winner = a > b ? 0 : 1
    const loser = 1 - winner
    scores[winner] = 8
    scores[loser] = amounts[winner] - amounts[loser] === 1 ? 4 : 0
    return scores
  }

  const tiers = [12, 6]
  const sorted = [...amounts].sort((a, b) => b - a)

  let tierIndex = 0
  while (tierIndex < tiers.length) {
    const value = sorted[tierIndex]
    const tied = sorted.filter(v => v === value).length
    const vpPool = tiers.slice(tierIndex, tierIndex + tied).reduce((sum, v) => sum + v, 0)
    const vpEach = Math.floor(vpPool / tied)
    for (let i = 0; i < amounts.length; i++) {
      if (amounts[i] === value) {
        scores[i] += vpEach
      }
    }
    tierIndex += tied
  }

  return scores
}
