import AwardCards from '@/services/AwardCards'
import { expect } from 'chai'

describe('services/AwardCards', () => {
  it('get', () => {
    const card = AwardCards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getAll', () => {
    const cards = AwardCards.getAll()
    expect(cards.length).eq(9)
  })
})
