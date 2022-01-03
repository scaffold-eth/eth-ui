[eth-hooks - v3.4.0](../README.md) / Hooks

# Module: Hooks

Commonly used ethereum hooks to turbocharge your development!  Works with [useEthersContext](EthersContext.md#useetherscontext).

## Table of contents

### Hooks Functions

- [useDexEthPrice](Hooks.md#usedexethprice)
- [useDexTokenList](Hooks.md#usedextokenlist)
- [useResolveEnsAddress](Hooks.md#useresolveensaddress)
- [useResolveEnsName](Hooks.md#useresolveensname)
- [useTokenBalance](Hooks.md#usetokenbalance)
- [useBalance](Hooks.md#usebalance)
- [useBlockNumber](Hooks.md#useblocknumber)
- [useBurnerSigner](Hooks.md#useburnersigner)
- [useContractExistsAtAddress](Hooks.md#usecontractexistsataddress)
- [useContractLoader](Hooks.md#usecontractloader)
- [useContractReader](Hooks.md#usecontractreader)
- [useEventListener](Hooks.md#useeventlistener)
- [useGasPrice](Hooks.md#usegasprice)
- [useGetUserFromProviders](Hooks.md#usegetuserfromproviders)
- [useGetUserFromSigners](Hooks.md#usegetuserfromsigners)
- [useNonce](Hooks.md#usenonce)
- [useOnRepetition](Hooks.md#useonrepetition)
- [useTimestamp](Hooks.md#usetimestamp)
- [useUserAddress](Hooks.md#useuseraddress)
- [useWeb3Modal](Hooks.md#useweb3modal)

### Misc Functions

- [parseContractsInJson](Hooks.md#parsecontractsinjson)

### Hooks Type aliases

- [TBurnerSigner](Hooks.md#tburnersigner)
- [TGasStationSpeed](Hooks.md#tgasstationspeed)
- [TWeb3ModalState](Hooks.md#tweb3modalstate)

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
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) | `undefined` |  |
| `targetNetworkInfo?` | [`TNetworkInfo`](Models.md#tnetworkinfo) | `undefined` |  |
| `pollTime` | `number` | `0` | if >0 use polling, else use instead of onBlock event |

#### Returns

`number`

price in USD

#### Defined in

[src/hooks/dapps/useDexEthPrice.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/dapps/useDexEthPrice.ts#L22)

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

[src/hooks/dapps/useDexTokenList.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/dapps/useDexTokenList.ts#L19)

___

### useResolveEnsAddress

▸ `Const` **useResolveEnsAddress**(`mainnetProvider`, `ensName`): `string`

#### Summary
Gets the address from an ENS name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | [`TEthersProvider`](Models.md#tethersprovider) | mainnet provider |
| `ensName` | `string` |  |

#### Returns

`string`

#### Defined in

[src/hooks/dapps/useResolveEnsAddress.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/dapps/useResolveEnsAddress.ts#L16)

___

### useResolveEnsName

▸ `Const` **useResolveEnsName**(`mainnetProvider`, `address`): `string`

#### Summary
Gets ENS name for given address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) | mainnet provider |
| `address` | `string` |  |

#### Returns

`string`

#### Defined in

[src/hooks/dapps/useResolveEnsName.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/dapps/useResolveEnsName.ts#L44)

___

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

[src/hooks/erc/useTokenBalance.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/erc/useTokenBalance.ts#L39)

___

### useBalance

▸ `Const` **useBalance**(`address`): `BigNumber`

#### Summary
Gets your balance in ETH for the given address.

#### Notes
- updates triggered by [BlockNumberContext](EthersContext.md#blocknumbercontext)
- uses the current provider [ethersProvider](../interfaces/EthersContext.IEthersContext.md#ethersprovider) from [useEthersContext](EthersContext.md#useetherscontext)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`BigNumber`

current balance

#### Defined in

[src/hooks/useBalance.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useBalance.ts#L21)

___

### useBlockNumber

▸ `Const` **useBlockNumber**(`provider`, `pollTime?`): `number`

#### Summary
Get the current block number of the network. ✋🏽 @deprecated

#### Notes
- ✋🏽 For app wide block number access use [BlockNumberContext](EthersContext.md#blocknumbercontext) instead
- ⚠ Deprecated
- uses the current ethersProvider from context

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `provider` | [`TEthersProvider`](Models.md#tethersprovider) | `undefined` |  |
| `pollTime` | `number` | `0` | if > 0 uses polling, else it uses onBlock event |

#### Returns

`number`

block number

#### Defined in

[src/hooks/useBlockNumber.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useBlockNumber.ts#L22)

___

### useBurnerSigner

▸ `Const` **useBurnerSigner**(`localProvider`): [`TBurnerSigner`](Hooks.md#tburnersigner)

#### Summary
A hook that creates a burner signer/address and provides ways of interacting with
and updating the signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) | localhost provider |

#### Returns

[`TBurnerSigner`](Hooks.md#tburnersigner)

IBurnerSigner

#### Defined in

[src/hooks/useBurnerSigner.ts:87](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useBurnerSigner.ts#L87)

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

[src/hooks/useContractExistsAtAddress.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useContractExistsAtAddress.ts#L19)

___

### useContractLoader

▸ `Const` **useContractLoader**(`config?`, `providerOrSigner?`, `configChainId?`): `Record`<`string`, `BaseContract`\>

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
| `config` | [`TContractLoaderConfig`](Models.md#tcontractloaderconfig) |  |
| `providerOrSigner?` | [`TEthersProviderOrSigner`](Models.md#tethersproviderorsigner) | (optional) used to initalize the contract class |
| `configChainId?` | `number` | (optional) can be used to target specific a particular network (such as mainnet) instead of the current provider |

#### Returns

`Record`<`string`, `BaseContract`\>

Record of contractName:Contracts

#### Defined in

[src/hooks/useContractLoader.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useContractLoader.ts#L58)

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
| `contract` | `BaseContract` | ethers.Contract class |
| `contractFunctionInfo` | [`TContractFunctionInfo`](Models.md#tcontractfunctioninfo) |  |
| `formatter?` | (`_value`: `undefined` \| `OutputT`) => `OutputT` | <OutputT> a function that can format the output |
| `onChange?` | (`_value?`: `OutputT`) => `void` | callback with result as a parameter |

#### Returns

`undefined` \| `OutputT`

<OutputT>

#### Defined in

[src/hooks/useContractReader.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useContractReader.ts#L25)

___

### useEventListener

▸ `Const` **useEventListener**(`contract`, `eventName`, `startBlock`): [`TypedEvent`](../interfaces/Models.TypedEvent.md)<`Result`\>[]

#### Summary
Tracks the events of associated with a contract

#### Notes
- updates triggered through ethers event listener
- uses the current provider [ethersProvider](../interfaces/EthersContext.IEthersContext.md#ethersprovider) from [useEthersContext](EthersContext.md#useetherscontext)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `Contract` | ethers.Contract |
| `eventName` | `string` \| `EventFilter` |  |
| `startBlock` | `number` |  |

#### Returns

[`TypedEvent`](../interfaces/Models.TypedEvent.md)<`Result`\>[]

#### Defined in

[src/hooks/useEventListener.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useEventListener.ts#L26)

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
- updates triggered by [BlockNumberContext](EthersContext.md#blocknumbercontext)
- uses the current provider [ethersProvider](../interfaces/EthersContext.IEthersContext.md#ethersprovider) from [useEthersContext](EthersContext.md#useetherscontext)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `undefined` \| `number` | - |
| `speed` | [`TGasStationSpeed`](Hooks.md#tgasstationspeed) |  |
| `currentNetworkInfo?` | [`TNetworkInfo`](Models.md#tnetworkinfo) | uses gasPrice as a fallback |

#### Returns

`undefined` \| `number`

gas as gwei

#### Defined in

[src/hooks/useGasPrice.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useGasPrice.ts#L39)

___

### useGetUserFromProviders

▸ `Const` **useGetUserFromProviders**(`currentProvider`, ...`moreProviders`): [`TEthersUser`](Models.md#tethersuser)

#### Summary
Gets the user [TEthersUser](Models.md#tethersuser) from from the current provider or array of fallback providers

#### Notes
- 🤚🏽 Consider using the context provider [ethersProvider](../interfaces/EthersContext.IEthersContext.md#ethersprovider)

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) |
| `...moreProviders` | [`TEthersProvider`](Models.md#tethersprovider)[] |

#### Returns

[`TEthersUser`](Models.md#tethersuser)

#### Defined in

[src/hooks/useGetUserFromProviders.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useGetUserFromProviders.ts#L21)

___

### useGetUserFromSigners

▸ `Const` **useGetUserFromSigners**(`signer`): [`TEthersUser`](Models.md#tethersuser)

#### Summary
Gets the user [TEthersUser](Models.md#tethersuser) for a signer or wallet

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| `Signer` \| `Wallet` |

#### Returns

[`TEthersUser`](Models.md#tethersuser)

#### Defined in

[src/hooks/useGetUserFromSigners.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useGetUserFromSigners.ts#L16)

___

### useNonce

▸ `Const` **useNonce**(`address`): `number`

#### Summary
Get the current nonce for the address provided

#### Notes
- updates triggered by [BlockNumberContext](EthersContext.md#blocknumbercontext)
- uses the current provider [ethersProvider](../interfaces/EthersContext.IEthersContext.md#ethersprovider) from [useEthersContext](EthersContext.md#useetherscontext)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`number`

#### Defined in

[src/hooks/useNonce.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useNonce.ts#L19)

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

[src/hooks/useOnRepetition.ts:43](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useOnRepetition.ts#L43)

___

### useTimestamp

▸ `Const` **useTimestamp**(): `number`

#### Summary
Get the current timestamp from the latest block

#### Notes
- updates triggered by [BlockNumberContext](EthersContext.md#blocknumbercontext)
- uses the current provider [ethersProvider](../interfaces/EthersContext.IEthersContext.md#ethersprovider) from [useEthersContext](EthersContext.md#useetherscontext)

#### Returns

`number`

#### Defined in

[src/hooks/useTimestamp.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useTimestamp.ts#L19)

___

### useUserAddress

▸ `Const` **useUserAddress**(`signer`): `undefined` \| `string`

#### Summary
Get the address from the signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |

#### Returns

`undefined` \| `string`

#### Defined in

[src/hooks/useUserAddress.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useUserAddress.ts#L17)

___

### useWeb3Modal

▸ `Const` **useWeb3Modal**(`web3ModalConfig`, `setCurrentEthersProvider`): [`TWeb3ModalState`](Hooks.md#tweb3modalstate)

#### Summary
A hook that makes it easy to interact and use [web3Modal](https://github.com/Web3Modal/web3modal)
- provides callback to open, logout and update the modal theme

#### Notes
- 🤚🏽 Consider using the context provider [ethersProvider](../interfaces/EthersContext.IEthersContext.md#ethersprovider) and [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md) instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3ModalConfig` | `Partial`<`ICoreOptions`\> |
| `setCurrentEthersProvider` | (`newEthersProvider`: `undefined` \| [`TEthersProvider`](Models.md#tethersprovider)) => `void` |

#### Returns

[`TWeb3ModalState`](Hooks.md#tweb3modalstate)

#### Defined in

[src/hooks/useWeb3Modal.ts:47](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useWeb3Modal.ts#L47)

___

## Misc Functions

### parseContractsInJson

▸ `Const` **parseContractsInJson**(`contractList`, `chainId`): `Record`<`string`, [`THardhatContractJson`](Models.md#thardhatcontractjson)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractList` | [`TDeployedContractsJson`](Models.md#tdeployedcontractsjson) |
| `chainId` | `number` |

#### Returns

`Record`<`string`, [`THardhatContractJson`](Models.md#thardhatcontractjson)\>

#### Defined in

[src/hooks/useContractLoader.ts:14](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useContractLoader.ts#L14)

## Hooks Type aliases

### TBurnerSigner

Ƭ **TBurnerSigner**: `Object`

#### Summary
Return type of useBurnerSigner:

#### Notes
- provides signer
- methods of interacting with burner signer
- methods to save and loadd signer from local storage

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` \| `undefined` |
| `account` | `string` \| `undefined` |
| `saveBurner` | () => `void` |
| `loadOrGenerateBurner` | () => `void` |
| `generateBurnerSigner` | () => `void` |
| `getBurnerPrivateKey` | () => `undefined` \| `BytesLike` |

#### Defined in

[src/hooks/useBurnerSigner.ts:56](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useBurnerSigner.ts#L56)

___

### TGasStationSpeed

Ƭ **TGasStationSpeed**: ``"fast"`` \| ``"fastest"`` \| ``"safeLow"`` \| ``"average"``

Preset speeds for Eth Gas Station API
- fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

#### Defined in

[src/hooks/useGasPrice.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useGasPrice.ts#L19)

___

### TWeb3ModalState

Ƭ **TWeb3ModalState**: `Object`

The current state of Web3Modal

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `initializing` | `boolean` | Is the modal initalizing |
| `openWeb3ModalCallback` | () => `void` | - |
| `logoutOfWeb3ModalCallback` | () => `void` | - |
| `updateWeb3ModalThemeCallback` | (`theme`: `string` \| `ThemeColors`) => `void` | - |

#### Defined in

[src/hooks/useWeb3Modal.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/hooks/useWeb3Modal.ts#L15)
