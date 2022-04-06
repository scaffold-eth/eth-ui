---
sidebar_position: 1
---

# Quick start

## (in 5 minutes or less 😉)

1. Create a React app
2. Connect your app to your smart contracts.
3. Install Eth-hooks in your React app root folder by entering the following in your terminal

```sh
yarn add eth-hooks
```

4. Setup context in your React app `index.tsx` file

```tsx title="src/index.tsx"

<ContractsAppContext>
  <EthersAppContext>
    <App />
  </EthersAppContext>
</ContractsAppContext>

```

5. If you're using providers, here's an example of how they sould look in your `App.tsx` file

```tsx title="src/App.tsx"
export default function App() {
  return (
    <ContractsAppContext>
      <EthersAppContext>
        <ThemeSwitcherProvider>
          <MainPage />
        </ThemeSwitcherProvider>
      </EthersAppContext>
    </ContractsAppContext>
  );
}
```

Now you can use any Eth-hook you need anywhere in your application.

:::note **Need an out-of-the-box fullstack application?**
Try [Scaffold-eth](https://github.com/scaffold-eth/) (Solidity, Hardhat, Ethers, and React.
:::
:::note **_Did someone say Typescript?_**
Check out [Scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript).
:::
