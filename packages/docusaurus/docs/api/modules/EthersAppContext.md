---
id: "EthersAppContext"
title: "Module: EthersAppContext"
sidebar_label: "EthersAppContext"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md)
- [IStaticJsonRpcProviderConnectorOptions](../interfaces/EthersAppContext.IStaticJsonRpcProviderConnectorOptions.md)

## Classes

- [EthersModalConnector](../classes/EthersAppContext.EthersModalConnector.md)
- [UserClosedModalError](../classes/EthersAppContext.UserClosedModalError.md)
- [CouldNotActivateError](../classes/EthersAppContext.CouldNotActivateError.md)
- [NoEthereumProviderFoundError](../classes/EthersAppContext.NoEthereumProviderFoundError.md)
- [NoStaticJsonRPCProviderFoundError](../classes/EthersAppContext.NoStaticJsonRPCProviderFoundError.md)

## EthersAppContext

### useEthersAppContext

▸ **useEthersAppContext**(`contextKey?`): [`IEthersContext`](../interfaces/Models.IEthersContext.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextKey?` | `string` |

#### Returns

[`IEthersContext`](../interfaces/Models.IEthersContext.md)

#### Defined in

[context/ethers-app/EthersAppContext.tsx:35](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/EthersAppContext.tsx#L35)

___

### EthersAppContext

• `Const` **EthersAppContext**: `FC`<[`TEthersAppContextProps`](EthersAppContext.md#tethersappcontextprops)\>

#### Defined in

[context/ethers-app/EthersAppContext.tsx:180](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/EthersAppContext.tsx#L180)

___

### ConnectToStaticJsonRpcProvider

▸ **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`undefined` \| `StaticJsonRpcProvider`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_package` | `unknown` |  |
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](../interfaces/EthersAppContext.IStaticJsonRpcProviderConnectorOptions.md) |  |

#### Returns

`Promise`<`undefined` \| `StaticJsonRpcProvider`\>

#### Defined in

[context/ethers-app/connectors/StaticJsonRpcProviderConnector.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/connectors/StaticJsonRpcProviderConnector.ts#L33)

___

### useBlockNumberContext

▸ **useBlockNumberContext**(`chainId?`, `override?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId?` | `number` |
| `override?` | [`TOverride`](Models.md#toverride) |

#### Returns

`number`

#### Defined in

[context/ethers-app/useBlockNumberContext.tsx:27](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/useBlockNumberContext.tsx#L27)

## Misc

### useEthersContext

▸ **useEthersContext**(`contextKey?`): [`IEthersContext`](../interfaces/Models.IEthersContext.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextKey?` | `string` |

#### Returns

[`IEthersContext`](../interfaces/Models.IEthersContext.md)

#### Defined in

[context/ethers-app/EthersAppContext.tsx:104](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/EthersAppContext.tsx#L104)

___

### TEthersAppContextProps

Ƭ **TEthersAppContextProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `children?` | `React.ReactNode` | - |
| `secondaryWeb3ReactRoot?` | { `contextKey`: `string` ; `web3ReactRoot`: `JSX.Element`  } |  |
| `secondaryWeb3ReactRoot.contextKey` | `string` | - |
| `secondaryWeb3ReactRoot.web3ReactRoot` | `JSX.Element` | - |
| `disableDefaultQueryClientRoot?` | `boolean` |  |
| `customGetEthersAppProviderLibrary?` | [`TGetEthersAppProviderLibrary`](EthersAppContext.md#tgetethersappproviderlibrary) |  |

#### Defined in

[context/ethers-app/EthersAppContext.tsx:116](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/EthersAppContext.tsx#L116)

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

[context/ethers-app/EthersAppContext.tsx:136](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/EthersAppContext.tsx#L136)

___

### TEthersModalConnector

Ƭ **TEthersModalConnector**: [`ICommonModalConnector`](../interfaces/EthersAppContext.ICommonModalConnector.md) & `AbstractConnector`

#### Defined in

[context/ethers-app/connectors/EthersModalConnector.ts:55](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/connectors/EthersModalConnector.ts#L55)

___

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

[context/ethers-app/connectors/connectorErrors.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/connectors/connectorErrors.ts#L1)

___

### defaultQueryClient

• `Const` **defaultQueryClient**: `QueryClient`

#### Defined in

[context/ethers-app/queryClient.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/context/ethers-app/queryClient.ts#L3)
