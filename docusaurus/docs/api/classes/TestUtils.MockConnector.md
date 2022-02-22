[eth-hooks - v4.0.44](../README.md) / [TestUtils](../modules/TestUtils.md) / MockConnector

# Class: MockConnector

[TestUtils](../modules/TestUtils.md).MockConnector

## Hierarchy

- `AbstractConnector`

  ↳ **`MockConnector`**

## Implements

- [`ICommonModalConnector`](../interfaces/EthersContext.ICommonModalConnector.md)

## Table of contents

### Constructors

- [constructor](TestUtils.MockConnector.md#constructor)

### Properties

- [provider](TestUtils.MockConnector.md#provider)
- [mockChainId](TestUtils.MockConnector.md#mockchainid)
- [mockSigner](TestUtils.MockConnector.md#mocksigner)
- [mockAccount](TestUtils.MockConnector.md#mockaccount)
- [spyResetModal](TestUtils.MockConnector.md#spyresetmodal)
- [spySetModalTheme](TestUtils.MockConnector.md#spysetmodaltheme)
- [spyChangeSigner](TestUtils.MockConnector.md#spychangesigner)
- [spyActivate](TestUtils.MockConnector.md#spyactivate)
- [spyDeactivate](TestUtils.MockConnector.md#spydeactivate)

### Methods

- [loadWeb3Modal](TestUtils.MockConnector.md#loadweb3modal)
- [replaceWithSpies](TestUtils.MockConnector.md#replacewithspies)
- [hasCachedProvider](TestUtils.MockConnector.md#hascachedprovider)
- [getSigner](TestUtils.MockConnector.md#getsigner)
- [setModalTheme](TestUtils.MockConnector.md#setmodaltheme)
- [resetModal](TestUtils.MockConnector.md#resetmodal)
- [changeSigner](TestUtils.MockConnector.md#changesigner)
- [activate](TestUtils.MockConnector.md#activate)
- [getProvider](TestUtils.MockConnector.md#getprovider)
- [getChainId](TestUtils.MockConnector.md#getchainid)
- [getAccount](TestUtils.MockConnector.md#getaccount)
- [setMockAccount](TestUtils.MockConnector.md#setmockaccount)
- [deactivate](TestUtils.MockConnector.md#deactivate)

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

[helpers/test-utils/wrapper/MockConnector.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L26)

## Properties

### provider

• `Protected` **provider**: `MockProvider`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:14](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L14)

___

### mockChainId

• `Protected` **mockChainId**: `number`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L15)

___

### mockSigner

• `Protected` **mockSigner**: `undefined` \| `Signer`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L17)

___

### mockAccount

• `Protected` **mockAccount**: `undefined` \| `string`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L18)

___

### spyResetModal

• **spyResetModal**: `SinonStub`<[], `void`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L20)

___

### spySetModalTheme

• **spySetModalTheme**: `SinonStub`<[\_theme: "light" \| "dark" \| ThemeColors], `void`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L21)

___

### spyChangeSigner

• **spyChangeSigner**: `SinonStub`<[\_signer: Signer], `Promise`<`void`\>\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L22)

___

### spyActivate

• **spyActivate**: `SinonStub`<`any`[], `any`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L23)

___

### spyDeactivate

• **spyDeactivate**: `SinonStub`<`any`[], `any`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:24](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L24)

## Methods

### loadWeb3Modal

▸ **loadWeb3Modal**(): `void`

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[loadWeb3Modal](../interfaces/EthersContext.ICommonModalConnector.md#loadweb3modal)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L33)

___

### replaceWithSpies

▸ **replaceWithSpies**(): `void`

#### Returns

`void`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L38)

___

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[hasCachedProvider](../interfaces/EthersContext.ICommonModalConnector.md#hascachedprovider)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L44)

___

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[getSigner](../interfaces/EthersContext.ICommonModalConnector.md#getsigner)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:48](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L48)

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

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[setModalTheme](../interfaces/EthersContext.ICommonModalConnector.md#setmodaltheme)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:51](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L51)

___

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[resetModal](../interfaces/EthersContext.ICommonModalConnector.md#resetmodal)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:54](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L54)

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

[ICommonModalConnector](../interfaces/EthersContext.ICommonModalConnector.md).[changeSigner](../interfaces/EthersContext.ICommonModalConnector.md#changesigner)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L58)

___

### activate

▸ **activate**(): `Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Returns

`Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Overrides

AbstractConnector.activate

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:66](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L66)

___

### getProvider

▸ **getProvider**(): `Promise`<[`TEthersProvider`](../modules/Models.md#tethersprovider) \| `MockProvider`\>

#### Returns

`Promise`<[`TEthersProvider`](../modules/Models.md#tethersprovider) \| `MockProvider`\>

#### Overrides

AbstractConnector.getProvider

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:74](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L74)

___

### getChainId

▸ **getChainId**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Overrides

AbstractConnector.getChainId

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:78](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L78)

___

### getAccount

▸ **getAccount**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Overrides

AbstractConnector.getAccount

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:82](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L82)

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

[helpers/test-utils/wrapper/MockConnector.ts:87](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L87)

___

### deactivate

▸ **deactivate**(): `void`

#### Returns

`void`

#### Overrides

AbstractConnector.deactivate

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:92](https://github.com/scaffold-eth/eth-hooks/blob/50cc29a/src/helpers/test-utils/wrapper/MockConnector.ts#L92)
