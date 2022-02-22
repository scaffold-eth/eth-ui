---
sidebar_position: 1
---
# 🖇Overview

Used by

- 🏗 [scaffold-eth](https://github.com/scaffold-eth/scaffold-eth)
- 🏭 [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)
- ⚙ [eth-components](https://github.com/scaffold-eth/eth-components)

_These docs are for developers who are already familiar with the basics of [Ethereum](https://ethereum.org/en/) and [React](https://reactjs.org/)._

## Key features of Eth-hooks V4

- Designed for easy use without a need to understand what's under the hood
- Choose how often a hook receives updates from the network
- Easily use context with ethers and contracts
- Typed contracts that make it easier to understand the contract interface
- Allows different ways to pass in ethers provider or secondary providers
- Network RPC calls are cached stopping unnecessary requests to the network
- [Typescript](https://www.typescriptlang.org/) friendly
- We use an [MIT license](https://en.wikipedia.org/wiki/MIT_License)

### A little more information

#### EthersAppContext

A context that allows you to access the current ethers.js context and information such as `provider`, `signer`, `account`. This allows your user to easily log into web3 account using `web3modal`. You can setup up overrides and multiple providers.

#### ContractAppContext

Gives you a `contractContextFactory` that allows you to easily setup typed contracts, load typed contracts, create connectors, and access them with hooks anywhere in your app.

#### Caching & optional updates

Caches the network RPC calls so that unecessary requests to the network are prevented. You can setup an update interval from every block, every (n) blocks, polling, `onMount`, `onWindow` focus and other react-query update options.

#### API Documentation

Check out [the documentation at the eth-hooks page!](https://scaffold-eth.github.io/eth-hooks/)
