---
id: "Helpers"
title: "Module: Helpers"
sidebar_label: "Helpers"
sidebar_position: 0
custom_edit_url: null
---

## Helpers

### lazier

▸ **lazier**<`T`\>(`importFactory`, `importName`): `LazyExoticComponent`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ComponentType`<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `importFactory` | () => `Promise`<{ `[name: string]`: `T`;  }\> |  |
| `importName` | `string` |  |

#### Returns

`LazyExoticComponent`<`T`\>

#### Defined in

[helpers/lazier.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/814ff62/packages/eth-hooks/src/helpers/lazier.ts#L18)
