require('@nomiclabs/hardhat-waffle')
require("@nomiclabs/hardhat-etherscan")
require('dotenv').config()

/**
 @type import('hardhat/config').HardhatUserConfig
**/

module.exports = {
  paths: {
    sources: './src/blockchain/hardhat/contracts',
    tests: './src/blockchain/hardhat/tests',
    cache: './src/blockchain/hardhat/cache',
    artifacts: './src/blockchain/hardhat/artifacts'
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY
    }
  },
  defaultNetwork: 'goerli',
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
        url: process.env.RINKEBY_RPC_URL,
        blockNumber: 11321611
      }
    },
    localhost: {},
    goerli: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true
    }
  },
  solidity: '0.8.9'
}