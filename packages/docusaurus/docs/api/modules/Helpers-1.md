---
id: "Helpers-1"
title: "Module: Helpers"
sidebar_label: "Helpers"
sidebar_position: 0
custom_edit_url: null
---

Pure functions and helpers with useful functionality

## Helpers

### lazier

▸ **lazier**<`T`\>(`importFactory`, `importName`): `LazyExoticComponent`<`T`\>

### Summary
A function that modifies react lazy to allow for named exports

### Example
```typescript
const ExampleUI = lazier(() => import('./exampleui/ExampleUI'), 'ExampleUI');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ComponentType`<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `importFactory` | () => `Promise`<{ `[name: string]`: `T`;  }\> | a callback that imports e.g. () => import('./exampleui/ExampleUI') |
| `importName` | `string` | the named export you want to import. |

#### Returns

`LazyExoticComponent`<`T`\>

#### Defined in

[src/helpers/lazier.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/5901efa/packages/eth-hooks/src/helpers/lazier.ts#L18)
