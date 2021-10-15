[eth-hooks - v3.2.0beta09](README.md) / Exports

# eth-hooks - v3.2.0beta09

## Table of contents

### Hooks Functions

- [useBalance](modules.md#usebalance)
- [useBlockNumber](modules.md#useblocknumber)
- [useBurnerSigner](modules.md#useburnersigner)
- [useContractLoader](modules.md#usecontractloader)

### Misc Functions

- [reducer](modules.md#reducer)
- [useBlockNumberContext](modules.md#useblocknumbercontext)
- [useEthersContext](modules.md#useetherscontext)
- [ConnectToStaticJsonRpcProvider](modules.md#connecttostaticjsonrpcprovider)
- [useDexEthPrice](modules.md#usedexethprice)
- [useDexTokenList](modules.md#usedextokenlist)
- [useEnsAddress](modules.md#useensaddress)
- [useEnsResolveName](modules.md#useensresolvename)
- [useTokenBalance](modules.md#usetokenbalance)
- [asyncSome](modules.md#asyncsome)
- [isEthersProvider](modules.md#isethersprovider)
- [parseProviderOrSigner](modules.md#parseproviderorsigner)
- [lazier](modules.md#lazier)
- [useContractExistsAtAddress](modules.md#usecontractexistsataddress)
- [useContractReader](modules.md#usecontractreader)
- [useEventListener](modules.md#useeventlistener)
- [useGasPrice](modules.md#usegasprice)
- [useGetUserFromProviders](modules.md#usegetuserfromproviders)
- [useGetUserFromSigners](modules.md#usegetuserfromsigners)
- [useNonce](modules.md#usenonce)
- [useOnRepetition](modules.md#useonrepetition)
- [useTimestamp](modules.md#usetimestamp)
- [useUserAddress](modules.md#useuseraddress)
- [useWeb3Modal](modules.md#useweb3modal)

### Variables

- [BlockNumberContext](modules.md#blocknumbercontext)
- [EthersAppContext](modules.md#ethersappcontext)

### Type aliases

- [CreateEthersModalConnector](modules.md#createethersmodalconnector)
- [TDeployedContracts](modules.md#tdeployedcontracts)
- [TExternalContracts](modules.md#texternalcontracts)
- [TContractFunctionInfo](modules.md#tcontractfunctioninfo)
- [TNetworkInfo](modules.md#tnetworkinfo)
- [TEthersProvider](modules.md#tethersprovider)
- [TEthersProviderOrSigner](modules.md#tethersproviderorsigner)
- [TAbstractProvider](modules.md#tabstractprovider)
- [TEthersUser](modules.md#tethersuser)
- [TContractConfig](modules.md#tcontractconfig)
- [TGasStationSpeed](modules.md#tgasstationspeed)

### Interfaces

- [IEthersContext](interfaces/IEthersContext.md)
- [IStaticJsonRpcProviderConnectorOptions](interfaces/IStaticJsonRpcProviderConnectorOptions.md)
- [IBurnerSigner](interfaces/IBurnerSigner.md)
- [IWeb3ModalState](interfaces/IWeb3ModalState.md)

### Classes

- [UserClosedModalError](classes/UserClosedModalError.md)
- [CouldNotActivateError](classes/CouldNotActivateError.md)
- [EthersModalConnector](classes/EthersModalConnector.md)

## Hooks Functions

### useBalance

▸ `Const` **useBalance**(`address`): `BigNumber`

Gets your balance in ETH for the given address.
- uses the current ethersProvider from context
- updates with [BlockNumberContext](modules.md#blocknumbercontext)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`BigNumber`

current balance

#### Defined in

[src/useBalance.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBalance.ts#L17)

___

### useBlockNumber

▸ `Const` **useBlockNumber**(`pollTime?`): `number`

Get the current block number of the network.
- uses the current ethersProvider from context

✋🏽 For app wide block number access use [BlockNumberContext](modules.md#blocknumbercontext)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pollTime` | `number` | `0` | if > 0 uses polling, else it uses onBlock event |

#### Returns

`number`

block number

#### Defined in

[src/useBlockNumber.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBlockNumber.ts#L17)

___

### useBurnerSigner

▸ `Const` **useBurnerSigner**(`localProvider`): [`IBurnerSigner`](interfaces/IBurnerSigner.md)

A hook that creates a buner address and returns a Signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) | localhost provider |

#### Returns

[`IBurnerSigner`](interfaces/IBurnerSigner.md)

IBurnerSigner

#### Defined in

[src/useBurnerSigner.ts:79](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useBurnerSigner.ts#L79)

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
| `config` | [`TContractConfig`](modules.md#tcontractconfig) |  |
| `providerOrSigner?` | [`TEthersProviderOrSigner`](modules.md#tethersproviderorsigner) | (optional) used to initalize the contract class |
| `configChainId?` | `number` | (optional) can be used to specific a particular network such as mainnet instead of the current provider |

#### Returns

`Record`<`string`, `Contract`\>

Record of contractName:Contracts

#### Defined in

[src/useContractLoader.ts:46](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useContractLoader.ts#L46)

___

## Misc Functions

### reducer

▸ `Const` **reducer**(`state?`, `payload`): `State`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `State` |
| `payload` | `Payload` |

#### Returns

`State`

#### Defined in

[src/context/BlockNumberContext.tsx:18](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/context/BlockNumberContext.tsx#L18)

___

### useBlockNumberContext

▸ `Const` **useBlockNumberContext**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[src/context/BlockNumberContext.tsx:29](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/context/BlockNumberContext.tsx#L29)

___

### useEthersContext

▸ `Const` **useEthersContext**(`providerKey?`): [`IEthersContext`](interfaces/IEthersContext.md)

A wrapper around useWeb3React that provides functionality for web3modal
and eth-hooks compatability

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerKey?` | `string` | (string) :: (optional) :: used if you want a secondary provider context, for example to mainnet |

#### Returns

[`IEthersContext`](interfaces/IEthersContext.md)

(IEthersWeb3Context)

#### Defined in

[src/context/EthersAppContext.tsx:33](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/context/EthersAppContext.tsx#L33)

___

### ConnectToStaticJsonRpcProvider

▸ `Const` **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`StaticJsonRpcProvider`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_package` | `any` |
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](interfaces/IStaticJsonRpcProviderConnectorOptions.md) |

#### Returns

`Promise`<`StaticJsonRpcProvider`\>

#### Defined in

[src/context/connectors/StaticJsonRpcProviderConnector.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/context/connectors/StaticJsonRpcProviderConnector.ts#L9)

___

### useDexEthPrice

▸ `Const` **useDexEthPrice**(`mainnetProvider`, `targetNetworkInfo?`, `pollTime?`): `number`

Get the Exchange price of ETH/USD (extrapolated from WETH/DAI)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) | `undefined` | (TEthersProvider) |
| `targetNetworkInfo?` | [`TNetworkInfo`](modules.md#tnetworkinfo) | `undefined` | (TNetwork) |
| `pollTime` | `number` | `0` | (number) :: if >0 use polling, else use instead of onBlock event |

#### Returns

`number`

(number) :: price

#### Defined in

[src/dapps/useDexEthPrice.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/dapps/useDexEthPrice.ts#L15)

___

### useDexTokenList

▸ `Const` **useDexTokenList**(`tokenListUri?`, `chainId?`): `TokenInfo`[]

Gets a tokenlist (see more at https://tokenlists.org/), returning the .tokens only

~ How can I use? ~
const tokenList = useTokenList(); <- default returns the Unsiwap tokens
const tokenList = useTokenList("https://gateway.ipfs.io/ipns/tokens.uniswap.org");

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tokenListUri` | `string` | `'https://gateway.ipfs.io/ipns/tokens.uniswap.org'` | (string) |
| `chainId?` | `number` | `undefined` | (number) |

#### Returns

`TokenInfo`[]

(TokenInfo[])

#### Defined in

[src/dapps/useDexTokenList.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/dapps/useDexTokenList.ts#L15)

___

### useEnsAddress

▸ `Const` **useEnsAddress**(`mainnetProvider`, `address`): `string`

Gets ENS name from given address and provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) | (TEthersProvider) |
| `address` | `string` | (string) |

#### Returns

`string`

(string) ens name

#### Defined in

[src/dapps/useEnsAddress.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/dapps/useEnsAddress.ts#L33)

___

### useEnsResolveName

▸ `Const` **useEnsResolveName**(`mainnetProvider`, `ensName`): `string`

Gets the address from an ENS name and provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | [`TEthersProvider`](modules.md#tethersprovider) | (TEthersProvider) |
| `ensName` | `string` | (string) |

#### Returns

`string`

(string) :: address

#### Defined in

[src/dapps/useEnsResolveName.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/dapps/useEnsResolveName.ts#L12)

___

### useTokenBalance

▸ `Const` **useTokenBalance**(`contract`, `address`, `pollTime?`): `BigNumber`

Get the balance of an ERC20 token in an address

~ Features ~
- Provide address and get balance corresponding to given address
- Change provider to access balance on different chains (ex. mainnetProvider)
- If no pollTime is passed, the balance will update on every new block

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contract` | `Contract` | `undefined` | (ethers->Contract) contract object for the ERC20 token |
| `address` | `string` | `undefined` | (string) |
| `pollTime` | `number` | `0` | (number) :: if >0 use polling, else use instead of onBlock event |

#### Returns

`BigNumber`

(BigNumber) :: balance

#### Defined in

[src/erc/useTokenBalance.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/erc/useTokenBalance.ts#L21)

___

### asyncSome

▸ `Const` **asyncSome**<`T`\>(`arr`, `predicate`): `Promise`<`undefined` \| `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `predicate` | (`item`: `T`) => `Promise`<`boolean`\> |

#### Returns

`Promise`<`undefined` \| `T`\>

#### Defined in

[src/functions/asyncSome.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/functions/asyncSome.ts#L1)

___

### isEthersProvider

▸ `Const` **isEthersProvider**(`providerBase`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerBase` | `unknown` |

#### Returns

`boolean`

#### Defined in

[src/functions/ethersHelpers.ts:3](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/functions/ethersHelpers.ts#L3)

___

### parseProviderOrSigner

▸ `Const` **parseProviderOrSigner**(`providerOrSigner`): `Promise`<[`TEthersUser`](modules.md#tethersuser)\>

Parse TEthersProviderOrSigner to TProviderAndSigner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `providerOrSigner` | `undefined` \| [`TEthersProviderOrSigner`](modules.md#tethersproviderorsigner) | TEthersProviderOrSigner |

#### Returns

`Promise`<[`TEthersUser`](modules.md#tethersuser)\>

TProviderAndSigner

#### Defined in

[src/functions/parseProviderOrSigner.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/functions/parseProviderOrSigner.ts#L11)

___

### lazier

▸ `Const` **lazier**<`T`\>(`importFactory`, `importName`): `LazyExoticComponent`<`T`\>

modified react lazy to allow for named exports
e.g. export const ExampleUI = lazier(() => import('./exampleui/ExampleUI'), 'ExampleUI');

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ComponentType`<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `importFactory` | () => `Promise`<`Object`\> | a callback that imports e.g. () => import('./exampleui/ExampleUI') |
| `importName` | `string` | the named export you want to import. |

#### Returns

`LazyExoticComponent`<`T`\>

#### Defined in

[src/helpers/lazier.ts:10](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/helpers/lazier.ts#L10)

___

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

[src/useContractExistsAtAddress.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useContractExistsAtAddress.ts#L9)

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
| `contractFunctionInfo` | [`TContractFunctionInfo`](modules.md#tcontractfunctioninfo) | - |
| `formatter?` | (`_value`: `T`) => `T` | ((_value: T) => T) :: optional :: function to format the result |
| `onChange?` | (`_value?`: `T`) => `void` | (string) :: optional :: callback to call with the function |

#### Returns

`undefined` \| `T`

(<T>) :: generic return type

#### Defined in

[src/useContractReader.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useContractReader.ts#L29)

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

[src/useEventListener.ts:26](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useEventListener.ts#L26)

___

### useGasPrice

▸ `Const` **useGasPrice**(`chainId`, `speed`, `currentNetworkInfo?`): `undefined` \| `number`

Gets the gas price from Eth Gas Station.  as gwei

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `undefined` \| `number` | - |
| `speed` | [`TGasStationSpeed`](modules.md#tgasstationspeed) | (TGasStationSpeed) 'fast', 'fastest', 'safeLow', 'average' |
| `currentNetworkInfo?` | [`TNetworkInfo`](modules.md#tnetworkinfo) | (TNetwork) fallback config with gas price |

#### Returns

`undefined` \| `number`

(number) gas price in gwei

#### Defined in

[src/useGasPrice.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useGasPrice.ts#L27)

___

### useGetUserFromProviders

▸ `Const` **useGetUserFromProviders**(`currentProvider`, ...`moreProviders`): [`TEthersUser`](modules.md#tethersuser)

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
| `currentProvider` | `undefined` \| [`TEthersProvider`](modules.md#tethersprovider) |
| `...moreProviders` | [`TEthersProvider`](modules.md#tethersprovider)[] |

#### Returns

[`TEthersUser`](modules.md#tethersuser)

(TProviderAndSigner)

#### Defined in

[src/useGetUserFromProviders.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useGetUserFromProviders.ts#L22)

___

### useGetUserFromSigners

▸ `Const` **useGetUserFromSigners**(`currentSigner`): [`TEthersUser`](modules.md#tethersuser)

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

[`TEthersUser`](modules.md#tethersuser)

(TProviderAndSigner)

#### Defined in

[src/useGetUserFromSigners.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useGetUserFromSigners.ts#L21)

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

[src/useNonce.ts:14](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useNonce.ts#L14)

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

[src/useOnRepetition.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useOnRepetition.ts#L29)

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

[src/useTimestamp.ts:13](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useTimestamp.ts#L13)

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

[src/useUserAddress.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useUserAddress.ts#L11)

___

### useWeb3Modal

▸ `Const` **useWeb3Modal**(`web3ModalConfig`, `setCurrentEthersProvider`): [`IWeb3ModalState`](interfaces/IWeb3ModalState.md)

A hook that makes it easy to use web3Modal

#### Parameters

| Name | Type |
| :------ | :------ |
| `web3ModalConfig` | `Partial`<`ICoreOptions`\> |
| `setCurrentEthersProvider` | (`newEthersProvider`: `undefined` \| [`TEthersProvider`](modules.md#tethersprovider)) => `void` |

#### Returns

[`IWeb3ModalState`](interfaces/IWeb3ModalState.md)

#### Defined in

[src/useWeb3Modal.ts:22](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useWeb3Modal.ts#L22)

## Variables

### BlockNumberContext

• **BlockNumberContext**: `FC`<`IProps`\>

#### Defined in

[src/context/BlockNumberContext.tsx:39](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/context/BlockNumberContext.tsx#L39)

___

### EthersAppContext

• **EthersAppContext**: `FC`

#### Defined in

[src/context/EthersAppContext.tsx:109](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/context/EthersAppContext.tsx#L109)

## Type aliases

### CreateEthersModalConnector

Ƭ **CreateEthersModalConnector**: () => [`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

#### Type declaration

▸ (): [`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

##### Returns

[`EthersModalConnector`](classes/EthersModalConnector.md) \| `undefined`

#### Defined in

[src/context/EthersAppContext.tsx:13](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/context/EthersAppContext.tsx#L13)

___

### TDeployedContracts

Ƭ **TDeployedContracts**: `Object`

Contracts deployed by hardhat
- {chainIds: { networkNames: {contracts} }}, contains an record of contracts
- Used by [useContractLoader](modules.md#usecontractloader)

#### Index signature

▪ [key: `string`]: { [key: string]: { `name`: `string` ; `chainId`: `string` ; `contracts`: `Record`<`string`, `Contract`\>  };  }

#### Defined in

[src/models/contractTypes.ts:8](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/models/contractTypes.ts#L8)

___

### TExternalContracts

Ƭ **TExternalContracts**: `Object`

A type for external contracts
- {chainId: {contracts}}, contains an record of contracts
- Used by [useContractLoader](modules.md#usecontractloader)

#### Index signature

▪ [key: `number`]: { `name?`: `string` ; `chainId?`: `string` ; `contracts?`: `Record`<`string`, `Contract`\>  }

#### Defined in

[src/models/contractTypes.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/models/contractTypes.ts#L23)

___

### TContractFunctionInfo

Ƭ **TContractFunctionInfo**: `Object`

Contract function information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |
| `functionName` | `string` |
| `functionArgs?` | `any`[] |

#### Defined in

[src/models/contractTypes.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/models/contractTypes.ts#L34)

___

### TNetworkInfo

Ƭ **TNetworkInfo**: `Object`

Simple type to describe a network in scaffold-eth

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `color` | `string` |
| `chainId` | `number` |
| `rpcUrl` | `string` |
| `faucet?` | `string` |
| `blockExplorer` | `string` |
| `price?` | `number` |
| `gasPrice?` | `number` |

#### Defined in

[src/models/networkTypes.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/models/networkTypes.ts#L4)

___

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

A union of various providers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:6](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/models/providerTypes.ts#L6)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer`

A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/models/providerTypes.ts#L11)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

A union of abstract, non initalizable providers, used by some functions

#### Defined in

[src/models/providerTypes.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/models/providerTypes.ts#L16)

___

### TEthersUser

Ƭ **TEthersUser**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` \| `undefined` |
| `provider` | [`TEthersProvider`](modules.md#tethersprovider) \| `undefined` |
| `providerNetwork` | `ethers.providers.Network` \| `undefined` |
| `address` | `string` \| `undefined` |

#### Defined in

[src/models/providerTypes.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/models/providerTypes.ts#L20)

___

### TContractConfig

Ƭ **TContractConfig**: `Object`

Configuration for useContractLoader

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hardhatNetworkName?` | `string` | your local hardhat network name |
| `customAddresses?` | `Record`<`string`, `string`\> | the address:contractName key value pair |
| `deployedContracts?` | [`TDeployedContracts`](modules.md#tdeployedcontracts) | Hardhat deployed contracts |
| `externalContracts?` | [`TExternalContracts`](modules.md#texternalcontracts) | External contracts (such as DAI) |

#### Defined in

[src/useContractLoader.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useContractLoader.ts#L11)

___

### TGasStationSpeed

Ƭ **TGasStationSpeed**: ``"fast"`` \| ``"fastest"`` \| ``"safeLow"`` \| ``"average"``

Preset speeds for Eth Gas Station
fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

#### Defined in

[src/useGasPrice.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/23917e9/src/useGasPrice.ts#L18)
