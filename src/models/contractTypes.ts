/**
 * #### Summary
 * Describes the sctructure of each contract in hardhat_contracts.json
 */
export type TBasicContractData = {
  address: string;
  abi?: any[];
};

export type TBasicContractDataConfig = {
  [chainId: number]: {
    chainId: number;
    address: string;
  };
};

/**
 * #### Summary
 * Contracts by contract name
 * - A record of contract names and their hardhat contract json
 * - includes chain id
 */
export type THardhatContractDataRecord = {
  [contractName: string]: {
    config: TBasicContractDataConfig;
    abi: any[];
  };
};

/**
 * #### Summary
 * Contracts by contract name
 * - A record of contract names and their hardhat contract json
 * - includes chain id
 */
export type TExternalContractDataRecord = {
  [contractName: string]: {
    config: TBasicContractDataConfig;
  };
};

/**
 * #### Summary
 * Describes the structure of hardhat_contracts.json
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
      contracts: {
        [contractName: string]: {
          address: string;
          abi?: any[];
        };
      };
    };
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
