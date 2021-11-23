import { BaseContract, ethers } from 'ethers';

import { createContractInstance, TAppContractConnectors, TContractConnector, TEthersAdaptor } from '~~/models';

type TContractsByName = { [contractName: string]: { [chainId: number]: BaseContract } };
type TContractsByChainId = { [chainId: number]: { [contractName: string]: BaseContract } };
export class AppContractList {
  protected _connectors: TAppContractConnectors;

  protected _byName: TContractsByName;
  protected _byChainId: TContractsByChainId;

  public get byName(): TContractsByName {
    return this._byName;
  }

  protected setByChainIdValues(): void {
    const contractsByChainId: TContractsByChainId = {};
    Object.keys(this._byName).forEach((contractName: string) => {
      Object.keys(this.byName[contractName])
        .map(Number)
        .forEach((chainId: number) => {
          contractsByChainId[chainId][contractName] = this._byName[contractName][chainId];
        });
    });

    this._byChainId = this._byChainId;
  }

  constructor() {
    this._byName = {};
    this._byChainId = {};
    this._connectors = {};
  }

  static connectContracts = async (
    ethersAdaptor: TEthersAdaptor | undefined,
    contractConnectors: TAppContractConnectors
  ): Promise<AppContractList> => {
    const chainId = ethersAdaptor?.chainId;
    const account = ethersAdaptor?.account;
    const signer = ethersAdaptor?.signer;
    const result: AppContractList = new AppContractList();

    result._connectors = contractConnectors;

    if (chainId == null || signer == null || account == null || chainId == null) {
      return result;
    }

    for (const contractName in contractConnectors) {
      const connector = contractConnectors[contractName];
      const contract = await createContractInstance(connector, signer);
      result._byName[contractName][chainId] = contract;
      result.setByChainIdValues();
    }
    return result;
  };

  connect = async (
    ethersAdaptor: TEthersAdaptor,
    connector: TContractConnector<BaseContract, ethers.utils.Interface>
  ): Promise<void> => {
    const chainId = ethersAdaptor?.chainId;
    const account = ethersAdaptor?.account;
    const signer = ethersAdaptor?.signer;

    if (chainId == null || signer == null || account == null || chainId == null) {
      return;
    }
    this._connectors[connector.contractName] = connector;

    const contract = await createContractInstance(connector, signer);
    this._byName[connector.contractName] = {};
    this._byName[connector.contractName][chainId] = contract;
    this.setByChainIdValues();
  };
}
