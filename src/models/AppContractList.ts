import { BaseContract, ethers } from 'ethers';

import { connectToContractWithSigner } from '~~/functions/createTypechainContractConnector';
import { TEthersAdaptor } from '~~/models';
import { TAppContractConnectorList, TTypechainContractConnector } from '~~/models/typechainContractTypes';

type TContractsByName = { [contractName: string]: { [chainId: number]: BaseContract } };
type TContractsByChainId = { [chainId: number]: { [contractName: string]: BaseContract } };

export class AppContractList {
  protected _connectors: TAppContractConnectorList;

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

  static connectToAppContracts = async (
    ethersAdaptor: TEthersAdaptor | undefined,
    appContractConnectorList: TAppContractConnectorList
  ): Promise<AppContractList> => {
    const chainId = ethersAdaptor?.chainId;
    const account = ethersAdaptor?.account;
    const signer = ethersAdaptor?.signer;
    const result: AppContractList = new AppContractList();

    result._connectors = appContractConnectorList;

    if (chainId == null || signer == null || account == null || chainId == null) {
      return result;
    }

    for (const contractName in appContractConnectorList) {
      const connector = appContractConnectorList[contractName];
      const contract = await connectToContractWithSigner(connector, signer);
      result._byName[contractName][chainId] = contract;
      result.setByChainIdValues();
    }
    return result;
  };

  public connect = async (
    ethersAdaptor: TEthersAdaptor,
    contractConnector: TTypechainContractConnector<BaseContract, ethers.utils.Interface>
  ): Promise<void> => {
    const chainId = ethersAdaptor?.chainId;
    const account = ethersAdaptor?.account;
    const signer = ethersAdaptor?.signer;

    if (chainId == null || signer == null || account == null || chainId == null) {
      return;
    }
    this._connectors[contractConnector.contractName] = contractConnector;

    const contract = await connectToContractWithSigner(contractConnector, signer);
    this._byName[contractConnector.contractName] = {};
    this._byName[contractConnector.contractName][chainId] = contract;
    this.setByChainIdValues();
  };
}
