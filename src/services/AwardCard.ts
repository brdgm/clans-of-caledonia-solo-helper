import Award from './enum/Award'

export default interface AwardCard {
  id: number
  award: Award
  nullVPLevel: number
  fourVPLevel: number
}
