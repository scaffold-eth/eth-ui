[eth-hooks - v3.2.0beta11](../README.md) / [EthersContext](../modules/EthersContext.md) / IStaticJsonRpcProviderConnectorOptions

# Interface: IStaticJsonRpcProviderConnectorOptions

[EthersContext](../modules/EthersContext.md).IStaticJsonRpcProviderConnectorOptions

#### Summary
A web3modal CustomProvider Options
- Options for web3modal that allows you to connect to a StaticJsonRpcProvider such as localhost

## Hierarchy

- `IAbstractConnectorOptions`

  ↳ **`IStaticJsonRpcProviderConnectorOptions`**

## Table of contents

### Properties

- [network](EthersContext.IStaticJsonRpcProviderConnectorOptions.md#network)
- [rpc](EthersContext.IStaticJsonRpcProviderConnectorOptions.md#rpc)
- [currentChainId](EthersContext.IStaticJsonRpcProviderConnectorOptions.md#currentchainid)

## Properties

### network

• **network**: `string`

#### Inherited from

IAbstractConnectorOptions.network

#### Defined in

node_modules/web3modal/dist/helpers/types.d.ts:12

___

### rpc

• **rpc**: `Object`

#### Index signature

▪ [chainId: `number`]: `string`

#### Defined in

[src/context/connectors/StaticJsonRpcProviderConnector.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/context/connectors/StaticJsonRpcProviderConnector.ts#L12)

___

### currentChainId

• **currentChainId**: `number`

#### Defined in

[src/context/connectors/StaticJsonRpcProviderConnector.ts:13](https://github.com/scaffold-eth/eth-hooks/blob/a2bd0ae/src/context/connectors/StaticJsonRpcProviderConnector.ts#L13)
