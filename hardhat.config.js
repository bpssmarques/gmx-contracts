require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-contract-sizer")
require('@typechain/hardhat')

const {
  SHIMMER_URL,
  SHIMMER_DEPLOY_KEY,
  SHIMMER_API_KEY,
  MILKOMEDA_URL,
  MILKOMEDA_DEPLOY_KEY,
  MILKOMEDA_API_KEY
} = require("./env.json")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.info(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    localhost: {
      timeout: 120000
    },
    hardhat: {
      allowUnlimitedContractSize: true
    },
    shimmer: {
      url: SHIMMER_URL,
      chainId: 1074,
      gasPrice: 10000000000,
      accounts: [SHIMMER_DEPLOY_KEY]
    },
    milkomeda: {
      url: MILKOMEDA_URL,
      chainId: 2100,
      gasPrice: 20000000000,
      accounts: [MILKOMEDA_DEPLOY_KEY]
    }
  },
  etherscan: {
    apiKey: {
      shimmer: SHIMMER_API_KEY,
      milkomeda: MILKOMEDA_API_KEY
    }
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
}
