[eth-hooks - v3.2.0beta10](../README.md) / [Modules](../modules.md) / [Hooks](../modules/Hooks.md) / IWeb3ModalState

# Interface: IWeb3ModalState

[Hooks](../modules/Hooks.md).IWeb3ModalState

The current state of Web3Modal

## Table of contents

### Properties

- [initializing](Hooks.IWeb3ModalState.md#initializing)

### Methods

- [openWeb3ModalCallback](Hooks.IWeb3ModalState.md#openweb3modalcallback)
- [logoutOfWeb3ModalCallback](Hooks.IWeb3ModalState.md#logoutofweb3modalcallback)
- [updateWeb3ModalThemeCallback](Hooks.IWeb3ModalState.md#updateweb3modalthemecallback)

## Properties

### initializing

• **initializing**: `boolean`

Is the modal initalizing

#### Defined in

[src/useWeb3Modal.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useWeb3Modal.ts#L19)

## Methods

### openWeb3ModalCallback

▸ **openWeb3ModalCallback**(): `void`

A callback to open the modal

#### Returns

`void`

#### Defined in

[src/useWeb3Modal.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useWeb3Modal.ts#L23)

___

### logoutOfWeb3ModalCallback

▸ **logoutOfWeb3ModalCallback**(): `void`

A callback to close the modal

#### Returns

`void`

#### Defined in

[src/useWeb3Modal.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useWeb3Modal.ts#L27)

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

[src/useWeb3Modal.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/323e316/src/useWeb3Modal.ts#L31)
