[eth-hooks - v3.4.0](../README.md) / Models

# Module: Models

Types and constants to make it easier to interact with ethers.

## Table of contents

### Interfaces

- [IContractFactoryBridge](../interfaces/Models.IContractFactoryBridge.md)
- [TypedEvent](../interfaces/Models.TypedEvent.md)

### Models Type aliases

- [TDeployedContractsJson](Models.md#tdeployedcontractsjson)
- [TDeployedContractHelper](Models.md#tdeployedcontracthelper)
- [TExternalContracts](Models.md#texternalcontracts)
- [TContractFunctionInfo](Models.md#tcontractfunctioninfo)
- [TContractLoaderConfig](Models.md#tcontractloaderconfig)
- [TNetworkInfo](Models.md#tnetworkinfo)

### Misc Type aliases

- [THardhatContractJson](Models.md#thardhatcontractjson)

### Type Definition Type aliases

- [TEthersProvider](Models.md#tethersprovider)
- [TEthersProviderOrSigner](Models.md#tethersproviderorsigner)
- [TEthersSigner](Models.md#tetherssigner)
- [TAbstractProvider](Models.md#tabstractprovider)
- [TEthersUser](Models.md#tethersuser)

## Models Type aliases

### TDeployedContractsJson

Ƭ **TDeployedContractsJson**: `Object`

#### Summary
Contracts deployed by hardhat
- {chainIds: { networkNames: {contracts} }}, contains an record of contracts
- Used by [useContractLoader](Hooks.md#usecontractloader)

#### Index signature

▪ [chainId: `string`]: { [networkName: string]: { `name`: `string` ; `chainId`: `string` ; `contracts`: { [contractName: string]: [`THardhatContractJson`](Models.md#thardhatcontractjson);  }  };  }

#### Defined in

[src/models/contractTypes.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/contractTypes.ts#L29)

___

### TDeployedContractHelper

Ƭ **TDeployedContractHelper**: `Object`

#### Summary
Contract factories for contracts deployed by hardhat
- contractName: ethers.ContractFactory
- Used by [useContractLoader](Hooks.md#usecontractloader)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `factoryBridge` | `Object` |
| `contractList` | `Object` |

#### Defined in

[src/models/contractTypes.ts:47](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/contractTypes.ts#L47)

___

### TExternalContracts

Ƭ **TExternalContracts**: `Object`

#### Summary
A type for external contracts
- {chainId: {contracts}}, contains an record of contracts
- Used by [useContractLoader](Hooks.md#usecontractloader)

#### Index signature

▪ [chainId: `number`]: { `name?`: `string` ; `chainId?`: `string` ; `contracts?`: { [contractName: string]: [`THardhatContractJson`](Models.md#thardhatcontractjson);  }  }

#### Defined in

[src/models/contractTypes.ts:62](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/contractTypes.ts#L62)

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

[src/models/contractTypes.ts:79](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/contractTypes.ts#L79)

___

### TContractLoaderConfig

Ƭ **TContractLoaderConfig**: `Object`

#### Summary
Configuration for useContractLoader

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hardhatNetworkName?` | `string` | your local hardhat network name |
| `customAddresses?` | `Record`<`string`, `string`\> | the address:contractName key value pair |
| `deployedContractsJson?` | [`TDeployedContractsJson`](Models.md#tdeployedcontractsjson) | Hardhat deployed contracts untyped and should be @deprecated |
| `deployedContractHelper?` | [`TDeployedContractHelper`](Models.md#tdeployedcontracthelper) | ⚠ in progress... not used currently Harhard deployed contract with TypeChain typings Contracts are created via contract factories |
| `externalContracts?` | [`TExternalContracts`](Models.md#texternalcontracts) | External contracts (such as DAI) |

#### Defined in

[src/models/contractTypes.ts:91](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/contractTypes.ts#L91)

___

### TNetworkInfo

Ƭ **TNetworkInfo**: `Object`

#### Summary
A type that describes a network for applications

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

[src/models/networkTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/networkTypes.ts#L7)

___

## Misc Type aliases

### THardhatContractJson

Ƭ **THardhatContractJson**: `Object`

#### Summary
describes the sctructure of a contract in hardhat_contracts.json

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `abi` | `any`[] |

#### Defined in

[src/models/contractTypes.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/contractTypes.ts#L16)

___

## Type Definition Type aliases

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

#### Summary
A union of various ethers providers for ease of use and maximum flexiblity

#### Notes
Used by eth-hooks, eth-components and scaffold-eth-typescript

#### Defined in

[src/models/providerTypes.ts:19](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/providerTypes.ts#L19)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Summary
A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:27](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/providerTypes.ts#L27)

___

### TEthersSigner

Ƭ **TEthersSigner**: `Signer` \| `JsonRpcSigner` \| `Wallet` \| `VoidSigner`

#### Summary
A union of various providers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:42](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/providerTypes.ts#L42)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

#### Summary
A union of abstract, non initalizable providers, used by some functions

#### Defined in

[src/models/providerTypes.ts:50](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/providerTypes.ts#L50)

___

### TEthersUser

Ƭ **TEthersUser**: `Object`

#### Summary
Essentially a provider and signer and network information for ease of use.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` \| `undefined` |
| `provider` | [`TEthersProvider`](Models.md#tethersprovider) \| `undefined` |
| `providerNetwork` | `ethers.providers.Network` \| `undefined` |
| `address` | `string` \| `undefined` |

#### Defined in

[src/models/providerTypes.ts:58](https://github.com/scaffold-eth/eth-hooks/blob/cec59cb/src/models/providerTypes.ts#L58)
