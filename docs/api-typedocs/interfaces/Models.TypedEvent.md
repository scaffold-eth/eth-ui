[eth-hooks - v3.3.2](../README.md) / [Models](../modules/Models.md) / TypedEvent

# Interface: TypedEvent<EventArgs\>

[Models](../modules/Models.md).TypedEvent

## Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgs` | extends `Result` |

## Hierarchy

- `Event`

  ↳ **`TypedEvent`**

## Table of contents

### Properties

- [event](Models.TypedEvent.md#event)
- [eventSignature](Models.TypedEvent.md#eventsignature)
- [decodeError](Models.TypedEvent.md#decodeerror)
- [blockNumber](Models.TypedEvent.md#blocknumber)
- [blockHash](Models.TypedEvent.md#blockhash)
- [transactionIndex](Models.TypedEvent.md#transactionindex)
- [removed](Models.TypedEvent.md#removed)
- [address](Models.TypedEvent.md#address)
- [data](Models.TypedEvent.md#data)
- [topics](Models.TypedEvent.md#topics)
- [transactionHash](Models.TypedEvent.md#transactionhash)
- [logIndex](Models.TypedEvent.md#logindex)
- [args](Models.TypedEvent.md#args)

### Methods

- [decode](Models.TypedEvent.md#decode)
- [removeListener](Models.TypedEvent.md#removelistener)
- [getBlock](Models.TypedEvent.md#getblock)
- [getTransaction](Models.TypedEvent.md#gettransaction)
- [getTransactionReceipt](Models.TypedEvent.md#gettransactionreceipt)

## Properties

### event

• `Optional` **event**: `string`

#### Inherited from

Event.event

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:43

___

### eventSignature

• `Optional` **eventSignature**: `string`

#### Inherited from

Event.eventSignature

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:44

___

### decodeError

• `Optional` **decodeError**: `Error`

#### Inherited from

Event.decodeError

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:46

___

### blockNumber

• **blockNumber**: `number`

#### Inherited from

Event.blockNumber

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:52

___

### blockHash

• **blockHash**: `string`

#### Inherited from

Event.blockHash

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:53

___

### transactionIndex

• **transactionIndex**: `number`

#### Inherited from

Event.transactionIndex

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:54

___

### removed

• **removed**: `boolean`

#### Inherited from

Event.removed

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:55

___

### address

• **address**: `string`

#### Inherited from

Event.address

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:56

___

### data

• **data**: `string`

#### Inherited from

Event.data

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:57

___

### topics

• **topics**: `string`[]

#### Inherited from

Event.topics

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:58

___

### transactionHash

• **transactionHash**: `string`

#### Inherited from

Event.transactionHash

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:59

___

### logIndex

• **logIndex**: `number`

#### Inherited from

Event.logIndex

#### Defined in

node_modules/@ethersproject/contracts/node_modules/@ethersproject/abstract-provider/lib/index.d.ts:60

___

### args

• **args**: `EventArgs`

#### Overrides

Event.args

#### Defined in

[src/models/providerTypes.ts:66](https://github.com/scaffold-eth/eth-hooks/blob/9a487be/src/models/providerTypes.ts#L66)

## Methods

### decode

▸ `Optional` **decode**(`data`, `topics?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `topics?` | `string`[] |

#### Returns

`any`

#### Inherited from

Event.decode

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:47

___

### removeListener

▸ **removeListener**(): `void`

#### Returns

`void`

#### Inherited from

Event.removeListener

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:48

___

### getBlock

▸ **getBlock**(): `Promise`<`Block`\>

#### Returns

`Promise`<`Block`\>

#### Inherited from

Event.getBlock

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:49

___

### getTransaction

▸ **getTransaction**(): `Promise`<`TransactionResponse`\>

#### Returns

`Promise`<`TransactionResponse`\>

#### Inherited from

Event.getTransaction

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:50

___

### getTransactionReceipt

▸ **getTransactionReceipt**(): `Promise`<`TransactionReceipt`\>

#### Returns

`Promise`<`TransactionReceipt`\>

#### Inherited from

Event.getTransactionReceipt

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:51
