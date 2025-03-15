import RouteCalculator from '@/services/RouteCalculator'
import { expect } from 'chai'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'

describe('services/RouteCalculator', () => {
  it('getNextRouteTo-round1-turn1-player', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:0, player:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('')
  })

  it('getNextRouteTo-round2-turn1-player', () => {
    const routeCalculator = new RouteCalculator({round:2, turn:1, turnOrderIndex:0, player:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:2, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/2/turn/1/1/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/2/preparation')
  })

  it('getNextRouteTo-round1-turn1-bot1', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, bot:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/1/2/bot/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/0/player/1')
  })

  it('getNextActionRouteTo-round1-turn1-bot1', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, bot:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextActionRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1/action/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/0/player/1')
  })

  it('getNextActionRouteTo-round1-turn1-bot1-action1', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, action:1, bot:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextActionRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1/action/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getNextActionRouteTo-round1-turn1-bot1-action2', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, action:2, bot:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextActionRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1/action/3')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1/action/1')
  })

  it('getNextRouteTo_round1-turn1-bot2', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:2, bot:2})
    
    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/0/player/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:2, bot:2})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1, turn:1, turnOrderIndex:0, player:1, pass:true}
      ]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/0/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:2, bot:2})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1, turn:1, turnOrderIndex:0, player:1, pass:true},
        {round:1, turn:1, turnOrderIndex:1, bot:1, pass:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/0/bot/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:2, bot:2})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1, turn:1, turnOrderIndex:0, player:1, pass:true},
        {round:1, turn:1, turnOrderIndex:1, bot:1, pass:true},
        {round:1, turn:1, turnOrderIndex:2, bot:2, pass:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/production')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getFirstTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getFirstTurnRouteTo(state)).to.eq('/round/1/turn/1/0/player/1')
  })

  it('getFirstTurnRouteTo_noRounds', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({playerCount:1, botCount:2})
    expect(routeCalculator.getFirstTurnRouteTo(state)).to.eq('')
  })

  it('getLastTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1, turn:1, turnOrderIndex:0, player:1, pass:true},
        {round:1, turn:1, turnOrderIndex:1, bot:1, pass:true},
        {round:1, turn:1, turnOrderIndex:2, bot:2, pass:true}]})
  ]})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('/round/1/turn/1/2/bot/2')
  })

  it('getLastTurnRouteTo-empty', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('')
  })
})
