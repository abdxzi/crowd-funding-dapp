require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat:{},
    hardhat_node: {
      url: "http://127.0.0.1:8545/"
    },
    // sepolia: {
    //   url: process.env.TESTNET_RPC_URL_SEPOLIA,
    //   accounts: [process.env.TESTNET_PRIVATE_KEY],
    // },
  }
};
