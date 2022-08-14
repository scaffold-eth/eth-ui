---
id: "Hooks"
title: "Module: Hooks"
sidebar_label: "Hooks"
sidebar_position: 0
custom_edit_url: null
---

## Hooks

### useDexEthPrice

▸ **useDexEthPrice**(`mainnetProvider`, `targetNetworkInfo?`, `options?`): [`THookResult`](Models.md#thookresult)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) |
| `targetNetworkInfo?` | [`TNetworkInfo`](Models.md#tnetworkinfo) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`number`\>

#### Defined in

hooks/dapps/useDexEthPrice.ts:27

___

### useDexTokenList

▸ **useDexTokenList**(`tokenListUri?`, `chainId?`, `options?`): [`THookResult`](Models.md#thookresult)<`TokenInfo`[]\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tokenListUri` | `string` | `'https://gateway.ipfs.io/ipns/tokens.uniswap.org'` |  |
| `chainId?` | `number` | `undefined` |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | `undefined` | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`TokenInfo`[]\>

#### Defined in

hooks/dapps/useDexTokenList.ts:26

___

### useResolveEnsAddress

▸ **useResolveEnsAddress**(`mainnetProvider`, `ensName`): [`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) |  |
| `ensName` | `undefined` \| `string` |  |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Defined in

hooks/dapps/useResolveEnsAddress.ts:19

___

### useResolveEnsName

▸ **useResolveEnsName**(`mainnetProvider`, `address`): [`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) |  |
| `address` | `string` |  |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Defined in

hooks/dapps/useResolveEnsName.ts:45

___

### useTokenBalance

▸ **useTokenBalance**<`GContract`\>(`contract`, `address`, `options?`): [`THookResult`](Models.md#thookresult)<`BigNumber`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract`<`GContract`\> & `ERC20` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `GContract` |  |
| `address` | `string` |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |  |

#### Returns

[`THookResult`](Models.md#thookresult)<`BigNumber`\>

#### Defined in

hooks/erc/useTokenBalance.ts:32

___

### useAreSignerEqual

▸ **useAreSignerEqual**(`signer1`, `signer2`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer1` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |  |
| `signer2` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |  |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `boolean`\>

#### Defined in

hooks/useAreSignerEqual.ts:21

___

### useBalance

▸ **useBalance**<`GAddress`\>(`addresses`, `options?`, `override?`): [`THookResult`](Models.md#thookresult)<`TUseBalanceResult`<`GAddress`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GAddress` | extends `string` \| `string`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addresses` | `undefined` \| `GAddress` |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |  |
| `override` | [`TOverride`](Models.md#toverride) |  |

#### Returns

[`THookResult`](Models.md#thookresult)<`TUseBalanceResult`<`GAddress`\>\>

#### Defined in

hooks/useBalance.ts:46

___

### useBlockNumber

▸ **useBlockNumber**(`provider`, `callback?`, `options?`): [`THookResult`](Models.md#thookresult)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) |
| `callback?` | (`blockNumber?`: `number`) => `void` \| (`blockNumber?`: `number`) => `Promise`<`void`\> |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`number`\>

#### Defined in

hooks/useBlockNumber.ts:22

___

### TBurnerSigner

Ƭ **TBurnerSigner**: `Object`

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

hooks/useBurnerSigner.ts:58

___

### useBurnerSigner

▸ **useBurnerSigner**(`localProvider`): [`TBurnerSigner`](Hooks.md#tburnersigner)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localProvider` | `undefined` \| [`TEthersProvider`](Models.md#tethersprovider) |  |

#### Returns

[`TBurnerSigner`](Hooks.md#tburnersigner)

#### Defined in

hooks/useBurnerSigner.ts:89

___

### useContractExistsAtAddress

▸ **useContractExistsAtAddress**(`contract`, `options?`): [`THookResult`](Models.md#thookresult)<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `BaseContract` |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`boolean`\> | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`boolean`\>

#### Defined in

hooks/useContractExistsAtAddress.ts:25

___

### useContractLoader

▸ **useContractLoader**(`config?`, `providerOrSigner`): `Record`<`string`, `BaseContract`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`TContractLoaderConfig`](Hooks.md#tcontractloaderconfig) |  |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](Models.md#tethersproviderorsigner) |  |

#### Returns

`Record`<`string`, `BaseContract`\>

#### Defined in

hooks/useContractLoader.ts:102

___

### useContractReaderUntyped

▸ **useContractReaderUntyped**<`GOutput`\>(`contract`, `contractFunctionInfo`, `formatter?`, `onChange?`, `override?`): `undefined` \| `GOutput`

#### Type parameters

| Name |
| :------ |
| `GOutput` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `BaseContract` |  |
| `contractFunctionInfo` | [`TContractFunctionInfo`](Models.md#tcontractfunctioninfo) |  |
| `formatter?` | (`_value`: `undefined` \| `GOutput`) => `GOutput` |  |
| `onChange?` | (`_value?`: `GOutput`) => `void` |  |
| `override` | [`TOverride`](Models.md#toverride) | - |

#### Returns

`undefined` \| `GOutput`

#### Defined in

hooks/useContractReaderUntyped.ts:26

___

### useEthersAdaptorFromProviderOrSigners

▸ **useEthersAdaptorFromProviderOrSigners**(`providerOrSigner`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](Models.md#tethersproviderorsigner) |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)\>

#### Defined in

hooks/useEthersAdaptorFromProviderOrSigners.ts:31

___

### useEventListener

▸ **useEventListener**<`GTypedEvent`\>(`contract`, `eventFilter`, `startBlock`, `toBlock?`, `options?`): [`THookResult`](Models.md#thookresult)<`GTypedEvent`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GTypedEvent` | extends [`TypedEvent`](Models.md#typedevent)<`Result`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contract` | `undefined` \| `BaseContract` | `undefined` |  |
| `eventFilter` | `undefined` \| `string` \| `EventFilter` | `undefined` | - |
| `startBlock` | `number` | `undefined` |  |
| `toBlock` | `undefined` \| `number` | `undefined` | - |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | `undefined` | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`GTypedEvent`[]\>

#### Defined in

hooks/useEventListener.ts:26

___

### TGasStationSpeed

Ƭ **TGasStationSpeed**: ``"fast"`` \| ``"fastest"`` \| ``"safeLow"`` \| ``"average"``

#### Defined in

hooks/useGasPrice.ts:28

___

### useGasPrice

▸ **useGasPrice**(`chainId`, `speed`, `currentNetworkInfo?`, `options?`, `override?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `number`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `undefined` \| `number` | - |
| `speed` | [`TGasStationSpeed`](Hooks.md#tgasstationspeed) |  |
| `currentNetworkInfo?` | [`TNetworkInfo`](Models.md#tnetworkinfo) |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | - |
| `override` | [`TOverride`](Models.md#toverride) | - |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `number`\>

#### Defined in

hooks/useGasPrice.ts:48

___

### useNonce

▸ **useNonce**(`address`, `options?`, `override?`): [`THookResult`](Models.md#thookresult)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |
| `override` | [`TOverride`](Models.md#toverride) |

#### Returns

[`THookResult`](Models.md#thookresult)<`number`\>

#### Defined in

hooks/useNonce.ts:34

___

### useSignerAddress

▸ **useSignerAddress**(`signer`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `string`\>

#### Defined in

hooks/useSignerAddress.ts:19

___

### useSignerChainId

▸ **useSignerChainId**(`signer`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| [`TEthersSigner`](Models.md#tetherssigner) |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `number`\>

#### Defined in

hooks/useSignerChainId.ts:20

___

### useTimestamp

▸ **useTimestamp**(`options?`, `override?`): [`THookResult`](Models.md#thookresult)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |
| `override` | [`TOverride`](Models.md#toverride) |

#### Returns

[`THookResult`](Models.md#thookresult)<`number`\>

#### Defined in

hooks/useTimestamp.ts:31

## Models

### TContractLoaderConfig

Ƭ **TContractLoaderConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hardhatNetworkName?` | `string` |  |
| `customAddresses?` | `Record`<`string`, `string`\> |  |
| `deployedContractsJson?` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson) |  |
| `externalContracts?` | `TExternalContracts` |  |

#### Defined in

hooks/useContractLoader.ts:39

## Misc

### useCheckIsMounted

▸ **useCheckIsMounted**(): `void`

#### Returns

`void`

#### Defined in

hooks/useCheckIsMounted.ts:3

___

### parseContractsInDeployedHardhatContractsJson

▸ **parseContractsInDeployedHardhatContractsJson**(`contractList`, `chainId`): `Record`<`string`, [`TBasicContractData`](Models.md#tbasiccontractdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractList` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson) |
| `chainId` | `number` |

#### Returns

`Record`<`string`, [`TBasicContractData`](Models.md#tbasiccontractdata)\>

#### Defined in

hooks/useContractLoader.ts:59

___

### useContractReader

▸ **useContractReader**<`GContract`, `GContractFunc`\>(`contract`, `contractFunc`, `args?`, `funcEventFilter?`, `options?`): [`THookResult`](Models.md#thookresult)<`undefined` \| `Awaited`<`ReturnType`<`GContractFunc`\>\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract`<`GContract`\> |
| `GContractFunc` | extends (...`args`: `any`[]) => `Promise`<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `GContract` |  |
| `contractFunc` | `undefined` \| `GContractFunc` |  |
| `args?` | `Parameters`<`GContractFunc`\> |  |
| `funcEventFilter?` | `EventFilter` |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> |  |

#### Returns

[`THookResult`](Models.md#thookresult)<`undefined` \| `Awaited`<`ReturnType`<`GContractFunc`\>\>\>

#### Defined in

hooks/useContractReader.ts:27

___

### useEthersUpdater

▸ **useEthersUpdater**(`update`, `blockNumber`, `options`, `allowBlockNumberUpdate?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `update` | () => `void` \| () => `Promise`<`void`\> | `undefined` |  |
| `blockNumber` | `undefined` \| `number` | `undefined` |  |
| `options` | [`TUpdateOptions`](Models.md#tupdateoptions)<`any`\> | `undefined` |  |
| `allowBlockNumberUpdate` | `boolean` | `true` |  |

#### Returns

`void`

#### Defined in

hooks/useEthersUpdater.ts:15
