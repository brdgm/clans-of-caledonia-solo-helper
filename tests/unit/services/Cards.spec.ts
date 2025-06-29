import Cards from '@/services/Cards'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getForRound', () => {
    expect(Cards.getForRound(1).length).eq(14)
    for (const round of [2,3,4,5]) {
      expect(Cards.getForRound(round).length).eq(2)
    }
  })
})
