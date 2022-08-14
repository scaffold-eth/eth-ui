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

[src/context/ethers-app/connectors/EthersModalConnector.ts:45](https://github.com/scaffold-eth/eth-hooks/blob/d4c4958/packages/eth-hooks/src/context/ethers-app/connectors/EthersModalConnector.ts#L45)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Defined in

[src/context/ethers-app/connectors/EthersModalConnector.ts:46](https://github.com/scaffold-eth/eth-hooks/blob/d4c4958/packages/eth-hooks/src/context/ethers-app/connectors/EthersModalConnector.ts#L46)

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/context/ethers-app/connectors/EthersModalConnector.ts:48](https://github.com/scaffold-eth/eth-hooks/blob/d4c4958/packages/eth-hooks/src/context/ethers-app/connectors/EthersModalConnector.ts#L48)

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

[src/context/ethers-app/connectors/EthersModalConnector.ts:52](https://github.com/scaffold-eth/eth-hooks/blob/d4c4958/packages/eth-hooks/src/context/ethers-app/connectors/EthersModalConnector.ts#L52)

## Properties

### loadWeb3Modal

• **loadWeb3Modal**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/context/ethers-app/connectors/EthersModalConnector.ts:49](https://github.com/scaffold-eth/eth-hooks/blob/d4c4958/packages/eth-hooks/src/context/ethers-app/connectors/EthersModalConnector.ts#L49)

___

### getSigner

• **getSigner**: () => `undefined` \| `Signer`

#### Type declaration

▸ (): `undefined` \| `Signer`

##### Returns

`undefined` \| `Signer`

#### Defined in

[src/context/ethers-app/connectors/EthersModalConnector.ts:51](https://github.com/scaffold-eth/eth-hooks/blob/d4c4958/packages/eth-hooks/src/context/ethers-app/connectors/EthersModalConnector.ts#L51)
