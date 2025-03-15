import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import { CardDeckPersistence } from '@/store/state'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import PlayerColor from '@/services/enum/PlayerColor'

const state = mockState({playerCount:1, botCount:2,
  playerColors: [PlayerColor.WHITE, PlayerColor.RED, PlayerColor.BLACK, PlayerColor.BLUE],
  rounds:[
    mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
      mockTurn({round:1,turn:1,player:1}),
      mockTurn({round:1,turn:1,bot:1,cardDeck:cardDeck(1,undefined,[2,3,4],[])}),
      mockTurn({round:1,turn:1,bot:2,cardDeck:cardDeck(3,undefined,[7,1,8],[])}),
      mockTurn({round:1,turn:2,player:1,pass:true}),
      mockTurn({round:1,turn:2,bot:1,cardDeck:cardDeck(2,undefined,[3,4],[1])}),
      mockTurn({round:1,turn:2,bot:2,cardDeck:cardDeck(7,undefined,[1,8],[3]),pass:true}),
      mockTurn({round:1,turn:3,bot:1,cardDeck:cardDeck(3,undefined,[4],[1,2]),pass:true})
    ], initialCardDeck: [
      cardDeck(undefined,undefined,[1,2,3,4],[])
    ]})
  ]
})

describe('util/NavigationState', () => {
  it('getCardDeck', () => {
    expect(navigationState({round:'1',turn:'1',bot:'1'}).cardDeck?.toPersistence())
        .to.eql(cardDeck(1,undefined,[2,3,4],[]), 'round1-turn1-bot1')
    expect(navigationState({round:'1',turn:'1',bot:'2'}).cardDeck?.toPersistence().pile.length)
        .to.eq(13, 'round1-turn1-bot2')
    expect(navigationState({round:'1',turn:'2',bot:'1'}).cardDeck?.toPersistence())
        .to.eql(cardDeck(2,undefined,[3,4],[1]), 'round1-turn2-bot1')
    expect(navigationState({round:'1',turn:'2',bot:'2'}).cardDeck?.toPersistence())
        .to.eql(cardDeck(7,undefined,[1,8],[3]), 'round1-turn2-bot2')
  })

  it('playerColor', () => {
    expect(navigationState({round:'1',turn:'1',player:'1'}).playerColor).to.eq(PlayerColor.WHITE)
    expect(navigationState({round:'1',turn:'1',bot:'1'}).playerColor).to.eq(PlayerColor.RED)
    expect(navigationState({round:'1',turn:'1',bot:'2'}).playerColor).to.eq(PlayerColor.BLACK)
  })
})

function cardDeck(current: number|undefined, currentSupport: number|undefined,
    pile: number[], discard: number[]) : CardDeckPersistence {
  return mockCardDeck({current, currentSupport, pile, discard}).toPersistence()
}

function navigationState(params:RouteParams) : NavigationState {
  return new NavigationState(mockRouteLocation({params}), state)
}
