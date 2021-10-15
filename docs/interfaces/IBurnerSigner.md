[eth-hooks - v3.2.0beta09](../README.md) / [Exports](../modules.md) / IBurnerSigner

# Interface: IBurnerSigner

Return of useBurnerSigner:
- provides signer
- methods of interacting with burner signer
- methods to save and laod signer from local storage

## Table of contents

### Properties

- [signer](IBurnerSigner.md#signer)
- [account](IBurnerSigner.md#account)

### Methods

- [saveBurner](IBurnerSigner.md#saveburner)
- [loadOrGenerateBurner](IBurnerSigner.md#loadorgenerateburner)
- [generateBurnerSigner](IBurnerSigner.md#generateburnersigner)
- [getBurnerPrivateKey](IBurnerSigner.md#getburnerprivatekey)

## Properties

### signer

• **signer**: `undefined` \| `Signer`

#### Defined in

[src/useBurnerSigner.ts:52](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBurnerSigner.ts#L52)

___

### account

• **account**: `undefined` \| `string`

#### Defined in

[src/useBurnerSigner.ts:53](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBurnerSigner.ts#L53)

## Methods

### saveBurner

▸ **saveBurner**(): `void`

save to local storage

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:57](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBurnerSigner.ts#L57)

___

### loadOrGenerateBurner

▸ **loadOrGenerateBurner**(): `void`

load from local storage, or if it doesn't exist, create

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:61](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBurnerSigner.ts#L61)

___

### generateBurnerSigner

▸ **generateBurnerSigner**(): `void`

create a new burner signer

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:65](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBurnerSigner.ts#L65)

___

### getBurnerPrivateKey

▸ **getBurnerPrivateKey**(): `undefined` \| `BytesLike`

get your current burner pk

#### Returns

`undefined` \| `BytesLike`

#### Defined in

[src/useBurnerSigner.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBurnerSigner.ts#L69)
