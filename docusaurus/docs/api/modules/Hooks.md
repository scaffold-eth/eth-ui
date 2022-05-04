---
id: "Hooks"
title: "Module: Hooks"
sidebar_label: "Hooks"
sidebar_position: 0
custom_edit_url: null
---

Commonly used ethereum hooks to turbocharge your development!  Works with [useEthersContext](EthersAppContext.md#useetherscontext-2).

## Hooks Functions

### useDexEthPrice

▸ **useDexEthPrice**(`mainnetProvider`, `targetNetworkInfo?`, `options?`): [`THookResult`](Models.md#thookresult-2)<`number`\>

#### Summary
Get the Exchange price of ETH/USD (extrapolated from WETH/DAI) from uniswap

##### ✏️ Notes
- uses useOnRepetition, does not use context

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider-2) |
| `targetNetworkInfo?` | [`TNetworkInfo`](Models.md#tnetworkinfo-2) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`number`\>

price in USD

#### Defined in

[hooks/dapps/useDexEthPrice.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/dapps/useDexEthPrice.ts#L27)

___

### useDexTokenList

▸ **useDexTokenList**(`tokenListUri?`, `chainId?`, `options?`): [`THookResult`](Models.md#thookresult-2)<`TokenInfo`[]\>

#### Summary
Gets a tokenlist from uniswap ipfs tokenlist

##### ✏️ Notes
- you can also point it to another URI

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tokenListUri` | `string` | `'https://gateway.ipfs.io/ipns/tokens.uniswap.org'` |  |
| `chainId?` | `number` | `undefined` | optional, you can filter by a particular chainId |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | `undefined` | - |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`TokenInfo`[]\>

(TokenInfo[]) from '@uniswap/token-lists'

#### Defined in

[hooks/dapps/useDexTokenList.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/dapps/useDexTokenList.ts#L26)

___

### useResolveEnsAddress

▸ **useResolveEnsAddress**(`mainnetProvider`, `ensName`): [`THookResult`](Models.md#thookresult-2)<`undefined` \| `string`\>

#### Summary
Gets the address from an ENS name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider-2) | mainnet provider |
| `ensName` | `undefined` \| `string` |  |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`undefined` \| `string`\>

#### Defined in

[hooks/dapps/useResolveEnsAddress.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/dapps/useResolveEnsAddress.ts#L19)

___

### useResolveEnsName

▸ **useResolveEnsName**(`mainnetProvider`, `address`): [`THookResult`](Models.md#thookresult-2)<`undefined` \| `string`\>

#### Summary
Gets ENS name for given address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider-2) | mainnet provider |
| `address` | `string` |  |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`undefined` \| `string`\>

#### Defined in

[hooks/dapps/useResolveEnsName.ts:45](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/dapps/useResolveEnsName.ts#L45)

___

### useTokenBalance

▸ **useTokenBalance**<`GContract`\>(`contract`, `address`, `options?`): [`THookResult`](Models.md#thookresult-2)<`BigNumber`\>

#### Summary
Get the balance of an ERC20 token in an address

##### ✏️ Notes
- uses the ethers.Contract object's provider to access the network

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract`<`GContract`\> & `ERC20` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `GContract` | ERC20 token to get the balance of |
| `address` | `string` | Address of wallet that holds the tokens |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | Options for how often and when to update |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`BigNumber`\>

#### Defined in

[hooks/erc/useTokenBalance.ts:32](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/erc/useTokenBalance.ts#L32)

___

### useAreSignerEqual

▸ **useAreSignerEqual**(`signer1`, `signer2`, `options?`): [`THookResult`](Models.md#thookresult-2)<`undefined` \| `boolean`\>

#### Summary
Are the signers equal and valid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer1` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner-2) | Object for first signer to compare |
| `signer2` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner-2) | Object for second signer to compare |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | Options for how often and when to update |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`undefined` \| `boolean`\>

#### Defined in

[hooks/useAreSignerEqual.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useAreSignerEqual.ts#L21)

___

### useBalance

▸ **useBalance**<`GAddress`\>(`addresses`, `options?`, `override?`): [`THookResult`](Models.md#thookresult-2)<`TUseBalanceResult`<`GAddress`\>\>

#### Summary
Gets your balance in ETH for the given address.

##### ✏️ Notes
- updates triggered by [BlockNumberContext](EthersAppContext.md#blocknumbercontext-2)
- uses the current provider {@link provider} from [useEthersContext](EthersAppContext.md#useetherscontext-2)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GAddress` | extends `string` \| `string`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addresses` | `undefined` \| `GAddress` | Addresses of wallets to get balance for |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | Options for how often and when to update |
| `override` | [`TOverride`](Models.md#toverride-2) | Options to override adapters and context |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`TUseBalanceResult`<`GAddress`\>\>

current balance

#### Defined in

[hooks/useBalance.ts:46](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useBalance.ts#L46)

___

### useBlockNumber

▸ **useBlockNumber**(`provider`, `callback?`, `options?`): [`THookResult`](Models.md#thookresult-2)<`number`\>

#### Summary
Get the current block number of the network. ✋🏽 @deprecated

##### ✏️ Notes
- ✋🏽 For app wide block number access use [useBlockNumberContext](EthersAppContext.md#useblocknumbercontext-2) instead.  See [BlockNumberContext](EthersAppContext.md#blocknumbercontext-2) for more details, you get this as part of [EthersAppContext](EthersAppContext.md)
- uses the current provided block number

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider-2) |
| `callback?` | (`blockNumber?`: `number`) => `void` \| (`blockNumber?`: `number`) => `Promise`<`void`\> |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`number`\>

block number

#### Defined in

[hooks/useBlockNumber.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useBlockNumber.ts#L22)

___

### useBurnerSigner

▸ **useBurnerSigner**(`localProvider`): [`TBurnerSigner`](Hooks.md#tburnersigner-2)

#### Summary
A hook that creates a burner signer/address and provides ways of interacting with
and updating the signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider-2) | localhost provider |

#### Returns

[`TBurnerSigner`](Hooks.md#tburnersigner-2)

IBurnerSigner

#### Defined in

[hooks/useBurnerSigner.ts:89](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useBurnerSigner.ts#L89)

___

### useContractExistsAtAddress

▸ **useContractExistsAtAddress**(`contract`, `options?`): [`THookResult`](Models.md#thookresult-2)<`boolean`\>

#### Summary
Checks whether a contract exists on the blockchain

##### ✏️ Notes
- uses the ethers.Contract object's provider to access the network
- checks the contract address to see if the contract is deployed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `BaseContract` | ethers.BaseContract class |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`boolean`\> | - |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`boolean`\>

#### Defined in

[hooks/useContractExistsAtAddress.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useContractExistsAtAddress.ts#L25)

___

### useContractLoader

▸ **useContractLoader**(`config?`, `providerOrSigner`): `Record`<`string`, `BaseContract`\>

#### Summary
Loads your contracts and returns them. ✋🏽 @deprecated
Gives options to read values from contracts or write transactions into them.

##### ✏️ Notes
- ✋🏽 For easy app wide contract access use {@link AppContractContex} created by [contractsContextFactory](ContractAppContext.md#contractscontextfactory-2).  See [contractsContextFactory](ContractAppContext.md#contractscontextfactory-2) for more details.

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
| `config` | [`TContractLoaderConfig`](Hooks.md#tcontractloaderconfig-2) |  |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](Models.md#tethersproviderorsigner-2) | (optional) used to initalize the contract class |

#### Returns

`Record`<`string`, `BaseContract`\>

Record of contractName:Contracts

#### Defined in

[hooks/useContractLoader.ts:101](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useContractLoader.ts#L101)

___

### useContractReaderUntyped

▸ **useContractReaderUntyped**<`GOutput`\>(`contract`, `contractFunctionInfo`, `formatter?`, `onChange?`, `override?`): `undefined` \| `GOutput`

#### Summary
Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states

##### ✏️ Notes
- uses the ethers.Contract object's provider to access the network
- formatter is a function that can change the format of the output

#### Type parameters

| Name |
| :------ |
| `GOutput` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `BaseContract` | ethers.Contract class |
| `contractFunctionInfo` | [`TContractFunctionInfo`](Models.md#tcontractfunctioninfo-2) |  |
| `formatter?` | (`_value`: `undefined` \| `GOutput`) => `GOutput` | OutputT a function that can format the output |
| `onChange?` | (`_value?`: `GOutput`) => `void` | callback with result as a parameter |
| `override` | [`TOverride`](Models.md#toverride-2) | - |

#### Returns

`undefined` \| `GOutput`

OutputT

#### Defined in

[hooks/useContractReaderUntyped.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useContractReaderUntyped.ts#L26)

___

### useEthersAdaptorFromProviderOrSigners

▸ **useEthersAdaptorFromProviderOrSigners**(`providerOrSigner`, `options?`): [`THookResult`](Models.md#thookresult-2)<`undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor-2)\>

#### Summary
Gets the user {@link TEthersUser} for a signer or wallet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](Models.md#tethersproviderorsigner-2) | input signer |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | - |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor-2)\>

#### Defined in

[hooks/useEthersAdaptorFromProviderOrSigners.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useEthersAdaptorFromProviderOrSigners.ts#L31)

___

### useEventListener

▸ **useEventListener**<`GTypedEvent`\>(`contract`, `eventFilter`, `startBlock`, `toBlock?`, `options?`): [`THookResult`](Models.md#thookresult-2)<`GTypedEvent`[]\>

#### Summary
Tracks the events of associated with a contract

##### ✏️ Notes
- updates triggered through ethers event listener
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersAppContext.md#useetherscontext-2)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GTypedEvent` | extends [`TypedEvent`](Models.md#typedevent-2)<`Result`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contract` | `undefined` \| `BaseContract` | `undefined` | ethers.Contract |
| `eventFilter` | `undefined` \| `string` \| `EventFilter` | `undefined` | - |
| `startBlock` | `number` | `undefined` |  |
| `toBlock` | `undefined` \| `number` | `undefined` | - |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | `undefined` | - |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`GTypedEvent`[]\>

#### Defined in

[hooks/useEventListener.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useEventListener.ts#L26)

___

### useGasPrice

▸ **useGasPrice**(`chainId`, `speed`, `currentNetworkInfo?`, `options?`, `override?`): [`THookResult`](Models.md#thookresult-2)<`undefined` \| `number`\>

#### Summary
Gets the gas price for the current network as gwei
- uses EthGasStation for mainnet
- uses ethers.estimateGas other networks
- can use currentNetworkInfo {@link TNetworkInfo.gasPrice} gasPrice as fallback

##### ✏️ Notes
- if the gas price is unknown it returns undefined
- updates triggered by [BlockNumberContext](EthersAppContext.md#blocknumbercontext-2)
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersAppContext.md#useetherscontext-2)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `undefined` \| `number` | - |
| `speed` | [`TGasStationSpeed`](Hooks.md#tgasstationspeed-2) |  |
| `currentNetworkInfo?` | [`TNetworkInfo`](Models.md#tnetworkinfo-2) | uses gasPrice as a fallback |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | - |
| `override` | [`TOverride`](Models.md#toverride-2) | - |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`undefined` \| `number`\>

gas as gwei

#### Defined in

[hooks/useGasPrice.ts:48](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useGasPrice.ts#L48)

___

### useNonce

▸ **useNonce**(`address`, `options?`, `override?`): [`THookResult`](Models.md#thookresult-2)<`number`\>

#### Summary
Get the current nonce for the address provided

##### ✏️ Notes
- updates triggered by [BlockNumberContext](EthersAppContext.md#blocknumbercontext-2)
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersAppContext.md#useetherscontext-2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> |
| `override` | [`TOverride`](Models.md#toverride-2) |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`number`\>

#### Defined in

[hooks/useNonce.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useNonce.ts#L34)

___

### useSignerAddress

▸ **useSignerAddress**(`signer`, `options?`): [`THookResult`](Models.md#thookresult-2)<`undefined` \| `string`\>

#### Summary
Get the address from the signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner-2) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`undefined` \| `string`\>

#### Defined in

[hooks/useSignerAddress.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useSignerAddress.ts#L19)

___

### useSignerChainId

▸ **useSignerChainId**(`signer`, `options?`): [`THookResult`](Models.md#thookresult-2)<`undefined` \| `number`\>

#### Summary
Get the address from the signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner-2) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`undefined` \| `number`\>

#### Defined in

[hooks/useSignerChainId.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useSignerChainId.ts#L20)

___

### useTimestamp

▸ **useTimestamp**(`options?`, `override?`): [`THookResult`](Models.md#thookresult-2)<`number`\>

#### Summary
Get the current timestamp from the latest block

##### ✏️ Notes
- updates triggered by [BlockNumberContext](EthersAppContext.md#blocknumbercontext-2)
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersAppContext.md#useetherscontext-2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> |
| `override` | [`TOverride`](Models.md#toverride-2) |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`number`\>

#### Defined in

[hooks/useTimestamp.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useTimestamp.ts#L31)

___

## Misc Functions

### parseContractsInDeployedHardhatContractsJson

▸ **parseContractsInDeployedHardhatContractsJson**(`contractList`, `chainId`): `Record`<`string`, [`TBasicContractData`](Models.md#tbasiccontractdata-2)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractList` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson-2) |
| `chainId` | `number` |

#### Returns

`Record`<`string`, [`TBasicContractData`](Models.md#tbasiccontractdata-2)\>

#### Defined in

[hooks/useContractLoader.ts:59](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useContractLoader.ts#L59)

___

### useContractReader

▸ **useContractReader**<`GContract`, `GContractFunc`\>(`contract`, `contractFunc`, `args?`, `funcEventFilter?`, `options?`): [`THookResult`](Models.md#thookresult-2)<`undefined` \| `Awaited`<`ReturnType`<`GContractFunc`\>\>\>

#### Summary
Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states

##### ✏️ Notes
- uses the ethers.Contract object's provider to access the network
- formatter is a function that can change the format of the output

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract`<`GContract`\> |
| `GContractFunc` | extends (...`args`: `any`[]) => `Promise`<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `GContract` | Contract reading from |
| `contractFunc` | `undefined` \| `GContractFunc` | Contract variable or function to read |
| `args?` | `Parameters`<`GContractFunc`\> | Typed tuple argument to contract function or variable |
| `funcEventFilter?` | `EventFilter` | Optional if only want contract to update on event |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | Options for how often and when to update |

#### Returns

[`THookResult`](Models.md#thookresult-2)<`undefined` \| `Awaited`<`ReturnType`<`GContractFunc`\>\>\>

#### Defined in

[hooks/useContractReader.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useContractReader.ts#L27)

___

### useEthersUpdater

▸ **useEthersUpdater**(`update`, `blockNumber`, `options`, `allowBlockNumberUpdate?`): `void`

#### Summary
Calls update argument based on update options

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `update` | () => `void` \| () => `Promise`<`void`\> | `undefined` | Function to call when update |
| `blockNumber` | `undefined` \| `number` | `undefined` | Current block number |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions-2)<`any`\> | `undefined` | Options for how often and when to update |
| `allowBlockNumberUpdate` | `boolean` | `true` | Boolean of if updating using this hook is allowed |

#### Returns

`void`

#### Defined in

[hooks/useEthersUpdater.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useEthersUpdater.ts#L15)

## Hooks Type aliases

### TBurnerSigner

Ƭ **TBurnerSigner**: `Object`

#### Summary
Return type of useBurnerSigner:

##### ✏️ Notes
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

[hooks/useBurnerSigner.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useBurnerSigner.ts#L58)

___

### TGasStationSpeed

Ƭ **TGasStationSpeed**: ``"fast"`` \| ``"fastest"`` \| ``"safeLow"`` \| ``"average"``

Preset speeds for Eth Gas Station API
- fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

#### Defined in

[hooks/useGasPrice.ts:28](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useGasPrice.ts#L28)

___

## Models Type aliases

### TContractLoaderConfig

Ƭ **TContractLoaderConfig**: `Object`

#### Summary
Configuration for useContractLoader

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hardhatNetworkName?` | `string` | your local hardhat network name |
| `customAddresses?` | `Record`<`string`, `string`\> | the contractName:address key value pair |
| `deployedContractsJson?` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson-2) | Hardhat deployed contracts untyped |
| `externalContracts?` | `TExternalContracts` | External contracts (such as DAI) |

#### Defined in

[hooks/useContractLoader.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/b87fb84/src/hooks/useContractLoader.ts#L39)
