import { expect } from 'chai'
import getFinalScoreSettlement from '@/util/getFinalScoreSettlement'

describe('util/getFinalScoreSettlement', () => {
  describe('2 players', () => {
    it('no tie', () => {
      expect(getFinalScoreSettlement([5, 3])).to.deep.eq([12, 0])
    })

    it('no tie – reversed order', () => {
      expect(getFinalScoreSettlement([3, 5])).to.deep.eq([0, 12])
    })

    it('tie – both players share 12 VP (floor(12/2) = 6 each)', () => {
      expect(getFinalScoreSettlement([4, 4])).to.deep.eq([6, 6])
    })
  })

  describe('3 players', () => {
    it('no tie', () => {
      expect(getFinalScoreSettlement([9, 5, 2])).to.deep.eq([18, 12, 6])
    })

    it('no tie – unsorted order', () => {
      expect(getFinalScoreSettlement([5, 9, 2])).to.deep.eq([12, 18, 6])
    })

    it('tie for 1st – share 18+12 = 30, floor(30/2) = 15 each', () => {
      expect(getFinalScoreSettlement([7, 7, 2])).to.deep.eq([15, 15, 6])
    })

    it('tie for 2nd – share 12+6 = 18, floor(18/2) = 9 each', () => {
      expect(getFinalScoreSettlement([9, 4, 4])).to.deep.eq([18, 9, 9])
    })

    it('three-way tie – share 18+12+6 = 36, floor(36/3) = 12 each', () => {
      expect(getFinalScoreSettlement([5, 5, 5])).to.deep.eq([12, 12, 12])
    })
  })

  describe('4 players', () => {
    it('no tie', () => {
      expect(getFinalScoreSettlement([10, 7, 4, 1])).to.deep.eq([18, 12, 6, 0])
    })

    it('no tie – unsorted order', () => {
      expect(getFinalScoreSettlement([4, 10, 1, 7])).to.deep.eq([6, 18, 0, 12])
    })

    it('tie for 1st – share 18+12 = 30, floor(30/2) = 15 each', () => {
      expect(getFinalScoreSettlement([8, 8, 4, 1])).to.deep.eq([15, 15, 6, 0])
    })

    it('tie for 2nd – share 12+6 = 18, floor(18/2) = 9 each', () => {
      expect(getFinalScoreSettlement([10, 5, 5, 1])).to.deep.eq([18, 9, 9, 0])
    })

    it('three-way tie for 1st – share 18+12+6 = 36, floor(36/3) = 12 each', () => {
      expect(getFinalScoreSettlement([6, 6, 6, 1])).to.deep.eq([12, 12, 12, 0])
    })

    it('four-way tie – share 18+12+6 = 36, floor(36/4) = 9 each', () => {
      expect(getFinalScoreSettlement([5, 5, 5, 5])).to.deep.eq([9, 9, 9, 9])
    })
  })
})
