---
id: "EthersAppContext"
title: "Module: EthersAppContext"
sidebar_label: "EthersAppContext"
sidebar_position: 0
custom_edit_url: null
---

A context for your react app with [useEthersContext](EthersAppContext.md#useetherscontext) that provides you access to [IEthersContext](../interfaces/Models.IEthersContext.md).  It gives you access to consistent interface to get the current provider [EthersModalConnector](../classes/EthersAppContext.EthersModalConnector.md).  Additionally integration with web3Modal gives you an easy way to guide your user with their web3 journey.

## EthersAppContext Functions

- [useBlockNumberContext](EthersAppContext.md#useblocknumbercontext)
- [useEthersContext](EthersAppContext.md#useetherscontext)
- [ConnectToStaticJsonRpcProvider](EthersAppContext.md#connecttostaticjsonrpcprovider)

## ContractAppContext Functions

- [createConnectorForHardhatContract](EthersAppContext.md#createconnectorforhardhatcontract)
- [createConnectorForExternalContract](EthersAppContext.md#createconnectorforexternalcontract)
- [createConnectorForExternalAbi](EthersAppContext.md#createconnectorforexternalabi)
- [contractsContextFactory](EthersAppContext.md#contractscontextfactory)

## ContractAppContext Type aliases

- [TContractsContextProps](EthersAppContext.md#tcontractscontextprops)

## Misc Type aliases

- [TContractsContextActions](EthersAppContext.md#tcontractscontextactions)
- [TEthersAppContextProps](EthersAppContext.md#tethersappcontextprops)
- [TGetEthersAppProviderLibrary](EthersAppContext.md#tgetethersappproviderlibrary)
- [TEthersModalConnector](EthersAppContext.md#tethersmodalconnector)

## EthersAppContext Variables

- [BlockNumberContext](EthersAppContext.md#blocknumbercontext)
- [EthersAppContext](EthersAppContext.md#ethersappcontext)

## Misc Variables

- [connectorErrorText](EthersAppContext.md#connectorerrortext)
- [contextQueryClient](EthersAppContext.md#contextqueryclient)

## EthersAppContext Interfaces

- [IStaticJsonRpcProviderConnectorOptions](../interfaces/EthersAppContext.IStaticJsonRpcProviderConnectorOptions.md)

## Misc Interfaces

- [ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md)

## EthersAppContext Classes

- [EthersModalConnector](../classes/EthersAppContext.EthersModalConnector.md)
- [UserClosedModalError](../classes/EthersAppContext.UserClosedModalError.md)
- [CouldNotActivateError](../classes/EthersAppContext.CouldNotActivateError.md)
- [NoEthereumProviderFoundError](../classes/EthersAppContext.NoEthereumProviderFoundError.md)
- [NoStaticJsonRPCProviderFoundError](../classes/EthersAppContext.NoStaticJsonRPCProviderFoundError.md)

## EthersAppContext Functions

### useBlockNumberContext

▸ **useBlockNumberContext**(): `number`

#### Summary
A hook that gets you the current blocknumber via react context
- can be shared by your whole app.

##### ❔Use
Make sure to wrap your main app with the [EthersAppContext](EthersAppContext.md#ethersappcontext).
- See [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/components/routes/App.tsx#L38)

##### ✏️ Notes
- this extensively used by eth-hooks to trigger hooks when a new block arrives
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersAppContext.md#useetherscontext)

#### Returns

`number`

current block number

#### Defined in

context/ethers-app/BlockNumberContext.tsx:64

___

### useEthersContext

▸ **useEthersContext**(`contextKey?`): [`IEthersContext`](../interfaces/Models.IEthersContext.md)

#### Summary
This Hook provides you with access to the current Ethers Provider Context.
This provider would be the one selected by using [EthersModalConnector](../classes/EthersAppContext.EthersModalConnector.md) and Web3Modal

##### ✨ Features
Gives you access to consistent interface to get the current provider information [EthersModalConnector](../classes/EthersAppContext.EthersModalConnector.md)
- ethers compatable provider [TEthersProvider](Models.md#tethersprovider)
- a callback to change the current account (signer)
- the current account, chainId and signer
- callbacks to open the web3Modal, logout or change theme

##### ✏️ Notes
- currently providerKey isnt being used

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextKey?` | `string` |

#### Returns

[`IEthersContext`](../interfaces/Models.IEthersContext.md)

#### Defined in

context/ethers-app/EthersAppContext.tsx:37

___

### ConnectToStaticJsonRpcProvider

▸ **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`undefined` \| `StaticJsonRpcProvider`\>

#### Summary
A connector that can be used by apps to connect to a StaticJsonRpcProvider
- For example you can use this to connect to a localhost provider

##### ✏️ Notes
See scaffold-eth-typescript for an example that uses it to connect to a localhost burner wallet.
- [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/config/web3ModalConfig.ts#L86)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_package` | `unknown` | not used |
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](../interfaces/EthersAppContext.IStaticJsonRpcProviderConnectorOptions.md) |  |

#### Returns

`Promise`<`undefined` \| `StaticJsonRpcProvider`\>

#### Defined in

context/ethers-app/connectors/StaticJsonRpcProviderConnector.ts:33

___

## ContractAppContext Functions

### createConnectorForHardhatContract

▸ **createConnectorForHardhatContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedHardhatContractJson`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc)<`GBaseContract`\> ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

##### Summary
Creates a connector for any of your hardhat contracts

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

#### Summary
Creates a contract connector for any external contract

##### ✏️ Notes
- As an example you could use this for an external contract such as DAI

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

#### Summary
Create a contract connector from a ABI.

##### ✏️ Notes
- This can be used for unverified external contracts

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

### contractsContextFactory

▸ **contractsContextFactory**<`GContractNames`, `GAppConnectorList`, `GContractsTypes`\>(`loadAppContractConnectors`): `Object`

#### Summary
This is the factory function that creates the ContractContext and returns the hooks you can use to access typed contracts through out your app.

##### ✏️ Notes
- See [scaffold-eth-typescript contractContext.ts](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/release/packages/vite-app-ts/src/components/contractContext.ts) for an example of how to use this.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GAppConnectorList` | extends [`TConnectorList`](Models.md#tconnectorlist)<`GContractNames`, [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\>\> |
| `GContractsTypes` | extends `BaseContract`<`GContractsTypes`\> & { `contractName`: `GContractNames`  } |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loadAppContractConnectors` | () => `undefined` \| `GAppConnectorList` | A function that returns a list of app contract connectors. See [this for an example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/release/packages/vite-app-ts/src/config/appContracts.config.ts) |

#### Returns

`Object`

A context for contracts, hook to access contracts, hook to load contracts, hook to connect to contracts in a network

| Name | Type | Description |
| :------ | :------ | :------ |
| `ContractsAppContext` | `FC`<`PropsWithChildren`<[`TContractsContextProps`](EthersAppContext.md#tcontractscontextprops)\>\> | #### Summary This is the context for contracts that lets you access your contracts anywhere in your app.  You need to wrap your app in it.  [See this example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/release/packages/vite-app-ts/src/App.tsx) |
| `useAppContractsActions` | () => `undefined` \| [`TContractsContextActions`](EthersAppContext.md#tcontractscontextactions)<`GContractNames`, `GAppConnectorList`\> | - |
| `useAppContracts` | <GContractName\>(`contractName`: `GContractName`, `chainId`: `undefined` \| `number`) => `undefined` \| [`TTypedContract`](Models.md#ttypedcontract)<`GContractName`, `GAppConnectorList`\> | #### Summary This hook allows you to get the contracts attached to a particular network.  ##### ✏️ Notes To be used with {@link useConnectAppContracts} which needs to be called in your app to connect to the contracts in a particular network. |
| `useLoadAppContracts` | () => `void` | #### Summary This hook needs to be called in your app to load all your app contracts |
| `useConnectAppContracts` | (`adaptor`: `undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)) => `void` | #### Summary This hook needs to be called in your app to connect your app to a network |

#### Defined in

context/contracts-app/contractsContextFactory.tsx:105

## ContractAppContext Type aliases

### TContractsContextProps

Ƭ **TContractsContextProps**: `Object`

#### Summary
Props for the ContractContext generated by the contractContextFactory

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ethersContextKey?` | `string` |

#### Defined in

context/contracts-app/contractsContextFactory.tsx:40

___

## Misc Type aliases

### TContractsContextActions

Ƭ **TContractsContextActions**<`GContractNames`, `GAppConnectorList`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GAppConnectorList` | `GAppConnectorList` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connectToAllContractsAction` | (`appContractConnectorList`: `GAppConnectorList`, `ethersAdaptor`: `undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)) => `void` |
| `connectToContractAction` | (`contractName`: `GContractNames`, `ethersAdaptor`: [`TEthersAdaptor`](Models.md#tethersadaptor)) => `void` |
| `setContractConnectors` | (`appContractConnectorList`: `GAppConnectorList`) => `void` |
| `addContractConnectors` | (`appContractConnectorList`: `GAppConnectorList`) => `void` |
| `dispatch` | `Dispatch`<`TActions`<`GContractNames`, `GAppConnectorList`\>\> |

#### Defined in

context/contracts-app/contractsContextFactory.tsx:79

___

### TEthersAppContextProps

Ƭ **TEthersAppContextProps**: `Object`

#### Summary
Props for context

##### ✏️ Notes
- allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root.
- allows you to use your own QueryClientProvider

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `children?` | `React.ReactNode` | - |
| `secondaryWeb3ReactRoot?` | { `contextKey`: `string` ; `web3ReactRoot`: `JSX.Element`  } | Props for context that allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root. |
| `secondaryWeb3ReactRoot.contextKey` | `string` | - |
| `secondaryWeb3ReactRoot.web3ReactRoot` | `JSX.Element` | - |
| `disableQueryClientRoot?` | `boolean` | disables the local queryClientRoot and QueryClientProvider for react-query and allows you to use your own |
| `customGetEthersAppProviderLibrary?` | [`TGetEthersAppProviderLibrary`](EthersAppContext.md#tgetethersappproviderlibrary) | if you want to pass in your own provider. Make sure it is compatable with ethers.js, see [TGetEthersAppProviderLibrary](EthersAppContext.md#tgetethersappproviderlibrary) for details |

#### Defined in

context/ethers-app/EthersAppContext.tsx:106

___

### TGetEthersAppProviderLibrary

Ƭ **TGetEthersAppProviderLibrary**: (`provider`: [`TEthersProvider`](Models.md#tethersprovider) \| `ExternalProvider` \| `JsonRpcFetchFunc` \| `any`, `connector?`: `AbstractConnector`) => [`TEthersProvider`](Models.md#tethersprovider)

#### Type declaration

▸ (`provider`, `connector?`): [`TEthersProvider`](Models.md#tethersprovider)

##### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`TEthersProvider`](Models.md#tethersprovider) \| `ExternalProvider` \| `JsonRpcFetchFunc` \| `any` |
| `connector?` | `AbstractConnector` |

##### Returns

[`TEthersProvider`](Models.md#tethersprovider)

#### Defined in

context/ethers-app/EthersAppContext.tsx:126

___

### TEthersModalConnector

Ƭ **TEthersModalConnector**: [`ICommonModalConnector`](../interfaces/EthersAppContext.ICommonModalConnector.md) & `AbstractConnector`

#### Defined in

context/ethers-app/connectors/EthersModalConnector.ts:54

## EthersAppContext Variables

### BlockNumberContext

• `Const` **BlockNumberContext**: `FC`<`IBlockNumberContextProps`\>

#### Summary
A context that works with [useBlockNumberContext](EthersAppContext.md#useblocknumbercontext) to give access to the current provider's block number in any place in your app

**`param`**

**`returns`**

#### Defined in

context/ethers-app/BlockNumberContext.tsx:91

___

### EthersAppContext

• `Const` **EthersAppContext**: `FC`<[`TEthersAppContextProps`](EthersAppContext.md#tethersappcontextprops)\>

#### Summary
Ethers App Context for your react app to be used with [useEthersContext](EthersAppContext.md#useetherscontext).
This is a wrapper around Web3ReactProvider that provides additional functionality such as a [BlockNumberContext](EthersAppContext.md#blocknumbercontext) and access to [IEthersContext](../interfaces/Models.IEthersContext.md).  See [TEthersAppContextProps](EthersAppContext.md#tethersappcontextprops) for more information on props for alternate context roots.

**`param`** [TEthersAppContextProps](EthersAppContext.md#tethersappcontextprops)

**`returns`**

#### Defined in

context/ethers-app/EthersAppContext.tsx:170

___

## Misc Variables

### connectorErrorText

• `Const` **connectorErrorText**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `NoStaticJsonRPCProviderFoundError` | ``"Could not find a static json-rpc provider.  Is it running?"`` |
| `NoEthereumProviderFoundError` | ``"No web3 provider found"`` |
| `CouldNotActivateError` | ``"Could not activate the web3 provider"`` |
| `UserClosedModalError` | ``"Did not log in, the user did not select a web3 provider"`` |

#### Defined in

context/ethers-app/connectors/connectorErrors.ts:1

___

### contextQueryClient

• `Const` **contextQueryClient**: `QueryClient`

#### Defined in

context/ethers-app/queryClient.ts:3
