import DifficultyLevel from "@/services/enum/DifficultyLevel"

/**
 * Get settings for difficulty level.
 * @param difficultyLevel Difficulty level
 * @returns Difficulty level settings
 */
export default function(difficultyLevel : DifficultyLevel) : DifficultyLevelSettings {
  switch (difficultyLevel) {
    case DifficultyLevel.EASY:
      return { shipLevel: 2, startingMoney: 50, round5VP: 10, round5VPTrain: 10 }
    case DifficultyLevel.VERY_EASY:
      return { shipLevel: 2, startingMoney: 60, round5VP: 20, round5VPTrain: 20 }
    case DifficultyLevel.MODERATE:
      return { shipLevel: 2, startingMoney: 70, round5VP: 30, round5VPTrain: 30 }
    case DifficultyLevel.HARD:
      return { shipLevel: 2, startingMoney: 80, round5VP: 40, round5VPTrain: 40 }
    case DifficultyLevel.VERY_HARD:
      return { shipLevel: 2, startingMoney: 90, round5VP: 50, round5VPTrain: 50 }
    default:
      throw new Error(`Invalid difficulty level: ${difficultyLevel}`)
  }
}

export interface DifficultyLevelSettings {
  shipLevel: number
  startingMoney: number
  round5VP: number
  round5VPTrain: number
}
