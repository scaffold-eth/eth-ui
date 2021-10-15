# 🖇 Eth-Hooks Overview

Commonly used Ethereum hooks.

Used by 🏗 [scaffold-eth](https://github.com/scaffold-eth/scaffold-eth)

Created by 🏰 [BuidlGuidl.eth](https://BuidlGuidl.com)

## Install

```sh
yarn add eth-hooks
```

## Authors

[@austinGriffith](https://github.com/austintgriffith)
[@shravansunder](https://github.com/ShravanSunder)
[@calvinbores](https://github.com/calvbore)

# API

## Hooks &amp; Helpers

<dl>
<dt><a href="#useExchangeEthPrice">useExchangeEthPrice</a> ⇒</dt>
<dd><p>Get the Exchange price of ETH/USD (extrapolated from WETH/DAI)</p>
</dd>
<dt><a href="#useTokenList">useTokenList</a> ⇒</dt>
<dd><p>Gets a tokenlist (see more at <a href="https://tokenlists.org/">https://tokenlists.org/</a>), returning the .tokens only</p>
<p>~ How can I use? ~
  const tokenList = useTokenList(); &lt;- default returns the Unsiwap tokens
  const tokenList = useTokenList(&quot;<a href="https://gateway.ipfs.io/ipns/tokens.uniswap.org&quot;">https://gateway.ipfs.io/ipns/tokens.uniswap.org&quot;</a>);</p>
</dd>
<dt><a href="#useLookupAddress">useLookupAddress</a> ⇒</dt>
<dd><p>Gets ENS name from given address and provider</p>
</dd>
<dt><a href="#useEnsResolveName">useEnsResolveName</a> ⇒</dt>
<dd><p>Gets the address from an ENS name and provider</p>
</dd>
<dt><a href="#useTokenBalance">useTokenBalance</a> ⇒</dt>
<dd><p>Get the balance of an ERC20 token in an address</p>
<p>~ Features ~</p>
<ul>
<li>Provide address and get balance corresponding to given address</li>
<li>Change provider to access balance on different chains (ex. mainnetProvider)</li>
<li>If no pollTime is passed, the balance will update on every new block</li>
</ul>
</dd>
<dt><a href="#useEventListener">useEventListener</a> ⇒</dt>
<dd><p>Enables you to keep track of events</p>
<p>~ Features ~</p>
<ul>
<li>Provide readContracts by loading contracts (see more on ContractLoader.js)</li>
<li>Specify the name of the contract, in this case it is &quot;YourContract&quot;</li>
<li>Specify the name of the event in the contract, in this case we keep track of &quot;SetPurpose&quot; event</li>
<li>Specify the provider</li>
</ul>
</dd>
<dt><a href="#parseProviderOrSigner">parseProviderOrSigner</a> ⇒</dt>
<dd><p>Parse TEthersProviderOrSigner to TProviderAndSigner</p>
</dd>
<dt><a href="#useBalance">useBalance</a> ⇒</dt>
<dd><p>Gets your balance in ETH from given address and provider</p>
<p>~ Features ~</p>
<ul>
<li>Provide address and get balance corresponding to given address</li>
<li>Change provider to access balance on different chains (ex. mainnetProvider)</li>
<li>If no pollTime is passed, the balance will update on every new block</li>
</ul>
</dd>
<dt><a href="#useBlockNumber">useBlockNumber</a> ⇒</dt>
<dd><p>Get the current block number of the network</p>
</dd>
<dt><a href="#useBurnerSigner">useBurnerSigner</a> ⇒</dt>
<dd><p>A hook that creates a buner address and returns a Signer</p>
</dd>
<dt><a href="#useContractExistsAtAddress">useContractExistsAtAddress</a> ⇒</dt>
<dd><p>Checks whether a contract exists on the blockchain, returns true if it exists, otherwise false</p>
<p>  ~ Features ~</p>
<ul>
<li>Provide contractAddress to check if the contract is deployed</li>
<li>Change provider to check contract address on different chains (ex. mainnetProvider)</li>
</ul>
</dd>
<dt><a href="#useContractLoader">useContractLoader</a> ⇒</dt>
<dd><p>Loads your local contracts and gives options to read values from contracts
  or write transactions into them</p>
<p>   ~ Features ~</p>
<ul>
<li>localProvider enables reading values from contracts</li>
<li>userProvider enables writing transactions into contracts</li>
<li>Example of keeping track of &quot;purpose&quot; variable by loading contracts into readContracts
and using ContractReader.js hook:
const purpose = useContractReader(readContracts,&quot;YourContract&quot;, &quot;purpose&quot;)</li>
<li>Example of using setPurpose function from our contract and writing transactions by Transactor.js helper:
tx( writeContracts.YourContract.setPurpose(newPurpose) )</li>
</ul>
<p>  config can include:</p>
<ul>
<li>chainId - to hardcode the chainId, irrespective of the providerOrSigner chainId</li>
<li>hardhatNetworkName - to hardcode the hardhat network of interest</li>
<li>customAddresses: { contractName: 0xCustomAddress } to hardcode the address for a given named contract</li>
<li>hardhatContracts: object following the hardhat deploy export format (Json with chainIds as keys, which have hardhat network names as keys, which contain arrays of contracts for each)</li>
<li>externalContracts: object with chainIds as keys, with an array of contracts for each</li>
</ul>
</dd>
<dt><a href="#useContractReader">useContractReader</a> ⇒</dt>
<dd><p>Enables you to call functions in contracts and read their values.  It helps keep track of them in the local React states</p>
<p>  ~ Features ~</p>
<ul>
<li>Provide readContracts by loading contracts (see more on ContractLoader.js)</li>
<li>Specify the name of the contract, in this case it is &quot;YourContract&quot;</li>
<li>Specify the name of the variable in the contract, in this case we keep track of &quot;purpose&quot; variable</li>
<li>Pass an args array if the function requires</li>
<li>Pass pollTime - if no pollTime is specified, the function will update on every new block</li>
</ul>
</dd>
<dt><a href="#useGasPrice">useGasPrice</a> ⇒</dt>
<dd><p>Gets the gas price from Eth Gas Station</p>
</dd>
<dt><a href="#useNonce">useNonce</a> ⇒</dt>
<dd><p>Get the current nonce of the address provided</p>
</dd>
<dt><a href="#useOnBlock">useOnBlock</a></dt>
<dd></dd>
<dt><a href="#useOnRepetition">useOnRepetition</a></dt>
<dd><p>A combination of useOnBlock and usePoller</p>
<ul>
<li>the hook will invoke a callback regularly on the &quot;block&quot; event.  If a pollTime is provided,
it will use that instead.</li>
<li>the hook will invoke the callback when the leadTrigger changes state to true as a leading invokation</li>
</ul>
</dd>
<dt><a href="#usePoller">usePoller</a></dt>
<dd></dd>
<dt><a href="#useTimestamp">useTimestamp</a> ⇒</dt>
<dd><p>Get the current timestamp from the latest block</p>
</dd>
<dt><a href="#useUserAddress">useUserAddress</a> ⇒</dt>
<dd><p>Get the address from the current signer or provider</p>
</dd>
<dt><a href="#useUserProviderAndSigner">useUserProviderAndSigner</a> ⇒</dt>
<dd><p>Gets user provider/signer from injected provider or local provider
 Use your injected provider from 🦊 Metamask
 If you don&#39;t have it then instantly generate a 🔥 burner wallet from a local provider</p>
<p>  ~ Features ~</p>
<ul>
<li>Specify the injected provider from Metamask</li>
<li>Specify the local provider</li>
<li>Usage examples:
const tx = Transactor(userSigner, gasPrice)</li>
</ul>
</dd>
</dl>

<a name="useExchangeEthPrice"></a>

## useExchangeEthPrice ⇒

Get the Exchange price of ETH/USD (extrapolated from WETH/DAI)

**Kind**: global constant  
**Returns**: (number) :: price

| Param           | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| targetNetwork   | (TNetwork)                                                       |
| mainnetProvider | (TEthersProvider)                                                |
| pollTime        | (number) :: if >0 use polling, else use instead of onBlock event |

<a name="useTokenList"></a>

## useTokenList ⇒

Gets a tokenlist (see more at https://tokenlists.org/), returning the .tokens only

~ How can I use? ~
const tokenList = useTokenList(); <- default returns the Unsiwap tokens
const tokenList = useTokenList("https://gateway.ipfs.io/ipns/tokens.uniswap.org");

**Kind**: global constant  
**Returns**: (TokenInfo[])

| Param        | Description |
| ------------ | ----------- |
| tokenListUri | (string)    |
| chainId      | (number)    |

<a name="useLookupAddress"></a>

## useLookupAddress ⇒

Gets ENS name from given address and provider

**Kind**: global constant  
**Returns**: (string) ens name

| Param    | Description       |
| -------- | ----------------- |
| provider | (TEthersProvider) |
| address  | (string)          |

<a name="useEnsResolveName"></a>

## useEnsResolveName ⇒

Gets the address from an ENS name and provider

**Kind**: global constant  
**Returns**: (string) :: address

| Param    | Description       |
| -------- | ----------------- |
| provider | (TEthersProvider) |
| ensName  | (string)          |

<a name="useTokenBalance"></a>

## useTokenBalance ⇒

Get the balance of an ERC20 token in an address

~ Features ~

- Provide address and get balance corresponding to given address
- Change provider to access balance on different chains (ex. mainnetProvider)
- If no pollTime is passed, the balance will update on every new block

**Kind**: global constant  
**Returns**: (BigNumber) :: balance

| Param    | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| contract | (ethers->Contract) contract object for the ERC20 token           |
| address  | (string)                                                         |
| pollTime | (number) :: if >0 use polling, else use instead of onBlock event |

<a name="useEventListener"></a>

## useEventListener ⇒

Enables you to keep track of events

~ Features ~

- Provide readContracts by loading contracts (see more on ContractLoader.js)
- Specify the name of the contract, in this case it is "YourContract"
- Specify the name of the event in the contract, in this case we keep track of "SetPurpose" event
- Specify the provider

**Kind**: global constant  
**Returns**: (ethers->Event)

| Param        | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| contracts    | (Record<string, Contract>) :: record of current contractname/contract |
| contractName | (string) :: name of the contract you are interested in                |
| eventName    | (string) :: name of the event                                         |
| provider     | (TEthersProvider)                                                     |
| startBlock   | (number) string block of events                                       |

<a name="parseProviderOrSigner"></a>

## parseProviderOrSigner ⇒

Parse TEthersProviderOrSigner to TProviderAndSigner

**Kind**: global constant  
**Returns**: TProviderAndSigner

| Param            | Description             |
| ---------------- | ----------------------- |
| providerOrSigner | TEthersProviderOrSigner |

<a name="useBalance"></a>

## useBalance ⇒

Gets your balance in ETH from given address and provider

~ Features ~

- Provide address and get balance corresponding to given address
- Change provider to access balance on different chains (ex. mainnetProvider)
- If no pollTime is passed, the balance will update on every new block

**Kind**: global constant  
**Returns**: (Bignumber) :: current balance

| Param    | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| provider | (ethers->Provider)                                               |
| address  | (string)                                                         |
| pollTime | (number) :: if >0 use polling, else use instead of onBlock event |

<a name="useBlockNumber"></a>

## useBlockNumber ⇒

Get the current block number of the network

**Kind**: global constant  
**Returns**: (number) :: block number

| Param    | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| provider | (TEthersProvider)                                                |
| pollTime | (number) :: if >0 use polling, else use instead of onBlock event |

<a name="useBurnerSigner"></a>

## useBurnerSigner ⇒

A hook that creates a buner address and returns a Signer

**Kind**: global constant  
**Returns**: (ethers.signer) :: signer of the wallet

| Param    | Description       |
| -------- | ----------------- |
| provider | (TEthersProvider) |

<a name="useContractExistsAtAddress"></a>

## useContractExistsAtAddress ⇒

Checks whether a contract exists on the blockchain, returns true if it exists, otherwise false

~ Features ~

- Provide contractAddress to check if the contract is deployed
- Change provider to check contract address on different chains (ex. mainnetProvider)

**Kind**: global constant  
**Returns**: (boolean)

| Param           | Description       |
| --------------- | ----------------- |
| provider        | (TEthersProvider) |
| contractAddress | (string)          |

<a name="useContractLoader"></a>

## useContractLoader ⇒

Loads your local contracts and gives options to read values from contracts
or write transactions into them

~ Features ~

- localProvider enables reading values from contracts
- userProvider enables writing transactions into contracts
- Example of keeping track of "purpose" variable by loading contracts into readContracts
  and using ContractReader.js hook:
  const purpose = useContractReader(readContracts,"YourContract", "purpose")
- Example of using setPurpose function from our contract and writing transactions by Transactor.js helper:
  tx( writeContracts.YourContract.setPurpose(newPurpose) )

config can include:

- chainId - to hardcode the chainId, irrespective of the providerOrSigner chainId
- hardhatNetworkName - to hardcode the hardhat network of interest
- customAddresses: { contractName: 0xCustomAddress } to hardcode the address for a given named contract
- hardhatContracts: object following the hardhat deploy export format (Json with chainIds as keys, which have hardhat network names as keys, which contain arrays of contracts for each)
- externalContracts: object with chainIds as keys, with an array of contracts for each

**Kind**: global constant  
**Returns**: (Record<string, Contract>) :: a record of contractName:contract

| Param            | Description                                   |
| ---------------- | --------------------------------------------- |
| providerOrSigner | (TEthersProviderOrSigner)                     |
| config           | (TContractConfig) :: configuration for loader |

<a name="useContractReader"></a>

## useContractReader ⇒

Enables you to call functions in contracts and read their values. It helps keep track of them in the local React states

~ Features ~

- Provide readContracts by loading contracts (see more on ContractLoader.js)
- Specify the name of the contract, in this case it is "YourContract"
- Specify the name of the variable in the contract, in this case we keep track of "purpose" variable
- Pass an args array if the function requires
- Pass pollTime - if no pollTime is specified, the function will update on every new block

**Kind**: global constant  
**Returns**: (<T>) :: generic return type

| Param        | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| contracts    | (Record<string, Contract>) :: a record of contractName/contract              |
| contractName | (string) :: The contract name                                                |
| functionName | (string) :: The function name in the contract                                |
| functionArgs | (any[]) :: arguments to functions                                            |
| pollTime     | (number) :: optional :: if >0 use polling, else use instead of onBlock event |
| formatter    | ((\_value: T) => T) :: optional :: function to format the result             |
| onChange     | (string) :: optional :: callback to call with the function                   |

<a name="useGasPrice"></a>

## useGasPrice ⇒

Gets the gas price from Eth Gas Station

**Kind**: global constant  
**Returns**: (number) gas price in gwei

| Param         | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| targetNetwork | (TNetwork)                                                        |
| speed         | (TGasStationSpeed) 'fast', 'fastest', 'safeLow', 'average'        |
| pollTime      | (number) :: if > 0 use polling, else use instead of onBlock event |

<a name="useNonce"></a>

## useNonce ⇒

Get the current nonce of the address provided

**Kind**: global constant  
**Returns**: (number) nonce

| Param    | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| provider | (TEthersProvider)                                                |
| address  | (string)                                                         |
| pollTime | (number) :: if >0 use polling, else use instead of onBlock event |

<a name="useOnBlock"></a>

## useOnBlock

**Kind**: global constant  
**See**: useOnRepetition for a newer implementation
helper hook to call a function regularly at time intervals when the block changes.

| Param      | Description          |
| ---------- | -------------------- |
| provider   | ethers/web3 provider |
| callbackFn | any function         |
| args       | function parameters  |

<a name="useOnRepetition"></a>

## useOnRepetition

A combination of useOnBlock and usePoller

- the hook will invoke a callback regularly on the "block" event. If a pollTime is provided,
  it will use that instead.
- the hook will invoke the callback when the leadTrigger changes state to true as a leading invokation

**Kind**: global constant

| Param    | Description                                         |
| -------- | --------------------------------------------------- |
| callback | (func) :: callback funciton, can have variable args |
| options  | (TOptions)                                          |
| args     | varargs callback function arguments                 |

<a name="usePoller"></a>

## usePoller

**Kind**: global constant  
**See**: useOnRepetition for a newer implementation
helper hook to call a function regularly in time intervals

| Param      |
| ---------- |
| callbackFn |
| delay      |
| extraWatch |

<a name="useTimestamp"></a>

## useTimestamp ⇒

Get the current timestamp from the latest block

**Kind**: global constant  
**Returns**: (number) :: timestamp

| Param    | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| provider | (TEthersProvider)                                                |
| pollTime | (number) :: if >0 use polling, else use instead of onBlock event |

<a name="useUserAddress"></a>

## useUserAddress ⇒

Get the address from the current signer or provider

**Kind**: global constant  
**Returns**: (string) :: address

| Param            | Description               |
| ---------------- | ------------------------- |
| providerOrSigner | (TEthersProviderOrSigner) |

<a name="useUserProviderAndSigner"></a>

## useUserProviderAndSigner ⇒

Gets user provider/signer from injected provider or local provider
Use your injected provider from 🦊 Metamask
If you don't have it then instantly generate a 🔥 burner wallet from a local provider

~ Features ~

- Specify the injected provider from Metamask
- Specify the local provider
- Usage examples:
  const tx = Transactor(userSigner, gasPrice)

**Kind**: global constant  
**Returns**: (TProviderAndSigner)

| Param                    | Description                                                               |
| ------------------------ | ------------------------------------------------------------------------- |
| injectedProviderOrSigner | (TEthersProviderOrSigner) :: injected provider/signer from metamask etc.. |
| localProvider            | (TEthersProvider) local provider to generate a burner wallet from         |
