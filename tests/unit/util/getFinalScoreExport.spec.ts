import { expect } from 'chai'
import getFinalScoreExport from '@/util/getFinalScoreExport'

describe('util/getFinalScoreExport', () => {
  describe('2 players', () => {
    it('no tie, difference > 1: winner gets 8 VP, loser gets 0 VP', () => {
      expect(getFinalScoreExport([5, 3])).to.deep.eq([8, 0])
    })

    it('no tie, difference > 1 – reversed order', () => {
      expect(getFinalScoreExport([3, 5])).to.deep.eq([0, 8])
    })

    it('no tie, difference exactly 1: winner gets 8 VP, loser gets 4 VP', () => {
      expect(getFinalScoreExport([5, 4])).to.deep.eq([8, 4])
    })

    it('no tie, difference exactly 1 – reversed order', () => {
      expect(getFinalScoreExport([4, 5])).to.deep.eq([4, 8])
    })

    it('tie – both players get 4 VP', () => {
      expect(getFinalScoreExport([4, 4])).to.deep.eq([4, 4])
    })
  })

  describe('3 players', () => {
    it('no tie', () => {
      expect(getFinalScoreExport([9, 5, 2])).to.deep.eq([12, 6, 0])
    })

    it('no tie – unsorted order', () => {
      expect(getFinalScoreExport([5, 9, 2])).to.deep.eq([6, 12, 0])
    })

    it('tie for 1st – share 12+6 = 18, floor(18/2) = 9 each', () => {
      expect(getFinalScoreExport([7, 7, 2])).to.deep.eq([9, 9, 0])
    })

    it('tie for 2nd – share 6, floor(6/2) = 3 each', () => {
      expect(getFinalScoreExport([9, 4, 4])).to.deep.eq([12, 3, 3])
    })

    it('three-way tie – share 12+6 = 18, floor(18/3) = 6 each', () => {
      expect(getFinalScoreExport([5, 5, 5])).to.deep.eq([6, 6, 6])
    })
  })

  describe('4 players', () => {
    it('no tie', () => {
      expect(getFinalScoreExport([10, 7, 4, 1])).to.deep.eq([12, 6, 0, 0])
    })

    it('no tie – unsorted order', () => {
      expect(getFinalScoreExport([4, 10, 1, 7])).to.deep.eq([0, 12, 0, 6])
    })

    it('tie for 1st – share 12+6 = 18, floor(18/2) = 9 each', () => {
      expect(getFinalScoreExport([8, 8, 4, 1])).to.deep.eq([9, 9, 0, 0])
    })

    it('tie for 2nd – share 6, floor(6/2) = 3 each', () => {
      expect(getFinalScoreExport([10, 5, 5, 1])).to.deep.eq([12, 3, 3, 0])
    })

    it('three-way tie for 1st – share 12+6 = 18, floor(18/3) = 6 each', () => {
      expect(getFinalScoreExport([6, 6, 6, 1])).to.deep.eq([6, 6, 6, 0])
    })

    it('four-way tie – share 12+6 = 18, floor(18/4) = 4 each', () => {
      expect(getFinalScoreExport([5, 5, 5, 5])).to.deep.eq([4, 4, 4, 4])
    })
  })
})
