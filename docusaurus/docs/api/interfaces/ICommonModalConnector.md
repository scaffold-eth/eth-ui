---
id: "ICommonModalConnector"
title: "Interface: ICommonModalConnector"
sidebar_label: "ICommonModalConnector"
sidebar_position: 0
custom_edit_url: null
---

#### Summary
An interface implemented by [EthersModalConnector](../classes/EthersModalConnector.md) in addition to AbstractConnector

## Implemented by

- [`EthersModalConnector`](../classes/EthersModalConnector.md)
- [`MockConnector`](../classes/MockConnector.md)

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

[context/ethers-app/connectors/EthersModalConnector.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/context/ethers-app/connectors/EthersModalConnector.ts#L44)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Defined in

[context/ethers-app/connectors/EthersModalConnector.ts:45](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/context/ethers-app/connectors/EthersModalConnector.ts#L45)

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Defined in

[context/ethers-app/connectors/EthersModalConnector.ts:47](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/context/ethers-app/connectors/EthersModalConnector.ts#L47)

___

### loadWeb3Modal

▸ **loadWeb3Modal**(): `void`

#### Returns

`void`

#### Defined in

[context/ethers-app/connectors/EthersModalConnector.ts:48](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/context/ethers-app/connectors/EthersModalConnector.ts#L48)

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Defined in

[context/ethers-app/connectors/EthersModalConnector.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/context/ethers-app/connectors/EthersModalConnector.ts#L50)

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

[context/ethers-app/connectors/EthersModalConnector.ts:51](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/context/ethers-app/connectors/EthersModalConnector.ts#L51)
