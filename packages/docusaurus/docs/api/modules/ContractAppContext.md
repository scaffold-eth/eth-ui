---
id: "ContractAppContext"
title: "Module: ContractAppContext"
sidebar_label: "ContractAppContext"
sidebar_position: 0
custom_edit_url: null
---

## ContractAppContext

### createConnectorForHardhatContract

▸ **createConnectorForHardhatContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedHardhatContractJson`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GBaseContract` | extends `BaseContract`<`GBaseContract`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `GContractNames` |
| `typechainFactory` | `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\> |
| `deployedHardhatContractJson` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson) |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Defined in

context/contracts-app/contractConnectors.ts:76

___

### createConnectorForExternalContract

▸ **createConnectorForExternalContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedContractJson`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GBaseContract` | extends `BaseContract`<`GBaseContract`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `GContractNames` |
| `typechainFactory` | `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\> |
| `deployedContractJson` | [`TExternalContractsAddressMap`](Models.md#texternalcontractsaddressmap) |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Defined in

context/contracts-app/contractConnectors.ts:113

___

### createConnectorForExternalAbi

▸ **createConnectorForExternalAbi**<`GContractNames`, `GBaseContract`\>(`contractName`, `config`, `abi`, `connectFunc?`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GBaseContract` | extends `BaseContract`<`GBaseContract`\> = `BaseContract` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `contractName` | `GContractNames` | `undefined` |
| `config` | [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) | `undefined` |
| `abi` | `Record`<`string`, `any`\>[] | `undefined` |
| `connectFunc` | `undefined` \| [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> | `undefined` |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Defined in

context/contracts-app/contractConnectors.ts:151

___

### TContractsContextProps

Ƭ **TContractsContextProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ethersContextKey?` | `string` |

#### Defined in

context/contracts-app/contractsContextFactory.tsx:33

___

### contractsContextFactory

▸ **contractsContextFactory**<`GContractNames`, `GAppConnectorList`\>(`loadAppContractConnectors`): `Object`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `GContractNames` | extends `string` | - |
| `GAppConnectorList` | extends [`TConnectorList`](Models.md#tconnectorlist)<`GContractNames`, [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\>\> | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loadAppContractConnectors` | () => `undefined` \| `GAppConnectorList` |  |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `useAppContracts` | <GContractName\>(`contractName`: `GContractName`, `chainId`: `undefined` \| `number`) => `undefined` \| [`TTypedContract`](Models.md#ttypedcontract)<`GContractName`, `GAppConnectorList`\> |
| `useLoadAppContracts` | () => `void` |
| `useConnectAppContracts` | (`adaptor`: `undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)) => `void` |
| `useContractsAppStore` | `UseBoundStore`<`StoreApi`<`TContractsAppStore`<`GContractNames`, `GAppConnectorList`, `ReturnType`<`GAppConnectorList`[`Extract`<`GContractNames`, `string`\>][``"connect"``]\>, [`TAppContractsContext`](Models.md#tappcontractscontext)<`GContractNames`, `ReturnType`<`GAppConnectorList`[`Extract`<`GContractNames`, `string`\>][``"connect"``]\>\>\>\>\> |

#### Defined in

context/contracts-app/contractsContextFactory.tsx:71
