import { expect } from 'chai'
import getTakeExportContractMoney from '@/util/getTakeExportContractMoney'

describe('util/getTakeExportContractMoney', () => {
  it('getTakeExportContractMoney', () => {
    expect(getTakeExportContractMoney(1)).to.eq(5)
    expect(getTakeExportContractMoney(2)).to.eq(0)
    expect(getTakeExportContractMoney(3)).to.eq(-5)
    expect(getTakeExportContractMoney(4)).to.eq(-10)
    expect(getTakeExportContractMoney(5)).to.eq(-15)
  })
})
