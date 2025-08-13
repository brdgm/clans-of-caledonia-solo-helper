import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColorCode from '@/util/getPlayerColorCode'
import { expect } from 'chai'

describe('util/getPlayerColorCode', () => {
  it('colorCode', () => {
    for (const playerColor of Object.values(PlayerColor)) {
      expect(getPlayerColorCode(playerColor)).to.not.undefined
    }
  })
})
