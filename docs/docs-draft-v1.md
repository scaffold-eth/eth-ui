# Eth-Hooks V4 Documentation

 Speed up your blockchain project.

 Build a React frontend fast with the help of Eth-hooks.

 Read and write to smart contracts using pre-built hooks designed to work with [ethers.js](https://docs.ethers.io/v5/) and context.

_These docs are for developers who are already familiar with the basics of [Ethereum](https://ethereum.org/en/) and [React](https://reactjs.org/)._

<hr>

Eth-hooks is part of the [Scaffold-Eth ecosystem](https://github.com/scaffold-eth/).

| Project | Description |
|---------|---------|
| [Scaffold-Eth](https://github.com/scaffold-eth/scaffold-eth) | Fast fullstack blockchain application development |
| [Eth-components](https://github.com/scaffold-eth/eth-components) | Common React components for blockchain applications |
| [Eth-hooks](https://github.com/scaffold-eth/eth-hooks) | Useful React hooks for blockchain applications |

<hr>

## Key features of V4

- Designed for easy use without a need to understand what's under the hood
- Choose how often a hook receives updates from the network
- Easily use context with ethers and contracts
- Typed contracts that make it easier to understand the contract interface
- Allows different ways to pass in ethers provider or secondary providers
- Network RPC calls are cached stopping unnecessary requests to the network
- [Typescript](https://www.typescriptlang.org/) friendly
- We use an [MIT license](https://en.wikipedia.org/wiki/MIT_License)

### Quick start

1. Create a React app
2. Connect your app to your smart contracts.
3. Install Eth-hooks in your React app root folder by entering the following in your terminal

```bash
yarn add eth-hooks
```

4. Setup context in your React app index.js file

```javascript
<ContractsAppContext>
  <EthersAppContext>
    <App />
  </EthersAppContext>
</ContractsAppContext>
```

5. If you're using providers, here's an example of how they sould look in your App.js file

```javascript
function App() {
  return (
        <ContractsAppContext>
          <EthersAppContext>
              <ThemeSwitcherProvider>
                  <MainPage />
              </ThemeSwitcherProvider>
          </EthersAppContext>
        </ContractsAppContext>
  );
};
export default App;
```

Now you can use any Eth-hook you need anywhere in your application.

### Cookbook for commonly used hooks

<details>
  <summary>
    useDexEthPrice
  </summary>

  Get the Exchange price of ETH/USD (extrapolated from WETH/DAI) from uniswap
  <h6>Notes</h6>
  uses useOnRepetition, does not use context
  <h6>Parameters</h6>
  
  | Name | Type |
  |------|------|
  | mainnetProvider | undefined / TEthersProvider |
  | targetNetworkInfo? | TNetworkInfo |
  | options | TUpdateOptions < any > | 

  <h6>Returns</h6>
    THookResult < number >
    price in USD
  <h6>Example</h6>

  ```typescript
  export const useDexEthPrice = (
  mainnetProvider: TEthersProvider | undefined,
  targetNetworkInfo?: TNetworkInfo,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<number> => {
  const keys = [{ ...queryKey, ...providerKey(mainnetProvider) }, { networkPrice: targetNetworkInfo?.price }] as const;
  type TAsyncResult = number | undefined;

  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<TAsyncResult> => {
      const { networkPrice } = keys.queryKey[1];
      if (networkPrice) {
        return networkPrice;
      } else if (mainnetProvider) {
        const network = await mainnetProvider.getNetwork();

        const DAI = new Token(network ? network.chainId : 1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);
        const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
        const route = new Route([pair], WETH[DAI.chainId]);
        const price = parseFloat(route.midPrice.toSignificant(6));
        return price;
      }
    },
    {
      ...processQueryOptions<TAsyncResult>(options),
    }
  );
```

</details>
<details>
  <summary>
    useDexTokenList
  </summary>

  Get a tokenlist from uniswap ipfs tokenlist
  <h6>Notes</h6>
  you can also point it to another URI
  <h6>Parameters</h6>
  
  | Name | Type | Default value | Description |
  |------|------|---------------|-------------|
  | tokenListURI | string | 'https://gateway.ipfs.io/ipns/tokens.uniswap.org' |
  | chainId? | number | undefined | optional, you can filter by a chainId |
  | options | TUpdateOptions < any > | undefined |

  <h6>Returns</h6>
  THookResult < TokenInfo[] >
  <br>
  (TokenInfo[]) from ‘@uniswap/token-lists’

  <h6>Example</h6>

  ```typescript
  export const useDexTokenList = (
  tokenListUri: string = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org',
  chainId?: number,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<TokenInfo[]> => {
  const keys = [{ ...queryKey }, { tokenListUri, chainId }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<TokenInfo[]> => {
      const { tokenListUri, chainId } = keys.queryKey[1];
      let tokenInfo: TokenInfo[] = [];
      const tokenListResp: TokenList = (await axios(tokenListUri)).data as TokenList;
      if (tokenListResp != null) {
        if (chainId) {
          tokenInfo = tokenListResp.tokens.filter((t: TokenInfo) => {
            return t.chainId === chainId;
          });
        } else {
          tokenInfo = tokenListResp.tokens;
        }
      }
      return tokenInfo;
    },
    {
      ...processQueryOptions<TokenInfo[]>(options),
      isDataEqual: (oldResult, newResult) => isEqual(oldResult, newResult),
    }
  );
  ```

  Go to code.

</details>

<hr>

### Need an out-of-the-box fullstack application?

Try [Scaffold-eth](https://github.com/scaffold-eth/) (Solidity, Hardhat, Ethers, and React).

***Did someone say Typescript?***

Check out [Scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript).

<hr>

### Basic tutorial

## Deep dive into V4

[Check out the video presentation of Eth-hooks V4 advanced features!](https://www.youtube.com/watch?v=STxAdE8wQwY)

### Design principles

- Allows flexibility in how often a hook receives updates from the network. You can choose your update method, for example, polling or every block number.
- Easily use context
  - **ethersAppContext**
  - **contractAppContext** (new in V4): Access your contract easily anywhere in your app.
- Compatibility with different ways to pass in ethers provider
- Reducing RPC calls with easy caching. Uses React Query under the hood to cache any RPC calls. This lets you use Eth-hooks anywhere in the app and you don't have to worry about  optimization. You will automatically get data from the cached layer without extra network calls.
- Typed contracts that make it easier to understand the contract interface, reducing mistakes.

#### Providers

- EthersAppContext: The context in Eth-hooks uses ethers under-the-hood. Wrap your main app in context and that allows you to use context anywhere in your app (the provider, signer, account).
  - App wide providers with context
  - Override
    - Alternate context for web3-react
    - Pass in provider if you need

#### Cache

Built with React-Query and EthersContext. Get a cache when you wrap your app in context.

- All hook results are cached by EthersContext
  - Prevents repeated calls to the network because the hooks hit the cache first.
  - No need to pass variables. If you use a hook anywhere in the app it will automatically hit the cache.
  - When the network or signer changes the cache is automatically invalidated so you don't get the wrong values.

#### Data updates

- There are several different options for updating hook data. Simply pass in your preferred  update method.
  - **Default** is the hook updates every block
  - You can set it to update every n/blocks
  - Polling can be used (minimum time is 10 seconds to prevent spamming the network)
  - Refresh on window focus or on mount
  - Set stale time for data. Default is 30 seconds

#### Hook return

The signature of the hook is returned.

- This is similar to useState. You get a tuple of [result, update]
  - Gives you the result or...
  - You can manually update the hook

#### Contract context

You can call any contract with a simple hook.

- Automatically get external contracts that are verified
  - Automatically typed by context
- Hardhat contracts
  - Automatically typed by context
- Load unverified contracts from an ABI
  - BaseContract

### Advanced cookbook

### Advanced tutorial

### API documentation

## Author

### Contributors

### MIT License