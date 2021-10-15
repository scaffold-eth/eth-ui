[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / [context](../modules/context.md) / UserClosedModalError

# Class: UserClosedModalError

[context](../modules/context.md).UserClosedModalError

## Hierarchy

- `Error`

  ↳ **`UserClosedModalError`**

## Table of contents

### Methods

- [captureStackTrace](context.UserClosedModalError.md#capturestacktrace)

### Properties

- [prepareStackTrace](context.UserClosedModalError.md#preparestacktrace)
- [stackTraceLimit](context.UserClosedModalError.md#stacktracelimit)
- [name](context.UserClosedModalError.md#name)
- [message](context.UserClosedModalError.md#message)
- [stack](context.UserClosedModalError.md#stack)

### Constructors

- [constructor](context.UserClosedModalError.md#constructor)

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

• **new UserClosedModalError**()

#### Overrides

Error.constructor

#### Defined in

[src/context/connectors/EthersModalConnector.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/context/connectors/EthersModalConnector.ts#L18)
