[eth-hooks - v3.2.0beta09](../README.md) / [Exports](../modules.md) / CouldNotActivateError

# Class: CouldNotActivateError

## Hierarchy

- `Error`

  ↳ **`CouldNotActivateError`**

## Table of contents

### Methods

- [captureStackTrace](CouldNotActivateError.md#capturestacktrace)

### Properties

- [prepareStackTrace](CouldNotActivateError.md#preparestacktrace)
- [stackTraceLimit](CouldNotActivateError.md#stacktracelimit)
- [name](CouldNotActivateError.md#name)
- [message](CouldNotActivateError.md#message)
- [stack](CouldNotActivateError.md#stack)

### Constructors

- [constructor](CouldNotActivateError.md#constructor)

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

node_modules/typescript/lib/lib.es5.d.ts:973

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

## Constructors

### constructor

• **new CouldNotActivateError**(`error`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Overrides

Error.constructor

#### Defined in

[src/context/connectors/EthersModalConnector.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/context/connectors/EthersModalConnector.ts#L26)
