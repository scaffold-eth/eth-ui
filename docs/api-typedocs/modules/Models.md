[eth-hooks - v4.0.25](../README.md) / Models

# Module: Models

Types and constants to make it easier to interact with ethers.

## Table of contents

### Variables

- [const\_web3DialogClosedByUser](Models.md#const_web3dialogclosedbyuser)
- [keyNamespace](Models.md#keynamespace)
- [const\_blockNumberIntervalShort](Models.md#const_blocknumberintervalshort)
- [const\_blockNumberIntervalMedium](Models.md#const_blocknumberintervalmedium)
- [const\_blockNumberIntervalLong](Models.md#const_blocknumberintervallong)

### EthersContext Type aliases

- [TCreateEthersModalConnector](Models.md#tcreateethersmodalconnector)

### Models Type aliases

- [TDeployedHardhatContractsJson](Models.md#tdeployedhardhatcontractsjson)
- [TExternalContractsAddressMap](Models.md#texternalcontractsaddressmap)
- [TContractFunctionInfo](Models.md#tcontractfunctioninfo)
- [TNetworkInfo](Models.md#tnetworkinfo)
- [TEthersProvider](Models.md#tethersprovider)
- [TEthersProviderOrSigner](Models.md#tethersproviderorsigner)
- [TEthersSigner](Models.md#tetherssigner)
- [TAbstractProvider](Models.md#tabstractprovider)
- [TypedEventFilter](Models.md#typedeventfilter)
- [TypedEvent](Models.md#typedevent)
- [DeepPartial](Models.md#deeppartial)

### Misc Type aliases

- [TConnectorConnectorBase](Models.md#tconnectorconnectorbase)
- [TContractConnector](Models.md#tcontractconnector)
- [TBaseContractExtended](Models.md#tbasecontractextended)
- [TConnectorList](Models.md#tconnectorlist)
- [TTypedContract](Models.md#ttypedcontract)
- [TContractsByName](Models.md#tcontractsbyname)
- [TContractsByChainId](Models.md#tcontractsbychainid)
- [TAppContractsContext](Models.md#tappcontractscontext)
- [TBasicContractData](Models.md#tbasiccontractdata)
- [TBasicContractDataConfig](Models.md#tbasiccontractdataconfig)
- [THardhatContractDataRecord](Models.md#thardhatcontractdatarecord)
- [TExternalContractDataRecord](Models.md#texternalcontractdatarecord)
- [TQueryOptions](Models.md#tqueryoptions)
- [TUpdateOptions](Models.md#tupdateoptions)
- [TOverride](Models.md#toverride)
- [THookResult](Models.md#thookresult)

### Type Definition Type aliases

- [TEthersAdaptor](Models.md#tethersadaptor)

### EthersContext Interfaces

- [IEthersContext](../interfaces/Models.IEthersContext.md)

### Functions

- [defaultOverride](Models.md#defaultoverride)
- [defaultUpdateOptions](Models.md#defaultupdateoptions)

## Variables

### const\_web3DialogClosedByUser

• **const\_web3DialogClosedByUser**: ``"Modal closed by user"``

#### Defined in

[src/models/constants/common.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/constants/common.ts#L1)

___

### keyNamespace

• **keyNamespace**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `network` | ``"network"`` |
| `signer` | ``"signer"`` |
| `contracts` | ``"contracts"`` |
| `state` | ``"state"`` |

#### Defined in

[src/models/constants/keyNamespace.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/constants/keyNamespace.ts#L1)

___

### const\_blockNumberIntervalShort

• **const\_blockNumberIntervalShort**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Summary
An constant for block number interval of 10 blocks

#### Defined in

[src/models/hookTypes.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L11)

___

### const\_blockNumberIntervalMedium

• **const\_blockNumberIntervalMedium**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Summary
An constant for block number interval of 50 blocks

#### Defined in

[src/models/hookTypes.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L17)

___

### const\_blockNumberIntervalLong

• **const\_blockNumberIntervalLong**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Summary
An constant for block number interval of 250 blocks

#### Defined in

[src/models/hookTypes.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L23)

## EthersContext Type aliases

### TCreateEthersModalConnector

Ƭ **TCreateEthersModalConnector**: (`id?`: `string`) => [`TEthersModalConnector`](EthersContext.md#tethersmodalconnector) \| `undefined`

#### Type declaration

▸ (`id?`): [`TEthersModalConnector`](EthersContext.md#tethersmodalconnector) \| `undefined`

#### Summary
A callback type that returns a EthersModalConnector

##### ✏️ Notes
- can be used by components that need to give a connector to [IEthersContext.openModal](../interfaces/Models.IEthersContext.md#openmodal)
- id is the identifier of the provider:  [See docs](https://github.com/Web3Modal/web3modal#connect-to-specific-provider)

##### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

##### Returns

[`TEthersModalConnector`](EthersContext.md#tethersmodalconnector) \| `undefined`

#### Defined in

[src/models/ethersAppContextTypes.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/ethersAppContextTypes.ts#L17)

___

## Models Type aliases

### TDeployedHardhatContractsJson

Ƭ **TDeployedHardhatContractsJson**: `Object`

#### Summary
Describes the structure of hardhat_contracts.json
- {chainIds: { networkNames: {contracts} }}, contains an record of contracts
- Used by [useContractLoader](Hooks.md#usecontractloader)

#### Index signature

▪ [chainId: `string`]: { [networkName: string]: { `name`: `string` ; `chainId`: `string` ; `contracts`: { [contractName: string]: { `address`: `string` ; `abi?`: `any`[]  };  }  };  }

#### Defined in

[src/models/contractTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractTypes.ts#L50)

___

### TExternalContractsAddressMap

Ƭ **TExternalContractsAddressMap**: `Object`

{chainId: {contract: address}}, contains an record of contracts
#### Summary
A type for external contracts
- it is a record of contract names and their deployed address
- this data type is used by {@link ContractsAppContext} to connect to external contracts

#### Index signature

▪ [chainId: `number`]: { [contractName: string]: `string`;  }

#### Defined in

[src/models/contractTypes.ts:74](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractTypes.ts#L74)

___

### TContractFunctionInfo

Ƭ **TContractFunctionInfo**: `Object`

#### Summary
Contract function information:
- contractName
- functionname
- functionArgs: functionArguments, an array

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |
| `functionName` | `string` |
| `functionArgs?` | `any`[] |

#### Defined in

[src/models/contractTypes.ts:89](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractTypes.ts#L89)

___

### TNetworkInfo

Ƭ **TNetworkInfo**: `Object`

#### Summary
A type that describes the basics of a network for applications. e.g. mainnet, ropsten, rinkeby, etc.

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

[src/models/networkTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/networkTypes.ts#L7)

___

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

#### Summary
A union of various ethers providers for ease of use and maximum flexiblity

##### ✏️ Notes
Used by eth-hooks, eth-components and scaffold-eth-typescript

#### Defined in

[src/models/providerTypes.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/providerTypes.ts#L19)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Summary
A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/providerTypes.ts#L27)

___

### TEthersSigner

Ƭ **TEthersSigner**: `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Summary
A union of various providers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/providerTypes.ts#L42)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

#### Summary
A union of abstract, non initalizable providers, used by some functions

#### Defined in

[src/models/providerTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/providerTypes.ts#L50)

___

### TypedEventFilter

Ƭ **TypedEventFilter**<`_EventArgsArray`, `_EventArgsObject`\>: `EventFilter`

#### Summary
An generic extension of EventFilter that is used by TypedEvent.  It allows for typed events to be returned

#### Type parameters

| Name | Type |
| :------ | :------ |
| `_EventArgsArray` | extends `any`[] |
| `_EventArgsObject` | extends `Record`<`string`, `any`\> |

#### Defined in

[src/models/providerTypes.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/providerTypes.ts#L58)

___

### TypedEvent

Ƭ **TypedEvent**<`EventArgs`\>: `Event` & { `args`: `EventArgs`  }

#### Summary
An generic extension of Event.  It types the the arguments and return values of the contract event to be used in typescript.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgs` | extends `Result` |

#### Defined in

[src/models/providerTypes.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/providerTypes.ts#L69)

___

### DeepPartial

Ƭ **DeepPartial**<`T`\>: { [P in keyof T]?: DeepPartial<T[P]\> }

#### Summary
Similar to [partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) int typescript but allows deep partial types.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/models/utilityTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/utilityTypes.ts#L7)

___

## Misc Type aliases

### TConnectorConnectorBase

Ƭ **TConnectorConnectorBase**<`GContract`\>: `Readonly`<{ `connect`: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` ; `abi`: `Readonly`<`Record`<`string`, `any`\>[]\>  }\>

#### Summary
This types describes a base for a connnector.  A contract connector would be a a conception that is the minimum required to connect to a contract.  It has a connector function that returns a typed contract and abi that has contract information.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract` |

#### Defined in

[src/models/contractAppContextTypes.ts:10](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractAppContextTypes.ts#L10)

___

### TContractConnector

Ƭ **TContractConnector**<`GContractNames`, `GContract`\>: `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  } & [`TConnectorConnectorBase`](Models.md#tconnectorconnectorbase)<`GContract`\>\>

#### Summary
This type descripts a connector that has enough information to create a contract in a chain.  The contractName is required to use a group of connectors to create a connection of available contracts for the app.

##### Notes
- The config would be a record of chain information that helps the factory create contracts for the app.
- based on [TConnectorConnectorBase](Models.md#tconnectorconnectorbase) and uses [TBasicContractDataConfig](Models.md#tbasiccontractdataconfig)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContract` | extends `BaseContract` |

#### Defined in

[src/models/contractAppContextTypes.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractAppContextTypes.ts#L23)

___

### TBaseContractExtended

Ƭ **TBaseContractExtended**<`GContractNames`\>: `BaseContract` & { `contractName`: `GContractNames`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |

#### Defined in

[src/models/contractAppContextTypes.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractAppContextTypes.ts#L34)

___

### TConnectorList

Ƭ **TConnectorList**<`GContractNames`, `GContracts`\>: { [contractName in GContractNames]: TContractConnector<GContractNames, GContracts\> }

#### Summary
A Record of typed connectors that can be used to create a contract.

##### Notes
- used by [TAppContractsContext](Models.md#tappcontractscontext)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\> |

#### Defined in

[src/models/contractAppContextTypes.ts:43](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractAppContextTypes.ts#L43)

___

### TTypedContract

Ƭ **TTypedContract**<`GContractNames`, `GAppContractConnectorList`\>: `GAppContractConnectorList` extends { [key in GContractNames]: Object } ? `TypedContract` : [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\>

#### Summary
A type that infers contract type `(extended from BaseContract)` based on connectors and contractName.  For example `DAI` from `{ DAI: { connect: ... } }`.  If the contractName is not found, it will return a BaseContract

##### Notes
- used by {@link contractContextFactory}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GAppContractConnectorList` | `GAppContractConnectorList` |

#### Defined in

[src/models/contractAppContextTypes.ts:54](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractAppContextTypes.ts#L54)

___

### TContractsByName

Ƭ **TContractsByName**<`GContractNames`, `GContracts`\>: { [contractName in GContractNames]: { [chainId in number]: GContracts \| undefined } }

#### Summary
A utility type for typed contracts by name and then by chain

##### Notes
- used by [TAppContractsContext](Models.md#tappcontractscontext)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\> |

#### Defined in

[src/models/contractAppContextTypes.ts:70](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractAppContextTypes.ts#L70)

___

### TContractsByChainId

Ƭ **TContractsByChainId**<`GContractNames`, `GContracts`\>: { [chainId in number]: { [contractName in GContractNames]: GContracts \| undefined } }

#### Summary
A utility type for typed contracts by chain and then by name

##### Notes
- used by [TAppContractsContext](Models.md#tappcontractscontext)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\> |

#### Defined in

[src/models/contractAppContextTypes.ts:82](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractAppContextTypes.ts#L82)

___

### TAppContractsContext

Ƭ **TAppContractsContext**<`GContractNames`, `GContracts`\>: `Object`

Describes the current ContractsContext for the app used by the context created by {@link contractContextFactory}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended)<`GContractNames`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractConnectors` | [`TConnectorList`](Models.md#tconnectorlist)<`GContractNames`, `GContracts`\> |
| `contractsByName` | [`TContractsByName`](Models.md#tcontractsbyname)<`GContractNames`, `GContracts`\> |
| `contractsByChainId` | [`TContractsByChainId`](Models.md#tcontractsbychainid)<`GContractNames`, `GContracts`\> |

#### Defined in

[src/models/contractAppContextTypes.ts:94](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractAppContextTypes.ts#L94)

___

### TBasicContractData

Ƭ **TBasicContractData**: `Object`

#### Summary
Describes the sctructure of each contract in hardhat_contracts.json

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `abi?` | `any`[] |

#### Defined in

[src/models/contractTypes.ts:5](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractTypes.ts#L5)

___

### TBasicContractDataConfig

Ƭ **TBasicContractDataConfig**: `Object`

#### Index signature

▪ [chainId: `number`]: { `chainId`: `number` ; `address`: `string`  }

#### Defined in

[src/models/contractTypes.ts:10](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractTypes.ts#L10)

___

### THardhatContractDataRecord

Ƭ **THardhatContractDataRecord**: `Object`

#### Summary
Contracts by contract name
- A record of contract names and their hardhat contract json
- includes chain id

#### Index signature

▪ [contractName: `string`]: { `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig) ; `abi`: `any`[]  }

#### Defined in

[src/models/contractTypes.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractTypes.ts#L23)

___

### TExternalContractDataRecord

Ƭ **TExternalContractDataRecord**: `Object`

#### Summary
Contracts by contract name
- A record of contract names and their hardhat contract json
- includes chain id

#### Index signature

▪ [contractName: `string`]: { `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig)  }

#### Defined in

[src/models/contractTypes.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/contractTypes.ts#L36)

___

### TQueryOptions

Ƭ **TQueryOptions**<`GResult`\>: `Omit`<`QueryObserverOptions`<`GResult`, `any`\>, ``"refetchInterval"`` \| ``"notifyOnChangeProps"`` \| ``"notifyOnChangePropsExclusions"`` \| ``"select"``\>

#### Type parameters

| Name |
| :------ |
| `GResult` |

#### Defined in

[src/models/hookTypes.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L25)

___

### TUpdateOptions

Ƭ **TUpdateOptions**<`GResult`\>: `Object`

#### Summary
Options for hooks that describe the behviour of updates.
By default, depending on the hook, it will update every block.

##### ✏️ Notes
The following options are available:
- interval: interval in blocknumber to update in (default 1) see {@link TUpdateOptions.blockNumberInterval}
- polling: in ms, should be over 10000ms.  This is set by {@link TUpdateOptions.query.refetchInterval}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GResult` | `any` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockNumberInterval` | `number` \| `undefined` | The interval in blocknumber for the hook to update in (default 1) |
| `refetchInterval?` | `number` | - |
| `query?` | [`TQueryOptions`](Models.md#tqueryoptions)<`GResult`\> | - |

#### Defined in

[src/models/hookTypes.ts:40](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L40)

___

### TOverride

Ƭ **TOverride**: `Object`

#### Summary
Ethers Provider options.  By default, the context provider is used by the hook.  If you want to use a different provider, you can:
- pass in an [TEthersAdaptor](Models.md#tethersadaptor) to override the provider
- give the alternateContextKey for a secondary context provider.

##### ✏️ Notes
Adaptor
- To create a adaptor from a provider/signer see {@link useGetEthersAdaptorFromSignerOrProvider}
- You need to set adaptorEnabled to true

Alternate Context Key
- For more info on alternateContextKey, see [TEthersAppContextProps](EthersContext.md#tethersappcontextprops) and [web3-react docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `adaptorEnabled` | `boolean` | An enable override adaptor (ethers provider) for this hook |
| `adaptor` | [`TEthersAdaptor`](Models.md#tethersadaptor) \| `undefined` | The alternate adaptor to use.  See [TEthersAdaptor](Models.md#tethersadaptor) |
| `alternateContextKey?` | `string` | The alternate context key to use.  See [TEthersAppContextProps](EthersContext.md#tethersappcontextprops) |

#### Defined in

[src/models/hookTypes.ts:63](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L63)

___

### THookResult

Ƭ **THookResult**<`T`\>: [result: T, update: Function, status: QueryStatus]

#### Summary
This type describes the tuple that is returned by most hooks
1. result: the result of the hook
2. update: a callback will refresh the results of hook manually
3. status: the status of the query.  From react-query: 'idle' | 'loading' | 'error' | 'success'. You can use this for UX purposes, see {@link QueryStatus}.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/models/hookTypes.ts:114](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L114)

___

## Type Definition Type aliases

### TEthersAdaptor

Ƭ **TEthersAdaptor**: `Object`

#### Summary
Essentially a object that allows interaction with the network:
- provider signer,

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signer?` | [`TEthersSigner`](Models.md#tetherssigner) |
| `provider?` | [`TEthersProvider`](Models.md#tethersprovider) |
| `chainId?` | `number` |
| `account?` | `string` |

#### Defined in

[src/models/ethersAppContextTypes.ts:49](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/ethersAppContextTypes.ts#L49)

## Functions

### defaultOverride

▸ `Const` **defaultOverride**(): [`TOverride`](Models.md#toverride)

An helper to create the default override settings for hooks

#### Returns

[`TOverride`](Models.md#toverride)

#### Defined in

[src/models/hookTypes.ts:83](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L83)

___

### defaultUpdateOptions

▸ `Const` **defaultUpdateOptions**<`GResult`\>(): [`TUpdateOptions`](Models.md#tupdateoptions)<`GResult`\>

A helper to create default update options for hooks

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GResult` | `any` |

#### Returns

[`TUpdateOptions`](Models.md#tupdateoptions)<`GResult`\>

#### Defined in

[src/models/hookTypes.ts:95](https://github.com/scaffold-eth/eth-hooks/blob/75acc7e/src/models/hookTypes.ts#L95)
