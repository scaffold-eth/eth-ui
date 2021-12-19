import { BaseContract, ethers, Signer } from 'ethers';

import {
  TDeployedContractJsonData,
  TExternalContractsDefinition,
  THardhatContractsFileJson,
} from '../models/contractTypes';
import { TTypechainContractFactory, TTypechainContractConnector } from '../models/typechainContractTypes';

const extractDeployedContracts = (configJson: THardhatContractsFileJson): TDeployedContractJsonData => {
  const contractData: TDeployedContractJsonData = {};
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

const extractExternalContracts = (configJson: TExternalContractsDefinition): TDeployedContractJsonData => {
  const contractData: TDeployedContractJsonData = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    for (const contractName in configJson[chainId]) {
      contractData[contractName] = { ...configJson[chainId][contractName], chainId: chainId };
    }
  }

  return contractData;
};

export const createTypechainContractConnectorHardhatContract = <
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: string,
  typechainFactory: TTypechainContractFactory<GBaseContract, GContractInterface>,
  deployedHardhatContractJson: THardhatContractsFileJson
): TTypechainContractConnector<GBaseContract, GContractInterface> => {
  const info = extractDeployedContracts(deployedHardhatContractJson)[contractName];

  return {
    contractName,
    connect: typechainFactory.connect,
    createInterface: typechainFactory.createInterface,
    abi: info.abi as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const createTypechainContractConnectorForExternalContract = <
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: string,
  typechainFactory: TTypechainContractFactory<GBaseContract, GContractInterface>,
  deployedContractJson: TExternalContractsDefinition
): TTypechainContractConnector<GBaseContract, GContractInterface> => {
  const info = extractExternalContracts(deployedContractJson)[contractName];

  return {
    contractName,
    connect: typechainFactory.connect,
    createInterface: typechainFactory.createInterface,
    abi: info.abi as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const connectToContractWithSigner = async <
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  // factoryConstructor: new (signer: Signer) => ContractFactory & TContractConnector<GContract, GContractInterface>,
  connector: TTypechainContractConnector<GContract, GContractInterface>,
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
