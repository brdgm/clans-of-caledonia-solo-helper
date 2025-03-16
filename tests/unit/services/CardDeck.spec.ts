import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'
import mockCardDeck from '../helper/mockCardDeck'
import Cards from '@/services/Cards'

describe('services/CardDeck', () => {
  it('new-round1', () => {
    const deck = CardDeck.new(1)

    expect(deck.currentCard, 'currentCard').to.undefined
    expect(deck.currentSupportCard, 'currentSupportCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(14)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.removed.length, 'removed').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.current, 'currentCard').to.undefined
    expect(persistence.currentSupport, 'currentSupportCard').to.undefined
    expect(persistence.pile.length, 'pile').to.eq(14)
    expect(persistence.discard.length, 'discard').to.eq(0)
    expect(persistence.removed.length, 'removed').to.eq(0)
  })

  it('new-round3', () => {
    const deck = CardDeck.new(3, [Cards.get(5)])

    expect(deck.pile.length, 'pile').to.eq(17)
    expect(deck.pile.map(card => card.id), 'card 5').to.not.contain(5)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.removed.length, 'removed').to.eq(1)
  })

  it('new-round5', () => {
    const deck = CardDeck.new(5)

    expect(deck.pile.length, 'pile').to.eq(22)
    expect(deck.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const deck = mockCardDeck({pile:[1,2,3]})

    deck.draw()
    expect(deck.currentCard?.id, 'currentCard').to.eq(1)
    expect(deck.currentSupportCard?.id, 'currentSupportCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(2)
    expect(deck.discard.length, 'pile').to.eq(0)

    deck.draw()
    expect(deck.currentCard?.id, 'currentCard').to.eq(2)
    expect(deck.currentSupportCard?.id, 'currentSupportCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(1)
    expect(deck.discard.length, 'pile').to.eq(1)

    deck.drawSupport()
    expect(deck.currentCard?.id, 'currentCard').to.eq(2)
    expect(deck.currentSupportCard?.id, 'currentSupportCard').to.eq(3)
    expect(deck.pile.length, 'pile').to.eq(0)
    expect(deck.discard.length, 'pile').to.eq(1)

    deck.draw() // deck is reshuffled
    expect(deck.currentCard?.id, 'currentCard').to.not.undefined
    expect(deck.currentSupportCard?.id, 'currentSupportCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(2)
    expect(deck.discard.length, 'pile').to.eq(0)
  })

  it('drawAndRemove', () => {
    const deck = mockCardDeck({pile:[10,2,11,3]})

    deck.draw()
    expect(deck.currentCard?.id, 'currentCard').to.eq(10)
    expect(deck.currentSupportCard?.id, 'currentSupportCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(3)
    expect(deck.discard.length, 'pile').to.eq(0)
    expect(deck.removed.length, 'removed').to.eq(0)

    deck.draw()
    expect(deck.currentCard?.id, 'currentCard').to.eq(2)
    expect(deck.currentSupportCard?.id, 'currentSupportCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(2)
    expect(deck.discard.length, 'pile').to.eq(0)  // card 10 as action card is removed
    expect(deck.removed.length, 'removed').to.eq(1)

    deck.drawSupport()
    expect(deck.currentCard?.id, 'currentCard').to.eq(2)
    expect(deck.currentSupportCard?.id, 'currentSupportCard').to.eq(11)
    expect(deck.pile.length, 'pile').to.eq(1)
    expect(deck.discard.length, 'pile').to.eq(0)
    expect(deck.removed.length, 'removed').to.eq(1)

    deck.draw()
    expect(deck.currentCard?.id, 'currentCard').to.eq(3)
    expect(deck.currentSupportCard?.id, 'currentSupportCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(0)
    expect(deck.discard.length, 'pile').to.eq(2)  // card 11 as support card is not removed
    expect(deck.removed.length, 'removed').to.eq(1)
  })

})
