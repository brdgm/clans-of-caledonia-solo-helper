import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import CardDeck from '@/services/CardDeck'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import getPreviousTurns from './getPreviousTurns'

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
  readonly cardDeck? : CardDeck

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

    if (this.bot > 0) {
      // card deck: draw next card for bot
      this.cardDeck = getCardDeck(state, this.round, this.turn, this.bot)
      this.cardDeck.draw()
    }
  }

}

function getCardDeck(state:State, round:number, turn:number, bot:number) : CardDeck {
  // get card deck from previous turn
  const previousTurns = getPreviousTurns({state, round, turn, bot})
  for (let i=previousTurns.length-1; i>=0; i--) {
    const previousTurn = previousTurns[i]
    if (previousTurn.cardDeck) {
      return CardDeck.fromPersistence(previousTurn.cardDeck)
    }
  }
  // get initial card deck prepared for this round
  const initialCardDeck = (state.rounds.find(item => item.round == round)?.initialCardDeck ?? [])[bot - 1]
  if (initialCardDeck) {
    return CardDeck.fromPersistence(initialCardDeck)
  }
  // last resort: create new card deck
  return CardDeck.new(round)
}
