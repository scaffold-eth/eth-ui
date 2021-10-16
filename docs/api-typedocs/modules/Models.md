[eth-hooks - v3.2.0beta11](../README.md) / Models

# Module: Models

## Table of contents

### Models Type aliases

- [TDeployedContracts](Models.md#tdeployedcontracts)
- [TExternalContracts](Models.md#texternalcontracts)
- [TContractFunctionInfo](Models.md#tcontractfunctioninfo)
- [TNetworkInfo](Models.md#tnetworkinfo)

### Type Definition Type aliases

- [TEthersProvider](Models.md#tethersprovider)
- [TEthersProviderOrSigner](Models.md#tethersproviderorsigner)
- [TAbstractProvider](Models.md#tabstractprovider)
- [TEthersUser](Models.md#tethersuser)

## Models Type aliases

### TDeployedContracts

Ƭ **TDeployedContracts**: `Object`

#### Summary
Contracts deployed by hardhat
- {chainIds: { networkNames: {contracts} }}, contains an record of contracts
- Used by [useContractLoader](Hooks.md#usecontractloader)

#### Index signature

▪ [key: `string`]: { [key: string]: { `name`: `string` ; `chainId`: `string` ; `contracts`: `Record`<`string`, `Contract`\>  };  }

#### Defined in

[src/models/contractTypes.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/models/contractTypes.ts#L11)

___

### TExternalContracts

Ƭ **TExternalContracts**: `Object`

#### Summary
A type for external contracts
- {chainId: {contracts}}, contains an record of contracts
- Used by [useContractLoader](Hooks.md#usecontractloader)

#### Index signature

▪ [key: `number`]: { `name?`: `string` ; `chainId?`: `string` ; `contracts?`: `Record`<`string`, `Contract`\>  }

#### Defined in

[src/models/contractTypes.ts:29](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/models/contractTypes.ts#L29)

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

[src/models/contractTypes.ts:46](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/models/contractTypes.ts#L46)

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

[src/models/networkTypes.ts:7](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/models/networkTypes.ts#L7)

___

## Type Definition Type aliases

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

#### Summary
A union of various ethers providers for ease of use and maximum flexiblity

#### Notes
Used by eth-hooks, eth-components and scaffold-eth-typescript

#### Defined in

[src/models/providerTypes.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/models/providerTypes.ts#L12)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer`

#### Summary
A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/models/providerTypes.ts#L20)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

#### Summary
A union of abstract, non initalizable providers, used by some functions

#### Defined in

[src/models/providerTypes.ts:28](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/models/providerTypes.ts#L28)

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

[src/models/providerTypes.ts:36](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/models/providerTypes.ts#L36)
