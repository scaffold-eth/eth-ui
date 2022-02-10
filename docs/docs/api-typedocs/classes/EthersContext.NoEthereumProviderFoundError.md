[eth-hooks - v4.0.29](../README.md) / [EthersContext](../modules/EthersContext.md) / NoEthereumProviderFoundError

# Class: NoEthereumProviderFoundError

[EthersContext](../modules/EthersContext.md).NoEthereumProviderFoundError

## Hierarchy

- `Error`

  ↳ **`NoEthereumProviderFoundError`**

## Table of contents

### Methods

- [captureStackTrace](EthersContext.NoEthereumProviderFoundError.md#capturestacktrace)

### Properties

- [prepareStackTrace](EthersContext.NoEthereumProviderFoundError.md#preparestacktrace)
- [stackTraceLimit](EthersContext.NoEthereumProviderFoundError.md#stacktracelimit)
- [name](EthersContext.NoEthereumProviderFoundError.md#name)
- [message](EthersContext.NoEthereumProviderFoundError.md#message)
- [stack](EthersContext.NoEthereumProviderFoundError.md#stack)

### Constructors

- [constructor](EthersContext.NoEthereumProviderFoundError.md#constructor)

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

## Constructors

### constructor

• **new NoEthereumProviderFoundError**()

#### Overrides

Error.constructor

#### Defined in

[src/context/ethers/connectors/connectorErrors.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/39e93b2/src/context/ethers/connectors/connectorErrors.ts#L27)
