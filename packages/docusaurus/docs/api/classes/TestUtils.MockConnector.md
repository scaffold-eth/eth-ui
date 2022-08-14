---
id: "TestUtils.MockConnector"
title: "Class: MockConnector"
sidebar_label: "MockConnector"
custom_edit_url: null
---

[TestUtils](../modules/TestUtils.md).MockConnector

## Hierarchy

- `AbstractConnector`

  ↳ **`MockConnector`**

## Implements

- [`ICommonModalConnector`](../interfaces/EthersAppContext.ICommonModalConnector.md)

## Properties

### provider

• `Protected` **provider**: `MockProvider`

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:14

___

### mockChainId

• `Protected` **mockChainId**: `number`

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:15

___

### mockSigner

• `Protected` **mockSigner**: `undefined` \| `Signer`

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:17

___

### mockAccount

• `Protected` **mockAccount**: `undefined` \| `string`

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:18

___

### spyResetModal

• **spyResetModal**: `SinonStub`<[], `void`\>

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:20

___

### spySetModalTheme

• **spySetModalTheme**: `SinonStub`<[\_theme: "light" \| "dark" \| ThemeColors], `void`\>

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:21

___

### spyChangeSigner

• **spyChangeSigner**: `SinonStub`<[\_signer: Signer], `Promise`<`void`\>\>

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:22

___

### spyActivate

• **spyActivate**: `SinonStub`<`any`[], `any`\>

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:23

___

### spyDeactivate

• **spyDeactivate**: `SinonStub`<`any`[], `any`\>

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:24

## Constructors

### constructor

• **new MockConnector**(`provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `MockProvider` |

#### Overrides

AbstractConnector.constructor

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:26

## Methods

### loadWeb3Modal

▸ **loadWeb3Modal**(): `void`

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[loadWeb3Modal](../interfaces/EthersAppContext.ICommonModalConnector.md#loadweb3modal)

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:33

___

### replaceWithSpies

▸ **replaceWithSpies**(): `void`

#### Returns

`void`

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:38

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[hasCachedProvider](../interfaces/EthersAppContext.ICommonModalConnector.md#hascachedprovider)

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:44

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[getSigner](../interfaces/EthersAppContext.ICommonModalConnector.md#getsigner)

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:48

___

### setModalTheme

▸ **setModalTheme**(`_theme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_theme` | ``"light"`` \| ``"dark"`` \| `ThemeColors` |

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[setModalTheme](../interfaces/EthersAppContext.ICommonModalConnector.md#setmodaltheme)

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:51

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[resetModal](../interfaces/EthersAppContext.ICommonModalConnector.md#resetmodal)

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:54

___

### changeSigner

▸ **changeSigner**(`_signer`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signer` | `Signer` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[changeSigner](../interfaces/EthersAppContext.ICommonModalConnector.md#changesigner)

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:58

___

### activate

▸ **activate**(): `Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Returns

`Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Overrides

AbstractConnector.activate

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:66

___

### getProvider

▸ **getProvider**(): `Promise`<[`TEthersProvider`](../modules/Models.md#tethersprovider) \| `MockProvider`\>

#### Returns

`Promise`<[`TEthersProvider`](../modules/Models.md#tethersprovider) \| `MockProvider`\>

#### Overrides

AbstractConnector.getProvider

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:74

___

### getChainId

▸ **getChainId**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Overrides

AbstractConnector.getChainId

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:78

___

### getAccount

▸ **getAccount**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Overrides

AbstractConnector.getAccount

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:82

___

### setMockAccount

▸ **setMockAccount**(`hardhatAccountIndex`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hardhatAccountIndex` | `number` |

#### Returns

`Promise`<`string`\>

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:87

___

### deactivate

▸ **deactivate**(): `void`

#### Returns

`void`

#### Overrides

AbstractConnector.deactivate

#### Defined in

helpers/test-utils/wrapper/MockConnector.ts:92
