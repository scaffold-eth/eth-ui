[eth-hooks - v4.0.44](../README.md) / [Models](../modules/Models.md) / IEthersContext

# Interface: IEthersContext

[Models](../modules/Models.md).IEthersContext

#### Summary
The return type of [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md)
- ethers compatable provider [TEthersProvider](../modules/Models.md#tethersprovider)
- a callback to change the current signer
- the current account, chainId and signer
- callbacks to open the web3Modal, logout or change theme

## Hierarchy

- `Web3ReactContextInterface`<[`TEthersProvider`](../modules/Models.md#tethersprovider)\>

  ↳ **`IEthersContext`**

## Table of contents

### Properties

- [connector](Models.IEthersContext.md#connector)
- [provider](Models.IEthersContext.md#provider)
- [active](Models.IEthersContext.md#active)
- [signer](Models.IEthersContext.md#signer)
- [account](Models.IEthersContext.md#account)
- [chainId](Models.IEthersContext.md#chainid)
- [changeSigner](Models.IEthersContext.md#changesigner)
- [setModalTheme](Models.IEthersContext.md#setmodaltheme)

### Methods

- [openModal](Models.IEthersContext.md#openmodal)
- [disconnectModal](Models.IEthersContext.md#disconnectmodal)

## Properties

### connector

• **connector**: `undefined` \| [`TEthersModalConnector`](../modules/EthersContext.md#tethersmodalconnector)

#### Overrides

Web3ReactContextInterface.connector

#### Defined in

[models/ethersAppContextTypes.ts:30](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L30)

___

### provider

• **provider**: `undefined` \| [`TEthersProvider`](../modules/Models.md#tethersprovider)

#### Defined in

[models/ethersAppContextTypes.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L31)

___

### active

• **active**: `boolean`

#### Overrides

Web3ReactContextInterface.active

#### Defined in

[models/ethersAppContextTypes.ts:32](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L32)

___

### signer

• **signer**: `undefined` \| [`TEthersSigner`](../modules/Models.md#tetherssigner)

#### Defined in

[models/ethersAppContextTypes.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L33)

___

### account

• **account**: `undefined` \| `string`

#### Overrides

Web3ReactContextInterface.account

#### Defined in

[models/ethersAppContextTypes.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L34)

___

### chainId

• **chainId**: `undefined` \| `number`

#### Overrides

Web3ReactContextInterface.chainId

#### Defined in

[models/ethersAppContextTypes.ts:35](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L35)

___

### changeSigner

• **changeSigner**: `undefined` \| (`signer`: `Signer`) => `Promise`<`void`\>

#### Defined in

[models/ethersAppContextTypes.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L36)

___

### setModalTheme

• **setModalTheme**: `undefined` \| (`theme`: ``"light"`` \| ``"dark"``) => `void`

#### Defined in

[models/ethersAppContextTypes.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L39)

## Methods

### openModal

▸ **openModal**(`ethersModalConnector`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethersModalConnector` | [`TEthersModalConnector`](../modules/EthersContext.md#tethersmodalconnector) |

#### Returns

`void`

#### Defined in

[models/ethersAppContextTypes.ts:37](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L37)

___

### disconnectModal

▸ **disconnectModal**(): `void`

#### Returns

`void`

#### Defined in

[models/ethersAppContextTypes.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/models/ethersAppContextTypes.ts#L38)
