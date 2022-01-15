[eth-hooks - v4.0.8](../README.md) / Models

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
- [TConnectorList](Models.md#tconnectorlist)
- [TTypedContract](Models.md#ttypedcontract)
- [TContractsByName](Models.md#tcontractsbyname)
- [TContractsByChainId](Models.md#tcontractsbychainid)
- [TAppContractsContext](Models.md#tappcontractscontext)
- [TBasicContractData](Models.md#tbasiccontractdata)
- [TBasicContractDataRecord](Models.md#tbasiccontractdatarecord)
- [TUpdateOptions](Models.md#tupdateoptions)
- [TOverride](Models.md#toverride)

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

[src/models/constants/common.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/constants/common.ts#L1)

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

[src/models/constants/keyNamespace.ts:1](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/constants/keyNamespace.ts#L1)

___

### const\_blockNumberIntervalShort

• **const\_blockNumberIntervalShort**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Summary
An constant for block number interval of 10 blocks

#### Defined in

[src/models/hookOptions.ts:9](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/hookOptions.ts#L9)

___

### const\_blockNumberIntervalMedium

• **const\_blockNumberIntervalMedium**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Summary
An constant for block number interval of 50 blocks

#### Defined in

[src/models/hookOptions.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/hookOptions.ts#L15)

___

### const\_blockNumberIntervalLong

• **const\_blockNumberIntervalLong**: [`DeepPartial`](Models.md#deeppartial)<[`TUpdateOptions`](Models.md#tupdateoptions)\>

#### Summary
An constant for block number interval of 250 blocks

#### Defined in

[src/models/hookOptions.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/hookOptions.ts#L21)

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

[src/models/ethersAppContextTypes.ts:17](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L17)

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

[src/models/contractTypes.ts:30](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractTypes.ts#L30)

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

[src/models/contractTypes.ts:54](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractTypes.ts#L54)

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

[src/models/contractTypes.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractTypes.ts#L69)

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

[src/models/networkTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/networkTypes.ts#L7)

___

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

#### Summary
A union of various ethers providers for ease of use and maximum flexiblity

##### ✏️ Notes
Used by eth-hooks, eth-components and scaffold-eth-typescript

#### Defined in

[src/models/providerTypes.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/providerTypes.ts#L19)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Summary
A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/providerTypes.ts#L27)

___

### TEthersSigner

Ƭ **TEthersSigner**: `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Summary
A union of various providers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/providerTypes.ts#L42)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

#### Summary
A union of abstract, non initalizable providers, used by some functions

#### Defined in

[src/models/providerTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/providerTypes.ts#L50)

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

[src/models/providerTypes.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/providerTypes.ts#L58)

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

[src/models/providerTypes.ts:69](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/providerTypes.ts#L69)

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

[src/models/utilityTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/utilityTypes.ts#L7)

___

## Misc Type aliases

### TConnectorConnectorBase

Ƭ **TConnectorConnectorBase**<`GContract`, `GContractInterface`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract` |
| `GContractInterface` | extends `ethers.utils.Interface` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connect` | (`address`: `string`, `signerOrProvider`: `Signer` \| `Provider`) => `GContract` |
| `createInterface` | () => `GContractInterface` |
| `abi` | `Record`<`string`, `any`\>[] |

#### Defined in

[src/models/contractContextTypes.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractContextTypes.ts#L4)

___

### TContractConnector

Ƭ **TContractConnector**<`GContractNames`, `GContract`, `GContractInterface`\>: { `contractName`: `GContractNames` ; `config`: { [chainId: number]: { `address`: `string`  };  }  } & [`TConnectorConnectorBase`](Models.md#tconnectorconnectorbase)<`GContract`, `GContractInterface`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GContract` | extends `BaseContract` |
| `GContractInterface` | extends `ethers.utils.Interface` |

#### Defined in

[src/models/contractContextTypes.ts:13](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractContextTypes.ts#L13)

___

### TConnectorList

Ƭ **TConnectorList**<`GContactNames`\>: { [contractName in GContactNames]: TContractConnector<GContactNames, BaseContract, ethers.utils.Interface\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContactNames` | extends `string` |

#### Defined in

[src/models/contractContextTypes.ts:24](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractContextTypes.ts#L24)

___

### TTypedContract

Ƭ **TTypedContract**<`GContractNames`, `GAppContractConnectorList`\>: `GAppContractConnectorList` extends { [key in GContractNames]: Object } ? `TypedContract` : `BaseContract`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |
| `GAppContractConnectorList` | `GAppContractConnectorList` |

#### Defined in

[src/models/contractContextTypes.ts:28](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractContextTypes.ts#L28)

___

### TContractsByName

Ƭ **TContractsByName**<`GContractNames`\>: `Record`<`GContractNames`, { [chainId: number]: `BaseContract` \| `undefined`;  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |

#### Defined in

[src/models/contractContextTypes.ts:37](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractContextTypes.ts#L37)

___

### TContractsByChainId

Ƭ **TContractsByChainId**<`GContractNames`\>: `Record`<`number`, { [contractName in GContractNames]: BaseContract \| undefined }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |

#### Defined in

[src/models/contractContextTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractContextTypes.ts#L42)

___

### TAppContractsContext

Ƭ **TAppContractsContext**<`GContractNames`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContractNames` | extends `string` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractConnectors` | [`TConnectorList`](Models.md#tconnectorlist)<`GContractNames`\> |
| `contractsByName` | [`TContractsByName`](Models.md#tcontractsbyname)<`GContractNames`\> |
| `contractsByChainId` | [`TContractsByChainId`](Models.md#tcontractsbychainid)<`GContractNames`\> |

#### Defined in

[src/models/contractContextTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractContextTypes.ts#L50)

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

[src/models/contractTypes.ts:5](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractTypes.ts#L5)

___

### TBasicContractDataRecord

Ƭ **TBasicContractDataRecord**: `Object`

#### Summary
Contracts by contract name
- A record of contract names and their hardhat contract json
- includes chain id

#### Index signature

▪ [contractName: `string`]: [`TBasicContractData`](Models.md#tbasiccontractdata) & { `chainId`: `number`  }

#### Defined in

[src/models/contractTypes.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/contractTypes.ts#L16)

___

### TUpdateOptions

Ƭ **TUpdateOptions**: `Object`

#### Summary
Options for hooks that describe the behviour of updates.
By default, depending on the hook, it will update every block.

##### ✏️ Notes
The following options are available:
- interval: interval in blocknumber to update in (default 1) see {@link TUpdateOptions.blockNumberInterval}
- polling: in ms, should be over 10000ms.  This is set by {@link TUpdateOptions.query.refetchInterval}

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockNumberInterval` | `number` | The interval in blocknumber for the hook to update in (default 1) |
| `query` | `Object` | react query options |
| `query.refetchOnWindowFocus` | `boolean` | update when window comes into focus (default: false) |
| `query.refetchOnMount` | `boolean` | update on mount of component (default: true) |
| `query.staleTime` | `number` | consider the data stale after this time (default: 30s) |
| `query.refetchInterval` | `number` \| `undefined` | polling interval in ms (default: undefined) if you set this, this will turn of blockNumberInterval option |

#### Defined in

[src/models/hookOptions.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/hookOptions.ts#L33)

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

[src/models/hookOptions.ts:76](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/hookOptions.ts#L76)

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

[src/models/ethersAppContextTypes.ts:49](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/ethersAppContextTypes.ts#L49)

## Functions

### defaultOverride

▸ `Const` **defaultOverride**(): [`TOverride`](Models.md#toverride)

An helper to create the default override settings for hooks

#### Returns

[`TOverride`](Models.md#toverride)

#### Defined in

[src/models/hookOptions.ts:96](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/hookOptions.ts#L96)

___

### defaultUpdateOptions

▸ `Const` **defaultUpdateOptions**(): [`TUpdateOptions`](Models.md#tupdateoptions)

A helper to create default update options for hooks

#### Returns

[`TUpdateOptions`](Models.md#tupdateoptions)

#### Defined in

[src/models/hookOptions.ts:108](https://github.com/scaffold-eth/eth-hooks/blob/97c8775/src/models/hookOptions.ts#L108)
