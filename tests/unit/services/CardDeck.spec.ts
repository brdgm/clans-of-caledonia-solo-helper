import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new-round1', () => {
    const deck = CardDeck.new(1)

    expect(deck.currentCard, 'currentCard').to.undefined
    expect(deck.currentSupportCard, 'currentSupportCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(14)
    expect(deck.discard.length, 'discard').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.current, 'currentCard').to.undefined
    expect(persistence.currentSupport, 'currentSupportCard').to.undefined
    expect(persistence.pile.length, 'pile').to.eq(14)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('new-round3', () => {
    const deck = CardDeck.new(3)

    expect(deck.pile.length, 'pile').to.eq(18)
    expect(deck.discard.length, 'discard').to.eq(0)
  })

  it('new-round5', () => {
    const deck = CardDeck.new(5)

    expect(deck.pile.length, 'pile').to.eq(22)
    expect(deck.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({pile:[1,2,3],discard:[]})

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

})
