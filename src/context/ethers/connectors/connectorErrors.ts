export const connectorErrorText = {
  NoStaticJsonRPCProviderFoundError: 'Could not find a static json-rpc provider.  Is it running?',
  NoEthereumProviderFoundError: 'No web3 provider found',
  CouldNotActivateError: 'Could not activate the web3 provider',
  UserClosedModalError: 'Did not log in, the user did not select a web3 provider',
} as const;

/**
 * @category EthersContext
 */
export class UserClosedModalError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: ${connectorErrorText.UserClosedModalError}.`;
  }
}

/**
 * @category EthersContext
 */
export class CouldNotActivateError extends Error {
  public constructor(error: unknown) {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: ${connectorErrorText.CouldNotActivateError}.  ${(error as string) ?? ''}`;
  }
}

/**
 * @category EthersContext
 */
export class NoEthereumProviderFoundError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: ${connectorErrorText.NoEthereumProviderFoundError}.`;
  }
}

/**
 * @category EthersContext
 */
export class NoStaticJsonRPCProviderFoundError extends Error {
  public constructor(error: unknown) {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: ${connectorErrorText.NoStaticJsonRPCProviderFoundError}.   ${
      (error as string) ?? ''
    }`;
  }
}
