[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / [context](../modules/context.md) / IEthersContext

# Interface: IEthersContext

[context](../modules/context.md).IEthersContext

## Hierarchy

- `Web3ReactContextInterface`<[`TEthersProvider`](../modules/models.md#tethersprovider)\>

  ↳ **`IEthersContext`**

## Table of contents

### Methods

- [activate](context.IEthersContext.md#activate)
- [setError](context.IEthersContext.md#seterror)
- [deactivate](context.IEthersContext.md#deactivate)
- [openModal](context.IEthersContext.md#openmodal)
- [disconnectModal](context.IEthersContext.md#disconnectmodal)

### Properties

- [library](context.IEthersContext.md#library)
- [chainId](context.IEthersContext.md#chainid)
- [error](context.IEthersContext.md#error)
- [connector](context.IEthersContext.md#connector)
- [ethersProvider](context.IEthersContext.md#ethersprovider)
- [active](context.IEthersContext.md#active)
- [signer](context.IEthersContext.md#signer)
- [account](context.IEthersContext.md#account)
- [changeAccount](context.IEthersContext.md#changeaccount)
- [setModalTheme](context.IEthersContext.md#setmodaltheme)

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
| `ethersModalConnector` | [`EthersModalConnector`](../classes/context.EthersModalConnector.md) |

#### Returns

`void`

#### Defined in

[src/context/EthersAppContext.tsx:22](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L22)

___

### disconnectModal

▸ **disconnectModal**(): `void`

#### Returns

`void`

#### Defined in

[src/context/EthersAppContext.tsx:23](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L23)

## Properties

### library

• `Optional` **library**: [`TEthersProvider`](../modules/models.md#tethersprovider)

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

• **connector**: `undefined` \| [`EthersModalConnector`](../classes/context.EthersModalConnector.md)

#### Overrides

Web3ReactContextInterface.connector

#### Defined in

[src/context/EthersAppContext.tsx:16](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L16)

___

### ethersProvider

• **ethersProvider**: `undefined` \| [`TEthersProvider`](../modules/models.md#tethersprovider)

#### Defined in

[src/context/EthersAppContext.tsx:17](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L17)

___

### active

• **active**: `boolean`

#### Overrides

Web3ReactContextInterface.active

#### Defined in

[src/context/EthersAppContext.tsx:18](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L18)

___

### signer

• **signer**: `undefined` \| `Signer`

#### Defined in

[src/context/EthersAppContext.tsx:19](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L19)

___

### account

• **account**: `undefined` \| `string`

#### Overrides

Web3ReactContextInterface.account

#### Defined in

[src/context/EthersAppContext.tsx:20](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L20)

___

### changeAccount

• **changeAccount**: `undefined` \| (`signer`: `Signer`) => `Promise`<`void`\>

#### Defined in

[src/context/EthersAppContext.tsx:21](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L21)

___

### setModalTheme

• **setModalTheme**: `undefined` \| (`theme`: ``"light"`` \| ``"dark"``) => `void`

#### Defined in

[src/context/EthersAppContext.tsx:24](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/context/EthersAppContext.tsx#L24)
