const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('ZuluShop Contract', () => {
  const setup = async () => {
    const zuluUSD = await ethers.getContractFactory('ZuluUSD')
    const deployedZuluUSD = await zuluUSD.deploy()
    const address = deployedZuluUSD.address

    const [owner, addr] = await ethers.getSigners()

    const tokens = await deployedZuluUSD.mint(owner, 1000)

    const zuluShopContract = await ethers.getContractFactory('ZuluShopContract', tokens)
    const deployed = await zuluShopContract.deploy(address, tokens)

    return {
      owner,
      addr,
      deployed,
      tokens
    }
  }

  it('transfer amount', async () => {
    const { owner, deployed, tokens } = await setup()
    const amountToken = 11
    const amountFiat = 2000
    console.log(tokens)
    // const response = await deployed.transfer(1, owner, amountToken, amountFiat,  { value: ethers.utils.parseUnits(amountToken.toString()) })
  })
})
