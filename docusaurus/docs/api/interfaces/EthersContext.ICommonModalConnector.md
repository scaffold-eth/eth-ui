---
id: "EthersContext.ICommonModalConnector"
title: "Interface: ICommonModalConnector"
sidebar_label: "ICommonModalConnector"
custom_edit_url: null
---

[EthersContext](../modules/EthersContext.md).ICommonModalConnector

#### Summary
An interface implemented by [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md) in addition to AbstractConnector

## Implemented by

- [`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md)

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

[context/ethers/connectors/EthersModalConnector.ts:40](https://github.com/scaffold-eth/eth-hooks/blob/c81c0d1/src/context/ethers/connectors/EthersModalConnector.ts#L40)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:41](https://github.com/scaffold-eth/eth-hooks/blob/c81c0d1/src/context/ethers/connectors/EthersModalConnector.ts#L41)

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:43](https://github.com/scaffold-eth/eth-hooks/blob/c81c0d1/src/context/ethers/connectors/EthersModalConnector.ts#L43)

___

### loadWeb3Modal

▸ **loadWeb3Modal**(): `void`

#### Returns

`void`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/c81c0d1/src/context/ethers/connectors/EthersModalConnector.ts#L44)

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:46](https://github.com/scaffold-eth/eth-hooks/blob/c81c0d1/src/context/ethers/connectors/EthersModalConnector.ts#L46)

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

[context/ethers/connectors/EthersModalConnector.ts:47](https://github.com/scaffold-eth/eth-hooks/blob/c81c0d1/src/context/ethers/connectors/EthersModalConnector.ts#L47)
