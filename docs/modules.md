[eth-hooks - v3.2.0beta09](README.md) / Exports

# eth-hooks - v3.2.0beta09

## Table of contents

### Hooks Functions

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
- [useTimestamp](modules.md#usetimestamp)
- [useUserAddress](modules.md#useuseraddress)

### Misc Functions

- [reducer](modules.md#reducer)
- [useBlockNumberContext](modules.md#useblocknumbercontext)
- [useEthersContext](modules.md#useetherscontext)
- [ConnectToStaticJsonRpcProvider](modules.md#connecttostaticjsonrpcprovider)
- [useDexEthPrice](modules.md#usedexethprice)
- [useDexTokenList](modules.md#usedextokenlist)
- [useEnsAddress](modules.md#useensaddress)
- [useEnsResolveName](modules.md#useensresolvename)
- [useTokenBalance](modules.md#usetokenbalance)
- [asyncSome](modules.md#asyncsome)
- [isEthersProvider](modules.md#isethersprovider)
- [parseProviderOrSigner](modules.md#parseproviderorsigner)
- [lazier](modules.md#lazier)
- [useOnRepetition](modules.md#useonrepetition)
- [useWeb3Modal](modules.md#useweb3modal)

### Variables

- [BlockNumberContext](modules.md#blocknumbercontext)
- [EthersAppContext](modules.md#ethersappcontext)

### Type aliases

- [CreateEthersModalConnector](modules.md#createethersmodalconnector)
- [TDeployedContracts](modules.md#tdeployedcontracts)
- [TExternalContracts](modules.md#texternalcontracts)
- [TContractFunctionInfo](modules.md#tcontractfunctioninfo)
- [TNetworkInfo](modules.md#tnetworkinfo)
- [TEthersProvider](modules.md#tethersprovider)
- [TEthersProviderOrSigner](modules.md#tethersproviderorsigner)
- [TAbstractProvider](modules.md#tabstractprovider)
- [TEthersUser](modules.md#tethersuser)
- [TContractConfig](modules.md#tcontractconfig)
- [TGasStationSpeed](modules.md#tgasstationspeed)

### Interfaces

- [IEthersContext](interfaces/IEthersContext.md)
- [IStaticJsonRpcProviderConnectorOptions](interfaces/IStaticJsonRpcProviderConnectorOptions.md)
- [IBurnerSigner](interfaces/IBurnerSigner.md)
- [IWeb3ModalState](interfaces/IWeb3ModalState.md)

### Classes

- [UserClosedModalError](classes/UserClosedModalError.md)
- [CouldNotActivateError](classes/CouldNotActivateError.md)
- [EthersModalConnector](classes/EthersModalConnector.md)

## Hooks Functions

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

[src/useBalance.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useBalance.ts#L22)

___

### useBlockNumber

▸ `Const` **useBlockNumber**(`pollTime?`): `number`

#### Summary
Get the current block number of the network.

#### Notes
- ✋🏽 For app wide block number access use [BlockNumberContext](modules.md#blocknumbercontext) instead
- uses the current ethersProvider from context

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pollTime` | `number` | `0` | if > 0 uses polling, else it uses onBlock event |

#### Returns

`number`

block number

#### Defined in

[src/useBlockNumber.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useBlockNumber.ts#L21)

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

[src/useBurnerSigner.ts:85](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useBurnerSigner.ts#L85)

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

[src/useContractExistsAtAddress.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useContractExistsAtAddress.ts#L17)

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

[src/useContractLoader.ts:52](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useContractLoader.ts#L52)

___

### useContractReader

▸ `Const` **useContractReader**<`OutputT`\>(`contract`, `contractFunctionInfo`, `formatter?`, `onChange?`): `undefined` \| `OutputT`

#### Summary
Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states

#### Notes
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

[src/useContractReader.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useContractReader.ts#L26)

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

[src/useEventListener.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useEventListener.ts#L25)

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

[src/useGasPrice.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useGasPrice.ts#L38)

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

[src/useGetUserFromProviders.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useGetUserFromProviders.ts#L21)

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

[src/useGetUserFromSigners.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useGetUserFromSigners.ts#L16)

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

[src/useNonce.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useNonce.ts#L20)

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

[src/useTimestamp.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useTimestamp.ts#L19)

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

[src/useUserAddress.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useUserAddress.ts#L15)

___

## Misc Functions

### reducer

▸ `Const` **reducer**(`state?`, `payload`): `State`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `State` |
| `payload` | `Payload` |

#### Returns

`State`

#### Defined in

[src/context/BlockNumberContext.tsx:18](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/context/BlockNumberContext.tsx#L18)

___

### useBlockNumberContext

▸ `Const` **useBlockNumberContext**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[src/context/BlockNumberContext.tsx:29](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/context/BlockNumberContext.tsx#L29)

___

### useEthersContext

▸ `Const` **useEthersContext**(`providerKey?`): [`IEthersContext`](interfaces/IEthersContext.md)

A wrapper around useWeb3React that provides functionality for web3modal
and eth-hooks compatability

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerKey?` | `string` | (string) :: (optional) :: used if you want a secondary provider context, for example to mainnet |

#### Returns

[`IEthersContext`](interfaces/IEthersContext.md)

(IEthersWeb3Context)

#### Defined in

[src/context/EthersAppContext.tsx:33](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/context/EthersAppContext.tsx#L33)

___

### ConnectToStaticJsonRpcProvider

▸ `Const` **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`StaticJsonRpcProvider`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_package` | `any` |
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](interfaces/IStaticJsonRpcProviderConnectorOptions.md) |

#### Returns

`Promise`<`StaticJsonRpcProvider`\>

#### Defined in

[src/context/connectors/StaticJsonRpcProviderConnector.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/context/connectors/StaticJsonRpcProviderConnector.ts#L9)

___

### useDexEthPrice

▸ `Const` **useDexEthPrice**(`mainnetProvider`, `targetNetworkInfo?`, `pollTime?`): `number`

Get the Exchange price of ETH/USD (extrapolated from WETH/DAI)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) | `undefined` | (TEthersProvider) |
| `targetNetworkInfo?` | [`TNetworkInfo`](modules.md#tnetworkinfo) | `undefined` | (TNetwork) |
| `pollTime` | `number` | `0` | (number) :: if >0 use polling, else use instead of onBlock event |

#### Returns

`number`

(number) :: price

#### Defined in

[src/dapps/useDexEthPrice.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/dapps/useDexEthPrice.ts#L15)

___

### useDexTokenList

▸ `Const` **useDexTokenList**(`tokenListUri?`, `chainId?`): `TokenInfo`[]

Gets a tokenlist (see more at https://tokenlists.org/), returning the .tokens only

~ How can I use? ~
const tokenList = useTokenList(); <- default returns the Unsiwap tokens
const tokenList = useTokenList("https://gateway.ipfs.io/ipns/tokens.uniswap.org");

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tokenListUri` | `string` | `'https://gateway.ipfs.io/ipns/tokens.uniswap.org'` | (string) |
| `chainId?` | `number` | `undefined` | (number) |

#### Returns

`TokenInfo`[]

(TokenInfo[])

#### Defined in

[src/dapps/useDexTokenList.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/dapps/useDexTokenList.ts#L15)

___

### useEnsAddress

▸ `Const` **useEnsAddress**(`mainnetProvider`, `address`): `string`

Gets ENS name from given address and provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) | (TEthersProvider) |
| `address` | `string` | (string) |

#### Returns

`string`

(string) ens name

#### Defined in

[src/dapps/useEnsAddress.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/dapps/useEnsAddress.ts#L33)

___

### useEnsResolveName

▸ `Const` **useEnsResolveName**(`mainnetProvider`, `ensName`): `string`

Gets the address from an ENS name and provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | [`TEthersProvider`](modules.md#tethersprovider) | (TEthersProvider) |
| `ensName` | `string` | (string) |

#### Returns

`string`

(string) :: address

#### Defined in

[src/dapps/useEnsResolveName.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/dapps/useEnsResolveName.ts#L12)

___

### useTokenBalance

▸ `Const` **useTokenBalance**(`contract`, `address`, `pollTime?`): `BigNumber`

Get the balance of an ERC20 token in an address

~ Features ~
- Provide address and get balance corresponding to given address
- Change provider to access balance on different chains (ex. mainnetProvider)
- If no pollTime is passed, the balance will update on every new block

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contract` | `Contract` | `undefined` | (ethers->Contract) contract object for the ERC20 token |
| `address` | `string` | `undefined` | (string) |
| `pollTime` | `number` | `0` | (number) :: if >0 use polling, else use instead of onBlock event |

#### Returns

`BigNumber`

(BigNumber) :: balance

#### Defined in

[src/erc/useTokenBalance.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/erc/useTokenBalance.ts#L21)

___

### asyncSome

▸ `Const` **asyncSome**<`T`\>(`arr`, `predicate`): `Promise`<`undefined` \| `T`\>

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

[src/functions/asyncSome.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/functions/asyncSome.ts#L1)

___

### isEthersProvider

▸ `Const` **isEthersProvider**(`providerBase`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerBase` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/functions/ethersHelpers.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/functions/ethersHelpers.ts#L3)

___

### parseProviderOrSigner

▸ `Const` **parseProviderOrSigner**(`providerOrSigner`): `Promise`<[`TEthersUser`](modules.md#tethersuser)\>

Parse TEthersProviderOrSigner to TProviderAndSigner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](modules.md#tethersproviderorsigner) | TEthersProviderOrSigner |

#### Returns

`Promise`<[`TEthersUser`](modules.md#tethersuser)\>

TProviderAndSigner

#### Defined in

[src/functions/parseProviderOrSigner.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/functions/parseProviderOrSigner.ts#L11)

___

### lazier

▸ `Const` **lazier**<`T`\>(`importFactory`, `importName`): `LazyExoticComponent`<`T`\>

modified react lazy to allow for named exports
e.g. export const ExampleUI = lazier(() => import('./exampleui/ExampleUI'), 'ExampleUI');

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

[src/helpers/lazier.ts:10](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/helpers/lazier.ts#L10)

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

[src/useOnRepetition.ts:40](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useOnRepetition.ts#L40)

___

### useWeb3Modal

▸ `Const` **useWeb3Modal**(`web3ModalConfig`, `setCurrentEthersProvider`): [`IWeb3ModalState`](interfaces/IWeb3ModalState.md)

#### Summary
A hook that makes it easy to interact and use (web3Modal)[https://github.com/Web3Modal/web3modal]
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

[src/useWeb3Modal.ts:43](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useWeb3Modal.ts#L43)

## Variables

### BlockNumberContext

• **BlockNumberContext**: `FC`<`IProps`\>

#### Defined in

[src/context/BlockNumberContext.tsx:39](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/context/BlockNumberContext.tsx#L39)

___

### EthersAppContext

• **EthersAppContext**: `FC`

#### Defined in

[src/context/EthersAppContext.tsx:109](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/context/EthersAppContext.tsx#L109)

## Type aliases

### CreateEthersModalConnector

Ƭ **CreateEthersModalConnector**: () => [`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

#### Type declaration

▸ (): [`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

##### Returns

[`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

#### Defined in

[src/context/EthersAppContext.tsx:13](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/context/EthersAppContext.tsx#L13)

___

### TDeployedContracts

Ƭ **TDeployedContracts**: `Object`

Contracts deployed by hardhat
- {chainIds: { networkNames: {contracts} }}, contains an record of contracts
- Used by [useContractLoader](modules.md#usecontractloader)

#### Index signature

▪ [key: `string`]: { [key: string]: { `name`: `string` ; `chainId`: `string` ; `contracts`: `Record`<`string`, `Contract`\>  };  }

#### Defined in

[src/models/contractTypes.ts:8](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/models/contractTypes.ts#L8)

___

### TExternalContracts

Ƭ **TExternalContracts**: `Object`

A type for external contracts
- {chainId: {contracts}}, contains an record of contracts
- Used by [useContractLoader](modules.md#usecontractloader)

#### Index signature

▪ [key: `number`]: { `name?`: `string` ; `chainId?`: `string` ; `contracts?`: `Record`<`string`, `Contract`\>  }

#### Defined in

[src/models/contractTypes.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/models/contractTypes.ts#L23)

___

### TContractFunctionInfo

Ƭ **TContractFunctionInfo**: `Object`

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

[src/models/contractTypes.ts:37](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/models/contractTypes.ts#L37)

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

[src/models/networkTypes.ts:6](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/models/networkTypes.ts#L6)

___

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

A union of various providers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:6](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/models/providerTypes.ts#L6)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer`

A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/models/providerTypes.ts#L11)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

A union of abstract, non initalizable providers, used by some functions

#### Defined in

[src/models/providerTypes.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/models/providerTypes.ts#L16)

___

### TEthersUser

Ƭ **TEthersUser**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` \| `undefined` |
| `provider` | [`TEthersProvider`](modules.md#tethersprovider) \| `undefined` |
| `providerNetwork` | `ethers.providers.Network` \| `undefined` |
| `address` | `string` \| `undefined` |

#### Defined in

[src/models/providerTypes.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/models/providerTypes.ts#L20)

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

[src/useContractLoader.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useContractLoader.ts#L12)

___

### TGasStationSpeed

Ƭ **TGasStationSpeed**: ``"fast"`` \| ``"fastest"`` \| ``"safeLow"`` \| ``"average"``

Preset speeds for Eth Gas Station API
- fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

#### Defined in

[src/useGasPrice.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/69b2981/src/useGasPrice.ts#L18)
