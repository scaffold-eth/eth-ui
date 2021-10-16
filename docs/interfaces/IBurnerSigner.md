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

[src/useBurnerSigner.ts:55](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useBurnerSigner.ts#L55)

___

### account

• **account**: `undefined` \| `string`

#### Defined in

[src/useBurnerSigner.ts:56](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useBurnerSigner.ts#L56)

## Methods

### saveBurner

▸ **saveBurner**(): `void`

save to local storage

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:60](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useBurnerSigner.ts#L60)

___

### loadOrGenerateBurner

▸ **loadOrGenerateBurner**(): `void`

load from local storage, or if it doesn't exist, create

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:64](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useBurnerSigner.ts#L64)

___

### generateBurnerSigner

▸ **generateBurnerSigner**(): `void`

create a new burner signer

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:68](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useBurnerSigner.ts#L68)

___

### getBurnerPrivateKey

▸ **getBurnerPrivateKey**(): `undefined` \| `BytesLike`

get your current burner pk

#### Returns

`undefined` \| `BytesLike`

#### Defined in

[src/useBurnerSigner.ts:72](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useBurnerSigner.ts#L72)
