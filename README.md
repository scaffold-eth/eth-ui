# 🖇 Eth-Hooks Overview

Commonly used Ethereum hooks.

Used by 🏗 [scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) and 🏭 [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)

Used by ⚙ [eth-components](https://github.com/scaffold-eth/eth-components)

Created by 🏰 [BuidlGuidl.eth](https://BuidlGuidl.com)

## Authors

[@shravansunder](https://github.com/ShravanSunder)

# Quickstart

## Install

```sh
yarn add eth-hooks
```

## Setting up the context for eth-hooks

Add the contexts to your app

```ts
<ContractsAppContext>
  <EthersAppContext>
    <YourMainPage />
  </EthersAppContext>
</ContractsAppContext>
```

## Using the ethersAppContext & hooks

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
const [yourLocalBalance, update, status] = useBalance(ethersContext.account ?? '');
Z;
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

An example of changing an update interval

```ts
// normally the hooks update every block
const [yourLocalBalance, update, status] = useBalance(ethersContext.account);
// you can update then every other block
const [yourLocalBalance, update, status] = useBalance(ethersContext.account, {});
```

# API Documentation

Check out [the documentation!](https://scaffold-eth.github.io/eth-hooks/)

The documentation are also available on scaffold-eth gitbook:

[Documentation at gitbook](https://docs.scaffoldeth.io/scaffold-eth-libraries/v/eth-hooks-v3/)
