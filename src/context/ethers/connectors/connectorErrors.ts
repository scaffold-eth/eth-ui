/**
 * @category EthersContext
 */
export class UserClosedModalError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'EthersModalConnector: The user closed the modal with selecting a provider.';
  }
}

/**
 * @category EthersContext
 */
export class CouldNotActivateError extends Error {
  public constructor(error: unknown) {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: Could not activate provider.  ${(error as string) ?? ''}`;
  }
}

/**
 * @category EthersContext
 */
export class NoEthereumProviderFoundError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: No ethereum provider Found.`;
  }
}
