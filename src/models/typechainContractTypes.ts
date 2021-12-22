import { Provider } from '@ethersproject/providers';
import { BaseContract, ethers, Signer } from 'ethers';

export type TTypechainContractFactory<
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
> = {
  connect: (address: string, signerOrProvider: Signer | Provider) => GContract;
  createInterface: () => GContractInterface;
};

export type TTypechainContractConnector<
  GContractNames extends string,
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
> = {
  contractName: GContractNames;
  connect: (address: string, signerOrProvider: Signer | Provider) => GContract;
  createInterface: () => GContractInterface;
  abi: Record<string, any>[];
  config: {
    [chainId: number]: { address: string };
  };
};

export type TTypechainContractConnectorList<GContactNames extends string> = {
  [contractName in GContactNames]: TTypechainContractConnector<GContactNames, BaseContract, ethers.utils.Interface>;
};
