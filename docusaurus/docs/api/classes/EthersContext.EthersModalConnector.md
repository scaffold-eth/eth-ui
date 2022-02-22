[eth-hooks - v4.0.44](../README.md) / [EthersContext](../modules/EthersContext.md) / EthersModalConnector

# Class: EthersModalConnector

[EthersContext](../modules/EthersContext.md).EthersModalConnector

#### Summary
This is a connector for [web3-react](https://github.com/NoahZinsmeister/web3-react) that allows it to interface with [web3Modal](https://github.com/Web3Modal/web3modal).
The provider selected by user via web3modal is interfaced to the web3-react context.

##### ✨ Features
- This connector used with [useEthersContext](../modules/EthersContext.md#useetherscontext) allows the app and all the hooks to effortlessly access the current network, provider, signer, address information [IEthersContext](../interfaces/Models.IEthersContext.md)
- The connector centralizes and takes care of management of the web3 interaction and provides a consistent exprience for your app.

##### ✏️ Notes
- inherits from web3-react class AbstractConnector

## Hierarchy

- `AbstractConnector`

  ↳ **`EthersModalConnector`**

## Implements

- [`ICommonModalConnector`](../interfaces/EthersContext.ICommonModalConnector.md)

## Table of contents

### Constructors

- [constructor](EthersContext.EthersModalConnector.md#constructor)

### Properties

- [\_options](EthersContext.EthersModalConnector.md#_options)
- [\_providerBase](EthersContext.EthersModalConnector.md#_providerbase)
- [\_ethersProvider](EthersContext.EthersModalConnector.md#_ethersprovider)
- [\_web3Modal](EthersContext.EthersModalConnector.md#_web3modal)
- [\_id](EthersContext.EthersModalConnector.md#_id)
- [\_debug](EthersContext.EthersModalConnector.md#_debug)
- [\_config](EthersContext.EthersModalConnector.md#_config)
- [\_signer](EthersContext.EthersModalConnector.md#_signer)
- [\_theme](EthersContext.EthersModalConnector.md#_theme)

### Accessors

- [config](EthersContext.EthersModalConnector.md#config)

### Methods

- [hasCachedProvider](EthersContext.EthersModalConnector.md#hascachedprovider)
- [log](EthersContext.EthersModalConnector.md#log)
- [loadWeb3Modal](EthersContext.EthersModalConnector.md#loadweb3modal)
- [activate](EthersContext.EthersModalConnector.md#activate)
- [deactivate](EthersContext.EthersModalConnector.md#deactivate)
- [getProvider](EthersContext.EthersModalConnector.md#getprovider)
- [getChainId](EthersContext.EthersModalConnector.md#getchainid)
- [getAccount](EthersContext.EthersModalConnector.md#getaccount)
- [getSigner](EthersContext.EthersModalConnector.md#getsigner)
- [getSignerFromAccount](EthersContext.EthersModalConnector.md#getsignerfromaccount)
- [changeSigner](EthersContext.EthersModalConnector.md#changesigner)
- [validState](EthersContext.EthersModalConnector.md#validstate)
- [resetModal](EthersContext.EthersModalConnector.md#resetmodal)
- [setModalTheme](EthersContext.EthersModalConnector.md#setmodaltheme)

## Constructors

### constructor

• **new EthersModalConnector**(`web3modalOptions`, `config?`, `id?`, `debug?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `web3modalOptions` | `Partial`<`ICoreOptions`\> | `undefined` | see [web3modal docs](https://github.com/Web3Modal/web3modal#provider-options) for details.  You can also check the [scaffold-eth-typescript web3config](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/config/web3ModalConfig.ts) for an example. |
| `config` | `TEthersModalConfig` | `undefined` | Configuration for EthersModalConnector |
| `id?` | `string` | `undefined` | allows you to connect directly to a specific provider.  [See docs](https://github.com/Web3Modal/web3modal#connect-to-specific-provider) |
| `debug` | `boolean` | `false` | turn on debug logging |

#### Overrides

AbstractConnector.constructor

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:89](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L89)

## Properties

### \_options

• `Protected` **\_options**: `Partial`<`ICoreOptions`\>

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:65](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L65)

___

### \_providerBase

• `Protected` `Optional` **\_providerBase**: `any`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:66](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L66)

___

### \_ethersProvider

• `Protected` `Optional` **\_ethersProvider**: [`TEthersProvider`](../modules/Models.md#tethersprovider)

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:67](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L67)

___

### \_web3Modal

• `Protected` `Optional` **\_web3Modal**: `Core`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:68](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L68)

___

### \_id

• `Protected` **\_id**: `undefined` \| `string`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L69)

___

### \_debug

• `Protected` **\_debug**: `boolean` = `false`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:70](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L70)

___

### \_config

• `Protected` **\_config**: `Readonly`<`TEthersModalConfig`\>

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:71](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L71)

___

### \_signer

• `Protected` **\_signer**: `undefined` \| `Signer`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:72](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L72)

___

### \_theme

• `Protected` **\_theme**: `TWeb3ModalTheme` \| `ThemeColors`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:73](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L73)

## Accessors

### config

• `get` **config**(): `Readonly`<`TEthersModalConfig`\>

#### Returns

`Readonly`<`TEthersModalConfig`\>

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:75](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L75)

## Methods

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[hasCachedProvider](../interfaces/EthersContext.ICommonModalConnector.md#hascachedprovider)

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:79](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L79)

___

### log

▸ `Protected` **log**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:109](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L109)

___

### loadWeb3Modal

▸ **loadWeb3Modal**(): `void`

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[loadWeb3Modal](../interfaces/EthersContext.ICommonModalConnector.md#loadweb3modal)

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:158](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L158)

___

### activate

▸ **activate**(): `Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Summary
Inherits from AbstractConnector.  This activates web3Modal and opens the modal.

##### ✏️ Notes
Once the user selects a provider
- this will activate the provider and attach the appropriate event listeners.
- get the account and signer
- gets the ethers compatable provider

##### ⚠️ Errors
- [UserClosedModalError](EthersContext.UserClosedModalError.md)
- [CouldNotActivateError](EthersContext.CouldNotActivateError.md)

#### Returns

`Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Overrides

AbstractConnector.activate

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:179](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L179)

___

### deactivate

▸ **deactivate**(): `void`

#### Summary
Safely deactivates the current provider and removes all event listeners

#### Returns

`void`

#### Overrides

AbstractConnector.deactivate

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:237](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L237)

___

### getProvider

▸ **getProvider**(): `Promise`<`undefined` \| [`TEthersProvider`](../modules/Models.md#tethersprovider)\>

#### Returns

`Promise`<`undefined` \| [`TEthersProvider`](../modules/Models.md#tethersprovider)\>

#### Overrides

AbstractConnector.getProvider

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:257](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L257)

___

### getChainId

▸ **getChainId**(): `Promise`<`string` \| `number`\>

#### Returns

`Promise`<`string` \| `number`\>

#### Overrides

AbstractConnector.getChainId

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:261](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L261)

___

### getAccount

▸ **getAccount**(): `Promise`<``null`` \| `string`\>

#### Returns

`Promise`<``null`` \| `string`\>

#### Overrides

AbstractConnector.getAccount

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:271](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L271)

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[getSigner](../interfaces/EthersContext.ICommonModalConnector.md#getsigner)

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:283](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L283)

___

### getSignerFromAccount

▸ **getSignerFromAccount**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:287](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L287)

___

### changeSigner

▸ **changeSigner**(`signer`): `Promise`<`void`\>

#### Summary
Change the current signer and account used by the connector

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[changeSigner](../interfaces/EthersContext.ICommonModalConnector.md#changesigner)

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:298](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L298)

___

### validState

▸ `Protected` **validState**(): `boolean`

#### Returns

`boolean`

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:309](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L309)

___

### resetModal

▸ **resetModal**(): `void`

#### Summary
Resets the web3Modal and clears the cache

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[resetModal](../interfaces/EthersContext.ICommonModalConnector.md#resetmodal)

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:317](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L317)

___

### setModalTheme

▸ **setModalTheme**(`theme`): `void`

#### Summary
Sets the web3modal theme: light | dark | ThemeColors

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | `TWeb3ModalTheme` \| `ThemeColors` |

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[setModalTheme](../interfaces/EthersContext.ICommonModalConnector.md#setmodaltheme)

#### Defined in

[context/ethers/connectors/EthersModalConnector.ts:332](https://github.com/scaffold-eth/eth-hooks/blob/f2e005f/src/context/ethers/connectors/EthersModalConnector.ts#L332)
