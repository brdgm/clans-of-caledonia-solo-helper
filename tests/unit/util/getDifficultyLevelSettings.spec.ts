import { expect } from 'chai'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

describe('util/getDifficultyLevelSettings', () => {
  it('getDifficultyLevelSettings', () => {
    getAllEnumValues(DifficultyLevel).forEach(difficultyLevel => {
      const settings = getDifficultyLevelSettings(difficultyLevel)
      expect(settings.shipLevel).to.equal(2)
      expect(settings.startingMoney).to.greaterThanOrEqual(50)
      expect(settings.round5VP).to.greaterThanOrEqual(10)
      expect(settings.round5VPTrain).to.greaterThanOrEqual(10)
    })
  })
})
