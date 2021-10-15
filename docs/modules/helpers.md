[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / helpers

# Module: helpers

## Table of contents

### Functions

- [lazier](helpers.md#lazier)

## Functions

### lazier

▸ `Const` **lazier**<`T`\>(`importFactory`, `importName`): `LazyExoticComponent`<`T`\>

modified react lazy to allow for named exports
e.g. export const ExampleUI = lazier(() => import('./exampleui/ExampleUI'), 'ExampleUI');

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ComponentType`<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `importFactory` | () => `Promise`<`Object`\> | a callback that imports e.g. () => import('./exampleui/ExampleUI') |
| `importName` | `string` | the named export you want to import. |

#### Returns

`LazyExoticComponent`<`T`\>

#### Defined in

[src/helpers/lazier.ts:10](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/helpers/lazier.ts#L10)
