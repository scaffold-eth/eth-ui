[eth-hooks - v3.2.0beta09](../README.md) / [Exports](../modules.md) / IWeb3ModalState

# Interface: IWeb3ModalState

The current state of Web3Modal

## Table of contents

### Properties

- [initializing](IWeb3ModalState.md#initializing)

### Methods

- [openWeb3ModalCallback](IWeb3ModalState.md#openweb3modalcallback)
- [logoutOfWeb3ModalCallback](IWeb3ModalState.md#logoutofweb3modalcallback)
- [updateWeb3ModalThemeCallback](IWeb3ModalState.md#updateweb3modalthemecallback)

## Properties

### initializing

• **initializing**: `boolean`

Is the modal initalizing

#### Defined in

[src/useWeb3Modal.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useWeb3Modal.ts#L17)

## Methods

### openWeb3ModalCallback

▸ **openWeb3ModalCallback**(): `void`

A callback to open the modal

#### Returns

`void`

#### Defined in

[src/useWeb3Modal.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useWeb3Modal.ts#L21)

___

### logoutOfWeb3ModalCallback

▸ **logoutOfWeb3ModalCallback**(): `void`

A callback to close the modal

#### Returns

`void`

#### Defined in

[src/useWeb3Modal.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useWeb3Modal.ts#L25)

___

### updateWeb3ModalThemeCallback

▸ **updateWeb3ModalThemeCallback**(`theme`): `void`

A callback to change the modal theme

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | `string` \| `ThemeColors` |

#### Returns

`void`

#### Defined in

[src/useWeb3Modal.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/42de860/src/useWeb3Modal.ts#L29)
