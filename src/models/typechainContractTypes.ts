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
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
> = {
  contractName: string;
  connect: (address: string, signerOrProvider: Signer | Provider) => GContract;
  createInterface: () => GContractInterface;
  abi: Record<string, any>[];
  config: {
    [chainId: number]: { address: string };
  };
};

export type TAppContractConnectorList = {
  [contractName: string]: TTypechainContractConnector<BaseContract, ethers.utils.Interface>;
};
