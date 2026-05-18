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
  // Tied players evenly split the combined VP of their tied tiers (rounded down).
  const tiers = [18, 12, 6]
  const sorted = [...amounts].sort((a, b) => b - a)

  let tierIndex = 0
  while (tierIndex < tiers.length) {
    const value = sorted[tierIndex]
    const tied = sorted.filter(v => v === value).length
    if (tied === 0) break
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
