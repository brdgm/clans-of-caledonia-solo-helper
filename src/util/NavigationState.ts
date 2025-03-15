import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { BotPersistence, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import CardDeck from '@/services/CardDeck'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import getPreviousTurns from './getPreviousTurns'
import PlayerColor from '@/services/enum/PlayerColor'
import getNextUnitType from './getNextUnitType'
import UnitType from '@/services/enum/UnitType'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly action : number
  readonly player : number
  readonly bot : number
  readonly playerColor : PlayerColor
  readonly cardDeck? : CardDeck
  readonly preferredUnitType? : UnitType

  constructor(route: RouteLocation, state: State) {    
    const setup = state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount

    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.action = getIntRouteParam(route, 'action')
    this.player = getIntRouteParam(route, 'player')
    this.bot = getIntRouteParam(route, 'bot')
    this.playerColor = getPlayerColor(this.player, this.bot, setup.playerSetup.playerCount, setup.playerSetup.playerColors)

    if (this.bot > 0) {
      // card deck: draw next card for bot
      const botPersistence = getBotPersistence(state, this.round, this.turn, this.bot)
      this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)
      this.cardDeck.draw()
      this.preferredUnitType = botPersistence.preferredUnitType
    }
  }

}

function getBotPersistence(state:State, round:number, turn:number, bot:number) : BotPersistence {
  // get card deck from previous turn
  const previousTurns = getPreviousTurns({state, round, turn, bot})
  for (let i=previousTurns.length-1; i>=0; i--) {
    const previousTurn = previousTurns[i]
    if (previousTurn.botPersistence) {
      return previousTurn.botPersistence
    }
  }
  // get initial card deck prepared for this round
  const initialBotPersistence = (state.rounds.find(item => item.round == round)?.initialBotPersistence ?? [])[bot - 1]
  if (initialBotPersistence) {
    return initialBotPersistence
  }
  // last resort: create new card deck
  return { cardDeck: CardDeck.new(round).toPersistence(), preferredUnitType: getNextUnitType(UnitType.WORKER, rollDice(6)) }
}

function getPlayerColor(player : number, bot : number, playerCount : number, playerColors : PlayerColor[]) : PlayerColor {
  let playerColor
  if (player > 0) {
    playerColor = playerColors[player - 1]
  }
  if (bot > 0) {
    playerColor = playerColors[playerCount + bot - 1]
  }
  return playerColor ?? PlayerColor.RED
}
