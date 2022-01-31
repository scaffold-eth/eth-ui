[eth-hooks - v4.0.25](../README.md) / [EthersContext](../modules/EthersContext.md) / ICommonModalConnector

# Interface: ICommonModalConnector

[EthersContext](../modules/EthersContext.md).ICommonModalConnector

#### Summary
An interface implemented by [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md) in addition to AbstractConnector

## Implemented by

- [`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md)
- [`MockConnector`](../classes/TestUtils.MockConnector.md)

## Table of contents

### Methods

- [getSigner](EthersContext.ICommonModalConnector.md#getsigner)
- [setModalTheme](EthersContext.ICommonModalConnector.md#setmodaltheme)
- [resetModal](EthersContext.ICommonModalConnector.md#resetmodal)
- [changeSigner](EthersContext.ICommonModalConnector.md#changesigner)
- [hasCachedProvider](EthersContext.ICommonModalConnector.md#hascachedprovider)

## Methods

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Defined in

[src/context/ethers/connectors/EthersModalConnector.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/context/ethers/connectors/EthersModalConnector.ts#L38)

___

### setModalTheme

▸ **setModalTheme**(`theme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | `TWeb3ModalTheme` \| `ThemeColors` |

#### Returns

`void`

#### Defined in

[src/context/ethers/connectors/EthersModalConnector.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/context/ethers/connectors/EthersModalConnector.ts#L39)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Defined in

[src/context/ethers/connectors/EthersModalConnector.ts:40](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/context/ethers/connectors/EthersModalConnector.ts#L40)

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

[src/context/ethers/connectors/EthersModalConnector.ts:41](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/context/ethers/connectors/EthersModalConnector.ts#L41)

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/context/ethers/connectors/EthersModalConnector.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/context/ethers/connectors/EthersModalConnector.ts#L42)
