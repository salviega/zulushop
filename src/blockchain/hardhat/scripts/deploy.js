const fs = require('fs')
const { ethers } = require('hardhat')

async function main () {
  const addressUSD = "0xa3542355604cFD6531AAf020DDAB3bDFFf4d1809"
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
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
