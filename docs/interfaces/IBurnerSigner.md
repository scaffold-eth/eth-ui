[eth-hooks - v3.2.0beta09](../README.md) / [Exports](../modules.md) / IBurnerSigner

# Interface: IBurnerSigner

#### Summary
Return type of useBurnerSigner:

#### Notes
- provides signer
- methods of interacting with burner signer
- methods to save and loadd signer from local storage

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

[src/useBurnerSigner.ts:57](https://github.com/scaffold-eth/eth-hooks/blob/93cb704/src/useBurnerSigner.ts#L57)

___

### account

• **account**: `undefined` \| `string`

#### Defined in

[src/useBurnerSigner.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/93cb704/src/useBurnerSigner.ts#L58)

## Methods

### saveBurner

▸ **saveBurner**(): `void`

save to local storage

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:62](https://github.com/scaffold-eth/eth-hooks/blob/93cb704/src/useBurnerSigner.ts#L62)

___

### loadOrGenerateBurner

▸ **loadOrGenerateBurner**(): `void`

load from local storage, or if it doesn't exist, create

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:66](https://github.com/scaffold-eth/eth-hooks/blob/93cb704/src/useBurnerSigner.ts#L66)

___

### generateBurnerSigner

▸ **generateBurnerSigner**(): `void`

create a new burner signer

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:70](https://github.com/scaffold-eth/eth-hooks/blob/93cb704/src/useBurnerSigner.ts#L70)

___

### getBurnerPrivateKey

▸ **getBurnerPrivateKey**(): `undefined` \| `BytesLike`

get your current burner pk

#### Returns

`undefined` \| `BytesLike`

#### Defined in

[src/useBurnerSigner.ts:74](https://github.com/scaffold-eth/eth-hooks/blob/93cb704/src/useBurnerSigner.ts#L74)
