import Expansion from '@/services/enum/Expansion'
import { State } from '@/store/state'

/**
 * Get amount of money for the next player that passes, taking into account how many
 * players have already passed, and if farmers market extension is in play.
 * @param state State
 * @param round Round
 * @param turn Turn
 * @param tunOrderIndex Turn order index
 */
export default function getPassBonusMoney(state: State, round: number, turn: number, turnOrderIndex: number) : number {
  const roundData = state.rounds.find(item => item.round==round)
  if (!roundData) {
    return 0
  }

  const previousTurns = roundData.turns.filter(item => item.turn <= turn && (item.turn < turn || item.turnOrderIndex < turnOrderIndex))
  const passedCount = previousTurns.filter(item => item.pass).length
  const passingBonusList = getPassingBonusList(state)
  return passingBonusList[passedCount] ?? 0
}

const PASSING_BONUS_LIST : number[] = [16, 14, 12, 10]
const PASSING_BONUS_LIST_FARMERS_MARKET : number[] = [12, 10, 8, 6]

function getPassingBonusList(state: State) : number[] {
  const hasFarmersMarket = state.setup.expansions.includes(Expansion.INDUSTRIA_FARMERS_MARKET)
  return hasFarmersMarket ? PASSING_BONUS_LIST_FARMERS_MARKET : PASSING_BONUS_LIST
}
