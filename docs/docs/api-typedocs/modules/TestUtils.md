[eth-hooks - v4.0.29](../README.md) / TestUtils

# Module: TestUtils

Utilities to write tests with ethers, waffle and react hooks

## Table of contents

### Variables

- [const\_basicGasPrice](TestUtils.md#const_basicgasprice)
- [const\_DefaultTestChainId](TestUtils.md#const_defaulttestchainid)
- [defaultBlockWaitOptions](TestUtils.md#defaultblockwaitoptions)
- [TestAppWrapper](TestUtils.md#testappwrapper)

### Functions

- [mineBlock](TestUtils.md#mineblock)
- [setAutoMine](TestUtils.md#setautomine)
- [mineBlockUntil](TestUtils.md#mineblockuntil)
- [fromGwei](TestUtils.md#fromgwei)
- [fromEther](TestUtils.md#fromether)
- [expectValidWallets](TestUtils.md#expectvalidwallets)
- [shouldFailWithMessage](TestUtils.md#shouldfailwithmessage)
- [getMockProvider](TestUtils.md#getmockprovider)
- [wrapperTestSetupHelper](TestUtils.md#wrappertestsetuphelper)
- [currentTestBlockNumber](TestUtils.md#currenttestblocknumber)
- [hookTestWrapper](TestUtils.md#hooktestwrapper)
- [isActive](TestUtils.md#isactive)
- [waitForActivation](TestUtils.md#waitforactivation)
- [getHardhatAccount](TestUtils.md#gethardhataccount)
- [getHardhatSigner](TestUtils.md#gethardhatsigner)

### Classes

- [MockConnector](../classes/TestUtils.MockConnector.md)

### Type aliases

- [TTestHookResult](TestUtils.md#ttesthookresult)

## Variables

### const\_basicGasPrice

• **const\_basicGasPrice**: ``875000000``

#### Defined in

[src/helpers/test-utils/constants/testConstants.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/constants/testConstants.ts#L1)

___

### const\_DefaultTestChainId

• **const\_DefaultTestChainId**: ``31337``

#### Defined in

[src/helpers/test-utils/constants/testConstants.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/constants/testConstants.ts#L3)

___

### defaultBlockWaitOptions

• **defaultBlockWaitOptions**: `Object`

This is a const based on WaitOptions from react testing lib

#### Type declaration

| Name | Type |
| :------ | :------ |
| `timeout` | `number` |
| `interval` | `number` |

#### Defined in

[src/helpers/test-utils/constants/testConstants.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/constants/testConstants.ts#L9)

___

### TestAppWrapper

• **TestAppWrapper**: `FC`<`IMockProps`\>

This is a wrapper for tests

**`param`**

**`returns`**

#### Defined in

[src/helpers/test-utils/wrapper/TestAppWrapper.tsx:37](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/TestAppWrapper.tsx#L37)

## Functions

### mineBlock

▸ `Const` **mineBlock**(`mockProvider`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockProvider` | `MockProvider` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/helpers/test-utils/eth/hardhatActions.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/eth/hardhatActions.ts#L3)

___

### setAutoMine

▸ `Const` **setAutoMine**(`mockProvider`, `enabled`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockProvider` | `MockProvider` |
| `enabled` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/helpers/test-utils/eth/hardhatActions.ts:8](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/eth/hardhatActions.ts#L8)

___

### mineBlockUntil

▸ `Const` **mineBlockUntil**(`mockProvider`, `maxNumberOfBlocks`, `untilCondition`): `Promise`<[success: boolean, currentBlockNumber: number]\>

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

#### Defined in

[src/helpers/test-utils/eth/hardhatActions.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/eth/hardhatActions.ts#L20)

___

### fromGwei

▸ `Const` **fromGwei**(`value`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |

#### Returns

`BigNumber`

#### Defined in

[src/helpers/test-utils/functions/conversions.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/functions/conversions.ts#L3)

___

### fromEther

▸ `Const` **fromEther**(`value`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |

#### Returns

`BigNumber`

#### Defined in

[src/helpers/test-utils/functions/conversions.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/functions/conversions.ts#L7)

___

### expectValidWallets

▸ `Const` **expectValidWallets**(...`wallets`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...wallets` | `Wallet`[] |

#### Returns

`void`

#### Defined in

[src/helpers/test-utils/functions/expect.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/functions/expect.ts#L4)

___

### shouldFailWithMessage

▸ `Const` **shouldFailWithMessage**(`failingFunction`, `errorMessage`): `Promise`<`void`\>

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

[src/helpers/test-utils/functions/shouldFailWithMessage.ts:10](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/functions/shouldFailWithMessage.ts#L10)

___

### getMockProvider

▸ `Const` **getMockProvider**(): `MockProvider`

#### Returns

`MockProvider`

#### Defined in

[src/helpers/test-utils/wrapper/getMockProvider.ts:6](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/getMockProvider.ts#L6)

___

### wrapperTestSetupHelper

▸ `Const` **wrapperTestSetupHelper**(): `Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<() => `number`\>\>

#### Returns

`Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<() => `number`\>\>

#### Defined in

[src/helpers/test-utils/wrapper/hardhatTestHelpers.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/hardhatTestHelpers.ts#L4)

___

### currentTestBlockNumber

▸ `Const` **currentTestBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[src/helpers/test-utils/wrapper/hardhatTestHelpers.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/hardhatTestHelpers.ts#L12)

___

### hookTestWrapper

▸ `Const` **hookTestWrapper**<`TCallbackToHook`\>(`callbackToHook`): `Promise`<[`TTestHookResult`](TestUtils.md#ttesthookresult)<`TCallbackToHook`\>\>

Created a test hook with a Web3Wrapper

**`see`** renderHook from @link testing-library/react-hooks

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

[src/helpers/test-utils/wrapper/testWrapper.tsx:28](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/testWrapper.tsx#L28)

___

### isActive

▸ `Const` **isActive**(`connector`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connector` | [`MockConnector`](../classes/TestUtils.MockConnector.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:6](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L6)

___

### waitForActivation

▸ `Const` **waitForActivation**(`callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `Promise`<`boolean`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L15)

___

### getHardhatAccount

▸ `Const` **getHardhatAccount**(`provider`, `hardhatAccountIndex`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `MockProvider` |
| `hardhatAccountIndex` | `number` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L26)

___

### getHardhatSigner

▸ `Const` **getHardhatSigner**(`provider`, `hardhatAccountIndex`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `MockProvider` |
| `hardhatAccountIndex` | `number` |

#### Returns

`Promise`<`Signer`\>

#### Defined in

[src/helpers/test-utils/wrapper/wrapperHelpers.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/wrapperHelpers.ts#L36)

## Type aliases

### TTestHookResult

Ƭ **TTestHookResult**<`TCallbackToHook`\>: `Omit`<`RenderHookResult`<`Parameters`<`TCallbackToHook`\>, `ReturnType`<`TCallbackToHook`\>\>, ``"rerender"``\> & { `mockProvider`: `MockProvider` ; `rerender`: (`input`: `Parameters`<`TCallbackToHook`\>[``0``]) => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCallbackToHook` | extends (`input`: `any`) => `any` |

#### Defined in

[src/helpers/test-utils/wrapper/testWrapper.tsx:14](https://github.com/scaffold-eth/eth-hooks/blob/bf7fd56/src/helpers/test-utils/wrapper/testWrapper.tsx#L14)
