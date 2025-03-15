import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import PlayerColor from '@/services/enum/PlayerColor'
import { Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      playerSetup: {
        playerCount: params?.playerCount ?? 1,
        botCount: params?.botCount ?? 1,
        playerColors: params?.playerColors ?? [PlayerColor.RED, PlayerColor.BLACK, PlayerColor.BLUE, PlayerColor.WHITE]
      },
      expansions: params?.expansions ?? [],
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.EASY
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  playerCount?: number
  botCount?: number
  playerColors?: PlayerColor[]
  expansions?: Expansion[],
  difficultyLevel?: DifficultyLevel,
  rounds?: Round[]
}
