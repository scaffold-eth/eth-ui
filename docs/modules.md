[eth-hooks - v3.2.0beta09](README.md) / Exports

# eth-hooks - v3.2.0beta09

## Table of contents

### Hooks Functions

- [useDexEthPrice](modules.md#usedexethprice)
- [useDexTokenList](modules.md#usedextokenlist)
- [useEnsAddress](modules.md#useensaddress)
- [useEnsResolveName](modules.md#useensresolvename)
- [useBalance](modules.md#usebalance)
- [useBlockNumber](modules.md#useblocknumber)
- [useBurnerSigner](modules.md#useburnersigner)
- [useContractExistsAtAddress](modules.md#usecontractexistsataddress)
- [useContractLoader](modules.md#usecontractloader)
- [useContractReader](modules.md#usecontractreader)
- [useEventListener](modules.md#useeventlistener)
- [useGasPrice](modules.md#usegasprice)
- [useGetUserFromProviders](modules.md#usegetuserfromproviders)
- [useGetUserFromSigners](modules.md#usegetuserfromsigners)
- [useNonce](modules.md#usenonce)
- [useOnRepetition](modules.md#useonrepetition)
- [useTimestamp](modules.md#usetimestamp)
- [useUserAddress](modules.md#useuseraddress)
- [useWeb3Modal](modules.md#useweb3modal)

### EthersContext Functions

- [useBlockNumberContext](modules.md#useblocknumbercontext)
- [useEthersContext](modules.md#useetherscontext)
- [ConnectToStaticJsonRpcProvider](modules.md#connecttostaticjsonrpcprovider)

### Helpers Functions

- [asyncSome](modules.md#asyncsome)
- [isEthersProvider](modules.md#isethersprovider)
- [parseProviderOrSigner](modules.md#parseproviderorsigner)
- [lazier](modules.md#lazier)

### Misc Functions

- [useTokenBalance](modules.md#usetokenbalance)

### EthersContext Variables

- [BlockNumberContext](modules.md#blocknumbercontext)
- [EthersAppContext](modules.md#ethersappcontext)

### Models Type aliases

- [TDeployedContracts](modules.md#tdeployedcontracts)
- [TExternalContracts](modules.md#texternalcontracts)
- [TContractFunctionInfo](modules.md#tcontractfunctioninfo)
- [TNetworkInfo](modules.md#tnetworkinfo)

### Misc Type aliases

- [CreateEthersModalConnector](modules.md#createethersmodalconnector)
- [TContractConfig](modules.md#tcontractconfig)
- [TGasStationSpeed](modules.md#tgasstationspeed)

### Type Definition Type aliases

- [TEthersProvider](modules.md#tethersprovider)
- [TEthersProviderOrSigner](modules.md#tethersproviderorsigner)
- [TAbstractProvider](modules.md#tabstractprovider)
- [TEthersUser](modules.md#tethersuser)

### EthersContext Interfaces

- [IStaticJsonRpcProviderConnectorOptions](interfaces/IStaticJsonRpcProviderConnectorOptions.md)

### Misc Interfaces

- [IEthersContext](interfaces/IEthersContext.md)
- [IBurnerSigner](interfaces/IBurnerSigner.md)
- [IWeb3ModalState](interfaces/IWeb3ModalState.md)

### EthersContext Classes

- [EthersModalConnector](classes/EthersModalConnector.md)

## Hooks Functions

### useDexEthPrice

▸ `Const` **useDexEthPrice**(`mainnetProvider`, `targetNetworkInfo?`, `pollTime?`): `number`

#### Summary
Get the Exchange price of ETH/USD (extrapolated from WETH/DAI) from uniswap

#### Notes
- uses useOnRepetition, does not use context

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) | `undefined` |  |
| `targetNetworkInfo?` | [`TNetworkInfo`](modules.md#tnetworkinfo) | `undefined` |  |
| `pollTime` | `number` | `0` | if >0 use polling, else use instead of onBlock event |

#### Returns

`number`

price in USD

#### Defined in

[src/dapps/useDexEthPrice.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/dapps/useDexEthPrice.ts#L22)

___

### useDexTokenList

▸ `Const` **useDexTokenList**(`tokenListUri?`, `chainId?`): `TokenInfo`[]

#### Summary
Gets a tokenlist from uniswap ipfs tokenlist

#### Note
- you can also point it to another URI

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tokenListUri` | `string` | `'https://gateway.ipfs.io/ipns/tokens.uniswap.org'` |  |
| `chainId?` | `number` | `undefined` | optional, you can filter by a particular chainId |

#### Returns

`TokenInfo`[]

(TokenInfo[]) from '@uniswap/token-lists'

#### Defined in

[src/dapps/useDexTokenList.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/dapps/useDexTokenList.ts#L17)

___

### useEnsAddress

▸ `Const` **useEnsAddress**(`mainnetProvider`, `address`): `string`

#### Summary
Gets ENS name for given address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) | mainnet provider |
| `address` | `string` |  |

#### Returns

`string`

#### Defined in

[src/dapps/useEnsAddress.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/dapps/useEnsAddress.ts#L44)

___

### useEnsResolveName

▸ `Const` **useEnsResolveName**(`mainnetProvider`, `ensName`): `string`

#### Summary
Gets the address from an ENS name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | [`TEthersProvider`](modules.md#tethersprovider) | mainnet provider |
| `ensName` | `string` |  |

#### Returns

`string`

#### Defined in

[src/dapps/useEnsResolveName.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/dapps/useEnsResolveName.ts#L16)

___

### useBalance

▸ `Const` **useBalance**(`address`): `BigNumber`

#### Summary
Gets your balance in ETH for the given address.

#### Notes
- updates triggered by [BlockNumberContext](modules.md#blocknumbercontext)
- uses the current provider [ethersProvider](interfaces/IEthersContext.md#ethersprovider) from [useEthersContext](modules.md#useetherscontext)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`BigNumber`

current balance

#### Defined in

[src/useBalance.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useBalance.ts#L22)

___

### useBlockNumber

▸ `Const` **useBlockNumber**(`pollTime?`): `number`

#### Summary
Get the current block number of the network.

#### Notes
- ✋🏽 For app wide block number access use [BlockNumberContext](modules.md#blocknumbercontext) instead
- ⚠ Deprecated
- uses the current ethersProvider from context

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pollTime` | `number` | `0` | if > 0 uses polling, else it uses onBlock event |

#### Returns

`number`

block number

#### Defined in

[src/useBlockNumber.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useBlockNumber.ts#L22)

___

### useBurnerSigner

▸ `Const` **useBurnerSigner**(`localProvider`): [`IBurnerSigner`](interfaces/IBurnerSigner.md)

#### Summary
A hook that creates a burner signer/address and provides ways of interacting with
and updating the signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) | localhost provider |

#### Returns

[`IBurnerSigner`](interfaces/IBurnerSigner.md)

IBurnerSigner

#### Defined in

[src/useBurnerSigner.ts:85](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useBurnerSigner.ts#L85)

___

### useContractExistsAtAddress

▸ `Const` **useContractExistsAtAddress**(`contract`): `boolean`

#### Summary
Checks whether a contract exists on the blockchain

#### Notes
- uses the ethers.Contract object's provider to access the network
- checks the contract address to see if the contract is deployed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `Contract` | ethers.Contract class |

#### Returns

`boolean`

#### Defined in

[src/useContractExistsAtAddress.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useContractExistsAtAddress.ts#L17)

___

### useContractLoader

▸ `Const` **useContractLoader**(`config?`, `providerOrSigner?`, `configChainId?`): `Record`<`string`, `Contract`\>

#### Summary
 Loads your contracts returns them and gives options to read values from contracts
or write transactions into them

#### Notes
A optional providerOrSigner is needed to initalize the contract class
- if none is given, the context providerOrSigner is used if the chainId is the same.
- A signer is required for write contracts
Provider
- uses the current ethersProvider from context
ChainId
- if chain id is not given, it will use the chainId of the provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`TContractConfig`](modules.md#tcontractconfig) |  |
| `providerOrSigner?` | [`TEthersProviderOrSigner`](modules.md#tethersproviderorsigner) | (optional) used to initalize the contract class |
| `configChainId?` | `number` | (optional) can be used to target specific a particular network (such as mainnet) instead of the current provider |

#### Returns

`Record`<`string`, `Contract`\>

Record of contractName:Contracts

#### Defined in

[src/useContractLoader.ts:52](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useContractLoader.ts#L52)

___

### useContractReader

▸ `Const` **useContractReader**<`OutputT`\>(`contract`, `contractFunctionInfo`, `formatter?`, `onChange?`): `undefined` \| `OutputT`

#### Summary
Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states

#### Notes
- uses the ethers.Contract object's provider to access the network
- formatter is a function that can change the format of the output

#### Type parameters

| Name | Description |
| :------ | :------ |
| `OutputT` | return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `Contract` | ethers.Contract class |
| `contractFunctionInfo` | [`TContractFunctionInfo`](modules.md#tcontractfunctioninfo) |  |
| `formatter?` | (`_value`: `OutputT`) => `OutputT` | <OutputT> a function that can format the output |
| `onChange?` | (`_value?`: `OutputT`) => `void` | callback with result as a parameter |

#### Returns

`undefined` \| `OutputT`

<OutputT>

#### Defined in

[src/useContractReader.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useContractReader.ts#L26)

___

### useEventListener

▸ `Const` **useEventListener**(`contract`, `eventName`, `startBlock`): `Event`[]

#### Summary
Tracks the events of associated with a contract

#### Notes
- updates triggered through ethers event listener
- uses the current provider [ethersProvider](interfaces/IEthersContext.md#ethersprovider) from [useEthersContext](modules.md#useetherscontext)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `Contract` | ethers.Contract |
| `eventName` | `string` |  |
| `startBlock` | `number` |  |

#### Returns

`Event`[]

#### Defined in

[src/useEventListener.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useEventListener.ts#L25)

___

### useGasPrice

▸ `Const` **useGasPrice**(`chainId`, `speed`, `currentNetworkInfo?`): `undefined` \| `number`

#### Summary
Gets the gas price for the current network as gwei
- uses EthGasStation for mainnet
- uses ethers.estimateGas other networks
- can use currentNetworkInfo {@link TNetworkInfo.gasPrice} gasPrice as fallback

#### Notes
- if the gas price is unknown it returns undefined
- updates triggered by [BlockNumberContext](modules.md#blocknumbercontext)
- uses the current provider [ethersProvider](interfaces/IEthersContext.md#ethersprovider) from [useEthersContext](modules.md#useetherscontext)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `undefined` \| `number` | - |
| `speed` | [`TGasStationSpeed`](modules.md#tgasstationspeed) |  |
| `currentNetworkInfo?` | [`TNetworkInfo`](modules.md#tnetworkinfo) | uses gasPrice as a fallback |

#### Returns

`undefined` \| `number`

gas as gwei

#### Defined in

[src/useGasPrice.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useGasPrice.ts#L38)

___

### useGetUserFromProviders

▸ `Const` **useGetUserFromProviders**(`currentProvider`, ...`moreProviders`): [`TEthersUser`](modules.md#tethersuser)

#### Summary
Gets the user [TEthersUser](modules.md#tethersuser) from from the current provider or array of fallback providers

#### Notes
- 🤚🏽 Consider using the context provider [ethersProvider](interfaces/IEthersContext.md#ethersprovider)

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) |
| `...moreProviders` | [`TEthersProvider`](modules.md#tethersprovider)[] |

#### Returns

[`TEthersUser`](modules.md#tethersuser)

#### Defined in

[src/useGetUserFromProviders.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useGetUserFromProviders.ts#L21)

___

### useGetUserFromSigners

▸ `Const` **useGetUserFromSigners**(`signer`): [`TEthersUser`](modules.md#tethersuser)

#### Summary
Gets the user [TEthersUser](modules.md#tethersuser) for a signer or wallet

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| `Signer` \| `Wallet` |

#### Returns

[`TEthersUser`](modules.md#tethersuser)

#### Defined in

[src/useGetUserFromSigners.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useGetUserFromSigners.ts#L16)

___

### useNonce

▸ `Const` **useNonce**(`address`): `number`

#### Summary
Get the current nonce for the address provided

#### Notes
- updates triggered by [BlockNumberContext](modules.md#blocknumbercontext)
- uses the current provider [ethersProvider](interfaces/IEthersContext.md#ethersprovider) from [useEthersContext](modules.md#useetherscontext)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`number`

#### Defined in

[src/useNonce.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useNonce.ts#L20)

___

### useOnRepetition

▸ `Const` **useOnRepetition**(`callback`, `options`, ...`args`): `void`

#### Summary
A hook that will periodically invoke a callback.
It can use one of the two options to do so
- onBlock: the block event is used to invoke callback
- Polling: invoke the callback periodically via polling. The minimum time is 10s.

#### Notes
The callback can be invoked once on leading edge when leadTrigger conditions are satisfied
- For example you may want to wait for the provider to initalize before first invocation.
- 👩🏽‍🏫 A provider is needed for onBlock.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (...`_args`: `any`[]) => `void` \| `Promise`<`void`\> |  |
| `options` | `IUseOnRepetitionOptions` |  |
| `...args` | `any`[] | variable arguments for callback |

#### Returns

`void`

#### Defined in

[src/useOnRepetition.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useOnRepetition.ts#L42)

___

### useTimestamp

▸ `Const` **useTimestamp**(): `number`

#### Summary
Get the current timestamp from the latest block

#### Notes
- updates triggered by [BlockNumberContext](modules.md#blocknumbercontext)
- uses the current provider [ethersProvider](interfaces/IEthersContext.md#ethersprovider) from [useEthersContext](modules.md#useetherscontext)

#### Returns

`number`

#### Defined in

[src/useTimestamp.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useTimestamp.ts#L19)

___

### useUserAddress

▸ `Const` **useUserAddress**(`signer`): `undefined` \| `string`

#### Summary
Get the address from the signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| `Signer` |

#### Returns

`undefined` \| `string`

#### Defined in

[src/useUserAddress.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useUserAddress.ts#L15)

___

### useWeb3Modal

▸ `Const` **useWeb3Modal**(`web3ModalConfig`, `setCurrentEthersProvider`): [`IWeb3ModalState`](interfaces/IWeb3ModalState.md)

#### Summary
A hook that makes it easy to interact and use [web3Modal](https://github.com/Web3Modal/web3modal)
- provides callback to open, logout and update the modal theme

#### Notes
- 🤚🏽 Consider using the context provider [ethersProvider](interfaces/IEthersContext.md#ethersprovider) and [EthersModalConnector](classes/EthersModalConnector.md) instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3ModalConfig` | `Partial`<`ICoreOptions`\> |
| `setCurrentEthersProvider` | (`newEthersProvider`: `undefined` \| [`TEthersProvider`](modules.md#tethersprovider)) => `void` |

#### Returns

[`IWeb3ModalState`](interfaces/IWeb3ModalState.md)

#### Defined in

[src/useWeb3Modal.ts:45](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useWeb3Modal.ts#L45)

___

## EthersContext Functions

### useBlockNumberContext

▸ `Const` **useBlockNumberContext**(): `undefined` \| `number`

#### Summary
A hook that gets you the current blocknumber via react context
- can be shared by your whole app.

#### Use
Make sure to wrap your main app with the [EthersAppContext](modules.md#ethersappcontext).
- See [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/0225179a2a8bb7b3a255d6eff4802b47d72809dd/packages/vite-app-ts/src/components/routes/App.tsx#L38)

#### Notes
- this extensively used by eth-hooks to trigger hooks when a new block arrives
- uses the current provider [ethersProvider](interfaces/IEthersContext.md#ethersprovider) from [useEthersContext](modules.md#useetherscontext)

#### Returns

`undefined` \| `number`

current block number

#### Defined in

[src/context/BlockNumberContext.tsx:63](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/BlockNumberContext.tsx#L63)

___

### useEthersContext

▸ `Const` **useEthersContext**(`providerKey?`): [`IEthersContext`](interfaces/IEthersContext.md)

#### Summary
This Hook provides you with access to the current Ethers Provider Context.
This provider would be the one selected by using {@link EthersModalConnect} and Web3Modal

#### Features
Gives you access to consistent interface to get the current provider information [EthersModalConnector](classes/EthersModalConnector.md)
- ethers compatable provider [TEthersProvider](modules.md#tethersprovider)
- a callback to change the current account (signer)
- the current account, chainId and signer
- callbacks to open the web3Modal, logout or change theme

#### Notes
- currently providerKey isnt being used

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerKey?` | `string` |

#### Returns

[`IEthersContext`](interfaces/IEthersContext.md)

#### Defined in

[src/context/EthersAppContext.tsx:69](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L69)

___

### ConnectToStaticJsonRpcProvider

▸ `Const` **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`StaticJsonRpcProvider`\>

#### Summary
A connector that can be used by apps to connect let web3Modal connect to a StaticJsonRpcProvider
- For example you can use this to connect to a localhost provider

#### Notes
See scaffold-eth-typescript for an example that uses it to connect to a localhost burner wallet.
- [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/0225179a2a8bb7b3a255d6eff4802b47d72809dd/packages/vite-app-ts/src/config/web3ModalConfig.ts#L86)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_package` | `unknown` | not used |
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](interfaces/IStaticJsonRpcProviderConnectorOptions.md) |  |

#### Returns

`Promise`<`StaticJsonRpcProvider`\>

#### Defined in

[src/context/connectors/StaticJsonRpcProviderConnector.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/connectors/StaticJsonRpcProviderConnector.ts#L31)

___

## Helpers Functions

### asyncSome

▸ `Const` **asyncSome**<`T`\>(`arr`, `predicate`): `Promise`<`undefined` \| `T`\>

#### Summary
js .some function that can be used with async predicates

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `predicate` | (`item`: `T`) => `Promise`<`boolean`\> |

#### Returns

`Promise`<`undefined` \| `T`\>

#### Defined in

[src/functions/asyncSome.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/functions/asyncSome.ts#L11)

___

### isEthersProvider

▸ `Const` **isEthersProvider**(`providerBase`): `boolean`

#### Summary
Is it a ethers compatable provider

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerBase` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/functions/ethersHelpers.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/functions/ethersHelpers.ts#L12)

___

### parseProviderOrSigner

▸ `Const` **parseProviderOrSigner**(`providerOrSigner`): `Promise`<[`TEthersUser`](modules.md#tethersuser)\>

#### Summary
Parse [TEthersProviderOrSigner](modules.md#tethersproviderorsigner) to [TEthersUser](modules.md#tethersuser)
Get the TEthersUser from a provider or signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](modules.md#tethersproviderorsigner) | TEthersProviderOrSigner |

#### Returns

`Promise`<[`TEthersUser`](modules.md#tethersuser)\>

TProviderAndSigner

#### Defined in

[src/functions/parseProviderOrSigner.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/functions/parseProviderOrSigner.ts#L16)

___

### lazier

▸ `Const` **lazier**<`T`\>(`importFactory`, `importName`): `LazyExoticComponent`<`T`\>

### Summary
A function that modifies react lazy to allow for named exports

### Example
```typescript
const ExampleUI = lazier(() => import('./exampleui/ExampleUI'), 'ExampleUI');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ComponentType`<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `importFactory` | () => `Promise`<`Object`\> | a callback that imports e.g. () => import('./exampleui/ExampleUI') |
| `importName` | `string` | the named export you want to import. |

#### Returns

`LazyExoticComponent`<`T`\>

#### Defined in

[src/helpers/lazier.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/helpers/lazier.ts#L18)

___

## Misc Functions

### useTokenBalance

▸ `Const` **useTokenBalance**(`contract`, `address`, `pollTime?`): `BigNumber`

#### Summary
Get the balance of an ERC20 token in an address
- uses the ethers.Contract object's provider to access the network

#### Notes
- uses useOnRepetition

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contract` | `Contract` | `undefined` | ethers.Contract class |
| `address` | `string` | `undefined` |  |
| `pollTime` | `number` | `0` | if >0 use polling, else use instead of onBlock event |

#### Returns

`BigNumber`

#### Defined in

[src/erc/useTokenBalance.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/erc/useTokenBalance.ts#L36)

## EthersContext Variables

### BlockNumberContext

• **BlockNumberContext**: `FC`<`IProps`\>

#### Summary
A context that works with [useBlockNumberContext](modules.md#useblocknumbercontext) to give access to the current provider's block number in any place in your app

**`param`**

**`returns`**

#### Defined in

[src/context/BlockNumberContext.tsx:82](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/BlockNumberContext.tsx#L82)

___

### EthersAppContext

• **EthersAppContext**: `FC`

#### Summary
Ethers App Context for your react app to be used with [useEthersContext](modules.md#useetherscontext).
This is a wrapper around Web3ReactProvider that provides additional functionality such as a [BlockNumberContext](modules.md#blocknumbercontext) and access to [IEthersContext](interfaces/IEthersContext.md)

**`param`**

**`returns`**

#### Defined in

[src/context/EthersAppContext.tsx:167](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L167)

## Models Type aliases

### TDeployedContracts

Ƭ **TDeployedContracts**: `Object`

#### Summary
Contracts deployed by hardhat
- {chainIds: { networkNames: {contracts} }}, contains an record of contracts
- Used by [useContractLoader](modules.md#usecontractloader)

#### Index signature

▪ [key: `string`]: { [key: string]: { `name`: `string` ; `chainId`: `string` ; `contracts`: `Record`<`string`, `Contract`\>  };  }

#### Defined in

[src/models/contractTypes.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/models/contractTypes.ts#L11)

___

### TExternalContracts

Ƭ **TExternalContracts**: `Object`

#### Summary
A type for external contracts
- {chainId: {contracts}}, contains an record of contracts
- Used by [useContractLoader](modules.md#usecontractloader)

#### Index signature

▪ [key: `number`]: { `name?`: `string` ; `chainId?`: `string` ; `contracts?`: `Record`<`string`, `Contract`\>  }

#### Defined in

[src/models/contractTypes.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/models/contractTypes.ts#L29)

___

### TContractFunctionInfo

Ƭ **TContractFunctionInfo**: `Object`

#### Summary
Contract function information:
- contractName
- functionname
- functionArgs: functionArguments, an array

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |
| `functionName` | `string` |
| `functionArgs?` | `any`[] |

#### Defined in

[src/models/contractTypes.ts:46](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/models/contractTypes.ts#L46)

___

### TNetworkInfo

Ƭ **TNetworkInfo**: `Object`

#### Summary
A type that describes a network for applications

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `color` | `string` |
| `chainId` | `number` |
| `rpcUrl` | `string` |
| `faucet?` | `string` |
| `blockExplorer` | `string` |
| `price?` | `number` |
| `gasPrice?` | `number` |

#### Defined in

[src/models/networkTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/models/networkTypes.ts#L7)

___

## Misc Type aliases

### CreateEthersModalConnector

Ƭ **CreateEthersModalConnector**: () => [`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

#### Type declaration

▸ (): [`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

#### Summary
A callback type that returns a EthersModalConnector

#### Notes
- can be used by components that need to give a connector to [IEthersContext.openModal](interfaces/IEthersContext.md#openmodal)

##### Returns

[`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

#### Defined in

[src/context/EthersAppContext.tsx:20](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L20)

___

### TContractConfig

Ƭ **TContractConfig**: `Object`

#### Summary
Configuration for useContractLoader

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hardhatNetworkName?` | `string` | your local hardhat network name |
| `customAddresses?` | `Record`<`string`, `string`\> | the address:contractName key value pair |
| `deployedContracts?` | [`TDeployedContracts`](modules.md#tdeployedcontracts) | Hardhat deployed contracts |
| `externalContracts?` | [`TExternalContracts`](modules.md#texternalcontracts) | External contracts (such as DAI) |

#### Defined in

[src/useContractLoader.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useContractLoader.ts#L12)

___

### TGasStationSpeed

Ƭ **TGasStationSpeed**: ``"fast"`` \| ``"fastest"`` \| ``"safeLow"`` \| ``"average"``

Preset speeds for Eth Gas Station API
- fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

#### Defined in

[src/useGasPrice.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/useGasPrice.ts#L18)

___

## Type Definition Type aliases

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

#### Summary
A union of various ethers providers for ease of use and maximum flexiblity

#### Notes
Used by eth-hooks, eth-components and scaffold-eth-typescript

#### Defined in

[src/models/providerTypes.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/models/providerTypes.ts#L12)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer`

#### Summary
A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/models/providerTypes.ts#L20)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

#### Summary
A union of abstract, non initalizable providers, used by some functions

#### Defined in

[src/models/providerTypes.ts:28](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/models/providerTypes.ts#L28)

___

### TEthersUser

Ƭ **TEthersUser**: `Object`

#### Summary
Essentially a provider and signer and network information for ease of use.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` \| `undefined` |
| `provider` | [`TEthersProvider`](modules.md#tethersprovider) \| `undefined` |
| `providerNetwork` | `ethers.providers.Network` \| `undefined` |
| `address` | `string` \| `undefined` |

#### Defined in

[src/models/providerTypes.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/models/providerTypes.ts#L36)
