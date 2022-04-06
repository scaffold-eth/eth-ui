import { BaseContract, ethers } from 'ethers';
import { merge } from 'merge-anything';

import { TContractConnectorBase, TContractConnector, TContractConnectFunc } from '~~/models';
import {
  THardhatContractDataRecord,
  TExternalContractsAddressMap,
  TDeployedHardhatContractsJson,
  TBasicContractDataConfig,
  TExternalContractDataRecord,
} from '~~/models/contractTypes';

const extractHardhatContracts = (configJson: TDeployedHardhatContractsJson): THardhatContractDataRecord => {
  const contractData: THardhatContractDataRecord = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    const deployedDataByNetwork = Object.values(configJson[chainId]).filter(
      (f) => parseInt(f?.chainId) === chainId
    )?.[0];
    if (deployedDataByNetwork?.chainId != null) {
      for (const contractName in deployedDataByNetwork.contracts) {
        const config: TBasicContractDataConfig = {
          [chainId]: { address: deployedDataByNetwork.contracts[contractName].address, chainId },
        };

        const abi = deployedDataByNetwork.contracts[contractName].abi;
        if (abi && abi?.length > 0) {
          contractData[contractName] = merge(contractData[contractName] ?? {}, { abi: abi });
        }
        contractData[contractName] = merge({ ...contractData[contractName] }, { config });
      }
    }
  }

  return contractData;
};

const extractExternalContracts = (configJson: TExternalContractsAddressMap): TExternalContractDataRecord => {
  const contractData: TExternalContractDataRecord = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    for (const contractName in configJson[chainId]) {
      const config: TBasicContractDataConfig = {
        [chainId]: { address: configJson[chainId][contractName], chainId: chainId },
      };
      contractData[contractName] = merge({ ...(contractData[contractName] ?? {}) }, { config });
    }
  }

  return contractData;
};

export const createConnectorForHardhatContract = <GContractNames extends string, GBaseContract extends BaseContract>(
  contractName: GContractNames,
  typechainFactory: TContractConnectorBase<GBaseContract>,
  deployedHardhatContractJson: TDeployedHardhatContractsJson
): TContractConnector<GContractNames, GBaseContract> => {
  const info = extractHardhatContracts(deployedHardhatContractJson)[contractName];

  if (info == null || info.abi == null) {
    throw new Error(
      `Contract ${contractName} not found in deployed contracts (hardhat_config.json).  Check your hardhat deploy scripts and hardhat_config.json`
    );
  }

  return {
    contractName,
    connect: typechainFactory.connect,
    // createInterface: typechainFactory.createInterface,
    abi: (info?.abi ?? typechainFactory.abi ?? []) as Record<string, any>[],
    config: {
      ...info.config,
    },
  };
};

export const createConnectorForExternalContract = <GContractNames extends string, GBaseContract extends BaseContract>(
  contractName: GContractNames,
  typechainFactory: TContractConnectorBase<GBaseContract>,
  deployedContractJson: TExternalContractsAddressMap
): TContractConnector<GContractNames, GBaseContract> => {
  const info = extractExternalContracts(deployedContractJson)[contractName];

  if (info == null) {
    throw new Error(
      `Contract ${contractName} not found in external contract map.  Check that contractName: address map is correct.  This is required by eth-sdk`
    );
  }

  return {
    contractName,
    connect: typechainFactory.connect,
    // : typechainFactory.createInterface,
    abi: typechainFactory.abi ?? [],
    config: {
      ...info.config,
    },
  };
};

export const createConnectorForExternalAbi = <
  GContractNames extends string,
  GBaseContract extends BaseContract = BaseContract
>(
  contractName: GContractNames,
  config: TBasicContractDataConfig,
  abi: Record<string, any>[],
  connectFunc: TContractConnectFunc<GBaseContract> | undefined = undefined
): TContractConnector<GContractNames, GBaseContract> => {
  if (connectFunc) {
    return {
      contractName,
      connect: connectFunc,
      abi: abi,
      config: { ...config },
    };
  } else {
    return {
      contractName,
      connect: (address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider): GBaseContract => {
        return new BaseContract(address, abi, signerOrProvider) as GBaseContract;
      },
      abi: abi,
      config: { ...config },
    };
  }
};
