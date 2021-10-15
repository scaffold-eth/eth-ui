[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / dapps

# Module: dapps

## Table of contents

### Functions

- [useDexEthPrice](dapps.md#usedexethprice)
- [useDexTokenList](dapps.md#usedextokenlist)
- [useEnsAddress](dapps.md#useensaddress)
- [useEnsResolveName](dapps.md#useensresolvename)

## Functions

### useDexEthPrice

▸ `Const` **useDexEthPrice**(`mainnetProvider`, `targetNetworkInfo?`, `pollTime?`): `number`

Get the Exchange price of ETH/USD (extrapolated from WETH/DAI)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](models.md#tethersprovider) | `undefined` | (TEthersProvider) |
| `targetNetworkInfo?` | [`TNetworkInfo`](models.md#tnetworkinfo) | `undefined` | (TNetwork) |
| `pollTime` | `number` | `0` | (number) :: if >0 use polling, else use instead of onBlock event |

#### Returns

`number`

(number) :: price

#### Defined in

[src/dapps/useDexEthPrice.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/dapps/useDexEthPrice.ts#L15)

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

[src/dapps/useDexTokenList.ts:15](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/dapps/useDexTokenList.ts#L15)

___

### useEnsAddress

▸ `Const` **useEnsAddress**(`mainnetProvider`, `address`): `string`

Gets ENS name from given address and provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | `undefined` \| [`TEthersProvider`](models.md#tethersprovider) | (TEthersProvider) |
| `address` | `string` | (string) |

#### Returns

`string`

(string) ens name

#### Defined in

[src/dapps/useEnsAddress.ts:33](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/dapps/useEnsAddress.ts#L33)

___

### useEnsResolveName

▸ `Const` **useEnsResolveName**(`mainnetProvider`, `ensName`): `string`

Gets the address from an ENS name and provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainnetProvider` | [`TEthersProvider`](models.md#tethersprovider) | (TEthersProvider) |
| `ensName` | `string` | (string) |

#### Returns

`string`

(string) :: address

#### Defined in

[src/dapps/useEnsResolveName.ts:12](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/dapps/useEnsResolveName.ts#L12)
