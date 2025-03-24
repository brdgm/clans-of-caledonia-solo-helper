import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import PlayerColor from '@/services/enum/PlayerColor'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import UnitType from '@/services/enum/UnitType'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          playerColors: [PlayerColor.RED, PlayerColor.BLACK, PlayerColor.BLUE, PlayerColor.WHITE]
        },
        expansions: [],
        difficultyLevel: DifficultyLevel.VERY_EASY
      },
      rounds: []
    } as State
  },
  actions: {
    getTotalPlayerCount() : number {
      return this.setup.playerSetup.playerCount + this.setup.playerSetup.botCount
    },
    resetGame() : void {
      this.rounds = []
      this.finalScoringAmount = undefined
    },
    setupToggleExpansion(expansion: Expansion) : void {
      toggleArrayItem(this.setup.expansions, expansion)
    },
    storeRound(round : Round) : void {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    },
    storeRoundTurn(roundTurn : RoundTurn) : void {
      const round = this.rounds.find(item => item.round == roundTurn.round)
      if (!round) {
        throw new Error(`Round ${roundTurn.round} not found.`)
      }
      round.turns = round.turns.filter(item => (item.turn < roundTurn.turn) || (item.turn == roundTurn.turn && item.turnOrderIndex < roundTurn.turnOrderIndex))
      round.turns.push(roundTurn)
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
  finalScoringAmount?: FinalScoringAmount
}
export interface Setup {
  expansions: Expansion[]
  playerSetup: PlayerSetup
  difficultyLevel: DifficultyLevel
  debugMode?: boolean
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerColors: PlayerColor[]
}
export interface Round {
  round: number
  playerOrder: PlayerOrder[]
  turns: RoundTurn[]
  initialBotPersistence: BotPersistence[]
}
export interface PlayerOrder {
  player?: number
  bot?: number
}
export interface RoundTurn {
  round: number
  turn: number
  turnOrderIndex: number
  player?: number
  bot?: number
  pass?: boolean
  botPersistence?: BotPersistence
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
  preferredUnitType: UnitType
}
export interface CardDeckPersistence {
  current?: number
  currentSupport?: number
  pile: number[]
  discard: number[]
  removed: number[]
}
export interface FinalScoringAmount {
  glory: number[]
  cotton: number[]
  tobacco: number[]
  sugarCane: number[]
  goodStandard: number[]
  goodProcessed: number[]
  money: number[]
  hops: number[]
  exportContract: number[]
  settlement: number[]
  awardVP: number[]
  milestoneVP: number[]
  trainDeliveryVP: number[]
}
