[eth-hooks - v4.0.44](../README.md) / [EthersContext](../modules/EthersContext.md) / ICommonModalConnector

# Interface: ICommonModalConnector

[EthersContext](../modules/EthersContext.md).ICommonModalConnector

#### Summary
An interface implemented by [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md) in addition to AbstractConnector

## Implemented by

- [`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md)
- [`MockConnector`](../classes/TestUtils.MockConnector.md)

## Table of contents

### Methods

- [setModalTheme](EthersContext.ICommonModalConnector.md#setmodaltheme)
- [resetModal](EthersContext.ICommonModalConnector.md#resetmodal)
- [hasCachedProvider](EthersContext.ICommonModalConnector.md#hascachedprovider)
- [loadWeb3Modal](EthersContext.ICommonModalConnector.md#loadweb3modal)
- [getSigner](EthersContext.ICommonModalConnector.md#getsigner)
- [changeSigner](EthersContext.ICommonModalConnector.md#changesigner)

## Methods

### setModalTheme

▸ **setModalTheme**(`theme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | `TWeb3ModalTheme` \| `ThemeColors` |

#### Returns

`void`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L38)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L39)

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:41](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L41)

___

### loadWeb3Modal

▸ **loadWeb3Modal**(): `void`

#### Returns

`void`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L42)

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L44)

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

[context/ethers/connectors/EthersModalConnector.ts:45](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L45)
