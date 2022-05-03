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

[context/ethers-app/BlockNumberContext.tsx:64](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/BlockNumberContext.tsx#L64)

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

[context/ethers-app/EthersAppContext.tsx:37](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/EthersAppContext.tsx#L37)

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

[context/ethers-app/connectors/StaticJsonRpcProviderConnector.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/connectors/StaticJsonRpcProviderConnector.ts#L33)

## EthersAppContext Variables

### BlockNumberContext

• `Const` **BlockNumberContext**: `FC`<`IBlockNumberContextProps`\>

#### Summary
A context that works with [useBlockNumberContext](EthersAppContext.md#useblocknumbercontext) to give access to the current provider's block number in any place in your app

**`param`**

**`returns`**

#### Defined in

[context/ethers-app/BlockNumberContext.tsx:91](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/BlockNumberContext.tsx#L91)

___

### EthersAppContext

• `Const` **EthersAppContext**: `FC`<[`TEthersAppContextProps`](EthersAppContext.md#tethersappcontextprops)\>

#### Summary
Ethers App Context for your react app to be used with [useEthersContext](EthersAppContext.md#useetherscontext).
This is a wrapper around Web3ReactProvider that provides additional functionality such as a [BlockNumberContext](EthersAppContext.md#blocknumbercontext) and access to [IEthersContext](../interfaces/Models.IEthersContext.md).  See [TEthersAppContextProps](EthersAppContext.md#tethersappcontextprops) for more information on props for alternate context roots.

**`param`** [TEthersAppContextProps](EthersAppContext.md#tethersappcontextprops)

**`returns`**

#### Defined in

[context/ethers-app/EthersAppContext.tsx:170](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/EthersAppContext.tsx#L170)

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

[context/ethers-app/connectors/connectorErrors.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/connectors/connectorErrors.ts#L1)

___

### contextQueryClient

• `Const` **contextQueryClient**: `QueryClient`

#### Defined in

[context/ethers-app/queryClient.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/queryClient.ts#L3)

## Type aliases

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

[context/ethers-app/EthersAppContext.tsx:106](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/EthersAppContext.tsx#L106)

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

[context/ethers-app/EthersAppContext.tsx:126](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/EthersAppContext.tsx#L126)

___

### TEthersModalConnector

Ƭ **TEthersModalConnector**: [`ICommonModalConnector`](../interfaces/EthersAppContext.ICommonModalConnector.md) & `AbstractConnector`

#### Defined in

[context/ethers-app/connectors/EthersModalConnector.ts:54](https://github.com/scaffold-eth/eth-hooks/blob/fa0b589/src/context/ethers-app/connectors/EthersModalConnector.ts#L54)
