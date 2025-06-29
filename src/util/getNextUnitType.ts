import UnitType from '@/services/enum/UnitType'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

/**
 * Get next preferred unit type
 * @param currentUnitType Current unit
 * @param offset Offset
 * @returns Next unit type
 */
export default function(currentUnitType: UnitType, offset: number) : UnitType {
  const allUnitType = getAllEnumValues(UnitType)
  const currentIndex = allUnitType.indexOf(currentUnitType)
  const nextIndex = (currentIndex + offset) % allUnitType.length
  return allUnitType[nextIndex]
}
