[eth-hooks - v3.2.0beta09](../README.md) / [Modules](../modules.md) / erc

# Module: erc

## Table of contents

### Functions

- [useTokenBalance](erc.md#usetokenbalance)

## Functions

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

[src/erc/useTokenBalance.ts:21](https://github.com/scaffold-eth/eth-hooks/blob/b739a97/src/erc/useTokenBalance.ts#L21)
