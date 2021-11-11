[eth-hooks - v3.3.2](../README.md) / [EthersContext](../modules/EthersContext.md) / ICommonModalConnector

# Interface: ICommonModalConnector

[EthersContext](../modules/EthersContext.md).ICommonModalConnector

#### Summary
An interface implemented by [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md) in addition to AbstractConnector

## Implemented by

- [`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md)

## Table of contents

### Methods

- [getSigner](EthersContext.ICommonModalConnector.md#getsigner)
- [setModalTheme](EthersContext.ICommonModalConnector.md#setmodaltheme)
- [resetModal](EthersContext.ICommonModalConnector.md#resetmodal)
- [changeSigner](EthersContext.ICommonModalConnector.md#changesigner)

## Methods

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/9a487be/src/context/connectors/EthersModalConnector.ts#L25)

___

### setModalTheme

▸ **setModalTheme**(`theme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | `ThemeColors` \| `TWeb3ModalTheme` |

#### Returns

`void`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/9a487be/src/context/connectors/EthersModalConnector.ts#L26)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Defined in

[src/context/connectors/EthersModalConnector.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/9a487be/src/context/connectors/EthersModalConnector.ts#L27)

___

### changeSigner

▸ **changeSigner**(`signer`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/context/connectors/EthersModalConnector.ts:28](https://github.com/scaffold-eth/eth-hooks/blob/9a487be/src/context/connectors/EthersModalConnector.ts#L28)
