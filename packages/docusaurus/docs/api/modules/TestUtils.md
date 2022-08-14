---
id: "TestUtils"
title: "Module: TestUtils"
sidebar_label: "TestUtils"
sidebar_position: 0
custom_edit_url: null
---

Utilities to write tests with ethers, waffle and react hooks

## Classes

- [MockConnector](../classes/TestUtils.MockConnector.md)

## Variables

### const\_basicGasPrice

• `Const` **const\_basicGasPrice**: ``875000000``

#### Defined in

[src/helpers/test-utils/constants/testConstants.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/constants/testConstants.ts#L1)

___

### const\_DefaultTestChainId

• `Const` **const\_DefaultTestChainId**: ``31337``

#### Defined in

[src/helpers/test-utils/constants/testConstants.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/constants/testConstants.ts#L3)

___

### defaultBlockWaitOptions

• `Const` **defaultBlockWaitOptions**: `Object`

This is a const based on WaitOptions from react testing lib

#### Type declaration

| Name | Type |
| :------ | :------ |
| `timeout` | `number` |
| `interval` | `number` |

#### Defined in

[src/helpers/test-utils/constants/testConstants.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/constants/testConstants.ts#L9)

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

[src/helpers/test-utils/eth/hardhatActions.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/eth/hardhatActions.ts#L3)

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

[src/helpers/test-utils/eth/hardhatActions.ts:13](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/eth/hardhatActions.ts#L13)

___

### mineBlockUntil

▸ **mineBlockUntil**(`mockProvider`, `maxNumberOfBlocks`, `untilCondition`): `Promise`<[success: boolean, currentBlockNumber: number]\>

#### Summary
mine block until the a condition is met or a maximumNumberOfBlocks is reached

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockProvider` | `MockProvider` |
| `maxNumberOfBlocks` | `number` |
| `untilCondition` | (`currentBlockNumber`: `number`) => `Promise`<`boolean`\> \| (`currentBlockNumber`: `number`) => `boolean` \| (`currentBlockNumber`: `number`) => `Promise`<`void`\> |

#### Returns

`Promise`<[success: boolean, currentBlockNumber: number]\>

[success, currentBlockNumber]

#### Defined in

[src/helpers/test-utils/eth/hardhatActions.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/eth/hardhatActions.ts#L25)

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

[src/helpers/test-utils/functions/conversions.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/functions/conversions.ts#L3)

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

[src/helpers/test-utils/functions/conversions.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/functions/conversions.ts#L7)

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

[src/helpers/test-utils/functions/expect.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/functions/expect.ts#L4)

___

### shouldFailWithMessage

▸ **shouldFailWithMessage**(`failingFunction`, `errorMessage`): `Promise`<`void`\>

Wrapped around a function to ensure that it fails with the correct message
and doesn't pass successfully

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `failingFunction` | () => `Promise`<`any`\> | Function expect to fail |
| `errorMessage` | `string` | Error message expect to fail with |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/helpers/test-utils/functions/shouldFailWithMessage.ts:10](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/functions/shouldFailWithMessage.ts#L10)

___

### TestAppWrapper

▸ **TestAppWrapper**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

This is a wrapper for tests

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IMockProps` |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/index.d.ts:520

___

### getMockProvider

▸ **getMockProvider**(): `MockProvider`

#### Returns

`MockProvider`

#### Defined in

[src/helpers/test-utils/wrapper/getMockProvider.ts:6](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/getMockProvider.ts#L6)

___

### wrapperTestSetupHelper

▸ **wrapperTestSetupHelper**(): `Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<(`chainId?`: `number`, `override?`: [`TOverride`](Models.md#toverride)) => `number`\>\>

#### Returns

`Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<(`chainId?`: `number`, `override?`: [`TOverride`](Models.md#toverride)) => `number`\>\>

#### Defined in

[src/helpers/test-utils/wrapper/hardhatTestHelpers.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/hardhatTestHelpers.ts#L4)

___

### currentTestBlockNumber

▸ **currentTestBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[src/helpers/test-utils/wrapper/hardhatTestHelpers.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/hardhatTestHelpers.ts#L12)

___

### hookTestWrapper

▸ **hookTestWrapper**<`TCallbackToHook`\>(`callbackToHook`): `Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<`TCallbackToHook`\>\>

Created a test hook with a Web3Wrapper

**`See`**

renderHook from

**`Link`**

testing-library/react-hooks

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCallbackToHook` | extends (`input`: `any`) => `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackToHook` | `TCallbackToHook` | callback to init hook |

#### Returns

`Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<`TCallbackToHook`\>\>

(TTestHookResult)

#### Defined in

[src/helpers/test-utils/wrapper/testWrapper.tsx:28](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/testWrapper.tsx#L28)

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

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:8](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L8)

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

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L17)

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

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L31)

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

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:47](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L47)

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

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:63](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L63)

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

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:73](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L73)

## Type Aliases

### TTestHookResult

Ƭ **TTestHookResult**<`TCallbackToHook`\>: `Omit`<`RenderHookResult`<`Parameters`<`TCallbackToHook`\>, `ReturnType`<`TCallbackToHook`\>\>, ``"rerender"``\> & { `mockProvider`: `MockProvider` ; `rerender`: (`input`: `Parameters`<`TCallbackToHook`\>[``0``]) => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCallbackToHook` | extends (`input`: `any`) => `any` |

#### Defined in

[src/helpers/test-utils/wrapper/testWrapper.tsx:14](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/testWrapper.tsx#L14)

___

### THardhatAccountsNames

Ƭ **THardhatAccountsNames**: ``"deployer"`` \| ``"user1"`` \| ``"user2"`` \| ``"user3"`` \| ``"user4"`` \| ``"user5"`` \| ``"governance"``

#### Defined in

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:28](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L28)

___

### THardhatAccounts

Ƭ **THardhatAccounts**: `Record`<[`THardhatAccountsNames`](TestUtils.md#thardhataccountsnames), `SignerWithAddress`\>

#### Defined in

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:30](https://github.com/scaffold-eth/eth-hooks/blob/951f765/packages/eth-hooks/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L30)
