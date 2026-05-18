/**
 * Distribute VP tiers across players based on ranking.
 * Tied players evenly split the combined VP of their tied tiers (rounded down).
 * @param amounts Amounts per player (used for ranking)
 * @param tiers VP values for each rank position (1st, 2nd, ...)
 * @returns Scores for each player
 */
export default function calculateTieredScores(amounts: number[], tiers: number[]) : number[] {
  const scores = new Array(amounts.length).fill(0)
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
