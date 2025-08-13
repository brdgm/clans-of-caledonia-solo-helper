import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import AwardCard from './AwardCard'
import Award from './enum/Award'

const cards : AwardCard[] = [
  {
    id: 1,
    award: Award.UNITS,
    nullVPLevel: 24,
    fourVPLevel: 27
  },
  {
    id: 2,
    award: Award.EXPORT_GOODS_ONE_TYPE,
    nullVPLevel: 7,
    fourVPLevel: 10
  },
  {
    id: 3,
    award: Award.GLORY,
    nullVPLevel: 42,
    fourVPLevel: 48
  },
  {
    id: 4,
    award: Award.MONEY,
    nullVPLevel: 60,
    fourVPLevel: 75
  },
  {
    id: 5,
    award: Award.UNITS_SINGLE_SETTLEMENT,
    nullVPLevel: 5,
    fourVPLevel: 8
  },
  {
    id: 6,
    award: Award.BASIC_GOODS,
    nullVPLevel: 6,
    fourVPLevel: 8
  },
  {
    id: 7,
    award: Award.PROCESSED_GOODS,
    nullVPLevel: 8,
    fourVPLevel: 10
  },
  {
    id: 8,
    award: Award.UNITS_ALONG_RIVERS,
    nullVPLevel: 11,
    fourVPLevel: 14
  },
  {
    id: 9,
    award: Award.UNITS_NEXT_TO_LOCHS,
    nullVPLevel: 15,
    fourVPLevel: 18
  },
]

const cardsMap = new Map<number,AwardCard>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : AwardCard {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns cards
   */
  getAll() : AwardCard[] {
    return cards
  },

}
