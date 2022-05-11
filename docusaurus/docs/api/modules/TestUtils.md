---
id: 'TestUtils'
title: 'Module: TestUtils'
sidebar_label: 'TestUtils'
sidebar_position: 0
custom_edit_url: null
---

Utilities to write tests with ethers, waffle and react hooks

## Classes

- [MockConnector](../classes/TestUtils.MockConnector.md)

## Variables

### const_basicGasPrice

• `Const` **const_basicGasPrice**: `875000000`

#### Defined in

[helpers/test-utils/constants/testConstants.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/constants/testConstants.ts#L1)

---

### const_DefaultTestChainId

• `Const` **const_DefaultTestChainId**: `31337`

#### Defined in

[helpers/test-utils/constants/testConstants.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/constants/testConstants.ts#L3)

---

### defaultBlockWaitOptions

• `Const` **defaultBlockWaitOptions**: `Object`

This is a const based on WaitOptions from react testing lib

#### Type declaration

| Name       | Type     |
| :--------- | :------- |
| `timeout`  | `number` |
| `interval` | `number` |

#### Defined in

[helpers/test-utils/constants/testConstants.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/constants/testConstants.ts#L9)

---

### TestAppWrapper

• `Const` **TestAppWrapper**: `FC`<`IMockProps`\>

This is a wrapper for tests

**`param`**

**`returns`**

#### Defined in

[helpers/test-utils/wrapper/TestAppWrapper.tsx:38](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/TestAppWrapper.tsx#L38)

## Functions

### mineBlock

▸ **mineBlock**(`mockProvider`): `Promise`<`void`\>

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `mockProvider` | `MockProvider` |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/test-utils/eth/hardhatActions.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/eth/hardhatActions.ts#L3)

---

### setAutoMine

▸ **setAutoMine**(`mockProvider`, `enabled`): `Promise`<`void`\>

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `mockProvider` | `MockProvider` |
| `enabled`      | `boolean`      |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/test-utils/eth/hardhatActions.ts:8](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/eth/hardhatActions.ts#L8)

---

### mineBlockUntil

▸ **mineBlockUntil**(`mockProvider`, `maxNumberOfBlocks`, `untilCondition`): `Promise`<[success: boolean, currentBlockNumber: number]\>

#### Summary

mine block until the a condition is met or a maximumNumberOfBlocks is reached

#### Parameters

| Name                | Type                                                                                                                                                                 |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mockProvider`      | `MockProvider`                                                                                                                                                       |
| `maxNumberOfBlocks` | `number`                                                                                                                                                             |
| `untilCondition`    | (`currentBlockNumber`: `number`) => `Promise`<`boolean`\> \| (`currentBlockNumber`: `number`) => `boolean` \| (`currentBlockNumber`: `number`) => `Promise`<`void`\> |

#### Returns

`Promise`<[success: boolean, currentBlockNumber: number]\>

#### Defined in

[helpers/test-utils/eth/hardhatActions.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/eth/hardhatActions.ts#L20)

---

### fromGwei

▸ **fromGwei**(`value`): `BigNumber`

#### Parameters

| Name    | Type                 |
| :------ | :------------------- |
| `value` | `string` \| `number` |

#### Returns

`BigNumber`

#### Defined in

[helpers/test-utils/functions/conversions.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/functions/conversions.ts#L3)

---

### fromEther

▸ **fromEther**(`value`): `BigNumber`

#### Parameters

| Name    | Type                 |
| :------ | :------------------- |
| `value` | `string` \| `number` |

#### Returns

`BigNumber`

#### Defined in

[helpers/test-utils/functions/conversions.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/functions/conversions.ts#L7)

---

### expectValidWallets

▸ **expectValidWallets**(...`wallets`): `void`

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `...wallets` | `Wallet`[] |

#### Returns

`void`

#### Defined in

[helpers/test-utils/functions/expect.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/functions/expect.ts#L4)

---

### shouldFailWithMessage

▸ **shouldFailWithMessage**(`failingFunction`, `errorMessage`): `Promise`<`void`\>

Wrapped around a function to ensure that it fails with the correct message
and doesn't pass successfully

#### Parameters

| Name              | Type                    | Description                       |
| :---------------- | :---------------------- | :-------------------------------- |
| `failingFunction` | () => `Promise`<`any`\> | Function expect to fail           |
| `errorMessage`    | `string`                | Error message expect to fail with |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/test-utils/functions/shouldFailWithMessage.ts:10](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/functions/shouldFailWithMessage.ts#L10)

---

### getMockProvider

▸ **getMockProvider**(): `MockProvider`

#### Returns

`MockProvider`

#### Defined in

[helpers/test-utils/wrapper/getMockProvider.ts:6](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/getMockProvider.ts#L6)

---

### wrapperTestSetupHelper

▸ **wrapperTestSetupHelper**(): `Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<() => `number`\>\>

#### Returns

`Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<() => `number`\>\>

#### Defined in

[helpers/test-utils/wrapper/hardhatTestHelpers.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/hardhatTestHelpers.ts#L4)

---

### currentTestBlockNumber

▸ **currentTestBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[helpers/test-utils/wrapper/hardhatTestHelpers.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/hardhatTestHelpers.ts#L12)

---

### hookTestWrapper

▸ **hookTestWrapper**<`TCallbackToHook`\>(`callbackToHook`): `Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<`TCallbackToHook`\>\>

Created a test hook with a Web3Wrapper

**`see`** renderHook from @link testing-library/react-hooks

#### Type parameters

| Name              | Type                              |
| :---------------- | :-------------------------------- |
| `TCallbackToHook` | extends (`input`: `any`) => `any` |

#### Parameters

| Name             | Type              | Description           |
| :--------------- | :---------------- | :-------------------- |
| `callbackToHook` | `TCallbackToHook` | callback to init hook |

#### Returns

`Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<`TCallbackToHook`\>\>

(TTestHookResult)

#### Defined in

[helpers/test-utils/wrapper/testWrapper.tsx:28](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/testWrapper.tsx#L28)

---

### isActive

▸ **isActive**(`connector`): `Promise`<`boolean`\>

#### Parameters

| Name        | Type                                                     |
| :---------- | :------------------------------------------------------- |
| `connector` | [`MockConnector`](../classes/TestUtils.MockConnector.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[helpers/test-utils/wrapper/wrapperHelpers.ts:8](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L8)

---

### waitForActivation

▸ **waitForActivation**(`callback`): `Promise`<`void`\>

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `callback` | () => `Promise`<`boolean`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/test-utils/wrapper/wrapperHelpers.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L17)

---

### getTestAccounts

▸ **getTestAccounts**(`provider`): `Promise`<{ `deployer`: `string` ; `user1`: `string` ; `user2`: `string` ; `user3`: `string` ; `user4`: `string` ; `user5`: `string` ; `governance`: `string` }\>

#### Parameters

| Name       | Type           |
| :--------- | :------------- |
| `provider` | `MockProvider` |

#### Returns

`Promise`<{ `deployer`: `string` ; `user1`: `string` ; `user2`: `string` ; `user3`: `string` ; `user4`: `string` ; `user5`: `string` ; `governance`: `string` }\>

#### Defined in

[helpers/test-utils/wrapper/wrapperHelpers.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L31)

---

### getTestSigners

▸ **getTestSigners**(`provider`): `Promise`<{ `deployer`: `JsonRpcSigner` ; `user1`: `JsonRpcSigner` ; `user2`: `JsonRpcSigner` ; `user3`: `JsonRpcSigner` ; `user4`: `JsonRpcSigner` ; `user5`: `JsonRpcSigner` ; `governance`: `JsonRpcSigner` }\>

#### Parameters

| Name       | Type           |
| :--------- | :------------- |
| `provider` | `MockProvider` |

#### Returns

`Promise`<{ `deployer`: `JsonRpcSigner` ; `user1`: `JsonRpcSigner` ; `user2`: `JsonRpcSigner` ; `user3`: `JsonRpcSigner` ; `user4`: `JsonRpcSigner` ; `user5`: `JsonRpcSigner` ; `governance`: `JsonRpcSigner` }\>

#### Defined in

[helpers/test-utils/wrapper/wrapperHelpers.ts:47](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L47)

---

### getHardhatAccount

▸ **getHardhatAccount**(`provider`, `hardhatAccountIndex`): `Promise`<`string`\>

#### Parameters

| Name                  | Type           |
| :-------------------- | :------------- |
| `provider`            | `MockProvider` |
| `hardhatAccountIndex` | `number`       |

#### Returns

`Promise`<`string`\>

#### Defined in

[helpers/test-utils/wrapper/wrapperHelpers.ts:63](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L63)

---

### getHardhatSigner

▸ **getHardhatSigner**(`provider`, `hardhatAccountIndex`): `Promise`<`Signer`\>

#### Parameters

| Name                  | Type           |
| :-------------------- | :------------- |
| `provider`            | `MockProvider` |
| `hardhatAccountIndex` | `number`       |

#### Returns

`Promise`<`Signer`\>

#### Defined in

[helpers/test-utils/wrapper/wrapperHelpers.ts:73](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L73)

## Type aliases

### TTestHookResult

Ƭ **TTestHookResult**<`TCallbackToHook`\>: `Omit`<`RenderHookResult`<`Parameters`<`TCallbackToHook`\>, `ReturnType`<`TCallbackToHook`\>\>, `"rerender"`\> & { `mockProvider`: `MockProvider` ; `rerender`: (`input`: `Parameters`<`TCallbackToHook`\>[``0``]) => `void` }

#### Type parameters

| Name              | Type                              |
| :---------------- | :-------------------------------- |
| `TCallbackToHook` | extends (`input`: `any`) => `any` |

#### Defined in

[helpers/test-utils/wrapper/testWrapper.tsx:14](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/testWrapper.tsx#L14)

---

### THardhatAccountsNames

Ƭ **THardhatAccountsNames**: `"deployer"` \| `"user1"` \| `"user2"` \| `"user3"` \| `"user4"` \| `"user5"` \| `"governance"`

#### Defined in

[helpers/test-utils/wrapper/wrapperHelpers.ts:28](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L28)

---

### THardhatAccounts

Ƭ **THardhatAccounts**: `Record`<[`THardhatAccountsNames`](TestUtils.md#thardhataccountsnames), `SignerWithAddress`\>

#### Defined in

[helpers/test-utils/wrapper/wrapperHelpers.ts:30](https://github.com/scaffold-eth/eth-hooks/blob/b2e0cac/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L30)
