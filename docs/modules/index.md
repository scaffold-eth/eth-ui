[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / index

# Module: index

## Table of contents

### Hooks Functions

- [useBalance](index.md#usebalance)
- [useBlockNumber](index.md#useblocknumber)
- [useBurnerSigner](index.md#useburnersigner)
- [useContractLoader](index.md#usecontractloader)

### Misc Functions

- [useContractExistsAtAddress](index.md#usecontractexistsataddress)
- [useContractReader](index.md#usecontractreader)
- [useEventListener](index.md#useeventlistener)
- [useGasPrice](index.md#usegasprice)
- [useGetUserFromProviders](index.md#usegetuserfromproviders)
- [useGetUserFromSigners](index.md#usegetuserfromsigners)
- [useNonce](index.md#usenonce)
- [useOnRepetition](index.md#useonrepetition)
- [useTimestamp](index.md#usetimestamp)
- [useUserAddress](index.md#useuseraddress)
- [useWeb3Modal](index.md#useweb3modal)

### Interfaces

- [IBurnerSigner](../interfaces/index.IBurnerSigner.md)
- [IWeb3ModalState](../interfaces/index.IWeb3ModalState.md)

### Type aliases

- [TContractConfig](index.md#tcontractconfig)
- [TGasStationSpeed](index.md#tgasstationspeed)

## Hooks Functions

### useBalance

▸ `Const` **useBalance**(`address`): `BigNumber`

Gets your balance in ETH for the given address.
- uses the current ethersProvider from context
- updates with [BlockNumberContext](context.md#blocknumbercontext)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`BigNumber`

current balance

#### Defined in

[src/useBalance.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useBalance.ts#L17)

___

### useBlockNumber

▸ `Const` **useBlockNumber**(`pollTime?`): `number`

Get the current block number of the network.
- uses the current ethersProvider from context

✋🏽 For app wide block number access use [BlockNumberContext](context.md#blocknumbercontext)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pollTime` | `number` | `0` | if > 0 uses polling, else it uses onBlock event |

#### Returns

`number`

block number

#### Defined in

[src/useBlockNumber.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useBlockNumber.ts#L17)

___

### useBurnerSigner

▸ `Const` **useBurnerSigner**(`localProvider`): [`IBurnerSigner`](../interfaces/index.IBurnerSigner.md)

A hook that creates a buner address and returns a Signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localProvider` | `undefined` \| [`TEthersProvider`](models.md#tethersprovider) | localhost provider |

#### Returns

[`IBurnerSigner`](../interfaces/index.IBurnerSigner.md)

IBurnerSigner

#### Defined in

[src/useBurnerSigner.ts:79](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useBurnerSigner.ts#L79)

___

### useContractLoader

▸ `Const` **useContractLoader**(`config?`, `providerOrSigner?`, `configChainId?`): `Record`<`string`, `Contract`\>

 Loads your contracts returns them and gives options to read values from contracts
or write transactions into them
- remember to use a signer for write contracts
- if chain id is not given, it will use the chainId of the provider

A optional providerOrSigner is needed to initalize the contract class
- if none is given, the context providerOrSigner is used if the chainId is the same.
- A signer is required for write contracts

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`TContractConfig`](index.md#tcontractconfig) |  |
| `providerOrSigner?` | [`TEthersProviderOrSigner`](models.md#tethersproviderorsigner) | (optional) used to initalize the contract class |
| `configChainId?` | `number` | (optional) can be used to specific a particular network such as mainnet instead of the current provider |

#### Returns

`Record`<`string`, `Contract`\>

Record of contractName:Contracts

#### Defined in

[src/useContractLoader.ts:46](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useContractLoader.ts#L46)

___

## Misc Functions

### useContractExistsAtAddress

▸ `Const` **useContractExistsAtAddress**(`contract`): `boolean`

Checks whether a contract exists on the blockchain

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `Contract` | ethers.Contract class |

#### Returns

`boolean`

#### Defined in

[src/useContractExistsAtAddress.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useContractExistsAtAddress.ts#L9)

___

### useContractReader

▸ `Const` **useContractReader**<`T`\>(`contract`, `contractFunctionInfo`, `formatter?`, `onChange?`): `undefined` \| `T`

Enables you to call functions in contracts and read their values.  It helps keep track of them in the local React states

~ Features ~
- Provide readContracts by loading contracts (see more on ContractLoader.js)
- Specify the name of the contract, in this case it is "YourContract"
- Specify the name of the variable in the contract, in this case we keep track of "purpose" variable
- Pass an args array if the function requires
- Pass pollTime - if no pollTime is specified, the function will update on every new block

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `Contract` | - |
| `contractFunctionInfo` | [`TContractFunctionInfo`](models.md#tcontractfunctioninfo) | - |
| `formatter?` | (`_value`: `T`) => `T` | ((_value: T) => T) :: optional :: function to format the result |
| `onChange?` | (`_value?`: `T`) => `void` | (string) :: optional :: callback to call with the function |

#### Returns

`undefined` \| `T`

(<T>) :: generic return type

#### Defined in

[src/useContractReader.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useContractReader.ts#L29)

___

### useEventListener

▸ `Const` **useEventListener**(`contract`, `eventName`, `startBlock`): `Event`[]

Enables you to keep track of events

~ Features ~
- Provide readContracts by loading contracts (see more on ContractLoader.js)
- Specify the name of the contract, in this case it is "YourContract"
- Specify the name of the event in the contract, in this case we keep track of "SetPurpose" event
- Specify the provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `undefined` \| `Contract` | - |
| `eventName` | `string` | (string) :: name of the event |
| `startBlock` | `number` | (number) starting block |

#### Returns

`Event`[]

(ethers->Event)

#### Defined in

[src/useEventListener.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useEventListener.ts#L26)

___

### useGasPrice

▸ `Const` **useGasPrice**(`chainId`, `speed`, `currentNetworkInfo?`): `undefined` \| `number`

Gets the gas price from Eth Gas Station.  as gwei

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `undefined` \| `number` | - |
| `speed` | [`TGasStationSpeed`](index.md#tgasstationspeed) | (TGasStationSpeed) 'fast', 'fastest', 'safeLow', 'average' |
| `currentNetworkInfo?` | [`TNetworkInfo`](models.md#tnetworkinfo) | (TNetwork) fallback config with gas price |

#### Returns

`undefined` \| `number`

(number) gas price in gwei

#### Defined in

[src/useGasPrice.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useGasPrice.ts#L27)

___

### useGetUserFromProviders

▸ `Const` **useGetUserFromProviders**(`currentProvider`, ...`moreProviders`): [`TEthersUser`](models.md#tethersuser)

 Gets user provider/signer from injected provider or local provider
 Use your injected provider from 🦊 Metamask
 If you don't have it then instantly generate a 🔥 burner wallet from a local provider

~ Features ~
- Specify the injected provider from Metamask
- Specify the local provider
- Usage examples:
const tx = Transactor(userSigner, gasPrice)

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentProvider` | `undefined` \| [`TEthersProvider`](models.md#tethersprovider) |
| `...moreProviders` | [`TEthersProvider`](models.md#tethersprovider)[] |

#### Returns

[`TEthersUser`](models.md#tethersuser)

(TProviderAndSigner)

#### Defined in

[src/useGetUserFromProviders.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useGetUserFromProviders.ts#L22)

___

### useGetUserFromSigners

▸ `Const` **useGetUserFromSigners**(`currentSigner`): [`TEthersUser`](models.md#tethersuser)

 Gets user provider/signer from injected provider or local provider
 Use your injected provider from 🦊 Metamask
 If you don't have it then instantly generate a 🔥 burner wallet from a local provider

~ Features ~
- Specify the injected provider from Metamask
- Specify the local provider
- Usage examples:
const tx = Transactor(userSigner, gasPrice)

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentSigner` | `undefined` \| `Signer` \| `Wallet` |

#### Returns

[`TEthersUser`](models.md#tethersuser)

(TProviderAndSigner)

#### Defined in

[src/useGetUserFromSigners.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useGetUserFromSigners.ts#L21)

___

### useNonce

▸ `Const` **useNonce**(`address`): `number`

Get the current nonce of the address provided

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | (string) |

#### Returns

`number`

(number) nonce

#### Defined in

[src/useNonce.ts:14](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useNonce.ts#L14)

___

### useOnRepetition

▸ `Const` **useOnRepetition**(`callback`, `options`, ...`args`): `void`

A hook will invoke a callback regularly on the "block" event.
Alternatively, If a pollTime is provided, it will use that instead. The minumum polling time is 10s
- the hook will invoke the callback when the leadTrigger changes state to true as a leading invokation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (...`_args`: `any`[]) => `void` \| `Promise`<`void`\> | (func) :: callback funciton, can have variable args |
| `options` | `TOptions` | (TOptions) |
| `...args` | `any`[] | varargs callback function arguments |

#### Returns

`void`

#### Defined in

[src/useOnRepetition.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useOnRepetition.ts#L29)

___

### useTimestamp

▸ `Const` **useTimestamp**(`pollTime?`): `number`

Get the current timestamp from the latest block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pollTime?` | `number` | (number) :: if >0 use polling, else use instead of onBlock event |

#### Returns

`number`

(number) :: timestamp

#### Defined in

[src/useTimestamp.ts:13](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useTimestamp.ts#L13)

___

### useUserAddress

▸ `Const` **useUserAddress**(`signer`): `undefined` \| `string`

Get the address from the current signer or provider

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `undefined` \| `Signer` |

#### Returns

`undefined` \| `string`

(string) :: address

#### Defined in

[src/useUserAddress.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useUserAddress.ts#L11)

___

### useWeb3Modal

▸ `Const` **useWeb3Modal**(`web3ModalConfig`, `setCurrentEthersProvider`): [`IWeb3ModalState`](../interfaces/index.IWeb3ModalState.md)

A hook that makes it easy to use web3Modal

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3ModalConfig` | `Partial`<`ICoreOptions`\> |
| `setCurrentEthersProvider` | (`newEthersProvider`: `undefined` \| [`TEthersProvider`](models.md#tethersprovider)) => `void` |

#### Returns

[`IWeb3ModalState`](../interfaces/index.IWeb3ModalState.md)

#### Defined in

[src/useWeb3Modal.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useWeb3Modal.ts#L22)

## Type aliases

### TContractConfig

Ƭ **TContractConfig**: `Object`

Configuration for useContractLoader

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hardhatNetworkName?` | `string` | your local hardhat network name |
| `customAddresses?` | `Record`<`string`, `string`\> | the address:contractName key value pair |
| `deployedContracts?` | [`TDeployedContracts`](models.md#tdeployedcontracts) | Hardhat deployed contracts |
| `externalContracts?` | [`TExternalContracts`](models.md#texternalcontracts) | External contracts (such as DAI) |

#### Defined in

[src/useContractLoader.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useContractLoader.ts#L11)

___

### TGasStationSpeed

Ƭ **TGasStationSpeed**: ``"fast"`` \| ``"fastest"`` \| ``"safeLow"`` \| ``"average"``

Preset speeds for Eth Gas Station
fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

#### Defined in

[src/useGasPrice.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/useGasPrice.ts#L18)
