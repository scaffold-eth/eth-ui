---
id: "TestUtils"
title: "Module: TestUtils"
sidebar_label: "TestUtils"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [MockConnector](../classes/TestUtils.MockConnector.md)

## Variables

### const\_basicGasPrice

• `Const` **const\_basicGasPrice**: ``875000000``

#### Defined in

helpers/test-utils/constants/testConstants.ts:1

___

### const\_DefaultTestChainId

• `Const` **const\_DefaultTestChainId**: ``31337``

#### Defined in

helpers/test-utils/constants/testConstants.ts:3

___

### defaultBlockWaitOptions

• `Const` **defaultBlockWaitOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `timeout` | `number` |
| `interval` | `number` |

#### Defined in

helpers/test-utils/constants/testConstants.ts:9

___

### TestAppWrapper

• `Const` **TestAppWrapper**: `FC`<`IMockProps`\>

#### Defined in

helpers/test-utils/wrapper/TestAppWrapper.tsx:38

## Functions

### mineBlock

▸ **mineBlock**(`mockProvider`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockProvider` | `MockProvider` |

#### Returns

`Promise`<`void`\>

#### Defined in

helpers/test-utils/eth/hardhatActions.ts:3

___

### setAutoMine

▸ **setAutoMine**(`mockProvider`, `enabled`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockProvider` | `MockProvider` |
| `enabled` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

helpers/test-utils/eth/hardhatActions.ts:13

___

### mineBlockUntil

▸ **mineBlockUntil**(`mockProvider`, `maxNumberOfBlocks`, `untilCondition`): `Promise`<[success: boolean, currentBlockNumber: number]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockProvider` | `MockProvider` |
| `maxNumberOfBlocks` | `number` |
| `untilCondition` | (`currentBlockNumber`: `number`) => `Promise`<`boolean`\> \| (`currentBlockNumber`: `number`) => `boolean` \| (`currentBlockNumber`: `number`) => `Promise`<`void`\> |

#### Returns

`Promise`<[success: boolean, currentBlockNumber: number]\>

#### Defined in

helpers/test-utils/eth/hardhatActions.ts:25

___

### fromGwei

▸ **fromGwei**(`value`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |

#### Returns

`BigNumber`

#### Defined in

helpers/test-utils/functions/conversions.ts:3

___

### fromEther

▸ **fromEther**(`value`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |

#### Returns

`BigNumber`

#### Defined in

helpers/test-utils/functions/conversions.ts:7

___

### expectValidWallets

▸ **expectValidWallets**(...`wallets`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...wallets` | `Wallet`[] |

#### Returns

`void`

#### Defined in

helpers/test-utils/functions/expect.ts:4

___

### shouldFailWithMessage

▸ **shouldFailWithMessage**(`failingFunction`, `errorMessage`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `failingFunction` | () => `Promise`<`any`\> |  |
| `errorMessage` | `string` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

helpers/test-utils/functions/shouldFailWithMessage.ts:10

___

### getMockProvider

▸ **getMockProvider**(): `MockProvider`

#### Returns

`MockProvider`

#### Defined in

helpers/test-utils/wrapper/getMockProvider.ts:6

___

### wrapperTestSetupHelper

▸ **wrapperTestSetupHelper**(): `Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<(`chainId?`: `number`, `override?`: [`TOverride`](Models.md#toverride)) => `number`\>\>

#### Returns

`Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<(`chainId?`: `number`, `override?`: [`TOverride`](Models.md#toverride)) => `number`\>\>

#### Defined in

helpers/test-utils/wrapper/hardhatTestHelpers.ts:4

___

### currentTestBlockNumber

▸ **currentTestBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

helpers/test-utils/wrapper/hardhatTestHelpers.ts:12

___

### hookTestWrapper

▸ **hookTestWrapper**<`TCallbackToHook`\>(`callbackToHook`): `Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<`TCallbackToHook`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCallbackToHook` | extends (`input`: `any`) => `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackToHook` | `TCallbackToHook` |  |

#### Returns

`Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<`TCallbackToHook`\>\>

#### Defined in

helpers/test-utils/wrapper/testWrapper.tsx:28

___

### isActive

▸ **isActive**(`connector`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connector` | [`MockConnector`](../classes/TestUtils.MockConnector.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

helpers/test-utils/wrapper/wrapperHelpers.ts:8

___

### waitForActivation

▸ **waitForActivation**(`callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `Promise`<`boolean`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

helpers/test-utils/wrapper/wrapperHelpers.ts:17

___

### getTestAccounts

▸ **getTestAccounts**(`provider`): `Promise`<{ `deployer`: `string` ; `user1`: `string` ; `user2`: `string` ; `user3`: `string` ; `user4`: `string` ; `user5`: `string` ; `governance`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `MockProvider` |

#### Returns

`Promise`<{ `deployer`: `string` ; `user1`: `string` ; `user2`: `string` ; `user3`: `string` ; `user4`: `string` ; `user5`: `string` ; `governance`: `string`  }\>

#### Defined in

helpers/test-utils/wrapper/wrapperHelpers.ts:31

___

### getTestSigners

▸ **getTestSigners**(`provider`): `Promise`<{ `deployer`: `JsonRpcSigner` ; `user1`: `JsonRpcSigner` ; `user2`: `JsonRpcSigner` ; `user3`: `JsonRpcSigner` ; `user4`: `JsonRpcSigner` ; `user5`: `JsonRpcSigner` ; `governance`: `JsonRpcSigner`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `MockProvider` |

#### Returns

`Promise`<{ `deployer`: `JsonRpcSigner` ; `user1`: `JsonRpcSigner` ; `user2`: `JsonRpcSigner` ; `user3`: `JsonRpcSigner` ; `user4`: `JsonRpcSigner` ; `user5`: `JsonRpcSigner` ; `governance`: `JsonRpcSigner`  }\>

#### Defined in

helpers/test-utils/wrapper/wrapperHelpers.ts:47

___

### getHardhatAccount

▸ **getHardhatAccount**(`provider`, `hardhatAccountIndex`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `MockProvider` |
| `hardhatAccountIndex` | `number` |

#### Returns

`Promise`<`string`\>

#### Defined in

helpers/test-utils/wrapper/wrapperHelpers.ts:63

___

### getHardhatSigner

▸ **getHardhatSigner**(`provider`, `hardhatAccountIndex`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `MockProvider` |
| `hardhatAccountIndex` | `number` |

#### Returns

`Promise`<`Signer`\>

#### Defined in

helpers/test-utils/wrapper/wrapperHelpers.ts:73

## Type Aliases

### TTestHookResult

Ƭ **TTestHookResult**<`TCallbackToHook`\>: `Omit`<`RenderHookResult`<`Parameters`<`TCallbackToHook`\>, `ReturnType`<`TCallbackToHook`\>\>, ``"rerender"``\> & { `mockProvider`: `MockProvider` ; `rerender`: (`input`: `Parameters`<`TCallbackToHook`\>[``0``]) => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCallbackToHook` | extends (`input`: `any`) => `any` |

#### Defined in

helpers/test-utils/wrapper/testWrapper.tsx:14

___

### THardhatAccountsNames

Ƭ **THardhatAccountsNames**: ``"deployer"`` \| ``"user1"`` \| ``"user2"`` \| ``"user3"`` \| ``"user4"`` \| ``"user5"`` \| ``"governance"``

#### Defined in

helpers/test-utils/wrapper/wrapperHelpers.ts:28

___

### THardhatAccounts

Ƭ **THardhatAccounts**: `Record`<[`THardhatAccountsNames`](TestUtils.md#thardhataccountsnames), `SignerWithAddress`\>

#### Defined in

helpers/test-utils/wrapper/wrapperHelpers.ts:30
