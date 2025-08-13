import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import { ref } from 'vue'

/**
 * Manages the Automa card deck with a current card and an optional support card.
 */
export default class CardDeck {

  private readonly _current
  private readonly _currentSupport
  private readonly _pile
  private readonly _discard
  private readonly _removed

  private constructor(current: Card|undefined, currentSupport: Card|undefined,
      pile : Card[], discard : Card[], removed : Card[]) {
    this._current = ref(current)
    this._currentSupport = ref(currentSupport)
    this._pile = ref(pile)
    this._discard = ref(discard)
    this._removed = ref(removed)
  }

  public get currentCard() : Card|undefined {
    return this._current.value
  }

  public get currentSupportCard() : Card|undefined {
    return this._currentSupport.value
  }

  public get pile() : readonly Card[] {
    return this._pile.value
  }

  public get discard() : readonly Card[] {
    return this._discard.value
  }

  public get removed() : readonly Card[] {
    return this._removed.value
  }

  /**
   * Draws next current card. Discards previously drawn card(s).
   */
  public draw() : void {
    // discard current cards
    if (this._current.value) {
      // action card: remove card if it is marked as such
      if (this._current.value.removeCard) {
        this._removed.value.unshift(this._current.value)
      }
      else {
        this._discard.value.unshift(this._current.value)
      }
      this._current.value = undefined
    }
    if (this._currentSupport.value) {
      this._discard.value.unshift(this._currentSupport.value)
      this._currentSupport.value = undefined
    }
    // draw new current card
    this._current.value = this.drawCardInternal()
  }

  /**
   * Draw a support card (if none is drawn yet).
   */
  public drawSupport() : void {
    // draw a current support card
    if (!this._currentSupport.value) {
      this._currentSupport.value = this.drawCardInternal()
    }
  }

  /**
   * Draws a card and removes it from the deck.
   * If not sufficient cards are left, the discard pile is shuffled back into the pile.
   */
  private drawCardInternal() : Card {
    if (this._pile.value.length === 0) {
      this._pile.value = shuffle(this._discard.value)
      this._discard.value = []
    }
    const card = this._pile.value.shift()
    if (!card) {
      throw new Error('Pile is empty.')
    }
    return card
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      current: this._current.value?.id,
      currentSupport: this._currentSupport.value?.id,
      pile: this._pile.value.map(card => card.id),
      discard: this._discard.value.map(card => card.id),
      removed: this._removed.value.map(card => card.id)
    }
  }

  /**
   * Creates a shuffled new card deck for the given round.
   * @param round Round
   * @param removed Cards already removed in previous rounds.
   */
  public static new(round : number, removed : Card[] = []) : CardDeck {
    let cards : Card[] = []
    for (let r = 1; r <= round; r++) {
      cards.push(...Cards.getForRound(r))
    }
    cards = cards.filter(card => !removed.includes(card))
    return new CardDeck(undefined, undefined, shuffle(cards), [], removed)
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.current ? Cards.get(persistence.current) : undefined,
      persistence.currentSupport ? Cards.get(persistence.currentSupport) : undefined,
      persistence.pile.map(Cards.get),
      persistence.discard.map(Cards.get),
      persistence.removed.map(Cards.get)
    )
  }

}
