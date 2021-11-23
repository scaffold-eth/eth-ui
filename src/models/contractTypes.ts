import { Provider } from '@ethersproject/providers';
import { BaseContract, ethers, Signer } from 'ethers';

const extractDeployedContracts = (configJson: TDeployedHardhatContractsJson): TDeployedContracts => {
  const contractData: TDeployedContracts = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    const deployedDataByNetwork = Object.values(configJson[chainId]).filter(
      (f) => parseInt(f?.chainId) === chainId
    )?.[0];
    if (deployedDataByNetwork?.chainId != null) {
      for (const contractName in deployedDataByNetwork.contracts) {
        contractData[contractName] = { ...deployedDataByNetwork.contracts[contractName], chainId: chainId };
      }
    }
  }

  return contractData;
};

export type TContractConnector<GContract extends BaseContract, ContractInterfaceT extends ethers.utils.Interface> = {
  contractName: string;
  connect: (address: string, signerOrProvider: Signer | Provider) => GContract;
  createInterface: () => ContractInterfaceT;
  config: {
    [chainId: number]: { address: string };
  };
};

// export interface ITypedContractFactoryBuilder<
//   GContract extends BaseContract,
//   ContractInterfaceT extends ethers.utils.Interface
// > extends Omit<InstanceType<typeof ContractFactory>, 'connect'>,
//     TContractConnector<GContract, ContractInterfaceT> {}

export type TAppContractConnectors = {
  [contractName: string]: TContractConnector<BaseContract, ethers.utils.Interface>;
};
export const createContractConnector = <
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: string,
  typeFactory: TContractConnector<GBaseContract, GContractInterface>,
  deployedContractJson: TDeployedHardhatContractsJson
): TContractConnector<GBaseContract, GContractInterface> => {
  const info = extractDeployedContracts(deployedContractJson)[contractName];

  return {
    contractName,
    connect: typeFactory.connect,
    createInterface: typeFactory.createInterface,
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const createContractInstance = async <
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  // factoryConstructor: new (signer: Signer) => ContractFactory & TContractConnector<GContract, GContractInterface>,
  connector: TContractConnector<GContract, GContractInterface>,
  signer: Signer
): Promise<GContract> => {
  const chainId: number = await signer.getChainId();
  const address = connector.config[chainId].address;
  if (chainId != null && address != null) {
    const contract = connector.connect(connector.config[chainId].address, signer);

    if (chainId != null && contract != null) {
      return contract;
    }
  }

  throw 'Could not create contract instance';
};

/**
 * #### Summary
 * describes the sctructure of a contract in hardhat_contracts.json
 */
export type THardhatContractJson = {
  address: string;
  abi: any[];
};

/**
 * #### Summary
 * Contracts deployed by hardhat
 * - {chainIds: { networkNames: {contracts} }}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type TDeployedHardhatContractsJson = {
  [chainId: string]: {
    [networkName: string]: {
      name: string;
      chainId: string;
      contracts: { [contractName: string]: THardhatContractJson };
    };
  };
};

export type TDeployedContracts = {
  [contractName: string]: THardhatContractJson & {
    chainId: number;
  };
};

// /**
//  * #### Summary
//  * Contract factories for contracts deployed by hardhat
//  * - contractName: ethers.ContractFactory
//  * - Used by {@link useContractLoader}
//  *
//  * @category Models
//  */
// export type TDeployedContractHelper = {
//   factoryBridge: { [contractName: string]: IContractFactoryBridge };
//   contractList: {
//     [chainId: number]: { [contractName: string]: BaseContract };
//   };
// };

/**
 * #### Summary
 * A type for external contracts
 * - {chainId: {contracts}}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type TExternalContracts = {
  [chainId: number]: {
    name?: string;
    chainId?: string;
    contracts?: { [contractName: string]: THardhatContractJson };
  };
};

/**
 * #### Summary
 * Contract function information:
 * - contractName
 * - functionname
 * - functionArgs: functionArguments, an array
 *
 * @category Models
 */
export type TContractFunctionInfo = {
  contractName: string;
  functionName: string;
  functionArgs?: any[];
};

/**
 * #### Summary
 * Configuration for useContractLoader
 *
 * @category Models
 */
export type TContractLoaderConfig = {
  /**
   * your local hardhat network name
   */
  hardhatNetworkName?: string;
  /**
   * the address:contractName key value pair
   */
  customAddresses?: Record<string, string>;
  /**
   * Hardhat deployed contracts
   * untyped
   */
  deployedContractsJson?: TDeployedHardhatContractsJson;
  /**
   * External contracts (such as DAI)
   */
  externalContracts?: TExternalContracts;
};
