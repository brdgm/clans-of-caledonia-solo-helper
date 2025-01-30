import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import ExpandCriteria from './enum/ExpandCriteria'
import UpgradeType from './enum/UpgradeType'
import MapSector from './enum/MapModule'

const cards : Card[] = [
  {
    id: 1,
    round: 1,
    actions: [Action.TECHNOLOGY_UPGRADE, Action.EXPAND, Action.EXPORT_CONTRACT],
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.COSTS, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 1,
    mapSectors: [MapSector.A]
  },
  {
    id: 2,
    round: 1,
    actions: [Action.TECHNOLOGY_UPGRADE, Action.EXPAND, Action.EXPORT_CONTRACT],
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.COSTS, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 2,
    mapSectors: [MapSector.B]
  },
  {
    id: 3,
    round: 1,
    actions: [Action.TRADE, Action.EXPORT_CONTRACT, Action.EXPAND],
    expandCriteria: [ExpandCriteria.COSTS, ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 3,
    mapSectors: [MapSector.C]
  },
  {
    id: 4,
    round: 1,
    actions: [Action.TRADE, Action.EXPORT_CONTRACT, Action.EXPAND],
    expandCriteria: [ExpandCriteria.COSTS, ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 4,
    mapSectors: [MapSector.D]
  },
  {
    id: 5,
    round: 1,
    actions: [Action.TECHNOLOGY_UPGRADE, Action.EXPAND, Action.EXPORT_CONTRACT, Action.TRADE],
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.COSTS, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 5,
    mapSectors: [MapSector.A]
  },
  {
    id: 6,
    round: 1,
    actions: [Action.TECHNOLOGY_UPGRADE, Action.EXPAND, Action.EXPORT_CONTRACT, Action.TRADE],
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.COSTS, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 6,
    mapSectors: [MapSector.B]
  },
  {
    id: 7,
    round: 1,
    actions: [Action.UPGRADE, Action.EXPORT_CONTRACT, Action.EXPAND, Action.TRADE],
    expandCriteria: [ExpandCriteria.NEIGHBORHOOD, ExpandCriteria.PORT, ExpandCriteria.COSTS, ExpandCriteria.SETTLEMENTS],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 7,
    mapSectors: [MapSector.C]
  },
  {
    id: 8,
    round: 1,
    actions: [Action.EXPORT_CONTRACT, Action.EXPAND, Action.UPGRADE, Action.TRADE],
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD, ExpandCriteria.COSTS],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 1,
    mapSectors: [MapSector.D]
  },
  {
    id: 9,
    round: 1,
    actions: [Action.EXPORT_CONTRACT, Action.EXPAND, Action.TRADE, Action.UPGRADE],
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD, ExpandCriteria.COSTS],
    upgradeType: UpgradeType.SHIP_LEVEL,
    chooseUnitSteps: 2,
    mapSectors: [MapSector.A, MapSector.B]
  },
  {
    id: 10,
    round: 1,
    actions: [Action.SKIP_TURN],
    removeCard: true,
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.COSTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.SHIP_LEVEL,
    chooseUnitSteps: 3,
    mapSectors: [MapSector.B]
  },
  {
    id: 11,
    round: 1,
    actions: [Action.SKIP_TURN],
    removeCard: true,
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.COSTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.SHIP_LEVEL,
    chooseUnitSteps: 4,
    mapSectors: [MapSector.C]
  },
  {
    id: 12,
    round: 1,
    actions: [Action.SKIP_TURN],
    removeCard: true,
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD, ExpandCriteria.COSTS],
    upgradeType: UpgradeType.SHIP_LEVEL,
    chooseUnitSteps: 5,
    mapSectors: [MapSector.D]
  },
  {
    id: 13,
    round: 1,
    actions: [Action.SKIP_TURN],
    removeCard: true,
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.COSTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.SHIP_LEVEL,
    chooseUnitSteps: 6,
    mapSectors: [MapSector.A]
  },
  {
    id: 14,
    round: 1,
    actions: [Action.EXPAND, Action.EXPORT_CONTRACT, Action.UPGRADE, Action.TRADE],
    expandCriteria: [ExpandCriteria.NEIGHBORHOOD, ExpandCriteria.PORT, ExpandCriteria.COSTS, ExpandCriteria.SETTLEMENTS],
    upgradeType: UpgradeType.SHIP_LEVEL,
    chooseUnitSteps: 7,
    mapSectors: [MapSector.D, MapSector.C]
  },
  {
    id: 15,
    round: 2,
    actions: [Action.EXPORT_CONTRACT, Action.EXPAND, Action.TRADE, Action.UPGRADE],
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.COSTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.SHIP_LEVEL,
    chooseUnitSteps: 1,
    mapSectors: [MapSector.A, MapSector.C]
  },
  {
    id: 16,
    round: 2,
    actions: [Action.TRADE, Action.EXPORT_CONTRACT, Action.EXPAND, Action.UPGRADE],
    expandCriteria: [ExpandCriteria.PORT, ExpandCriteria.SETTLEMENTS, ExpandCriteria.COSTS, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.SHIP_LEVEL,
    chooseUnitSteps: 2,
    mapSectors: [MapSector.B, MapSector.D]
  },
  {
    id: 17,
    round: 3,
    actions: [Action.UPGRADE, Action.EXPORT_CONTRACT, Action.EXPAND, Action.TRADE],
    expandCriteria: [ExpandCriteria.COSTS, ExpandCriteria.SETTLEMENTS, ExpandCriteria.PORT, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 3,
    mapSectors: [MapSector.A, MapSector.D]
  },
  {
    id: 18,
    round: 3,
    actions: [Action.SKIP_TURN],
    expandCriteria: [ExpandCriteria.COSTS, ExpandCriteria.SETTLEMENTS, ExpandCriteria.PORT, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 4,
    mapSectors: [MapSector.B, MapSector.C]
  },
  {
    id: 19,
    round: 4,
    actions: [Action.EXPORT_CONTRACT, Action.EXPAND, Action.TRADE],
    expandCriteria: [ExpandCriteria.SETTLEMENTS, ExpandCriteria.COSTS, ExpandCriteria.PORT, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 5,
    mapSectors: [MapSector.A, MapSector.B]
  },
  {
    id: 20,
    round: 4,
    actions: [Action.TRADE, Action.EXPORT_CONTRACT, Action.EXPAND],
    expandCriteria: [ExpandCriteria.SETTLEMENTS, ExpandCriteria.COSTS, ExpandCriteria.PORT, ExpandCriteria.NEIGHBORHOOD],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 6,
    mapSectors: [MapSector.D, MapSector.C]
  },
  {
    id: 21,
    round: 5,
    actions: [Action.EXPORT_CONTRACT, Action.EXPAND, Action.TRADE],
    expandCriteria: [ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD, ExpandCriteria.COSTS, ExpandCriteria.PORT],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 7,
    mapSectors: [MapSector.A, MapSector.C]
  },
  {
    id: 22,
    round: 5,
    actions: [Action.TRADE, Action.EXPORT_CONTRACT, Action.EXPAND],
    expandCriteria: [ExpandCriteria.SETTLEMENTS, ExpandCriteria.NEIGHBORHOOD, ExpandCriteria.COSTS, ExpandCriteria.PORT],
    upgradeType: UpgradeType.MERCHANT,
    chooseUnitSteps: 1,
    mapSectors: [MapSector.B, MapSector.D]
  },
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param round Round
   * @returns cards
   */
  getForRound(round: number) : Card[] {
    return cards.filter(card => card.round === round)
  },

}
