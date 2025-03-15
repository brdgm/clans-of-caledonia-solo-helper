import CardDeck from '@/services/CardDeck'

export default function (params?: MockCardDeckParams) : CardDeck {  
  return CardDeck.fromPersistence({
    current: params?.current,
    currentSupport: params?.currentSupport,
    pile: params?.pile ?? [],
    discard: params?.discard ?? []
  })
}

export interface MockCardDeckParams {
  current?: number
  currentSupport?: number
  pile?: number[]
  discard?: number[]
}
