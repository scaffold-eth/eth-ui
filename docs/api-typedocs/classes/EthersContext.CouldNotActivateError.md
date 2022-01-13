[eth-hooks - v4.0.8](../README.md) / [EthersContext](../modules/EthersContext.md) / CouldNotActivateError

# Class: CouldNotActivateError

[EthersContext](../modules/EthersContext.md).CouldNotActivateError

## Hierarchy

- `Error`

  ↳ **`CouldNotActivateError`**

## Table of contents

### Methods

- [captureStackTrace](EthersContext.CouldNotActivateError.md#capturestacktrace)

### Properties

- [prepareStackTrace](EthersContext.CouldNotActivateError.md#preparestacktrace)
- [stackTraceLimit](EthersContext.CouldNotActivateError.md#stacktracelimit)
- [name](EthersContext.CouldNotActivateError.md#name)
- [message](EthersContext.CouldNotActivateError.md#message)
- [stack](EthersContext.CouldNotActivateError.md#stack)

### Constructors

- [constructor](EthersContext.CouldNotActivateError.md#constructor)

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

• **new CouldNotActivateError**(`error`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `unknown` |

#### Overrides

Error.constructor

#### Defined in

[src/context/ethers/connectors/connectorErrors.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/7a28cdc/src/context/ethers/connectors/connectorErrors.ts#L16)
