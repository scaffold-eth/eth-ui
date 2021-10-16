[eth-hooks - v3.2.0beta10](../README.md) / [EthersContext](../modules/EthersContext.md) / IEthersContext

# Interface: IEthersContext

[EthersContext](../modules/EthersContext.md).IEthersContext

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

- [activate](EthersContext.IEthersContext.md#activate)
- [setError](EthersContext.IEthersContext.md#seterror)
- [deactivate](EthersContext.IEthersContext.md#deactivate)
- [openModal](EthersContext.IEthersContext.md#openmodal)
- [disconnectModal](EthersContext.IEthersContext.md#disconnectmodal)

### Properties

- [library](EthersContext.IEthersContext.md#library)
- [chainId](EthersContext.IEthersContext.md#chainid)
- [error](EthersContext.IEthersContext.md#error)
- [connector](EthersContext.IEthersContext.md#connector)
- [ethersProvider](EthersContext.IEthersContext.md#ethersprovider)
- [active](EthersContext.IEthersContext.md#active)
- [signer](EthersContext.IEthersContext.md#signer)
- [account](EthersContext.IEthersContext.md#account)
- [changeAccount](EthersContext.IEthersContext.md#changeaccount)
- [setModalTheme](EthersContext.IEthersContext.md#setmodaltheme)

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
| `ethersModalConnector` | [`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md) |

#### Returns

`void`

#### Defined in

[src/context/EthersAppContext.tsx:41](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L41)

___

### disconnectModal

▸ **disconnectModal**(): `void`

#### Returns

`void`

#### Defined in

[src/context/EthersAppContext.tsx:42](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L42)

## Properties

### library

• `Optional` **library**: [`TEthersProvider`](../modules/Models.md#tethersprovider)

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

• **connector**: `undefined` \| [`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md)

#### Overrides

Web3ReactContextInterface.connector

#### Defined in

[src/context/EthersAppContext.tsx:35](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L35)

___

### ethersProvider

• **ethersProvider**: `undefined` \| [`TEthersProvider`](../modules/Models.md#tethersprovider)

#### Defined in

[src/context/EthersAppContext.tsx:36](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L36)

___

### active

• **active**: `boolean`

#### Overrides

Web3ReactContextInterface.active

#### Defined in

[src/context/EthersAppContext.tsx:37](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L37)

___

### signer

• **signer**: `undefined` \| `Signer`

#### Defined in

[src/context/EthersAppContext.tsx:38](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L38)

___

### account

• **account**: `undefined` \| `string`

#### Overrides

Web3ReactContextInterface.account

#### Defined in

[src/context/EthersAppContext.tsx:39](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L39)

___

### changeAccount

• **changeAccount**: `undefined` \| (`signer`: `Signer`) => `Promise`<`void`\>

#### Defined in

[src/context/EthersAppContext.tsx:40](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L40)

___

### setModalTheme

• **setModalTheme**: `undefined` \| (`theme`: ``"light"`` \| ``"dark"``) => `void`

#### Defined in

[src/context/EthersAppContext.tsx:43](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L43)
