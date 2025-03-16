import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import getPassBonusMoney from '@/util/getPassBonusMoney'
import Expansion from '@/services/enum/Expansion'

describe('util/getPassBonusMoney', () => {
  it('standard', () => {
    const state = mockState({playerCount:1, botCount:2,
      expansions: [],
      rounds:[
        mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
          mockTurn({round:1,turn:1,player:1}),
          mockTurn({round:1,turn:1,bot:1}),
          mockTurn({round:1,turn:1,bot:2}),
          mockTurn({round:1,turn:2,player:1,pass:true}),
          mockTurn({round:1,turn:2,bot:1}),
          mockTurn({round:1,turn:2,bot:2,pass:true}),
          mockTurn({round:1,turn:3,bot:1,pass:true})
        ]})
      ]
    })
    
    expect(getPassBonusMoney(state, 1, 1, 0)).to.eq(16)
    expect(getPassBonusMoney(state, 1, 2, 0)).to.eq(16)
    expect(getPassBonusMoney(state, 1, 2, 1)).to.eq(14)
    expect(getPassBonusMoney(state, 1, 3, 0)).to.eq(12)
    expect(getPassBonusMoney(state, 1, 4, 0)).to.eq(10)
  })

  it('standard', () => {
    const state = mockState({playerCount:1, botCount:2,
      expansions: [Expansion.INDUSTRIA_FARMERS_MARKET],
      rounds:[
        mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
          mockTurn({round:1,turn:1,player:1}),
          mockTurn({round:1,turn:1,bot:1,pass:true}),
          mockTurn({round:1,turn:1,bot:2,pass:true}),
          mockTurn({round:1,turn:2,player:1,pass:true})
        ]})
      ]
    })
    
    expect(getPassBonusMoney(state, 1, 1, 0)).to.eq(12)
    expect(getPassBonusMoney(state, 1, 2, 0)).to.eq(8)
    expect(getPassBonusMoney(state, 1, 3, 0)).to.eq(6)
  })
})
