import { State } from '@/store/state'
import getTurnOrder, { MAX_TURN } from '@/util/getTurnOrder'

/**
 * Calculate routes for next/back respecting "passed" state of players/bots.
 */
export default class RouteCalculator {

  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly action : number
  readonly player? : number
  readonly bot? : number

  constructor(params:{round: number, turn?: number, turnOrderIndex?: number, action?: number, player?: number, bot?: number}) {
    this.round = params.round
    this.turn = params.turn ?? MAX_TURN  // when called in EndOfRound/EndOfGame context
    this.turnOrderIndex = params.turnOrderIndex ?? 0
    this.action = params.action ?? 0
    this.player = params.player
    this.bot = params.bot
  }

  /**
   * Get route to next step in round.
   * If all have passed, returns route to round end/game end.
   */
  public getNextRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const nextStep = steps[currentStepIndex+1]
    if (!nextStep) {
      return `/round/${this.round}/production`
    }
    return RouteCalculator.routeTo(nextStep)
  }

  /**
   * Get route to the next action of the current step.
   */
  public getNextActionRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const currentStep = steps[currentStepIndex]
    return RouteCalculator.routeTo(currentStep, this.action+1)
  }

  /**
   * Get route to previous step in round.
   * If this is the first turn in round, returns route to end of previous round (or empty route in first round).
   */
  public getBackRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    if (this.action > 0) {
      const currentStep = steps[currentStepIndex]
      return RouteCalculator.routeTo(currentStep, this.action-1)
    }
    const previousStep = steps[currentStepIndex-1]
    if (!previousStep) {
      if (this.round == 1) {
        return ''
      }
      return `/round/${this.round}/preparation`
    }
    return RouteCalculator.routeTo(previousStep)
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getFirstTurnRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, 1)
    return RouteCalculator.routeTo(steps[0])
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getLastTurnRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const lastStep = steps[steps.length-1]
    if (lastStep) {
      return RouteCalculator.routeTo(lastStep)
    }
    else {
      return ''
    }
  }

  /**
   * Build route to player/bot step
   */
  private static routeTo(step?: Step, action: number = 0) : string {
    if (!step) {
      return ''
    }
    else if (step.bot) {
      return `/round/${step.round}/turn/${step.turn}/${step.turnOrderIndex}/bot/${step.bot}` + (action > 0 ? `/action/${action}` : '')
    }
    else {
      return `/round/${step.round}/turn/${step.turn}/${step.turnOrderIndex}/player/${step.player}`
    }
  }

}

interface Step {
  readonly round: number
  readonly turn: number
  readonly turnOrderIndex: number
  readonly player?: number
  readonly bot?: number
}
