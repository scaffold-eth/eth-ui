[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / context

# Module: context

## Table of contents

### Functions

- [reducer](context.md#reducer)
- [useBlockNumberContext](context.md#useblocknumbercontext)
- [useEthersContext](context.md#useetherscontext)
- [ConnectToStaticJsonRpcProvider](context.md#connecttostaticjsonrpcprovider)

### Variables

- [BlockNumberContext](context.md#blocknumbercontext)
- [EthersAppContext](context.md#ethersappcontext)

### Type aliases

- [CreateEthersModalConnector](context.md#createethersmodalconnector)

### Interfaces

- [IEthersContext](../interfaces/context.IEthersContext.md)
- [IStaticJsonRpcProviderConnectorOptions](../interfaces/context.IStaticJsonRpcProviderConnectorOptions.md)

### Classes

- [UserClosedModalError](../classes/context.UserClosedModalError.md)
- [CouldNotActivateError](../classes/context.CouldNotActivateError.md)
- [EthersModalConnector](../classes/context.EthersModalConnector.md)

## Functions

### reducer

▸ `Const` **reducer**(`state?`, `payload`): `State`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `State` |
| `payload` | `Payload` |

#### Returns

`State`

#### Defined in

[src/context/BlockNumberContext.tsx:18](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/BlockNumberContext.tsx#L18)

___

### useBlockNumberContext

▸ `Const` **useBlockNumberContext**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[src/context/BlockNumberContext.tsx:29](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/BlockNumberContext.tsx#L29)

___

### useEthersContext

▸ `Const` **useEthersContext**(`providerKey?`): [`IEthersContext`](../interfaces/context.IEthersContext.md)

A wrapper around useWeb3React that provides functionality for web3modal
and eth-hooks compatability

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerKey?` | `string` | (string) :: (optional) :: used if you want a secondary provider context, for example to mainnet |

#### Returns

[`IEthersContext`](../interfaces/context.IEthersContext.md)

(IEthersWeb3Context)

#### Defined in

[src/context/EthersAppContext.tsx:33](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L33)

___

### ConnectToStaticJsonRpcProvider

▸ `Const` **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`StaticJsonRpcProvider`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_package` | `any` |
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](../interfaces/context.IStaticJsonRpcProviderConnectorOptions.md) |

#### Returns

`Promise`<`StaticJsonRpcProvider`\>

#### Defined in

[src/context/connectors/StaticJsonRpcProviderConnector.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/connectors/StaticJsonRpcProviderConnector.ts#L9)

## Variables

### BlockNumberContext

• **BlockNumberContext**: `FC`<`IProps`\>

#### Defined in

[src/context/BlockNumberContext.tsx:39](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/BlockNumberContext.tsx#L39)

___

### EthersAppContext

• **EthersAppContext**: `FC`

#### Defined in

[src/context/EthersAppContext.tsx:109](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L109)

## Type aliases

### CreateEthersModalConnector

Ƭ **CreateEthersModalConnector**: () => [`EthersModalConnector`](../classes/context.EthersModalConnector.md) \| `undefined`

#### Type declaration

▸ (): [`EthersModalConnector`](../classes/context.EthersModalConnector.md) \| `undefined`

##### Returns

[`EthersModalConnector`](../classes/context.EthersModalConnector.md) \| `undefined`

#### Defined in

[src/context/EthersAppContext.tsx:13](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L13)
