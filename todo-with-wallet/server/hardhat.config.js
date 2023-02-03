require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks:  {
    goerli: {
      url: process.env.INFURA_URL,
      accounts: [process.env.INFURA_API_KEY],
    }
  }
};
