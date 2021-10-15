[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / models

# Module: models

## Table of contents

### Type aliases

- [TDeployedContracts](models.md#tdeployedcontracts)
- [TExternalContracts](models.md#texternalcontracts)
- [TContractFunctionInfo](models.md#tcontractfunctioninfo)
- [TNetworkInfo](models.md#tnetworkinfo)
- [TEthersProvider](models.md#tethersprovider)
- [TEthersProviderOrSigner](models.md#tethersproviderorsigner)
- [TAbstractProvider](models.md#tabstractprovider)
- [TEthersUser](models.md#tethersuser)

## Type aliases

### TDeployedContracts

Ƭ **TDeployedContracts**: `Object`

Contracts deployed by hardhat
- {chainIds: { networkNames: {contracts} }}, contains an record of contracts
- Used by [useContractLoader](index.md#usecontractloader)

#### Index signature

▪ [key: `string`]: { [key: string]: { `name`: `string` ; `chainId`: `string` ; `contracts`: `Record`<`string`, `Contract`\>  };  }

#### Defined in

[src/models/contractTypes.ts:8](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/models/contractTypes.ts#L8)

___

### TExternalContracts

Ƭ **TExternalContracts**: `Object`

A type for external contracts
- {chainId: {contracts}}, contains an record of contracts
- Used by [useContractLoader](index.md#usecontractloader)

#### Index signature

▪ [key: `number`]: { `name?`: `string` ; `chainId?`: `string` ; `contracts?`: `Record`<`string`, `Contract`\>  }

#### Defined in

[src/models/contractTypes.ts:23](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/models/contractTypes.ts#L23)

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

[src/models/contractTypes.ts:34](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/models/contractTypes.ts#L34)

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

[src/models/networkTypes.ts:4](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/models/networkTypes.ts#L4)

___

### TEthersProvider

Ƭ **TEthersProvider**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider`

A union of various providers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:6](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/models/providerTypes.ts#L6)

___

### TEthersProviderOrSigner

Ƭ **TEthersProviderOrSigner**: `JsonRpcProvider` \| `Web3Provider` \| `StaticJsonRpcProvider` \| `Signer`

A union of various providers and signers in ethers to give maximum flexibility

#### Defined in

[src/models/providerTypes.ts:11](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/models/providerTypes.ts#L11)

___

### TAbstractProvider

Ƭ **TAbstractProvider**: `Provider`

A union of abstract, non initalizable providers, used by some functions

#### Defined in

[src/models/providerTypes.ts:16](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/models/providerTypes.ts#L16)

___

### TEthersUser

Ƭ **TEthersUser**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` \| `undefined` |
| `provider` | [`TEthersProvider`](models.md#tethersprovider) \| `undefined` |
| `providerNetwork` | `ethers.providers.Network` \| `undefined` |
| `address` | `string` \| `undefined` |

#### Defined in

[src/models/providerTypes.ts:20](https://github.com/scaffold-eth/eth-hooks/blob/9f8998d/src/models/providerTypes.ts#L20)
