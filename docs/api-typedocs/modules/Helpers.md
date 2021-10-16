[eth-hooks - v3.2.0beta10](../README.md) / Helpers

# Module: Helpers

## Table of contents

### Helpers Functions

- [asyncSome](Helpers.md#asyncsome)
- [isEthersProvider](Helpers.md#isethersprovider)
- [parseProviderOrSigner](Helpers.md#parseproviderorsigner)
- [lazier](Helpers.md#lazier)

## Helpers Functions

### asyncSome

▸ `Const` **asyncSome**<`T`\>(`arr`, `predicate`): `Promise`<`undefined` \| `T`\>

#### Summary
js .some function that can be used with async predicates

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `predicate` | (`item`: `T`) => `Promise`<`boolean`\> |

#### Returns

`Promise`<`undefined` \| `T`\>

#### Defined in

[src/functions/asyncSome.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/be00c69/src/functions/asyncSome.ts#L11)

___

### isEthersProvider

▸ `Const` **isEthersProvider**(`providerBase`): `boolean`

#### Summary
Is it a ethers compatable provider

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerBase` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/functions/ethersHelpers.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/be00c69/src/functions/ethersHelpers.ts#L12)

___

### parseProviderOrSigner

▸ `Const` **parseProviderOrSigner**(`providerOrSigner`): `Promise`<[`TEthersUser`](Models.md#tethersuser)\>

#### Summary
Parse [TEthersProviderOrSigner](Models.md#tethersproviderorsigner) to [TEthersUser](Models.md#tethersuser)
Get the TEthersUser from a provider or signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](Models.md#tethersproviderorsigner) | TEthersProviderOrSigner |

#### Returns

`Promise`<[`TEthersUser`](Models.md#tethersuser)\>

TProviderAndSigner

#### Defined in

[src/functions/parseProviderOrSigner.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/be00c69/src/functions/parseProviderOrSigner.ts#L16)

___

### lazier

▸ `Const` **lazier**<`T`\>(`importFactory`, `importName`): `LazyExoticComponent`<`T`\>

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
| `importFactory` | () => `Promise`<`Object`\> | a callback that imports e.g. () => import('./exampleui/ExampleUI') |
| `importName` | `string` | the named export you want to import. |

#### Returns

`LazyExoticComponent`<`T`\>

#### Defined in

[src/helpers/lazier.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/be00c69/src/helpers/lazier.ts#L18)
