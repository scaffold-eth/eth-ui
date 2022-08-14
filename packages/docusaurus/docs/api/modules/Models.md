---
id: "Models"
title: "Module: Models"
sidebar_label: "Models"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [IEthersContext](../interfaces/Models.IEthersContext.md)

## EthersAppContext

### TCreateEthersModalConnector

Ƭ **TCreateEthersModalConnector**: (`id?`: `string`) => [`TEthersModalConnector`](EthersAppContext.md#tethersmodalconnector) \| `undefined`

#### Type declaration

▸ (`id?`): [`TEthersModalConnector`](EthersAppContext.md#tethersmodalconnector) \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

##### Returns

[`TEthersModalConnector`](EthersAppContext.md#tethersmodalconnector) \| `undefined`

#### Defined in

[models/ethersAppContextTypes.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/ethersAppContextTypes.ts#L17)

___

## Models

### TBasicContractData

Ƭ **TBasicContractData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `abi?` | `any`[] |

#### Defined in

[models/contractTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractTypes.ts#L7)

___

### TBasicContractDataConfig

Ƭ **TBasicContractDataConfig**: `Object`

#### Index signature

▪ [chainId: `number`]: { `chainId`: `number` ; `address`: `string`  }

#### Defined in

[models/contractTypes.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractTypes.ts#L18)

___

### TDeployedHardhatContractsJson

Ƭ **TDeployedHardhatContractsJson**: `Object`

#### Index signature

▪ [chainId: `string`]: { `name`: `string` ; `chainId`: `string` ; `contracts`: { `[contractName: string]`: { `address`: `string` ; `abi?`: `any`[]  };  }  }[]

#### Defined in

[models/contractTypes.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractTypes.ts#L58)

___

### TExternalContractsAddressMap

Ƭ **TExternalContractsAddressMap**: `Object`

#### Index signature

▪ [chainId: `number`]: { `[contractName: string]`: `string`;  }

#### Defined in

[models/contractTypes.ts:80](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractTypes.ts#L80)

___

### TContractFunctionInfo

Ƭ **TContractFunctionInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |
| `functionName` | `string` |
| `functionArgs?` | `any`[] |

#### Defined in

[models/contractTypes.ts:95](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractTypes.ts#L95)

___

### TNetworkInfo

Ƭ **TNetworkInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `color` | `string` |
| `chainId` | `number` |
| `url` | `string` |
| `faucet?` | `string` |
| `blockExplorer` | `string` |
| `price?` | `number` |
| `gasPrice?` | `number` |

#### Defined in

[models/networkTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/networkTypes.ts#L7)

___

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

#### Defined in

[models/providerTypes.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/providerTypes.ts#L19)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Defined in

[models/providerTypes.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/providerTypes.ts#L27)

___

### TEthersSigner

Ƭ **TEthersSigner**: `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Defined in

[models/providerTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/providerTypes.ts#L42)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

#### Defined in

[models/providerTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/providerTypes.ts#L50)

___

### TypedEventFilter

Ƭ **TypedEventFilter**<`_EventArgsArray`, `_EventArgsObject`\>: `EventFilter`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `_EventArgsArray` | extends `any`[] |
| `_EventArgsObject` | extends `Record`<`string`, `any`\> |

#### Defined in

[models/providerTypes.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/providerTypes.ts#L58)

___

### TypedEvent

Ƭ **TypedEvent**<`EventArgs`\>: `Event` & { `args`: `EventArgs`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgs` | extends `Result` |

#### Defined in

[models/providerTypes.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/providerTypes.ts#L69)

___

### DeepPartial

Ƭ **DeepPartial**<`T`\>: { [P in keyof T]?: DeepPartial<T[P]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[models/utilityTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/utilityTypes.ts#L7)

## Misc

### const\_web3DialogClosedByUser

• `Const` **const\_web3DialogClosedByUser**: ``"Modal closed by user"``

#### Defined in

[models/constants/common.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/constants/common.ts#L1)

___

### const\_web3DialogUserRejected

• `Const` **const\_web3DialogUserRejected**: ``"Error: User Rejected"``

#### Defined in

[models/constants/common.ts:2](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/constants/common.ts#L2)

___

### keyNamespace

• `Const` **keyNamespace**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `network` | ``"network"`` |
| `signer` | ``"signer"`` |
| `contracts` | ``"contracts"`` |
| `state` | ``"state"`` |

#### Defined in

[models/constants/keyNamespace.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/constants/keyNamespace.ts#L1)

___

### TContractConnectFunc

Ƭ **TContractConnectFunc**<`GContract`\>: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract` |

#### Type declaration

▸ (`address`, `signerOrProvider`): `GContract`

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `signerOrProvider` | `Signer` \| `Provider` |

##### Returns

`GContract`

#### Defined in

[models/contractAppContextTypes.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L9)

___

### TContractConnectorBase

Ƭ **TContractConnectorBase**<`GContract`\>: `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GContract`\> ; `abi`: `Readonly`<`Record`<`string`, `any`\>[]\>  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract` |

#### Defined in

[models/contractAppContextTypes.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L18)

___

### TContractConnector

Ƭ **TContractConnector**<`GContractNames`, `GContract`\>: `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & [`TContractConnectorBase`](Models.md#tcontractconnectorbase)<`GContract`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContract` | extends `BaseContract` |

#### Defined in

[models/contractAppContextTypes.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L31)

___

### TBaseContractExtended

Ƭ **TBaseContractExtended**<`GContractNames`\>: `BaseContract` & { `contractName`: `GContractNames`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |

#### Defined in

[models/contractAppContextTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L42)

___

### TConnectorList

Ƭ **TConnectorList**<`GContractNames`, `GContracts`\>: { [contractName in GContractNames]: TContractConnector<GContractNames, GContracts\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\> |

#### Defined in

[models/contractAppContextTypes.ts:51](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L51)

___

### TTypedContract

Ƭ **TTypedContract**<`GContractNames`, `GAppContractConnectorList`\>: `GAppContractConnectorList` extends { [key in GContractNames]: Object } ? `TypedContract` : [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GAppContractConnectorList` | `GAppContractConnectorList` |

#### Defined in

[models/contractAppContextTypes.ts:62](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L62)

___

### TContractsByName

Ƭ **TContractsByName**<`GContractNames`, `GContracts`\>: { [contractName in GContractNames]: { [chainId in number]: GContracts \| undefined } }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\> |

#### Defined in

[models/contractAppContextTypes.ts:78](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L78)

___

### TContractsByChainId

Ƭ **TContractsByChainId**<`GContractNames`, `GContracts`\>: { [chainId in number]: { [contractName in GContractNames]: GContracts \| undefined } }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\> |

#### Defined in

[models/contractAppContextTypes.ts:90](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L90)

___

### TAppContractsContext

Ƭ **TAppContractsContext**<`GContractNames`, `GContracts`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractConnectors` | [`TConnectorList`](Models.md#tconnectorlist)<`GContractNames`, `GContracts`\> |
| `contractsByName` | [`TContractsByName`](Models.md#tcontractsbyname)<`GContractNames`, `GContracts`\> |
| `contractsByChainId` | [`TContractsByChainId`](Models.md#tcontractsbychainid)<`GContractNames`, `GContracts`\> |

#### Defined in

[models/contractAppContextTypes.ts:102](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractAppContextTypes.ts#L102)

___

### THardhatContractDataRecord

Ƭ **THardhatContractDataRecord**: `Object`

#### Index signature

▪ [contractName: `string`]: { `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) ; `abi`: `any`[]  }

#### Defined in

[models/contractTypes.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractTypes.ts#L31)

___

### TExternalContractDataRecord

Ƭ **TExternalContractDataRecord**: `Object`

#### Index signature

▪ [contractName: `string`]: { `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  }

#### Defined in

[models/contractTypes.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/contractTypes.ts#L44)

___

### const\_blockNumberIntervalShort

• `Const` **const\_blockNumberIntervalShort**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Defined in

[models/hookTypes.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L11)

___

### const\_blockNumberIntervalMedium

• `Const` **const\_blockNumberIntervalMedium**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Defined in

[models/hookTypes.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L17)

___

### const\_blockNumberIntervalLong

• `Const` **const\_blockNumberIntervalLong**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Defined in

[models/hookTypes.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L23)

___

### TQueryOptions

Ƭ **TQueryOptions**<`GResult`\>: `Omit`<`QueryObserverOptions`<`GResult`, `any`\>, ``"refetchInterval"`` \| ``"notifyOnChangeProps"`` \| ``"notifyOnChangePropsExclusions"`` \| ``"useErrorBoundary"`` \| ``"refetchOnWindowFocus"`` \| ``"refetchOnMount"`` \| ``"refetchOnReconnect"``\> & { `refetchOnWindowFocus?`: `boolean` \| ``"always"`` ; `refetchOnMount?`: `boolean` \| ``"always"`` ; `refetchOnReconnect?`: `boolean` \| ``"always"``  }

#### Type parameters

| Name |
| :------ |
| `GResult` |

#### Defined in

[models/hookTypes.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L25)

___

### TUpdateOptions

Ƭ **TUpdateOptions**<`GResult`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GResult` | `any` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockNumberInterval` | `number` \| `undefined` |  |
| `refetchInterval?` | `number` | - |
| `query?` | [`TQueryOptions`](Models.md#tqueryoptions)<`GResult`\> | - |

#### Defined in

[models/hookTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L50)

___

### TOverride

Ƭ **TOverride**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `adaptorEnabled` | `boolean` |  |
| `adaptor` | [`TEthersAdaptor`](Models.md#tethersadaptor) \| `undefined` |  |
| `alternateContextKey?` | `string` |  |

#### Defined in

[models/hookTypes.ts:73](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L73)

___

### defaultOverride

▸ **defaultOverride**(): [`TOverride`](Models.md#toverride)

#### Returns

[`TOverride`](Models.md#toverride)

#### Defined in

[models/hookTypes.ts:93](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L93)

___

### defaultUpdateOptions

▸ **defaultUpdateOptions**<`GResult`\>(): [`TUpdateOptions`](Models.md#tupdateoptions)<`GResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GResult` | `any` |

#### Returns

[`TUpdateOptions`](Models.md#tupdateoptions)<`GResult`\>

#### Defined in

[models/hookTypes.ts:105](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L105)

___

### THookResult

Ƭ **THookResult**<`T`\>: [result: T, update: Function, status: QueryStatus]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[models/hookTypes.ts:124](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/hookTypes.ts#L124)

## Type Definition

### TEthersAdaptor

Ƭ **TEthersAdaptor**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signer?` | [`TEthersSigner`](Models.md#tetherssigner) |
| `provider?` | [`TEthersProvider`](Models.md#tethersprovider) |
| `chainId?` | `number` |
| `account?` | `string` |

#### Defined in

[models/ethersAppContextTypes.ts:52](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/models/ethersAppContextTypes.ts#L52)
