
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://sequence.xyz">
    <img src="./sequence-icon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Sequence TODO App</h3>

  <p align="center">
    A Web3 TODO app built with sequence wallet API 
  </p>
  <a href="https://twitter.com/search?q=%23buildwithsequence&src=typed_query">#buildWithSequence</a>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installation-with-deploy">Installation & Deploy</a></li>
      </ul>
    </li>
     <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project aims to show a basic TODO web app connected to a smart contract to keep track of tasks for each user, using the [sequence] wallet to have a better user experience. 

Users can connect their wallet using social or email login, but still being non-custodial and multi-chain.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

There are 2 different folders in this project: client & server.

Inside client we have a basic node app with the frontend to communicate with the deployed smart contract.

Inside server we have a basic hardhat structure where you will find the smart contract to deploy.

You do not need to deploy the smart contract again if you don't want to. We have deployed one to Goerli testnet to which the frontend is already pointing at.

### Prerequisites

For this project you will need to have npm installed and if you plan on deploying the smart contract on your own, you will need to install hardhat.

* npm
  ```sh
  npm install npm@latest -g
  ```
  
 * hardhat
    ```sh
    npm install --save-dev hardhat
    ```
  (To use hardhat after this installation you will need to use `npx hardhat`)

### Installation

_Follow this steps to run the app locally and use the already deployed contract_

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. cd into `client` folder and install NPM packages
   ```sh
   cd client && npm install
   ```
3. Start the app
   ```sh
   npm start
   ```
4. Go to your browser and type
    ```
    http://localhost:3000/
    ```
### Installation with deploy

In the `server` folder you will find the hardhat project with the smart contract and the deploy scripts.

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. cd into `client` folder and install NPM packages
   ```sh
   cd client && npm install
   ```
3. Deploy the smart contract following the official tutorial:
  ```
    https://hardhat.org/tutorial/deploying-to-a-live-network
  ```
4. Take the address of the newly deployed contract and change file `./client/src/config.js` adding your newly deployed contract address in the 'TodoContractAddress' variable.

5. (OPTIONAL) If you decided to change the smart contract, you may need to put the contract.json file created after the hardhat build in `./client/src/utils/Todo.json`. If you changed a function signature you will need to do this so ethers.js knows how to communicate with your new smart contract.

6. Cd into `client` folder and start the app
   ```sh
   cd client && npm start
   ```
7. Go to your browser and type
    ```
    http://localhost:3000/
    ```
    
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Twitter - [@0xSequence](https://twitter.com/0xsequence)

Discord - [Sequence Discord](https://discord.gg/sequence)

Youtube - [Sequence Youtube](https://www.youtube.com/channel/UC1zHgUyV-doddTcnFNqt62Q)

GitHub - [Sequence Github](https://github.com/0xsequence)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[sequence]: https://sequence.xyz
[buildWithSequence]: https://twitter.com/search?q=%23buildwithsequence&src=typed_query
