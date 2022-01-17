[eth-hooks - v4.0.14](../README.md) / EthersContext

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
- See [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/0225179a2a8bb7b3a255d6eff4802b47d72809dd/packages/vite-app-ts/src/components/routes/App.tsx#L38)

##### ✏️ Notes
- this extensively used by eth-hooks to trigger hooks when a new block arrives
- uses the current provider {@link ethersProvider} from [useEthersContext](EthersContext.md#useetherscontext)

#### Returns

`number`

current block number

#### Defined in

[src/context/ethers/BlockNumberContext.tsx:64](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/ethers/BlockNumberContext.tsx#L64)

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

[src/context/ethers/EthersAppContext.tsx:37](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/ethers/EthersAppContext.tsx#L37)

___

### ConnectToStaticJsonRpcProvider

▸ `Const` **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`undefined` \| `StaticJsonRpcProvider`\>

#### Summary
A connector that can be used by apps to connect to a StaticJsonRpcProvider
- For example you can use this to connect to a localhost provider

##### ✏️ Notes
See scaffold-eth-typescript for an example that uses it to connect to a localhost burner wallet.
- [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/0225179a2a8bb7b3a255d6eff4802b47d72809dd/packages/vite-app-ts/src/config/web3ModalConfig.ts#L86)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_package` | `unknown` | not used |
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](../interfaces/EthersContext.IStaticJsonRpcProviderConnectorOptions.md) |  |

#### Returns

`Promise`<`undefined` \| `StaticJsonRpcProvider`\>

#### Defined in

[src/context/ethers/connectors/StaticJsonRpcProviderConnector.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/ethers/connectors/StaticJsonRpcProviderConnector.ts#L31)

___

## Misc Functions

### createConnectorForHardhatContract

▸ `Const` **createConnectorForHardhatContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedHardhatContractJson`): [`TContractConnector`](Models.md#tcontractconnector)<`GContractNames`, `GBaseContract`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GBaseContract` | extends `BaseContract`<`GBaseContract`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `GContractNames` |
| `typechainFactory` | [`TConnectorConnectorBase`](Models.md#tconnectorconnectorbase)<`GBaseContract`\> |
| `deployedHardhatContractJson` | [`TDeployedHardhatContractsJson`](Models.md#tdeployedhardhatcontractsjson) |

#### Returns

[`TContractConnector`](Models.md#tcontractconnector)<`GContractNames`, `GBaseContract`\>

#### Defined in

[src/context/app-contracts/contractConnectors.ts:43](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/app-contracts/contractConnectors.ts#L43)

___

### createConnectorForExternalContract

▸ `Const` **createConnectorForExternalContract**<`GContractNames`, `GBaseContract`\>(`contractName`, `typechainFactory`, `deployedContractJson`): [`TContractConnector`](Models.md#tcontractconnector)<`GContractNames`, `GBaseContract`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GBaseContract` | extends `BaseContract`<`GBaseContract`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `GContractNames` |
| `typechainFactory` | [`TConnectorConnectorBase`](Models.md#tconnectorconnectorbase)<`GBaseContract`\> |
| `deployedContractJson` | [`TExternalContractsAddressMap`](Models.md#texternalcontractsaddressmap) |

#### Returns

[`TContractConnector`](Models.md#tcontractconnector)<`GContractNames`, `GBaseContract`\>

#### Defined in

[src/context/app-contracts/contractConnectors.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/app-contracts/contractConnectors.ts#L69)

___

### createConnectorForExternalAbi

▸ `Const` **createConnectorForExternalAbi**<`GContractNames`\>(`contractName`, `config`, `abi`): [`TContractConnector`](Models.md#tcontractconnector)<`GContractNames`, `BaseContract`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `GContractNames` |
| `config` | `Object` |
| `abi` | `Record`<`string`, `any`\>[] |

#### Returns

[`TContractConnector`](Models.md#tcontractconnector)<`GContractNames`, `BaseContract`\>

#### Defined in

[src/context/app-contracts/contractConnectors.ts:95](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/app-contracts/contractConnectors.ts#L95)

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

[src/context/app-contracts/contractsContextFactory.tsx:89](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/app-contracts/contractsContextFactory.tsx#L89)

## Type aliases

### TContractsContextProps

Ƭ **TContractsContextProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ethersContextKey?` | `string` |

#### Defined in

[src/context/app-contracts/contractsContextFactory.tsx:30](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/app-contracts/contractsContextFactory.tsx#L30)

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

[src/context/app-contracts/contractsContextFactory.tsx:69](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/app-contracts/contractsContextFactory.tsx#L69)

___

### TEthersAppContextProps

Ƭ **TEthersAppContextProps**: `Object`

#### Summary
Props for context that allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `secondaryWeb3ReactRoot?` | `Object` |
| `secondaryWeb3ReactRoot.contextKey` | `string` |
| `secondaryWeb3ReactRoot.web3ReactRoot` | `JSX.Element` |
| `disableQueryClientRoot?` | `boolean` |

#### Defined in

[src/context/ethers/EthersAppContext.tsx:97](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/ethers/EthersAppContext.tsx#L97)

___

### TEthersModalConnector

Ƭ **TEthersModalConnector**: [`ICommonModalConnector`](../interfaces/EthersContext.ICommonModalConnector.md) & `AbstractConnector`

#### Defined in

[src/context/ethers/connectors/EthersModalConnector.ts:45](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/ethers/connectors/EthersModalConnector.ts#L45)

## EthersContext Variables

### BlockNumberContext

• **BlockNumberContext**: `FC`<`IProps`\>

#### Summary
A context that works with [useBlockNumberContext](EthersContext.md#useblocknumbercontext) to give access to the current provider's block number in any place in your app

**`param`**

**`returns`**

#### Defined in

[src/context/ethers/BlockNumberContext.tsx:86](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/ethers/BlockNumberContext.tsx#L86)

___

### EthersAppContext

• **EthersAppContext**: `FC`<[`TEthersAppContextProps`](EthersContext.md#tethersappcontextprops)\>

#### Summary
Ethers App Context for your react app to be used with [useEthersContext](EthersContext.md#useetherscontext).
This is a wrapper around Web3ReactProvider that provides additional functionality such as a [BlockNumberContext](EthersContext.md#blocknumbercontext) and access to [IEthersContext](../interfaces/Models.IEthersContext.md).  See [TEthersAppContextProps](EthersContext.md#tethersappcontextprops) for more information on props for alternate context roots.

**`param`**

**`returns`**

#### Defined in

[src/context/ethers/EthersAppContext.tsx:144](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/ethers/EthersAppContext.tsx#L144)

___

## Misc Variables

### contextQueryClient

• **contextQueryClient**: `QueryClient`

#### Defined in

[src/context/ethers/queryClient.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/9f227f7/src/context/ethers/queryClient.ts#L3)
