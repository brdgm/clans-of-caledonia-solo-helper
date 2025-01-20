import { Round } from '@/store/state'

export default function (params?: MockRoundParams) : Round {
  const round : Round = {
    round: params?.round ?? 1
  }
  return round
}

export interface MockRoundParams {
  round? : number
}
