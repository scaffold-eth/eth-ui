---
id: 'TestUtils.MockConnector'
title: 'Class: MockConnector'
sidebar_label: 'MockConnector'
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

[helpers/test-utils/wrapper/MockConnector.ts:14](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L14)

---

### mockChainId

• `Protected` **mockChainId**: `number`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L15)

---

### mockSigner

• `Protected` **mockSigner**: `undefined` \| `Signer`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L17)

---

### mockAccount

• `Protected` **mockAccount**: `undefined` \| `string`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L18)

---

### spyResetModal

• **spyResetModal**: `SinonStub`<[], `void`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L20)

---

### spySetModalTheme

• **spySetModalTheme**: `SinonStub`<[\_theme: "light" \| "dark" \| ThemeColors], `void`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L21)

---

### spyChangeSigner

• **spyChangeSigner**: `SinonStub`<[\_signer: Signer], `Promise`<`void`\>\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L22)

---

### spyActivate

• **spyActivate**: `SinonStub`<`any`[], `any`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L23)

---

### spyDeactivate

• **spyDeactivate**: `SinonStub`<`any`[], `any`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:24](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L24)

## Constructors

### constructor

• **new MockConnector**(`provider`)

#### Parameters

| Name       | Type           |
| :--------- | :------------- |
| `provider` | `MockProvider` |

#### Overrides

AbstractConnector.constructor

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L26)

## Methods

### loadWeb3Modal

▸ **loadWeb3Modal**(): `void`

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[loadWeb3Modal](../interfaces/EthersAppContext.ICommonModalConnector.md#loadweb3modal-4)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L33)

---

### replaceWithSpies

▸ **replaceWithSpies**(): `void`

#### Returns

`void`

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:38](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L38)

---

### hasCachedProvider

▸ **hasCachedProvider**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[hasCachedProvider](../interfaces/EthersAppContext.ICommonModalConnector.md#hascachedprovider-4)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L44)

---

### getSigner

▸ **getSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[getSigner](../interfaces/EthersAppContext.ICommonModalConnector.md#getsigner-4)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:48](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L48)

---

### setModalTheme

▸ **setModalTheme**(`_theme`): `void`

#### Parameters

| Name     | Type                                   |
| :------- | :------------------------------------- |
| `_theme` | `"light"` \| `"dark"` \| `ThemeColors` |

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[setModalTheme](../interfaces/EthersAppContext.ICommonModalConnector.md#setmodaltheme-4)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:51](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L51)

---

### resetModal

▸ **resetModal**(): `void`

#### Returns

`void`

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[resetModal](../interfaces/EthersAppContext.ICommonModalConnector.md#resetmodal-4)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:54](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L54)

---

### changeSigner

▸ **changeSigner**(`_signer`): `Promise`<`void`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `_signer` | `Signer` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICommonModalConnector](../interfaces/EthersAppContext.ICommonModalConnector.md).[changeSigner](../interfaces/EthersAppContext.ICommonModalConnector.md#changesigner-4)

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L58)

---

### activate

▸ **activate**(): `Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Returns

`Promise`<`ConnectorUpdate`<`string` \| `number`\>\>

#### Overrides

AbstractConnector.activate

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:66](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L66)

---

### getProvider

▸ **getProvider**(): `Promise`<[`TEthersProvider`](../modules/Models.md#tethersprovider-4) \| `MockProvider`\>

#### Returns

`Promise`<[`TEthersProvider`](../modules/Models.md#tethersprovider-4) \| `MockProvider`\>

#### Overrides

AbstractConnector.getProvider

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:74](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L74)

---

### getChainId

▸ **getChainId**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Overrides

AbstractConnector.getChainId

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:78](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L78)

---

### getAccount

▸ **getAccount**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Overrides

AbstractConnector.getAccount

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:82](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L82)

---

### setMockAccount

▸ **setMockAccount**(`hardhatAccountIndex`): `Promise`<`string`\>

#### Parameters

| Name                  | Type     |
| :-------------------- | :------- |
| `hardhatAccountIndex` | `number` |

#### Returns

`Promise`<`string`\>

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:87](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L87)

---

### deactivate

▸ **deactivate**(): `void`

#### Returns

`void`

#### Overrides

AbstractConnector.deactivate

#### Defined in

[helpers/test-utils/wrapper/MockConnector.ts:92](https://github.com/scaffold-eth/eth-hooks/blob/f7722e1/src/helpers/test-utils/wrapper/MockConnector.ts#L92)
