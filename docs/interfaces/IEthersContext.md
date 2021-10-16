[eth-hooks - v3.2.0beta09](../README.md) / [Exports](../modules.md) / IEthersContext

# Interface: IEthersContext

#### Summary
The return type of [EthersModalConnector](../classes/EthersModalConnector.md)
- ethers compatable provider [TEthersProvider](../modules.md#tethersprovider)
- a callback to change the current signer
- the current account, chainId and signer
- callbacks to open the web3Modal, logout or change theme

## Hierarchy

- `Web3ReactContextInterface`<[`TEthersProvider`](../modules.md#tethersprovider)\>

  ↳ **`IEthersContext`**

## Table of contents

### Methods

- [activate](IEthersContext.md#activate)
- [setError](IEthersContext.md#seterror)
- [deactivate](IEthersContext.md#deactivate)
- [openModal](IEthersContext.md#openmodal)
- [disconnectModal](IEthersContext.md#disconnectmodal)

### Properties

- [library](IEthersContext.md#library)
- [chainId](IEthersContext.md#chainid)
- [error](IEthersContext.md#error)
- [connector](IEthersContext.md#connector)
- [ethersProvider](IEthersContext.md#ethersprovider)
- [active](IEthersContext.md#active)
- [signer](IEthersContext.md#signer)
- [account](IEthersContext.md#account)
- [changeAccount](IEthersContext.md#changeaccount)
- [setModalTheme](IEthersContext.md#setmodaltheme)

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
| `ethersModalConnector` | [`EthersModalConnector`](../classes/EthersModalConnector.md) |

#### Returns

`void`

#### Defined in

[src/context/EthersAppContext.tsx:37](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L37)

___

### disconnectModal

▸ **disconnectModal**(): `void`

#### Returns

`void`

#### Defined in

[src/context/EthersAppContext.tsx:38](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L38)

## Properties

### library

• `Optional` **library**: [`TEthersProvider`](../modules.md#tethersprovider)

#### Inherited from

Web3ReactContextInterface.library

#### Defined in

node_modules/@web3-react/core/dist/types.d.ts:16

___

### chainId

• `Optional` **chainId**: `number`

#### Inherited from

Web3ReactContextInterface.chainId

#### Defined in

node_modules/@web3-react/core/dist/types.d.ts:17

___

### error

• `Optional` **error**: `Error`

#### Inherited from

Web3ReactContextInterface.error

#### Defined in

node_modules/@web3-react/core/dist/types.d.ts:20

___

### connector

• **connector**: `undefined` \| [`EthersModalConnector`](../classes/EthersModalConnector.md)

#### Overrides

Web3ReactContextInterface.connector

#### Defined in

[src/context/EthersAppContext.tsx:31](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L31)

___

### ethersProvider

• **ethersProvider**: `undefined` \| [`TEthersProvider`](../modules.md#tethersprovider)

#### Defined in

[src/context/EthersAppContext.tsx:32](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L32)

___

### active

• **active**: `boolean`

#### Overrides

Web3ReactContextInterface.active

#### Defined in

[src/context/EthersAppContext.tsx:33](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L33)

___

### signer

• **signer**: `undefined` \| `Signer`

#### Defined in

[src/context/EthersAppContext.tsx:34](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L34)

___

### account

• **account**: `undefined` \| `string`

#### Overrides

Web3ReactContextInterface.account

#### Defined in

[src/context/EthersAppContext.tsx:35](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L35)

___

### changeAccount

• **changeAccount**: `undefined` \| (`signer`: `Signer`) => `Promise`<`void`\>

#### Defined in

[src/context/EthersAppContext.tsx:36](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L36)

___

### setModalTheme

• **setModalTheme**: `undefined` \| (`theme`: ``"light"`` \| ``"dark"``) => `void`

#### Defined in

[src/context/EthersAppContext.tsx:39](https://github.com/scaffold-eth/eth-hooks/blob/0f2bb6e/src/context/EthersAppContext.tsx#L39)
