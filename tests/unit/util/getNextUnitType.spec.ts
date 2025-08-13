import UnitType from '@/services/enum/UnitType'
import getNextUnitType from '@/util/getNextUnitType'
import { expect } from 'chai'

describe('util/getNextUnitType', () => {
  it('getNextUnitType', () => {
    expect(getNextUnitType(UnitType.SHEEP, 1)).to.eq(UnitType.COW)
    expect(getNextUnitType(UnitType.COW, 6)).to.eq(UnitType.SHEEP)
    expect(getNextUnitType(UnitType.CHEESE_DAIRY, 7)).to.eq(UnitType.CHEESE_DAIRY)
  })
})
