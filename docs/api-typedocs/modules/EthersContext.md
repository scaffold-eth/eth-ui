[eth-hooks - v4.0.27](../README.md) / EthersContext

# Module: EthersContext

A context for your react app with [useEthersContext](EthersContext.md#useetherscontext) that provides you access to [IEthersContext](../interfaces/Models.IEthersContext.md).  It gives you access to consistent interface to get the current provider [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md).  Additionally integration with web3Modal gives you an easy way to guide your user with their web3 journey.

## Table of contents

### EthersContext Functions

- [useBlockNumberContext](EthersContext.md#useblocknumbercontext)
- [useEthersContext](EthersContext.md#useetherscontext)
- [ConnectToStaticJsonRpcProvider](EthersContext.md#connecttostaticjsonrpcprovider)

### Misc Functions

- [createConnectorForHardhatContract](EthersContext.md#createconnectorforhardhatcontract)
- [createConnectorForExternalContract](EthersContext.md#createconnectorforexternalcontract)
- [createConnectorForExternalAbi](EthersContext.md#createconnectorforexternalabi)
- [contractsContextFactory](EthersContext.md#contractscontextfactory)

### Type aliases

- [TContractsContextProps](EthersContext.md#tcontractscontextprops)
- [TContractsContextActions](EthersContext.md#tcontractscontextactions)
- [TEthersAppContextProps](EthersContext.md#tethersappcontextprops)
- [TGetEthersAppProviderLibrary](EthersContext.md#tgetethersappproviderlibrary)
- [TEthersModalConnector](EthersContext.md#tethersmodalconnector)

### EthersContext Variables

- [BlockNumberContext](EthersContext.md#blocknumbercontext)
- [EthersAppContext](EthersContext.md#ethersappcontext)

### Misc Variables

- [contextQueryClient](EthersContext.md#contextqueryclient)

### EthersContext Interfaces

- [IStaticJsonRpcProviderConnectorOptions](../interfaces/EthersContext.IStaticJsonRpcProviderConnectorOptions.md)

### Misc Interfaces

- [ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md)

### EthersContext Classes

- [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md)
- [UserClosedModalError](../classes/EthersContext.UserClosedModalError.md)
- [CouldNotActivateError](../classes/EthersContext.CouldNotActivateError.md)
- [NoEthereumProviderFoundError](../classes/EthersContext.NoEthereumProviderFoundError.md)

## EthersContext Functions

### useBlockNumberContext

▸ `Const` **useBlockNumberContext**(): `number`

#### Summary
A hook that gets you the current blocknumber via react context
- can be shared by your whole app.

##### ❔Use
Make sure to wrap your main app with the [EthersAppContext](EthersContext.md#ethersappcontext).
- See [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/components/routes/App.tsx#L38)

##### ✏️ Notes
- this extensively used by eth-hooks to trigger hooks when a new block arrives
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersContext.md#useetherscontext)

#### Returns

`number`

current block number

#### Defined in

[src/context/ethers/BlockNumberContext.tsx:64](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/BlockNumberContext.tsx#L64)

___

### useEthersContext

▸ `Const` **useEthersContext**(`contextKey?`): [`IEthersContext`](../interfaces/Models.IEthersContext.md)

#### Summary
This Hook provides you with access to the current Ethers Provider Context.
This provider would be the one selected by using [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md) and Web3Modal

##### ✨ Features
Gives you access to consistent interface to get the current provider information [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md)
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

[src/context/ethers/EthersAppContext.tsx:37](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/EthersAppContext.tsx#L37)

___

### ConnectToStaticJsonRpcProvider

▸ `Const` **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`undefined` \| `StaticJsonRpcProvider`\>

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
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](../interfaces/EthersContext.IStaticJsonRpcProviderConnectorOptions.md) |  |

#### Returns

`Promise`<`undefined` \| `StaticJsonRpcProvider`\>

#### Defined in

[src/context/ethers/connectors/StaticJsonRpcProviderConnector.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/connectors/StaticJsonRpcProviderConnector.ts#L31)

___

## Misc Functions

### createConnectorForHardhatContract

▸ `Const` **createConnectorForHardhatContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedHardhatContractJson`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GBaseContract` | extends `BaseContract`<`GBaseContract`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `GContractNames` |
| `typechainFactory` | `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: readonly `Record`<`string`, `any`\>[]  }\> |
| `deployedHardhatContractJson` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson) |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Defined in

[src/context/app-contracts/contractConnectors.ts:57](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/app-contracts/contractConnectors.ts#L57)

___

### createConnectorForExternalContract

▸ `Const` **createConnectorForExternalContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedContractJson`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GBaseContract` | extends `BaseContract`<`GBaseContract`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `GContractNames` |
| `typechainFactory` | `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: readonly `Record`<`string`, `any`\>[]  }\> |
| `deployedContractJson` | [`TExternalContractsAddressMap`](Models.md#texternalcontractsaddressmap) |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Defined in

[src/context/app-contracts/contractConnectors.ts:81](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/app-contracts/contractConnectors.ts#L81)

___

### createConnectorForExternalAbi

▸ `Const` **createConnectorForExternalAbi**<`GContractNames`\>(`contractName`, `config`, `abi`): `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `GContractNames` |
| `config` | [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) |
| `abi` | `Record`<`string`, `any`\>[] |

#### Returns

`Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: readonly `Record`<`string`, `any`\>[]  }\>\>

#### Defined in

[src/context/app-contracts/contractConnectors.ts:105](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/app-contracts/contractConnectors.ts#L105)

___

### contractsContextFactory

▸ `Const` **contractsContextFactory**<`GContractNames`, `GAppConnectorList`, `GContractsTypes`\>(`loadAppContractConnectors`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GAppConnectorList` | extends [`TConnectorList`](Models.md#tconnectorlist)<`GContractNames`, [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\>\> |
| `GContractsTypes` | extends `BaseContract`<`GContractsTypes`\> & { `contractName`: `GContractNames`  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `loadAppContractConnectors` | () => `undefined` \| `GAppConnectorList` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ContractsAppContext` | `FC`<`PropsWithChildren`<[`TContractsContextProps`](EthersContext.md#tcontractscontextprops)\>\> |
| `useAppContractsActions` | () => `undefined` \| [`TContractsContextActions`](EthersContext.md#tcontractscontextactions)<`GContractNames`, `GAppConnectorList`\> |
| `useAppContracts` | <GContractName\>(`contractName`: `GContractName`, `chainId`: `undefined` \| `number`) => `undefined` \| [`TTypedContract`](Models.md#ttypedcontract)<`GContractName`, `GAppConnectorList`\> |
| `useLoadAppContracts` | () => `void` |
| `useConnectAppContracts` | (`adaptor`: `undefined` \| [`TEthersAdaptor`](Models.md#tethersadaptor)) => `void` |

#### Defined in

[src/context/app-contracts/contractsContextFactory.tsx:96](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/app-contracts/contractsContextFactory.tsx#L96)

## Type aliases

### TContractsContextProps

Ƭ **TContractsContextProps**: `Object`

Props for the ContractContext generated by the contractContextFactory

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ethersContextKey?` | `string` |

#### Defined in

[src/context/app-contracts/contractsContextFactory.tsx:37](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/app-contracts/contractsContextFactory.tsx#L37)

___

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

[src/context/app-contracts/contractsContextFactory.tsx:76](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/app-contracts/contractsContextFactory.tsx#L76)

___

### TEthersAppContextProps

Ƭ **TEthersAppContextProps**: `Object`

#### Summary
Props for context

##### Notes
- allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root.
- allows you to use your own QueryClientProvider

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `secondaryWeb3ReactRoot?` | `Object` | Props for context that allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root. |
| `secondaryWeb3ReactRoot.contextKey` | `string` | - |
| `secondaryWeb3ReactRoot.web3ReactRoot` | `JSX.Element` | - |
| `disableQueryClientRoot?` | `boolean` | disables the local queryClientRoot and QueryClientProvider for react-query and allows you to use your own |
| `customGetEthersAppProviderLibrary?` | [`TGetEthersAppProviderLibrary`](EthersContext.md#tgetethersappproviderlibrary) | if you want to pass in your own provider. Make sure it is compatable with ethers.js, see [TGetEthersAppProviderLibrary](EthersContext.md#tgetethersappproviderlibrary) for details |

#### Defined in

[src/context/ethers/EthersAppContext.tsx:101](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/EthersAppContext.tsx#L101)

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

[src/context/ethers/EthersAppContext.tsx:120](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/EthersAppContext.tsx#L120)

___

### TEthersModalConnector

Ƭ **TEthersModalConnector**: [`ICommonModalConnector`](../interfaces/EthersContext.ICommonModalConnector.md) & `AbstractConnector`

#### Defined in

[src/context/ethers/connectors/EthersModalConnector.ts:45](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/connectors/EthersModalConnector.ts#L45)

## EthersContext Variables

### BlockNumberContext

• **BlockNumberContext**: `FC`<`IProps`\>

#### Summary
A context that works with [useBlockNumberContext](EthersContext.md#useblocknumbercontext) to give access to the current provider's block number in any place in your app

**`param`**

**`returns`**

#### Defined in

[src/context/ethers/BlockNumberContext.tsx:86](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/BlockNumberContext.tsx#L86)

___

### EthersAppContext

• **EthersAppContext**: `FC`<[`TEthersAppContextProps`](EthersContext.md#tethersappcontextprops)\>

#### Summary
Ethers App Context for your react app to be used with [useEthersContext](EthersContext.md#useetherscontext).
This is a wrapper around Web3ReactProvider that provides additional functionality such as a [BlockNumberContext](EthersContext.md#blocknumbercontext) and access to [IEthersContext](../interfaces/Models.IEthersContext.md).  See [TEthersAppContextProps](EthersContext.md#tethersappcontextprops) for more information on props for alternate context roots.

**`param`** [TEthersAppContextProps](EthersContext.md#tethersappcontextprops)

**`returns`**

#### Defined in

[src/context/ethers/EthersAppContext.tsx:164](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/EthersAppContext.tsx#L164)

___

## Misc Variables

### contextQueryClient

• **contextQueryClient**: `QueryClient`

#### Defined in

[src/context/ethers/queryClient.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/queryClient.ts#L3)
