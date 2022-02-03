[eth-hooks - v4.0.27](../README.md) / [EthersContext](../modules/EthersContext.md) / UserClosedModalError

# Class: UserClosedModalError

[EthersContext](../modules/EthersContext.md).UserClosedModalError

## Hierarchy

- `Error`

  ↳ **`UserClosedModalError`**

## Table of contents

### Methods

- [captureStackTrace](EthersContext.UserClosedModalError.md#capturestacktrace)

### Properties

- [prepareStackTrace](EthersContext.UserClosedModalError.md#preparestacktrace)
- [stackTraceLimit](EthersContext.UserClosedModalError.md#stacktracelimit)
- [name](EthersContext.UserClosedModalError.md#name)
- [message](EthersContext.UserClosedModalError.md#message)
- [stack](EthersContext.UserClosedModalError.md#stack)

### Constructors

- [constructor](EthersContext.UserClosedModalError.md#constructor)

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

• **new UserClosedModalError**()

#### Overrides

Error.constructor

#### Defined in

[src/context/ethers/connectors/connectorErrors.ts:5](https://github.com/scaffold-eth/eth-hooks/blob/3bb312e/src/context/ethers/connectors/connectorErrors.ts#L5)
