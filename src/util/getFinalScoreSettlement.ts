/**
 * Calculate each players score for settlements.
 * @param amounts Amount of settlements for each player
 * @returns Scores for each player
 */
export default function getFinalScoreSettlement(amounts: number[]) : number[] {
  const scores = new Array(amounts.length).fill(0)
  const tiers = amounts.length === 2
    ? [12]
    : [18, 12, 6]

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
