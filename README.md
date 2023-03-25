# 🌲 Arboracle

Arboracle is a project that aims to bring data of reforestation projects on chain in a decentralized and secure way.

In this approach, each reforestation project will function as a DataDAO and its purpose is to incentivize people to bring data on chain. The data can be photos, videos or anything that helps the DataDAO to prove the health of the project.

For example, the DAO can say something like: "In order to submit data you have to provide a bond of 100 tokens an your reward will be 10 tokens if the data really represents the actual state of the project". These reward tokens can be in the form of ERC20 tokens minted by the project as it captures CO2 or any other token, such as USDC or WETH.

The data that the user submits is secured by the Optimistic Oracle of UMA.

After the data has has been accepted the DataDAO will use Bacalhau to run different algorithms on the submitted data and update the Health Score of the project. For this demo I ran out of time to implement this functionality with Bacalhau.

# Live demo

- You can interact with the live demo in this [link](https://mature-pickle.surge.sh/).
- Also, here is a demo video on [youtube](https://youtu.be/jZn_8mASKNc) and in [lenstube](https://lenstube.xyz/watch/0x014f6f-0x09).
- The contracts are verified at this addresses:
  - [Brazil Project](https://goerli.etherscan.io/address/0xa901de865d04fb375Bd2097a47337A6AE8c94f59#code)
  - [Colombia Project](https://goerli.etherscan.io/address/0x451E2A5ef9C69DF3eEA5BEFC588D8a058452963a#code)
  - [CostaRicaProject](https://goerli.etherscan.io/address/0xf7186888A18d95856A4dE8266c10526765B437e4#code)

# Directory Structure

Scaffold-Eth provides a lot of nice functionality that I did not use for this project. The folders that contain all the app functionaliy are:

- `packages/react-app`: contains all the front end in react.
- `packages/hardhat`: contains the solidity contracts and deploy scripts. There is a contract called `ArboracleRewards.sol` that I was starting to play around by setting a non zero reward and bond.

Regarding the front end, the important components are located at:

- `packages/react-app/src/views/ProjectCard`: this componenet displays each contract reforestation project.
- `packages/react-app/src/views/components/EventsArboracle`: this is a component that I modified slightly from the `Events` component provided by Scaffold-Eth.

# Run the project locally

One of the nice things of Scaffold-Eth is that is very easy to run a project locally, as prerequisites you will need [Node (v18 LTS)](https://nodejs.org/en/download/) plus [Yarn (v1.x)](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork:

```bash
git clone https://github.com/wildanvin/arboracle
```

> install and start your 👷‍ Hardhat chain:

```bash
cd arboracle
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend (you will need node v18):

```bash
cd arboracle
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd arboracle
yarn deploy
```

That will deploy all the contracts. If you only want to deploy the countries contracts you can run

```bash
yarn deploy --tags Countries
```

📱 Open http://localhost:3000 to see the app

Take into account that if you are interacting in a local environmet you have to comment in the `Arboracle.sol` the lines that interact with th OO in Goerli.

## IPFS

To upload the document to IPFS I followed this [tutorial](https://dev.to/edge-and-node/uploading-files-to-ipfs-from-a-web-application-50a). You will need to create an IPFS project in [Infura](https://www.infura.io/) and create a `.env` file inside `packages/react-app` like this one:

```bash
REACT_APP_IPFS_PROJECT_ID="<your-infura-project-id>"
REACT_APP_IPFS_PROJECT_SECRET="<your-infura-project-secret>"
```

# Deploy the project to a testnet

To deploy the project to Goerli testnet I used the steps provided in [SpeedrunEthereum](https://speedrunethereum.com/challenge/simple-nft-example), starting from Checkpoint 3.

It is important to mention that after you have deployed your contracts to the testnet and published your front end to surge you should go back to the default values that you had when you were working locally.

# For the future:

- Set a non zero bond and reward.
- Integrate with Bacalhau.
- Write tests for the smart contracts.
- Run tools like slither, echidna and manticore in order to detect bugs in the contracts.

# Contact

If you have any question, feel free to reach out on [twitter](https://twitter.com/wildanvin) ✌️
