[eth-hooks - v3.2.0beta10](../README.md) / [Modules](../modules.md) / [Hooks](../modules/Hooks.md) / IBurnerSigner

# Interface: IBurnerSigner

[Hooks](../modules/Hooks.md).IBurnerSigner

#### Summary
Return type of useBurnerSigner:

#### Notes
- provides signer
- methods of interacting with burner signer
- methods to save and loadd signer from local storage

## Table of contents

### Properties

- [signer](Hooks.IBurnerSigner.md#signer)
- [account](Hooks.IBurnerSigner.md#account)

### Methods

- [saveBurner](Hooks.IBurnerSigner.md#saveburner)
- [loadOrGenerateBurner](Hooks.IBurnerSigner.md#loadorgenerateburner)
- [generateBurnerSigner](Hooks.IBurnerSigner.md#generateburnersigner)
- [getBurnerPrivateKey](Hooks.IBurnerSigner.md#getburnerprivatekey)

## Properties

### signer

• **signer**: `undefined` \| `Signer`

#### Defined in

[src/useBurnerSigner.ts:57](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useBurnerSigner.ts#L57)

___

### account

• **account**: `undefined` \| `string`

#### Defined in

[src/useBurnerSigner.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useBurnerSigner.ts#L58)

## Methods

### saveBurner

▸ **saveBurner**(): `void`

save to local storage

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:62](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useBurnerSigner.ts#L62)

___

### loadOrGenerateBurner

▸ **loadOrGenerateBurner**(): `void`

load from local storage, or if it doesn't exist, create

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:66](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useBurnerSigner.ts#L66)

___

### generateBurnerSigner

▸ **generateBurnerSigner**(): `void`

create a new burner signer

#### Returns

`void`

#### Defined in

[src/useBurnerSigner.ts:70](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useBurnerSigner.ts#L70)

___

### getBurnerPrivateKey

▸ **getBurnerPrivateKey**(): `undefined` \| `BytesLike`

get your current burner pk

#### Returns

`undefined` \| `BytesLike`

#### Defined in

[src/useBurnerSigner.ts:74](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useBurnerSigner.ts#L74)
