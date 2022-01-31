[eth-hooks - v4.0.25](../README.md) / Hooks

# Module: Hooks

Commonly used ethereum hooks to turbocharge your development!  Works with [useEthersContext](EthersContext.md#useetherscontext).

## Table of contents

### Hooks Functions

- [useDexEthPrice](Hooks.md#usedexethprice)
- [useDexTokenList](Hooks.md#usedextokenlist)
- [useResolveEnsAddress](Hooks.md#useresolveensaddress)
- [useResolveEnsName](Hooks.md#useresolveensname)
- [useTokenBalance](Hooks.md#usetokenbalance)
- [useAreSignerEqual](Hooks.md#usearesignerequal)
- [useBalance](Hooks.md#usebalance)
- [useBlockNumber](Hooks.md#useblocknumber)
- [useBurnerSigner](Hooks.md#useburnersigner)
- [useContractExistsAtAddress](Hooks.md#usecontractexistsataddress)
- [useContractLoader](Hooks.md#usecontractloader)
- [useContractReaderUntyped](Hooks.md#usecontractreaderuntyped)
- [useEthersAdaptorFromProviderOrSigners](Hooks.md#useethersadaptorfromproviderorsigners)
- [useEventListener](Hooks.md#useeventlistener)
- [useGasPrice](Hooks.md#usegasprice)
- [useNonce](Hooks.md#usenonce)
- [useSignerAddress](Hooks.md#usesigneraddress)
- [useSignerChainId](Hooks.md#usesignerchainid)
- [useTimestamp](Hooks.md#usetimestamp)

### Misc Functions

- [parseContractsInJson](Hooks.md#parsecontractsinjson)
- [useContractReader](Hooks.md#usecontractreader)
- [useEthersUpdater](Hooks.md#useethersupdater)

### Hooks Type aliases

- [TBurnerSigner](Hooks.md#tburnersigner)
- [TGasStationSpeed](Hooks.md#tgasstationspeed)

### Models Type aliases

- [TContractLoaderConfig](Hooks.md#tcontractloaderconfig)

## Hooks Functions

### useDexEthPrice

▸ `Const` **useDexEthPrice**(`mainnetProvider`, `targetNetworkInfo?`, `options?`): [`THookResult`](Models.md#thookresult)<`number`\>

#### Summary
Get the Exchange price of ETH/USD (extrapolated from WETH/DAI) from uniswap

##### ✏️ Notes
- uses useOnRepetition, does not use context

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) |
| `targetNetworkInfo?` | [`TNetworkInfo`](Models.md#tnetworkinfo) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`number`\>

price in USD

#### Defined in

[src/hooks/dapps/useDexEthPrice.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/dapps/useDexEthPrice.ts#L27)

___

### useDexTokenList

▸ `Const` **useDexTokenList**(`tokenListUri?`, `chainId?`, `options?`): [`THookResult`](Models.md#thookresult)<`TokenInfo`[]\>

#### Summary
Gets a tokenlist from uniswap ipfs tokenlist

##### ✏️ Notes
- you can also point it to another URI

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tokenListUri` | `string` | `'https://gateway.ipfs.io/ipns/tokens.uniswap.org'` |  |
| `chainId?` | `number` | `undefined` | optional, you can filter by a particular chainId |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | `undefined` | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`TokenInfo`[]\>

(TokenInfo[]) from '@uniswap/token-lists'

#### Defined in

[src/hooks/dapps/useDexTokenList.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/dapps/useDexTokenList.ts#L27)

___

### useResolveEnsAddress

▸ `Const` **useResolveEnsAddress**(`mainnetProvider`, `ensName`): [`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Summary
Gets the address from an ENS name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) | mainnet provider |
| `ensName` | `undefined` \| `string` |  |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Defined in

[src/hooks/dapps/useResolveEnsAddress.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/dapps/useResolveEnsAddress.ts#L19)

___

### useResolveEnsName

▸ `Const` **useResolveEnsName**(`mainnetProvider`, `address`): [`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Summary
Gets ENS name for given address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) | mainnet provider |
| `address` | `string` |  |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Defined in

[src/hooks/dapps/useResolveEnsName.ts:45](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/dapps/useResolveEnsName.ts#L45)

___

### useTokenBalance

▸ `Const` **useTokenBalance**<`GContract`\>(`contract`, `address`, `options?`): [`THookResult`](Models.md#thookresult)<`BigNumber`\>

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
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | Options for how often and when to update |

#### Returns

[`THookResult`](Models.md#thookresult)<`BigNumber`\>

#### Defined in

[src/hooks/erc/useTokenBalance.ts:32](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/erc/useTokenBalance.ts#L32)

___

### useAreSignerEqual

▸ `Const` **useAreSignerEqual**(`signer1`, `signer2`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `boolean`\>

#### Summary
Are the signers equal and valid

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer1` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |
| `signer2` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `boolean`\>

#### Defined in

[src/hooks/useAreSignerEqual.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useAreSignerEqual.ts#L19)

___

### useBalance

▸ `Const` **useBalance**<`GAddress`\>(`addresses`, `options?`, `override?`): [`THookResult`](Models.md#thookresult)<`TUseBalanceResult`<`GAddress`\>\>

#### Summary
Gets your balance in ETH for the given address.

##### ✏️ Notes
- updates triggered by [BlockNumberContext](EthersContext.md#blocknumbercontext)
- uses the current provider {@link provider} from [useEthersContext](EthersContext.md#useetherscontext)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GAddress` | extends `string` \| `string`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addresses` | `undefined` \| `GAddress` | Addresses of wallets to get balance for |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | Options for how often and when to update |
| `override` | [`TOverride`](Models.md#toverride) | Options to override adapters and context |

#### Returns

[`THookResult`](Models.md#thookresult)<`TUseBalanceResult`<`GAddress`\>\>

current balance

#### Defined in

[src/hooks/useBalance.ts:41](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useBalance.ts#L41)

___

### useBlockNumber

▸ `Const` **useBlockNumber**(`provider`, `callback?`, `options?`): [`THookResult`](Models.md#thookresult)<`number`\>

#### Summary
Get the current block number of the network. ✋🏽 @deprecated

##### ✏️ Notes
- ✋🏽 For app wide block number access use [useBlockNumberContext](EthersContext.md#useblocknumbercontext) instead.  See [BlockNumberContext](EthersContext.md#blocknumbercontext) for more details, you get this as part of [EthersAppContext](EthersContext.md#ethersappcontext)
- uses the current provided block number

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) |
| `callback?` | (`blockNumber?`: `number`) => `void` \| (`blockNumber?`: `number`) => `Promise`<`void`\> |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`number`\>

block number

#### Defined in

[src/hooks/useBlockNumber.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useBlockNumber.ts#L22)

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

[src/hooks/useBurnerSigner.ts:87](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useBurnerSigner.ts#L87)

___

### useContractExistsAtAddress

▸ `Const` **useContractExistsAtAddress**(`contract`, `options?`): [`THookResult`](Models.md#thookresult)<`boolean`\>

#### Summary
Checks whether a contract exists on the blockchain

##### ✏️ Notes
- uses the ethers.Contract object's provider to access the network
- checks the contract address to see if the contract is deployed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `BaseContract` | ethers.BaseContract class |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`boolean`\> | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`boolean`\>

#### Defined in

[src/hooks/useContractExistsAtAddress.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useContractExistsAtAddress.ts#L25)

___

### useContractLoader

▸ `Const` **useContractLoader**(`config?`, `providerOrSigner`): `Record`<`string`, `BaseContract`\>

#### Summary
Loads your contracts and returns them. ✋🏽 @deprecated
Gives options to read values from contracts or write transactions into them.

##### ✏️ Notes
- ✋🏽 For easy app wide contract access use {@link AppContractContex} created by [contractsContextFactory](EthersContext.md#contractscontextfactory).  See [contractsContextFactory](EthersContext.md#contractscontextfactory) for more details.

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
| `config` | [`TContractLoaderConfig`](Hooks.md#tcontractloaderconfig) |  |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](Models.md#tethersproviderorsigner) | (optional) used to initalize the contract class |

#### Returns

`Record`<`string`, `BaseContract`\>

Record of contractName:Contracts

#### Defined in

[src/hooks/useContractLoader.ts:105](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useContractLoader.ts#L105)

___

### useContractReaderUntyped

▸ `Const` **useContractReaderUntyped**<`GOutput`\>(`contract`, `contractFunctionInfo`, `formatter?`, `onChange?`, `override?`): `undefined` \| `GOutput`

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
| `contractFunctionInfo` | [`TContractFunctionInfo`](Models.md#tcontractfunctioninfo) |  |
| `formatter?` | (`_value`: `undefined` \| `GOutput`) => `GOutput` | <OutputT> a function that can format the output |
| `onChange?` | (`_value?`: `GOutput`) => `void` | callback with result as a parameter |
| `override` | [`TOverride`](Models.md#toverride) | - |

#### Returns

`undefined` \| `GOutput`

<OutputT>

#### Defined in

[src/hooks/useContractReaderUntyped.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useContractReaderUntyped.ts#L26)

___

### useEthersAdaptorFromProviderOrSigners

▸ `Const` **useEthersAdaptorFromProviderOrSigners**(`providerOrSigner`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)\>

#### Summary
Gets the user {@link TEthersUser} for a signer or wallet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](Models.md#tethersproviderorsigner) | input signer |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)\>

#### Defined in

[src/hooks/useEthersAdaptorFromProviderOrSigners.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useEthersAdaptorFromProviderOrSigners.ts#L31)

___

### useEventListener

▸ `Const` **useEventListener**<`GTypedEvent`\>(`contract`, `eventFilter`, `startBlock`, `toBlock?`, `options?`): [`THookResult`](Models.md#thookresult)<`GTypedEvent`[]\>

#### Summary
Tracks the events of associated with a contract

##### ✏️ Notes
- updates triggered through ethers event listener
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersContext.md#useetherscontext)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GTypedEvent` | extends [`TypedEvent`](Models.md#typedevent)<`Result`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contract` | `undefined` \| `BaseContract` | `undefined` | ethers.Contract |
| `eventFilter` | `undefined` \| `string` \| `EventFilter` | `undefined` | - |
| `startBlock` | `number` | `undefined` |  |
| `toBlock` | `undefined` \| `number` | `undefined` | - |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | `undefined` | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`GTypedEvent`[]\>

#### Defined in

[src/hooks/useEventListener.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useEventListener.ts#L26)

___

### useGasPrice

▸ `Const` **useGasPrice**(`chainId`, `speed`, `currentNetworkInfo?`, `options?`, `override?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `number`\>

#### Summary
Gets the gas price for the current network as gwei
- uses EthGasStation for mainnet
- uses ethers.estimateGas other networks
- can use currentNetworkInfo {@link TNetworkInfo.gasPrice} gasPrice as fallback

##### ✏️ Notes
- if the gas price is unknown it returns undefined
- updates triggered by [BlockNumberContext](EthersContext.md#blocknumbercontext)
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersContext.md#useetherscontext)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `undefined` \| `number` | - |
| `speed` | [`TGasStationSpeed`](Hooks.md#tgasstationspeed) |  |
| `currentNetworkInfo?` | [`TNetworkInfo`](Models.md#tnetworkinfo) | uses gasPrice as a fallback |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | - |
| `override` | [`TOverride`](Models.md#toverride) | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `number`\>

gas as gwei

#### Defined in

[src/hooks/useGasPrice.ts:49](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useGasPrice.ts#L49)

___

### useNonce

▸ `Const` **useNonce**(`address`, `options?`, `override?`): [`THookResult`](Models.md#thookresult)<`number`\>

#### Summary
Get the current nonce for the address provided

##### ✏️ Notes
- updates triggered by [BlockNumberContext](EthersContext.md#blocknumbercontext)
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersContext.md#useetherscontext)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |
| `override` | [`TOverride`](Models.md#toverride) |

#### Returns

[`THookResult`](Models.md#thookresult)<`number`\>

#### Defined in

[src/hooks/useNonce.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useNonce.ts#L34)

___

### useSignerAddress

▸ `Const` **useSignerAddress**(`signer`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Summary
Get the address from the signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Defined in

[src/hooks/useSignerAddress.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useSignerAddress.ts#L19)

___

### useSignerChainId

▸ `Const` **useSignerChainId**(`signer`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `number`\>

#### Summary
Get the address from the signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `number`\>

#### Defined in

[src/hooks/useSignerChainId.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useSignerChainId.ts#L20)

___

### useTimestamp

▸ `Const` **useTimestamp**(`options?`, `override?`): [`THookResult`](Models.md#thookresult)<`number`\>

#### Summary
Get the current timestamp from the latest block

##### ✏️ Notes
- updates triggered by [BlockNumberContext](EthersContext.md#blocknumbercontext)
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersContext.md#useetherscontext)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |
| `override` | [`TOverride`](Models.md#toverride) |

#### Returns

[`THookResult`](Models.md#thookresult)<`number`\>

#### Defined in

[src/hooks/useTimestamp.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useTimestamp.ts#L31)

___

## Misc Functions

### parseContractsInJson

▸ `Const` **parseContractsInJson**(`contractList`, `chainId`): `Record`<`string`, [`TBasicContractData`](Models.md#tbasiccontractdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractList` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson) |
| `chainId` | `number` |

#### Returns

`Record`<`string`, [`TBasicContractData`](Models.md#tbasiccontractdata)\>

#### Defined in

[src/hooks/useContractLoader.ts:59](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useContractLoader.ts#L59)

___

### useContractReader

▸ `Const` **useContractReader**<`GContract`, `GContractFunc`\>(`contract`, `contractFunc`, `args?`, `funcEventFilter?`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `Awaited`<`ReturnType`<`GContractFunc`\>\>\>

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
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | Options for how often and when to update |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `Awaited`<`ReturnType`<`GContractFunc`\>\>\>

#### Defined in

[src/hooks/useContractReader.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useContractReader.ts#L27)

___

### useEthersUpdater

▸ `Const` **useEthersUpdater**(`update`, `blockNumber`, `options`, `allowBlockNumberUpdate?`): `void`

#### Summary
Calls update argument based on update options

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `update` | () => `void` \| () => `Promise`<`void`\> | `undefined` | Function to call when update |
| `blockNumber` | `undefined` \| `number` | `undefined` | Current block number |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | `undefined` | Options for how often and when to update |
| `allowBlockNumberUpdate` | `boolean` | `true` | Boolean of if updating using this hook is allowed |

#### Returns

`void`

#### Defined in

[src/hooks/useEthersUpdater.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useEthersUpdater.ts#L15)

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

[src/hooks/useBurnerSigner.ts:56](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useBurnerSigner.ts#L56)

___

### TGasStationSpeed

Ƭ **TGasStationSpeed**: ``"fast"`` \| ``"fastest"`` \| ``"safeLow"`` \| ``"average"``

Preset speeds for Eth Gas Station API
- fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
- average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

#### Defined in

[src/hooks/useGasPrice.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useGasPrice.ts#L29)

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
| `deployedContractsJson?` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson) | Hardhat deployed contracts untyped |
| `externalContracts?` | `TExternalContracts` | External contracts (such as DAI) |

#### Defined in

[src/hooks/useContractLoader.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/hooks/useContractLoader.ts#L39)
