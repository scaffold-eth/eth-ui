[eth-hooks - v4.0.8](../README.md) / [Models](../modules/Models.md) / IEthersContext

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

### Methods

- [activate](Models.IEthersContext.md#activate)
- [setError](Models.IEthersContext.md#seterror)
- [deactivate](Models.IEthersContext.md#deactivate)
- [openModal](Models.IEthersContext.md#openmodal)
- [disconnectModal](Models.IEthersContext.md#disconnectmodal)

### Properties

- [library](Models.IEthersContext.md#library)
- [error](Models.IEthersContext.md#error)
- [connector](Models.IEthersContext.md#connector)
- [provider](Models.IEthersContext.md#provider)
- [active](Models.IEthersContext.md#active)
- [signer](Models.IEthersContext.md#signer)
- [account](Models.IEthersContext.md#account)
- [chainId](Models.IEthersContext.md#chainid)
- [changeSigner](Models.IEthersContext.md#changesigner)
- [setModalTheme](Models.IEthersContext.md#setmodaltheme)

## Methods

### activate

▸ **activate**(`connector`, `onError?`, `throwErrors?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connector` | `AbstractConnector` |
| `onError?` | (`error`: `Error`) => `void` |
| `throwErrors?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Inherited from

Web3ReactContextInterface.activate

#### Defined in

node_modules/@web3-react/core/dist/types.d.ts:3

___

### setError

▸ **setError**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`void`

#### Inherited from

Web3ReactContextInterface.setError

#### Defined in

node_modules/@web3-react/core/dist/types.d.ts:4

___

### deactivate

▸ **deactivate**(): `void`

#### Returns

`void`

#### Inherited from

Web3ReactContextInterface.deactivate

#### Defined in

node_modules/@web3-react/core/dist/types.d.ts:5

___

### openModal

▸ **openModal**(`ethersModalConnector`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethersModalConnector` | [`TEthersModalConnector`](../modules/EthersContext.md#tethersmodalconnector) |

#### Returns

`void`

#### Defined in

[src/models/ethersAppContextTypes.ts:37](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L37)

___

### disconnectModal

▸ **disconnectModal**(): `void`

#### Returns

`void`

#### Defined in

[src/models/ethersAppContextTypes.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L38)

## Properties

### library

• `Optional` **library**: [`TEthersProvider`](../modules/Models.md#tethersprovider)

#### Inherited from

Web3ReactContextInterface.library

#### Defined in

node_modules/@web3-react/core/dist/types.d.ts:16

___

### error

• `Optional` **error**: `Error`

#### Inherited from

Web3ReactContextInterface.error

#### Defined in

node_modules/@web3-react/core/dist/types.d.ts:20

___

### connector

• **connector**: `undefined` \| [`TEthersModalConnector`](../modules/EthersContext.md#tethersmodalconnector)

#### Overrides

Web3ReactContextInterface.connector

#### Defined in

[src/models/ethersAppContextTypes.ts:30](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L30)

___

### provider

• **provider**: `undefined` \| [`TEthersProvider`](../modules/Models.md#tethersprovider)

#### Defined in

[src/models/ethersAppContextTypes.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L31)

___

### active

• **active**: `boolean`

#### Overrides

Web3ReactContextInterface.active

#### Defined in

[src/models/ethersAppContextTypes.ts:32](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L32)

___

### signer

• **signer**: `undefined` \| [`TEthersSigner`](../modules/Models.md#tetherssigner)

#### Defined in

[src/models/ethersAppContextTypes.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L33)

___

### account

• **account**: `undefined` \| `string`

#### Overrides

Web3ReactContextInterface.account

#### Defined in

[src/models/ethersAppContextTypes.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L34)

___

### chainId

• **chainId**: `undefined` \| `number`

#### Overrides

Web3ReactContextInterface.chainId

#### Defined in

[src/models/ethersAppContextTypes.ts:35](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L35)

___

### changeSigner

• **changeSigner**: `undefined` \| (`signer`: `Signer`) => `Promise`<`void`\>

#### Defined in

[src/models/ethersAppContextTypes.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L36)

___

### setModalTheme

• **setModalTheme**: `undefined` \| (`theme`: ``"light"`` \| ``"dark"``) => `void`

#### Defined in

[src/models/ethersAppContextTypes.ts:39](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L39)
