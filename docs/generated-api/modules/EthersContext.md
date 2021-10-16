[eth-hooks - v3.2.0beta10](../README.md) / EthersContext

# Module: EthersContext

## Table of contents

### EthersContext Functions

- [useBlockNumberContext](EthersContext.md#useblocknumbercontext)
- [useEthersContext](EthersContext.md#useetherscontext)
- [ConnectToStaticJsonRpcProvider](EthersContext.md#connecttostaticjsonrpcprovider)

### EthersContext Variables

- [BlockNumberContext](EthersContext.md#blocknumbercontext)
- [EthersAppContext](EthersContext.md#ethersappcontext)

### EthersContext Type aliases

- [CreateEthersModalConnector](EthersContext.md#createethersmodalconnector)

### EthersContext Interfaces

- [IEthersContext](../interfaces/EthersContext.IEthersContext.md)
- [IStaticJsonRpcProviderConnectorOptions](../interfaces/EthersContext.IStaticJsonRpcProviderConnectorOptions.md)

### EthersContext Classes

- [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md)

## EthersContext Functions

### useBlockNumberContext

▸ `Const` **useBlockNumberContext**(): `undefined` \| `number`

#### Summary
A hook that gets you the current blocknumber via react context
- can be shared by your whole app.

#### Use
Make sure to wrap your main app with the [EthersAppContext](EthersContext.md#ethersappcontext).
- See [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/0225179a2a8bb7b3a255d6eff4802b47d72809dd/packages/vite-app-ts/src/components/routes/App.tsx#L38)

#### Notes
- this extensively used by eth-hooks to trigger hooks when a new block arrives
- uses the current provider [ethersProvider](../interfaces/EthersContext.IEthersContext.md#ethersprovider) from [useEthersContext](EthersContext.md#useetherscontext)

#### Returns

`undefined` \| `number`

current block number

#### Defined in

[src/context/BlockNumberContext.tsx:63](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/BlockNumberContext.tsx#L63)

___

### useEthersContext

▸ `Const` **useEthersContext**(`providerKey?`): [`IEthersContext`](../interfaces/EthersContext.IEthersContext.md)

#### Summary
This Hook provides you with access to the current Ethers Provider Context.
This provider would be the one selected by using {@link EthersModalConnect} and Web3Modal

#### Features
Gives you access to consistent interface to get the current provider information [EthersModalConnector](../classes/EthersContext.EthersModalConnector.md)
- ethers compatable provider [TEthersProvider](Models.md#tethersprovider)
- a callback to change the current account (signer)
- the current account, chainId and signer
- callbacks to open the web3Modal, logout or change theme

#### Notes
- currently providerKey isnt being used

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerKey?` | `string` |

#### Returns

[`IEthersContext`](../interfaces/EthersContext.IEthersContext.md)

#### Defined in

[src/context/EthersAppContext.tsx:73](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L73)

___

### ConnectToStaticJsonRpcProvider

▸ `Const` **ConnectToStaticJsonRpcProvider**(`_package`, `opts`): `Promise`<`StaticJsonRpcProvider`\>

#### Summary
A connector that can be used by apps to connect let web3Modal connect to a StaticJsonRpcProvider
- For example you can use this to connect to a localhost provider

#### Notes
See scaffold-eth-typescript for an example that uses it to connect to a localhost burner wallet.
- [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/0225179a2a8bb7b3a255d6eff4802b47d72809dd/packages/vite-app-ts/src/config/web3ModalConfig.ts#L86)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_package` | `unknown` | not used |
| `opts` | [`IStaticJsonRpcProviderConnectorOptions`](../interfaces/EthersContext.IStaticJsonRpcProviderConnectorOptions.md) |  |

#### Returns

`Promise`<`StaticJsonRpcProvider`\>

#### Defined in

[src/context/connectors/StaticJsonRpcProviderConnector.ts:31](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/connectors/StaticJsonRpcProviderConnector.ts#L31)

## EthersContext Variables

### BlockNumberContext

• **BlockNumberContext**: `FC`<`IProps`\>

#### Summary
A context that works with [useBlockNumberContext](EthersContext.md#useblocknumbercontext) to give access to the current provider's block number in any place in your app

**`param`**

**`returns`**

#### Defined in

[src/context/BlockNumberContext.tsx:82](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/BlockNumberContext.tsx#L82)

___

### EthersAppContext

• **EthersAppContext**: `FC`

#### Summary
Ethers App Context for your react app to be used with [useEthersContext](EthersContext.md#useetherscontext).
This is a wrapper around Web3ReactProvider that provides additional functionality such as a [BlockNumberContext](EthersContext.md#blocknumbercontext) and access to [IEthersContext](../interfaces/EthersContext.IEthersContext.md)

**`param`**

**`returns`**

#### Defined in

[src/context/EthersAppContext.tsx:171](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L171)

## EthersContext Type aliases

### CreateEthersModalConnector

Ƭ **CreateEthersModalConnector**: () => [`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md) \| `undefined`

#### Type declaration

▸ (): [`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md) \| `undefined`

#### Summary
A callback type that returns a EthersModalConnector

#### Notes
- can be used by components that need to give a connector to [IEthersContext.openModal](../interfaces/EthersContext.IEthersContext.md#openmodal)

##### Returns

[`EthersModalConnector`](../classes/EthersContext.EthersModalConnector.md) \| `undefined`

#### Defined in

[src/context/EthersAppContext.tsx:22](https://github.com/scaffold-eth/eth-hooks/blob/52473fd/src/context/EthersAppContext.tsx#L22)
