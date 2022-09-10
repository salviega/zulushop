const fs = require('fs')
const { ethers } = require('hardhat')

async function main () {
  const ZuluShopContract = await ethers.getContractFactory('ZuluShopContract')
  const zuluShop = await ZuluShopContract.deploy()
  await zuluShop.deployed()
  console.log('The ZuluShop Contract was deployed to: ' + zuluShop.address)
  console.log('The ZuluShop Contract was deployein to block number: ' + await zuluShop.provider.getBlockNumber())

  // Create the environment file with the start contract addresses.
  const addresses = {
    zulushopcontract: zuluShop.address,
    blocknumber: await zuluShop.provider.getBlockNumber()
  }
  const addressesJSON = JSON.stringify(addresses)
  fs.writeFileSync('src/blockchain/environment/contract-address.json', addressesJSON)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
