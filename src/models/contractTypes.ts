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
export type TExternalContractsDefinition = {
  [chainId: number]: {
    [contractName: string]: {
      address: string;
    };
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
