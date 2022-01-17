# 🖇 Eth-Hooks

## Overview

Commonly used Ethereum hooks to supercharge your web3 dev!

Used by 🏗 [scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) and 🏭 [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)

Used by ⚙ [eth-components](https://github.com/scaffold-eth/eth-components)

Created by 🏰 [BuidlGuidl.eth](https://BuidlGuidl.com)

### Author

[@shravansunder](https://github.com/ShravanSunder)

### Contributors

- [@ss6](https://github.com/ssp6)

## Features

> See this [video summary on v4 features](https://www.youtube.com/watch?v=STxAdE8wQwY)!

### EthersAppContext

A context that allows you to access the current ethers.js context and information such as provider, signer, account. This allows your user to easily log into web3 account using web3modal. You can setup up overrides and multiple providers.

### ContractAppContext

Gives you a `contractContextFactory` that allows you to easily setup typed contracts, load typed contracts, create connectors, and access them with hooks anywhere in your app.

### Caching & optional updates

Caches the network RPC calls so that unecessary requests to the network is prevented. You can setup an update interval from every block, every (n) blocks, polling, onMount, onWindow focus and other react-query update options.

### Hooks!

Ethers App Context

- useBlockNumberContext
- useEthersContext

Network

- useBalance
- useBlockNumber
- useContractExistsAtAddress
- useEventListener
- useGasPrice
- useNonce
- useSignerAddress

Contracts

- useContractReader
- contractContextFactory
  - useLoadAppContracts
  - useConnectAppContracts
  - useConnectAppContracts
- legacy (eth-hooks v2+)
  - useContractLoader
  - useContractReaderUntyped

ERC

- useTokenBalance

Dapps

- useDexEthPrice
- useDexTokenList
- useResolveEnsAddress
- useResolveEnsName

Utility

- useBurnerSigner

## Quickstart

### Install

```sh
yarn add eth-hooks
```

### Setting up the context for eth-hooks

Add the contexts to your app

```ts
<ContractsAppContext>
  <EthersAppContext>
    <YourMainPage />
  </EthersAppContext>
</ContractsAppContext>
```

> You can see an example of providers in scaffold-eth-typescript [app.tsx](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/App.tsx)

### Using the ethersAppContext & hooks

An example of using the context

```ts
const ethersContext = useEthersContext();
// you now have access to signer, provider, account (address), etc...  See IEthersContext for details
```

An example of using a hook

```typescript
// ---------------------
// 🏦 get your balance
// ---------------------
// This instance uses the provider from the context in useBalance internally
const [yourLocalBalance, update, status] = useBalance(ethersContext.account);
Z;
```

An example of changing an update interval

```ts
// normally the hooks update every block
const [yourLocalBalance, update, status] = useBalance(ethersContext.account);
// you can change the update schedule to every 10 blocks, the default is every 1 block:
const [yourLocalBalance, update, status] = useBalance(ethersContext.account, { blockNumberInterval: 10 });
// you can change the update schedule to every polling, min is 10000ms
const [yourLocalBalance, update, status] = useBalance(ethersContext.account, {
  refetchInterval: 100000,
  blockNumberInterval: undefined,
});
// you can use advanced react-query update options
const [yourLocalBalance, update, status] = useBalance(ethersContext.account, {
  blockNumberInterval: 1,
  query: { refetchOnWindowFocus: true },
});
```

An example of overriding the provider from the context

```ts
// get an adaptor from a provider or signer
const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(exampleMainnetProvider);
// pass in the override variable
const [yourMainnetBalance] = useBalance(ethersContext.account, mergeDefaultUpdateOptions(), {
  adaptorEnabled: true,
  adaptor: mainnetAdaptor,
});
```

> Check out examples in scaffold-eth-typescript in [useScaffoldHooksExamples.tsx](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/components/main/hooks/useScaffoldHooksExamples.tsx)

### Using ContractAppContext

#### 1. Generating types for your contract

The first thing you'll have to do is generate your contrac types for hardhat and external contracts. Add `eth-sdk` or `typechain with hardhat` to generate that to a folder such as `generated/contract-types`. Pull [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript) for an example of this.

##### An example on to use eth-sdk for external contracts

scaffold-eth-typescript uses `eth-sdk` to generate types and abi for external contracts using. See the excellent documentation there for this at [eth-sdk github](https://github.com/dethcrypto/eth-sdk). 📝 Note that this would a dev dependency on your project.

- a config of `{contractNames: address}` [externalContractConfig.ts](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/config/externalContractsConfig.ts)
- a config for [eth-sdk-config.ts](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/scripts/eth-sdk-config.ts.bak)
- and calling the `eth-sdk` with the folder of your config file as a parameter e.g. `yarn eth-sdk -p ./src/generated`

##### An example of using hardhat with typechain

> Check out the excellent [typechain docs](https://github.com/dethcrypto/TypeChain). You can find an example in scaffold-eth-typescript [hardhat.config.ts](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/hardhat-ts/hardhat.config.ts)

#### 2. Creating the context with contractsContextFactory

You'll have to create a config that returns a config of your contracts. This would be hetrogenous key value pair. each value is generated by the helper functions in eth-hooks.

For example:

```ts
// a function that generates the config. Note that your types have to exist already!
export const contractConnectorConfig = () => {
  try {
    const result = {
      // 🙋🏽‍♂️ Add your hadrdhat contracts here
      YourContract: createConnectorForHardhatContract(
        'YourContract',
        hardhatContracts.YourContract__factory,
        hardhatContractsJson
      ),

      // 🙋🏽‍♂️ Add your external contracts here, make sure to define the address in `externalContractsConfig.ts`
      DAI: createConnectorForExternalContract('DAI', externalContracts.DAI__factory, externalContractsAddressMap),
      UNI: createConnectorForExternalContract('UNI', externalContracts.UNI__factory, externalContractsAddressMap),

      // 🙋🏽‍♂️ Add your external abi here (unverified contracts)`
      // DAI: createConnectorForExternalAbi('DAI', { 1: {address: 'xxxx'}}, abi),
    } as const;

    return result;
  } catch (e) {
    console.error(
      '❌ contractConnectorConfig: ERROR with loading contracts please run `yarn contracts:build or yarn contracts:rebuild`.  Then run `yarn deploy`!',
      e
    );
  }

  return undefined;
};

// create a type from the return value of the function above
export type TAppConnectorList = NonNullable<ReturnType<typeof contractConnectorConfig>>;
```

Use `contractContextFactory` to create your hooks and context in your app from the above configuration. You could just copy the blow and use it.

```ts
// you're passing in function `contractConnectorConfig` from above into the factory.  You then have to use the type we defined to type the factory outputs.
export const {
  ContractsAppContext,
  useAppContractsActions,
  useAppContracts,
  useLoadAppContracts,
  useConnectAppContracts,
} = contractsContextFactory<
  /* the contractNames (keys) in config output */
  keyof TAppConnectorList,
  /* the type of the config output  */
  TAppConnectorList,
  /* A type that infers the value of each contractName: contract pair*/
  TTypedContract<keyof TAppConnectorList, TAppConnectorList>
>(contractConnectorConfig);
```

> See scaffold-eth-typescript [contractContext.tsx](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/config/contractContext.ts) and [contractConnectorConfig.ts](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/config/contractConnectorConfig.ts) for full examples on how to do this.

#### 3. Using hooks to get your contracts

Now that you've created the context and hooks above you can use them in your app. The first step is to load your contracts using the hooks you've created with the factory.

```ts
// 🛻 load contracts
useLoadAppContracts();
```

Next you'll want to connect the contracts.

```ts
// 🏭 connect to  contracts for current network & signer
useConnectAppContracts(asEthersAdaptor(ethersContext));

// 🏭 connect to contracts for mainnet network & signer
const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(mainnetProvider);
useConnectAppContracts(mainnetAdaptor);
```

Now you can get typed contracts anywhere in your

```ts
const yourContract = useAppContracts('YourContract', ethersContext.chainId);
const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);
```

You can read values from the contracts using the `useContractReader` hook

```ts
// keep track of a variable from the contract in the local React state:
const [purpose, update] = useContractReader(
  /* the contract */
  yourContract,
  /* the contract variable or function to read */
  yourContract?.purpose,
  /* the arguments, they are typed tuple */
  [],
  /* optional: if you want your contracts to only update on event */
  yourContract?.filters.SetPurpose()
);

// keep track of a variable from the contract in the local React state:
const [purpose, update] = useContractReader(
  /* the contract */
  yourContract,
  /* the contract variable or function to read */
  yourContract?.purpose,
  /* the arguments, they are typed tuple */
  [],
  undefined,
  /* optional: update every 10 blocks */
  { blockNumberInterval: 10 }
);
```

## API Documentation

Check out [the documentation here!](https://scaffold-eth.github.io/eth-hooks/)

The documentation are also available on [scaffold-eth's gitbook](https://docs.scaffoldeth.io/scaffold-eth-libraries/v/eth-hooks-v3/)

## Dependencies

### Main package dependencies

- ethers.js
- @uniswap/token-lists
- @web3-react: core, abstractconnector, types
- web3modal
- react-query

### Peer dependencies

- react, react/dom
- uniswap/sdk
