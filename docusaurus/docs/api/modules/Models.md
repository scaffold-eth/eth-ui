---
id: "Models"
title: "Module: Models"
sidebar_label: "Models"
sidebar_position: 0
custom_edit_url: null
---

Types and constants to make it easier to interact with ethers.

## EthersAppContext Type aliases

- [TCreateEthersModalConnector](Models.md#tcreateethersmodalconnector-4)

## Models Type aliases

- [TBasicContractData](Models.md#tbasiccontractdata-4)
- [TBasicContractDataConfig](Models.md#tbasiccontractdataconfig-4)
- [TDeployedHardhatContractsJson](Models.md#tdeployedhardhatcontractsjson-4)
- [TExternalContractsAddressMap](Models.md#texternalcontractsaddressmap-4)
- [TContractFunctionInfo](Models.md#tcontractfunctioninfo-4)
- [TNetworkInfo](Models.md#tnetworkinfo-4)
- [TEthersProvider](Models.md#tethersprovider-4)
- [TEthersProviderOrSigner](Models.md#tethersproviderorsigner-4)
- [TEthersSigner](Models.md#tetherssigner-4)
- [TAbstractProvider](Models.md#tabstractprovider-4)
- [TypedEventFilter](Models.md#typedeventfilter-4)
- [TypedEvent](Models.md#typedevent-4)
- [DeepPartial](Models.md#deeppartial-4)

## Misc Type aliases

- [TContractConnectFunc](Models.md#tcontractconnectfunc-4)
- [TContractConnectorBase](Models.md#tcontractconnectorbase-4)
- [TContractConnector](Models.md#tcontractconnector-4)
- [TBaseContractExtended](Models.md#tbasecontractextended-4)
- [TConnectorList](Models.md#tconnectorlist-4)
- [TTypedContract](Models.md#ttypedcontract-4)
- [TContractsByName](Models.md#tcontractsbyname-4)
- [TContractsByChainId](Models.md#tcontractsbychainid-4)
- [TAppContractsContext](Models.md#tappcontractscontext-4)
- [THardhatContractDataRecord](Models.md#thardhatcontractdatarecord-4)
- [TExternalContractDataRecord](Models.md#texternalcontractdatarecord-4)
- [TQueryOptions](Models.md#tqueryoptions-4)
- [TUpdateOptions](Models.md#tupdateoptions-4)
- [TOverride](Models.md#toverride-4)
- [THookResult](Models.md#thookresult-4)

## Type Definition Type aliases

- [TEthersAdaptor](Models.md#tethersadaptor-4)

## EthersAppContext Interfaces

- [IEthersContext](../interfaces/Models.IEthersContext.md)

## Variables

### const\_web3DialogClosedByUser

• `Const` **const\_web3DialogClosedByUser**: ``"Modal closed by user"``

#### Defined in

[models/constants/common.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/constants/common.ts#L1)

___

### const\_web3DialogUserRejected

• `Const` **const\_web3DialogUserRejected**: ``"Error: User Rejected"``

#### Defined in

[models/constants/common.ts:2](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/constants/common.ts#L2)

___

### keyNamespace

• `Const` **keyNamespace**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `network` | ``"network"`` |
| `signer` | ``"signer"`` |
| `contracts` | ``"contracts"`` |
| `state` | ``"state"`` |

#### Defined in

[models/constants/keyNamespace.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/constants/keyNamespace.ts#L1)

___

### const\_blockNumberIntervalShort

• `Const` **const\_blockNumberIntervalShort**: [`DeepPartial`](Models.md#deeppartial-4)<[`TUpdateOptions`](Models.md#tupdateoptions-4)\>

#### Summary
An constant for block number interval of 10 blocks

#### Defined in

[models/hookTypes.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L11)

___

### const\_blockNumberIntervalMedium

• `Const` **const\_blockNumberIntervalMedium**: [`DeepPartial`](Models.md#deeppartial-4)<[`TUpdateOptions`](Models.md#tupdateoptions-4)\>

#### Summary
An constant for block number interval of 50 blocks

#### Defined in

[models/hookTypes.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L17)

___

### const\_blockNumberIntervalLong

• `Const` **const\_blockNumberIntervalLong**: [`DeepPartial`](Models.md#deeppartial-4)<[`TUpdateOptions`](Models.md#tupdateoptions-4)\>

#### Summary
An constant for block number interval of 250 blocks

#### Defined in

[models/hookTypes.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L23)

## EthersAppContext Type aliases

### TCreateEthersModalConnector

Ƭ **TCreateEthersModalConnector**: (`id?`: `string`) => [`TEthersModalConnector`](EthersAppContext.md#tethersmodalconnector-4) \| `undefined`

#### Type declaration

▸ (`id?`): [`TEthersModalConnector`](EthersAppContext.md#tethersmodalconnector-4) \| `undefined`

#### Summary
A callback type that returns a EthersModalConnector

##### ✏️ Notes
- can be used by components that need to give a connector to [IEthersContext.openModal](../interfaces/Models.IEthersContext.md#openmodal-4)
- id is the identifier of the provider:  [See docs](https://github.com/Web3Modal/web3modal#connect-to-specific-provider)

##### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

##### Returns

[`TEthersModalConnector`](EthersAppContext.md#tethersmodalconnector-4) \| `undefined`

#### Defined in

[models/ethersAppContextTypes.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/ethersAppContextTypes.ts#L17)

___

## Models Type aliases

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

[models/contractTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractTypes.ts#L7)

___

### TBasicContractDataConfig

Ƭ **TBasicContractDataConfig**: `Object`

#### Summary
Describes a basic contract data record, the chainId and address

#### Index signature

▪ [chainId: `number`]: { `chainId`: `number` ; `address`: `string`  }

#### Defined in

[models/contractTypes.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractTypes.ts#L18)

___

### TDeployedHardhatContractsJson

Ƭ **TDeployedHardhatContractsJson**: `Object`

#### Summary
Describes the structure of hardhat_contracts.json
- {chainIds: { networkNames: {contracts} }}, contains an record of contracts
- Used by [useContractLoader](Hooks.md#usecontractloader-4)

#### Index signature

▪ [chainId: `string`]: { `name`: `string` ; `chainId`: `string` ; `contracts`: { `[contractName: string]`: { `address`: `string` ; `abi?`: `any`[]  };  }  }[]

#### Defined in

[models/contractTypes.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractTypes.ts#L58)

___

### TExternalContractsAddressMap

Ƭ **TExternalContractsAddressMap**: `Object`

{chainId: {contract: address}}, contains an record of contracts
#### Summary
A type for external contracts
- it is a record of contract names and their deployed address
- this data type is used by {@link ContractsAppContext} to connect to external contracts

#### Index signature

▪ [chainId: `number`]: { `[contractName: string]`: `string`;  }

#### Defined in

[models/contractTypes.ts:80](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractTypes.ts#L80)

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

[models/contractTypes.ts:95](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractTypes.ts#L95)

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
| `url` | `string` |
| `faucet?` | `string` |
| `blockExplorer` | `string` |
| `price?` | `number` |
| `gasPrice?` | `number` |

#### Defined in

[models/networkTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/networkTypes.ts#L7)

___

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

#### Summary
A union of various ethers providers for ease of use and maximum flexiblity

##### ✏️ Notes
Used by eth-hooks, eth-components and scaffold-eth-typescript

#### Defined in

[models/providerTypes.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/providerTypes.ts#L19)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Summary
A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[models/providerTypes.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/providerTypes.ts#L27)

___

### TEthersSigner

Ƭ **TEthersSigner**: `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Summary
A union of various providers in ethers to give maximum flexibility

#### Defined in

[models/providerTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/providerTypes.ts#L42)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

#### Summary
A union of abstract, non initalizable providers, used by some functions

#### Defined in

[models/providerTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/providerTypes.ts#L50)

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

[models/providerTypes.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/providerTypes.ts#L58)

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

[models/providerTypes.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/providerTypes.ts#L69)

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

[models/utilityTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/utilityTypes.ts#L7)

___

## Misc Type aliases

### TContractConnectFunc

Ƭ **TContractConnectFunc**<`GContract`\>: (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract` |

#### Type declaration

▸ (`address`, `signerOrProvider`): `GContract`

A function that connects to a contract.  Used by [TContractConnectorBase](Models.md#tcontractconnectorbase-4).  This is usually something generated by typechain and is used to connect to contract on the blockchain.

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `signerOrProvider` | `Signer` \| `Provider` |

##### Returns

`GContract`

#### Defined in

[models/contractAppContextTypes.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L9)

___

### TContractConnectorBase

Ƭ **TContractConnectorBase**<`GContract`\>: `Readonly`<{ `connect`: [`TContractConnectFunc`](Models.md#tcontractconnectfunc-4)<`GContract`\> ; `abi`: `Readonly`<`Record`<`string`, `any`\>[]\>  }\>

#### Summary
This types describes a base for a connnector.  A contract connector would be a a conception that is the minimum required to connect to a contract.  It has a connector function that returns a typed contract and abi that has contract information.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract` |

#### Defined in

[models/contractAppContextTypes.ts:18](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L18)

___

### TContractConnector

Ƭ **TContractConnector**<`GContractNames`, `GContract`\>: `Readonly`<{ `contractName`: `GContractNames` ; `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig-4)  } & [`TContractConnectorBase`](Models.md#tcontractconnectorbase-4)<`GContract`\>\>

#### Summary
This type descripts a connector that has enough information to create a contract in a chain.  The contractName is required to use a group of connectors to create a connection of available contracts for the app.

##### ✏️ Notes
- The config would be a record of chain information that helps the factory create contracts for the app.
- based on [TContractConnectorBase](Models.md#tcontractconnectorbase-4) and uses [TBasicContractDataConfig](Models.md#tbasiccontractdataconfig-4)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContract` | extends `BaseContract` |

#### Defined in

[models/contractAppContextTypes.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L31)

___

### TBaseContractExtended

Ƭ **TBaseContractExtended**<`GContractNames`\>: `BaseContract` & { `contractName`: `GContractNames`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |

#### Defined in

[models/contractAppContextTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L42)

___

### TConnectorList

Ƭ **TConnectorList**<`GContractNames`, `GContracts`\>: { [contractName in GContractNames]: TContractConnector<GContractNames, GContracts\> }

#### Summary
A Record of typed connectors that can be used to create a contract.

##### ✏️ Notes
- used by [TAppContractsContext](Models.md#tappcontractscontext-4)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended-4)<`GContractNames`\> |

#### Defined in

[models/contractAppContextTypes.ts:51](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L51)

___

### TTypedContract

Ƭ **TTypedContract**<`GContractNames`, `GAppContractConnectorList`\>: `GAppContractConnectorList` extends { [key in GContractNames]: Object } ? `TypedContract` : [`TBaseContractExtended`](Models.md#tbasecontractextended-4)<`GContractNames`\>

#### Summary
A type that infers contract type `(extended from BaseContract)` based on connectors and contractName.  For example `DAI` from `{ DAI: { connect: ... } }`.  If the contractName is not found, it will return a BaseContract

##### ✏️ Notes
- used by {@link contractContextFactory}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GAppContractConnectorList` | `GAppContractConnectorList` |

#### Defined in

[models/contractAppContextTypes.ts:62](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L62)

___

### TContractsByName

Ƭ **TContractsByName**<`GContractNames`, `GContracts`\>: { [contractName in GContractNames]: { [chainId in number]: GContracts \| undefined } }

#### Summary
A utility type for typed contracts by name and then by chain

##### ✏️ Notes
- used by [TAppContractsContext](Models.md#tappcontractscontext-4)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended-4)<`GContractNames`\> |

#### Defined in

[models/contractAppContextTypes.ts:78](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L78)

___

### TContractsByChainId

Ƭ **TContractsByChainId**<`GContractNames`, `GContracts`\>: { [chainId in number]: { [contractName in GContractNames]: GContracts \| undefined } }

#### Summary
A utility type for typed contracts by chain and then by name

##### ✏️ Notes
- used by [TAppContractsContext](Models.md#tappcontractscontext-4)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended-4)<`GContractNames`\> |

#### Defined in

[models/contractAppContextTypes.ts:90](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L90)

___

### TAppContractsContext

Ƭ **TAppContractsContext**<`GContractNames`, `GContracts`\>: `Object`

Describes the current ContractsContext for the app used by the context created by {@link contractContextFactory}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContracts` | extends [`TBaseContractExtended`](Models.md#tbasecontractextended-4)<`GContractNames`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractConnectors` | [`TConnectorList`](Models.md#tconnectorlist-4)<`GContractNames`, `GContracts`\> |
| `contractsByName` | [`TContractsByName`](Models.md#tcontractsbyname-4)<`GContractNames`, `GContracts`\> |
| `contractsByChainId` | [`TContractsByChainId`](Models.md#tcontractsbychainid-4)<`GContractNames`, `GContracts`\> |

#### Defined in

[models/contractAppContextTypes.ts:102](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractAppContextTypes.ts#L102)

___

### THardhatContractDataRecord

Ƭ **THardhatContractDataRecord**: `Object`

#### Summary
Contracts by contract name
- A record of contract names and their hardhat contract json
- includes chain id

#### Index signature

▪ [contractName: `string`]: { `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig-4) ; `abi`: `any`[]  }

#### Defined in

[models/contractTypes.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractTypes.ts#L31)

___

### TExternalContractDataRecord

Ƭ **TExternalContractDataRecord**: `Object`

#### Summary
Contracts by contract name
- A record of contract names and their hardhat contract json
- includes chain id

#### Index signature

▪ [contractName: `string`]: { `config`: [`TBasicContractDataConfig`](Models.md#tbasiccontractdataconfig-4)  }

#### Defined in

[models/contractTypes.ts:44](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/contractTypes.ts#L44)

___

### TQueryOptions

Ƭ **TQueryOptions**<`GResult`\>: `Omit`<`QueryObserverOptions`<`GResult`, `any`\>, ``"refetchInterval"`` \| ``"notifyOnChangeProps"`` \| ``"notifyOnChangePropsExclusions"`` \| ``"useErrorBoundary"`` \| ``"refetchOnWindowFocus"`` \| ``"refetchOnMount"`` \| ``"refetchOnReconnect"``\> & { `refetchOnWindowFocus?`: `boolean` \| ``"always"`` ; `refetchOnMount?`: `boolean` \| ``"always"`` ; `refetchOnReconnect?`: `boolean` \| ``"always"``  }

#### Type parameters

| Name |
| :------ |
| `GResult` |

#### Defined in

[models/hookTypes.ts:25](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L25)

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
| `query?` | [`TQueryOptions`](Models.md#tqueryoptions-4)<`GResult`\> | - |

#### Defined in

[models/hookTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L50)

___

### TOverride

Ƭ **TOverride**: `Object`

#### Summary
Ethers Provider options.  By default, the context provider is used by the hook.  If you want to use a different provider, you can:
- pass in an [TEthersAdaptor](Models.md#tethersadaptor-4) to override the provider
- give the alternateContextKey for a secondary context provider.

##### ✏️ Notes
Adaptor
- To create a adaptor from a provider/signer see {@link useGetEthersAdaptorFromSignerOrProvider}
- You need to set adaptorEnabled to true

Alternate Context Key
- For more info on alternateContextKey, see [TEthersAppContextProps](EthersAppContext.md#tethersappcontextprops-4) and [web3-react docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `adaptorEnabled` | `boolean` | An enable override adaptor (ethers provider) for this hook |
| `adaptor` | [`TEthersAdaptor`](Models.md#tethersadaptor-4) \| `undefined` | The alternate adaptor to use.  See [TEthersAdaptor](Models.md#tethersadaptor-4) |
| `alternateContextKey?` | `string` | The alternate context key to use.  See [TEthersAppContextProps](EthersAppContext.md#tethersappcontextprops-4) |

#### Defined in

[models/hookTypes.ts:73](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L73)

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

[models/hookTypes.ts:124](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L124)

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
| `signer?` | [`TEthersSigner`](Models.md#tetherssigner-4) |
| `provider?` | [`TEthersProvider`](Models.md#tethersprovider-4) |
| `chainId?` | `number` |
| `account?` | `string` |

#### Defined in

[models/ethersAppContextTypes.ts:52](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/ethersAppContextTypes.ts#L52)

## Functions

### defaultOverride

▸ **defaultOverride**(): [`TOverride`](Models.md#toverride-4)

An helper to create the default override settings for hooks

#### Returns

[`TOverride`](Models.md#toverride-4)

#### Defined in

[models/hookTypes.ts:93](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L93)

___

### defaultUpdateOptions

▸ **defaultUpdateOptions**<`GResult`\>(): [`TUpdateOptions`](Models.md#tupdateoptions-4)<`GResult`\>

A helper to create default update options for hooks

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GResult` | `any` |

#### Returns

[`TUpdateOptions`](Models.md#tupdateoptions-4)<`GResult`\>

#### Defined in

[models/hookTypes.ts:105](https://github.com/scaffold-eth/eth-hooks/blob/56fcc82/src/models/hookTypes.ts#L105)
