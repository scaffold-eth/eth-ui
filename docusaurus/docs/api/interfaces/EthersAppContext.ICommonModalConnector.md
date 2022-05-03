---
id: "EthersAppContext.ICommonModalConnector"
title: "Interface: ICommonModalConnector"
sidebar_label: "ICommonModalConnector"
custom_edit_url: null
---

[EthersAppContext](../modules/EthersAppContext.md).ICommonModalConnector

#### Summary
An interface implemented by [EthersModalConnector](../classes/EthersAppContext.EthersModalConnector.md) in addition to AbstractConnector

## Implemented by

- [`EthersModalConnector`](../classes/EthersAppContext.EthersModalConnector.md)
- [`MockConnector`](../classes/TestUtils.MockConnector.md)

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

context/ethers-app/connectors/EthersModalConnector.ts:44

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Defined in

context/ethers-app/connectors/EthersModalConnector.ts:45

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Defined in

context/ethers-app/connectors/EthersModalConnector.ts:47

___

### loadWeb3Modal

▸ **loadWeb3Modal**(): `void`

#### Returns

`void`

#### Defined in

context/ethers-app/connectors/EthersModalConnector.ts:48

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Defined in

context/ethers-app/connectors/EthersModalConnector.ts:50

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

context/ethers-app/connectors/EthersModalConnector.ts:51
