import { BaseContract, ethers, utils } from 'ethers';

import { isValidEthersAdaptor } from '~~/functions';
import { TConnectorConnectorBase, TContractConnector, TEthersAdaptor } from '~~/models';
import {
  TBasicContractDataRecord,
  TExternalContractsAddressMap,
  TDeployedHardhatContractsJson,
} from '~~/models/contractTypes';

const extractHardhatContracts = (configJson: TDeployedHardhatContractsJson): TBasicContractDataRecord => {
  const contractData: TBasicContractDataRecord = {};
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

const extractExternalContracts = (configJson: TExternalContractsAddressMap): TBasicContractDataRecord => {
  const contractData: TBasicContractDataRecord = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    for (const contractName in configJson[chainId]) {
      contractData[contractName] = { address: configJson[chainId][contractName], chainId: chainId };
    }
  }

  return contractData;
};

export const createConnectorForHardhatContract = <
  GContractNames extends string,
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: GContractNames,
  typechainFactory: TConnectorConnectorBase<GBaseContract, GContractInterface>,
  deployedHardhatContractJson: TDeployedHardhatContractsJson
): TContractConnector<GContractNames, GBaseContract, GContractInterface> => {
  const info = extractHardhatContracts(deployedHardhatContractJson)[contractName];

  if (info == null) {
    throw new Error(
      `Contract ${contractName} not found in deployed contracts (hardhat_config.json).  Check your hardhat deploy scripts and hardhat_config.json`
    );
  }

  return {
    contractName,
    connect: typechainFactory.connect,
    createInterface: typechainFactory.createInterface,
    abi: (info?.abi ?? typechainFactory.abi ?? []) as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const createConnectorForExternalContract = <
  GContractNames extends string,
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: GContractNames,
  typechainFactory: TConnectorConnectorBase<GBaseContract, GContractInterface>,
  deployedContractJson: TExternalContractsAddressMap
): TContractConnector<GContractNames, GBaseContract, GContractInterface> => {
  const info = extractExternalContracts(deployedContractJson)[contractName];

  if (info == null) {
    throw new Error(
      `Contract ${contractName} not found in external contract map.  Check that contractName: address map is correct.  This is required by eth-sdk`
    );
  }

  return {
    contractName,
    connect: typechainFactory.connect,
    createInterface: typechainFactory.createInterface,
    abi: (info?.abi ?? typechainFactory.abi ?? []) as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const createConnectorForExternalAbi = <GContractNames extends string>(
  contractName: GContractNames,
  config: { [key in number]: { address: string } },
  abi: Record<string, any>[]
): TContractConnector<GContractNames, BaseContract, ethers.utils.Interface> => {
  return {
    contractName,
    connect: (address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider): BaseContract => {
      return new BaseContract(address, abi, signerOrProvider);
    },
    createInterface: (): ethers.utils.Interface => new utils.Interface(abi),
    abi: abi,
    config: config,
  };
};

export const connectToContractWithAdaptor = <
  GContractNames extends string,
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  connector: TContractConnector<GContractNames, GContract, GContractInterface>,
  adaptor: TEthersAdaptor
): GContract | undefined => {
  if (adaptor == null || !isValidEthersAdaptor(adaptor)) {
    console.warn('No valid ethers adaptor provided.  Skipping contract connection');
    return undefined;
  }

  const { signer, provider } = adaptor;
  const signerOrProvider = signer ?? provider;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const chainId = adaptor.chainId!;
  const contractAddress = connector?.config?.[chainId]?.address;
  if (contractAddress != null && signerOrProvider != null) {
    const contract = connector.connect(connector.config[chainId].address, signerOrProvider);
    if (contract != null) {
      return contract;
    }
  }

  // error handling
  if (connector.config[chainId] != null) {
    console.warn('ContractConnector requires signer with the same chainId to connect contract');
  }
  console.log(
    `Couldn't connect to contract ${connector?.contractName}:   signer chainId: ${chainId}, config: ${JSON.stringify(
      connector?.config
    )}.`
  );
  console.log('🙅🏽‍♂️ Please make sure the correct network is connected and the contract is deployed.');
  return undefined;
};
