---
id: "Models.IEthersContext"
title: "Interface: IEthersContext"
sidebar_label: "IEthersContext"
custom_edit_url: null
---

[Models](../modules/Models.md).IEthersContext

## Hierarchy

- `Web3ReactContextInterface`<[`TEthersProvider`](../modules/Models.md#tethersprovider)\>

  ↳ **`IEthersContext`**

## Properties

### connector

• **connector**: `undefined` \| [`TEthersModalConnector`](../modules/EthersAppContext.md#tethersmodalconnector)

#### Overrides

Web3ReactContextInterface.connector

#### Defined in

models/ethersAppContextTypes.ts:30

___

### provider

• **provider**: `undefined` \| [`TEthersProvider`](../modules/Models.md#tethersprovider)

#### Defined in

models/ethersAppContextTypes.ts:31

___

### active

• **active**: `boolean`

#### Overrides

Web3ReactContextInterface.active

#### Defined in

models/ethersAppContextTypes.ts:32

___

### signer

• **signer**: `undefined` \| [`TEthersSigner`](../modules/Models.md#tetherssigner)

#### Defined in

models/ethersAppContextTypes.ts:33

___

### account

• **account**: `undefined` \| `string`

#### Overrides

Web3ReactContextInterface.account

#### Defined in

models/ethersAppContextTypes.ts:34

___

### chainId

• **chainId**: `undefined` \| `number`

#### Overrides

Web3ReactContextInterface.chainId

#### Defined in

models/ethersAppContextTypes.ts:35

___

### changeSigner

• **changeSigner**: `undefined` \| (`signer`: `Signer`) => `Promise`<`void`\>

#### Defined in

models/ethersAppContextTypes.ts:36

___

### setModalTheme

• **setModalTheme**: `undefined` \| (`theme`: ``"light"`` \| ``"dark"``) => `void`

#### Defined in

models/ethersAppContextTypes.ts:42

## Methods

### openModal

▸ **openModal**(`ethersModalConnector`, `onError?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethersModalConnector` | [`TEthersModalConnector`](../modules/EthersAppContext.md#tethersmodalconnector) |
| `onError?` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Defined in

models/ethersAppContextTypes.ts:40

___

### disconnectModal

▸ **disconnectModal**(`onSuccess?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onSuccess?` | () => `void` |

#### Returns

`void`

#### Defined in

models/ethersAppContextTypes.ts:41
