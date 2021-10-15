[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / functions

# Module: functions

## Table of contents

### Functions

- [asyncSome](functions.md#asyncsome)
- [isEthersProvider](functions.md#isethersprovider)
- [parseProviderOrSigner](functions.md#parseproviderorsigner)

## Functions

### asyncSome

▸ `Const` **asyncSome**<`T`\>(`arr`, `predicate`): `Promise`<`undefined` \| `T`\>

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

[src/functions/asyncSome.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/functions/asyncSome.ts#L1)

___

### isEthersProvider

▸ `Const` **isEthersProvider**(`providerBase`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerBase` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/functions/ethersHelpers.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/functions/ethersHelpers.ts#L3)

___

### parseProviderOrSigner

▸ `Const` **parseProviderOrSigner**(`providerOrSigner`): `Promise`<[`TEthersUser`](models.md#tethersuser)\>

Parse TEthersProviderOrSigner to TProviderAndSigner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](models.md#tethersproviderorsigner) | TEthersProviderOrSigner |

#### Returns

`Promise`<[`TEthersUser`](models.md#tethersuser)\>

TProviderAndSigner

#### Defined in

[src/functions/parseProviderOrSigner.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/functions/parseProviderOrSigner.ts#L11)
