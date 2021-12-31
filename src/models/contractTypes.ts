import { Provider } from '@ethersproject/providers';
import { BaseContract, ethers, Signer } from 'ethers';

export type TConnectorBase<GContract extends BaseContract, GContractInterface extends ethers.utils.Interface> = {
  connect: (address: string, signerOrProvider: Signer | Provider) => GContract;
  createInterface: () => GContractInterface;
};

export type TContractConnector<
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

export type TConnectorList<GContactNames extends string> = {
  [contractName in GContactNames]: TContractConnector<GContactNames, BaseContract, ethers.utils.Interface>;
};

export type TTypedContract<
  GContractNames extends string,
  GAppContractConnectorList
> = GAppContractConnectorList extends {
  [key in GContractNames]: { connect: (address: any, signerOrProvider: any) => infer TypedContract };
}
  ? TypedContract
  : BaseContract;

/**
 * #### Summary
 * Describes the sctructure of each contract in hardhat_contracts.json
 */
export type THardhatContractJson = {
  address: string;
  abi?: any[];
};

/**
 * #### Summary
 * Describes the structure of hardhat_contracts.json
 * - {chainIds: { networkNames: {contracts} }}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type THardhatContractsFileJson = {
  [chainId: string]: {
    [networkName: string]: {
      name: string;
      chainId: string;
      contracts: { [contractName: string]: THardhatContractJson };
    };
  };
};

/**
 * #### Summary
 * Contracts by contract name
 * - A record of contract names and their hardhat contract json
 * - includes chain id
 */
export type TDeployedContractJsonData = {
  [contractName: string]: THardhatContractJson & {
    chainId: number;
  };
};

/**
 * {chainId: {contract: address}}, contains an record of contracts
 * #### Summary
 * A type for external contracts
 * - it is a record of contract names and their deployed address
 * - this data type is used by {@link ContractsAppContext} to connect to external contracts
 *
 * @category Models
 */
export type TExternalContractsAddressMap = {
  [chainId: number]: {
    [contractName: string]: string;
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
