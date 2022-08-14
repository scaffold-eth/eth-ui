## React 18 Updates

Eth-hooks, Eth-components and Scaffold-eth-typescript have been updated to React 18.

React 18 removes `{children: ReactNode}` from `React.FC` and so the library had typescript errors when used with react 18, and all of this should be solved.

## Better login / logout error handling

### EthersModalConnector

EthersModalConnectors now throws typed errors that an app could use to show notifications when login and logout fails.

- Login now has `onError` callback that passes back the typed error
- Logout now also invoke a callback `onSuccess` incase certain actions needed to be taken on logout

### How does EthersAppContext tie in?

Both these can be used via by ethersAppContext as the `modal` uses `EthersModalConnector` to invoke web3-modal.

```ts
const ethersAppContext = useEthersAppContext();

// loginOnError is the callback that would be called with the error
ethersContext.openModal(connector, loginOnError);

// logoutOnSuccess is the callback that woudl be called when the app successfully logs out of the users wallet
ethersAppContext.disconnectModal(props.logoutOnSuccess);
```
