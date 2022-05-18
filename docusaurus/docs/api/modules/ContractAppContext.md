---
id: 'ContractAppContext'
title: 'Module: ContractAppContext'
sidebar_label: 'ContractAppContext'
sidebar_position: 0
custom_edit_url: null
---

A context for your react app with [contractsContextFactory](ContractAppContext.md#contractscontextfactory) that provides you access to load, connect and use typed contracts throught your app.

See [the ContractAppContext docs](../../main/context/ContractAppContext) for detailed explanation and examples.

## ContractAppContext

### createConnectorForHardhatContract

▸ **createConnectorForHardhatContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedHardhatContractJson`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[] }\>\>

##### Summary

Creates a connector for any of your hardhat contracts

#### Type parameters

| Name             | Type                                     |
| :--------------- | :--------------------------------------- |
| `GContractNames` | extends `string`                         |
| `GBaseContract`  | extends `BaseContract`<`GBaseContract`\> |

#### Parameters

| Name                          | Type                                                                                                                                                  |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractName`                | `GContractNames`                                                                                                                                      |
| `typechainFactory`            | `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[] }\> |
| `deployedHardhatContractJson` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson)                                                                            |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[] }\>\>

#### Defined in

[context/contracts-app/contractConnectors.ts:76](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/context/contracts-app/contractConnectors.ts#L76)

---

### createConnectorForExternalContract

▸ **createConnectorForExternalContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedContractJson`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[] }\>\>

#### Summary

Creates a contract connector for any external contract

##### ✏️ Notes

- As an example you could use this for an external contract such as DAI

#### Type parameters

| Name             | Type                                     |
| :--------------- | :--------------------------------------- |
| `GContractNames` | extends `string`                         |
| `GBaseContract`  | extends `BaseContract`<`GBaseContract`\> |

#### Parameters

| Name                   | Type                                                                                                                                                  |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractName`         | `GContractNames`                                                                                                                                      |
| `typechainFactory`     | `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[] }\> |
| `deployedContractJson` | [`TExternalContractsAddressMap`](Models.md#texternalcontractsaddressmap)                                                                              |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[] }\>\>

#### Defined in

[context/contracts-app/contractConnectors.ts:113](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/context/contracts-app/contractConnectors.ts#L113)

---

### createConnectorForExternalAbi

▸ **createConnectorForExternalAbi**<`GContractNames`, `GBaseContract`\>(`contractName`, `config`, `abi`, `connectFunc?`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[] }\>\>

#### Summary

Create a contract connector from a ABI.

##### ✏️ Notes

- This can be used for unverified external contracts

#### Type parameters

| Name             | Type                                                      |
| :--------------- | :-------------------------------------------------------- |
| `GContractNames` | extends `string`                                          |
| `GBaseContract`  | extends `BaseContract`<`GBaseContract`\> = `BaseContract` |

#### Parameters

| Name           | Type                                                                                      | Default value |
| :------------- | :---------------------------------------------------------------------------------------- | :------------ |
| `contractName` | `GContractNames`                                                                          | `undefined`   |
| `config`       | [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)                          | `undefined`   |
| `abi`          | `Record`<`string`, `any`\>[]                                                              | `undefined`   |
| `connectFunc`  | `undefined` \| [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> | `undefined`   |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[] }\>\>

#### Defined in

[context/contracts-app/contractConnectors.ts:151](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/context/contracts-app/contractConnectors.ts#L151)

---

### TContractsContextProps

Ƭ **TContractsContextProps**: `Object`

#### Summary

Props for the ContractContext generated by the contractContextFactory

#### Type declaration

| Name                | Type     |
| :------------------ | :------- |
| `ethersContextKey?` | `string` |

#### Defined in

[context/contracts-app/contractsContextFactory.tsx:40](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/context/contracts-app/contractsContextFactory.tsx#L40)

---

### contractsContextFactory

▸ **contractsContextFactory**<`GContractNames`, `GAppConnectorList`, `GContractsTypes`\>(`loadAppContractConnectors`): `Object`

#### Summary

This is the factory function that creates the ContractContext and returns the hooks you can use to access typed contracts through out your app.

##### ✏️ Notes

- See [this for an example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/release/packages/vite-app-ts/src/config/appContracts.config.ts) for an example of how to use this.

#### Type parameters

| Name                | Type                                                                                                                                                   | Description                                                                                                                                                                                                                   |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GContractNames`    | extends `string`                                                                                                                                       | A type that represents the names of the contracts you want to access. Should be `keyof ReturnType<loadAppContractConnectors>`, where `loadAppContractConnectors` is the function that returns the contract connectors config. |
| `GAppConnectorList` | extends [`TConnectorList`](Models.md#tconnectorlist)<`GContractNames`, [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\>\> | A type are the list of contracts and their connectors. Should be `ReturnType<loadAppContractConnectors>`, where `loadAppContractConnectors` is the function that returns the contract connectors config.                      |
| `GContractsTypes`   | extends `BaseContract`<`GContractsTypes`\> & { `contractName`: `GContractNames` }                                                                      | -                                                                                                                                                                                                                             |

#### Parameters

| Name                        | Type                                     | Description                                                                                                                                                                                                       |
| :-------------------------- | :--------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loadAppContractConnectors` | () => `undefined` \| `GAppConnectorList` | A function that returns a list of app contract connectors. See [this for an example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/release/packages/vite-app-ts/src/config/appContracts.config.ts) |

#### Returns

`Object`

A context for contracts, hook to access contracts, hook to load contracts, hook to connect to contracts in a network

| Name                     | Type                                                                                                                                                                                        | Description                                                                                                                                                                                                                                                         |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ContractsAppContext`    | `FC`<`PropsWithChildren`<[`TContractsContextProps`](ContractAppContext.md#tcontractscontextprops)\>\>                                                                                       | #### Summary This is the context for contracts that lets you access your contracts anywhere in your app. You need to wrap your app in it. [See this example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/release/packages/vite-app-ts/src/App.tsx) |
| `useAppContractsActions` | () => `undefined` \| [`TContractsContextActions`](ContractAppContext.md#tcontractscontextactions)<`GContractNames`, `GAppConnectorList`\>                                                   | -                                                                                                                                                                                                                                                                   |
| `useAppContracts`        | <GContractName\>(`contractName`: `GContractName`, `chainId`: `undefined` \| `number`) => `undefined` \| [`TTypedContract`](Models.md#ttypedcontract)<`GContractName`, `GAppConnectorList`\> | #### Summary This hook allows you to get the contracts attached to a particular network. ##### ✏️ Notes To be used with {@link useConnectAppContracts} which needs to be called in your app to connect to the contracts in a particular network.                    |
| `useLoadAppContracts`    | () => `void`                                                                                                                                                                                | #### Summary This hook needs to be called in your app to load all your app contracts                                                                                                                                                                                |
| `useConnectAppContracts` | (`adaptor`: `undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)) => `void`                                                                                                          | #### Summary This hook needs to be called in your app to connect your app to a network                                                                                                                                                                              |

#### Defined in

[context/contracts-app/contractsContextFactory.tsx:108](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/context/contracts-app/contractsContextFactory.tsx#L108)

## Misc

### TContractsContextActions

Ƭ **TContractsContextActions**<`GContractNames`, `GAppConnectorList`\>: `Object`

#### Type parameters

| Name                | Type                |
| :------------------ | :------------------ |
| `GContractNames`    | extends `string`    |
| `GAppConnectorList` | `GAppConnectorList` |

#### Type declaration

| Name                          | Type                                                                                                                                      |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `connectToAllContractsAction` | (`appContractConnectorList`: `GAppConnectorList`, `ethersAdaptor`: `undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)) => `void` |
| `connectToContractAction`     | (`contractName`: `GContractNames`, `ethersAdaptor`: [`TEthersAdaptor`](Models.md#tethersadaptor)) => `void`                               |
| `setContractConnectors`       | (`appContractConnectorList`: `GAppConnectorList`) => `void`                                                                               |
| `addContractConnectors`       | (`appContractConnectorList`: `GAppConnectorList`) => `void`                                                                               |
| `dispatch`                    | `Dispatch`<`TActions`<`GContractNames`, `GAppConnectorList`\>\>                                                                           |

#### Defined in

[context/contracts-app/contractsContextFactory.tsx:79](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/context/contracts-app/contractsContextFactory.tsx#L79)
