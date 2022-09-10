const fs = require('fs')
const { ethers } = require('hardhat')

async function main () {

  const ZuluUSD = await ethers.getContractFactory('ZuluUSD')
  const zuluUSDDev = await ZuluUSD.deploy()
  await zuluUSDDev.deployed()
  
  const addressUSD = zuluUSDDev.address
  const decimals = 18
  const ZuluShopContract = await ethers.getContractFactory('ZuluShopContract')
  const zuluShop = await ZuluShopContract.deploy(addressUSD, decimals)
  await zuluShop.deployed()



  console.log('The ZuluShop Contract was deployed to: ' + zuluShop.address)
  console.log('The ZuluShop Contract was deployein to block number: ' + await zuluShop.provider.getBlockNumber())

  // Create the environment file with the start contract addresses.
  const addresses = {
    zulushopcontract: zuluShop.address,
    blocknumber: await zuluShop.provider.getBlockNumber()
    
  }
  const addressesJSON = JSON.stringify(addresses)
  fs.writeFileSync("src/blockchain/environment/address.json", addressesJSON)

  const addresses2 = {
    zuluUSDDevcontract: zuluUSDDev.address,
    blocknumber: await zuluUSDDev.provider.getBlockNumber()
    
  }
  const addressesJSON2 = JSON.stringify(addresses2)
  fs.writeFileSync("src/blockchain/environment/address2.json", addressesJSON2)
}


main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
