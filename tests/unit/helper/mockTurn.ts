import UnitType from '@/services/enum/UnitType'
import { CardDeckPersistence, RoundTurn } from '@/store/state'

export default function (params?: MockTurnParams) : RoundTurn {
  const turn : RoundTurn = {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    turnOrderIndex: params?.turnOrderIndex ?? 0,
    player: params?.player,
    bot: params?.bot,
    pass: params?.pass
  }
  if (params?.cardDeck || params?.preferredUnitType) {
    turn.botPersistence = {
      cardDeck: params?.cardDeck ?? { pile: [1,2,3,4], discard: [] },
      preferredUnitType: params?.preferredUnitType ?? UnitType.SHEEP
    }
  }
  return turn
}

export interface MockTurnParams {
  round? : number
  turn? : number
  turnOrderIndex? : number
  player?: number
  bot?: number
  pass?: boolean
  cardDeck?: CardDeckPersistence
  preferredUnitType?: UnitType
}
