/**
 * Determines the amount of money that is received or paid when a player takes an export contract.
 * @param round Round
 * @returns Positive amount: money gain, negative amount: money fee.
 */
export default function getTakeExportContractMoney(round: number) : number {
  switch (round) {
    case 1: return 5
    case 2: return 0
    case 3: return -5
    case 4: return -10
    case 5: return -15
    default:
      throw new Error(`Invalid round: ${round}`)
  }
}
