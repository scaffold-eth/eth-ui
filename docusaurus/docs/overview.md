---
sidebar_position: 1
---
# 🖇 Overview

Easily port Ethereum blockchain information to your React frontend.

Used by:

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

### Advantages to using Eth-hooks

#### EthersAppContext

`EthersAppContext` allows you to access the current ethers.js context and information such as `provider`, `signer`, and `account`. This allows users to easily log into a web3 account using `web3modal`. You can also setup up overrides and multiple providers.

#### ContractAppContext

Gives you a `contractContextFactory` that allows you to easily set up typed contracts, load typed contracts, create connectors, and access them with hooks anywhere in your app.

#### Caching & optional updates

Caches the network RPC calls. This prevents unnecessary requests to the network. You can set up an update interval from every block, every (n) blocks, polling, onMount, onWindow focus, and other react-query update options.

### How the hooks are subdivided

#### Ethers App Context

- [useBlockNumberContext](./main/hooks/useBlockNumberContext)
- [useEthersContext](./main/hooks/useEthersContext)

#### Network

- [useBalance](./main/hooks/useBalance)
- [useBlockNumber](./main/hooks/useBlockNumber)
- [useContractExistsAtAddress](./main/hooks/useContractExistsAtAddress)
- [useEventListener](./main/hooks/useEventListener)
- [useGasPrice](./main/hooks/useGasPrice)
- [useNonce](./main/hooks/useNonce)
- [useSignerAddress](./main/hooks/useSignerAddress)

#### Contracts

- [useContractReader](./main/hooks/useContractReader)
- contractContextFactory
  - [useLoadAppContracts](./main/hooks/useLoadAppContracts)
  - [useConnectAppContracts](./main/hooks/useConnectAppContracts)
- legacy (eth-hooks V2+)
  - [useContractLoader](./main/hooks/useContractLoader)
  - [useContractReaderUntyped](./main/hooks/useContractReaderUntyped)

#### ERC Token Standard

- [useTokenBalance](./main/hooks/useTokenBalance)

#### Decentralized applications

- [useDexEthPrice](./main/hooks/useDexEthPrice)
- [useDexTokenList](./main/hooks/useDexTokenList)
- [useResolveEnsAddress](./main/hooks/useResolveEnsAddress)
- [useResolveEnsName](./main/hooks/useResolveEnsName)

#### Utility

- [useBurnerSigner](./main/hooks/useBurnerSigner)

### API Documentation

Check out [documentation at the eth-hooks website!](https://scaffold-eth.github.io/eth-hooks/docs/api)