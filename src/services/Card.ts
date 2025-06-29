import Action from './enum/Action'
import ExpandCriteria from './enum/ExpandCriteria'
import MapModule from './enum/MapModule'
import UpgradeType from './enum/UpgradeType'

export default interface Card {
  id: number
  round: number
  actions: Action[]
  removeCard?: boolean
  expandCriteria: ExpandCriteria[]
  upgradeType: UpgradeType
  chooseUnitSteps: number
  mapModules: MapModule[]
}
