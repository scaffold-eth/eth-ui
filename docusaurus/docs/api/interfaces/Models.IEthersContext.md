---
id: 'Models.IEthersContext'
title: 'Interface: IEthersContext'
sidebar_label: 'IEthersContext'
custom_edit_url: null
---

[Models](../modules/Models.md).IEthersContext

#### Summary

The return type of [EthersModalConnector](../classes/EthersAppContext.EthersModalConnector.md)

- ethers compatable provider [TEthersProvider](../modules/Models.md#tethersprovider)
- a callback to change the current signer
- the current account, chainId and signer
- callbacks to open the web3Modal, logout or change theme

## Hierarchy

- `Web3ReactContextInterface`<[`TEthersProvider`](../modules/Models.md#tethersprovider)\>

  ↳ **`IEthersContext`**

## Properties

### connector

• **connector**: `undefined` \| [`TEthersModalConnector`](../modules/EthersAppContext.md#tethersmodalconnector)

#### Overrides

Web3ReactContextInterface.connector

#### Defined in

[models/ethersAppContextTypes.ts:30](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L30)

---

### provider

• **provider**: `undefined` \| [`TEthersProvider`](../modules/Models.md#tethersprovider)

#### Defined in

[models/ethersAppContextTypes.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L31)

---

### active

• **active**: `boolean`

#### Overrides

Web3ReactContextInterface.active

#### Defined in

[models/ethersAppContextTypes.ts:32](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L32)

---

### signer

• **signer**: `undefined` \| [`TEthersSigner`](../modules/Models.md#tetherssigner)

#### Defined in

[models/ethersAppContextTypes.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L33)

---

### account

• **account**: `undefined` \| `string`

#### Overrides

Web3ReactContextInterface.account

#### Defined in

[models/ethersAppContextTypes.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L34)

---

### chainId

• **chainId**: `undefined` \| `number`

#### Overrides

Web3ReactContextInterface.chainId

#### Defined in

[models/ethersAppContextTypes.ts:35](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L35)

---

### changeSigner

• **changeSigner**: `undefined` \| (`signer`: `Signer`) => `Promise`<`void`\>

#### Defined in

[models/ethersAppContextTypes.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L36)

---

### setModalTheme

• **setModalTheme**: `undefined` \| (`theme`: `"light"` \| `"dark"`) => `void`

#### Defined in

[models/ethersAppContextTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L42)

## Methods

### openModal

▸ **openModal**(`ethersModalConnector`, `onError?`): `void`

Open web3 modal for login

#### Parameters

| Name                   | Type                                                                            |
| :--------------------- | :------------------------------------------------------------------------------ |
| `ethersModalConnector` | [`TEthersModalConnector`](../modules/EthersAppContext.md#tethersmodalconnector) |
| `onError?`             | (`error`: `Error`) => `void`                                                    |

#### Returns

`void`

#### Defined in

[models/ethersAppContextTypes.ts:40](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L40)

---

### disconnectModal

▸ **disconnectModal**(`onSuccess?`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `onSuccess?` | () => `void` |

#### Returns

`void`

#### Defined in

[models/ethersAppContextTypes.ts:41](https://github.com/scaffold-eth/eth-hooks/blob/4b1029e/src/models/ethersAppContextTypes.ts#L41)
