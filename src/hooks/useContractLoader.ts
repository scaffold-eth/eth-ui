import { BaseContract } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsMounted } from 'test-usehooks-ts';

import { parseProviderOrSigner, providerKey } from '~~/functions';
import {
  TDeployedHardhatContractsJson as THardhatDeployedContractsJson,
  TBasicContractData,
  TEthersProviderOrSigner,
} from '~~/models';

/**
 * #### Summary
 * A type for external contracts
 * - {chainId: {contracts}}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
type TExternalContracts = {
  [chainId: number]: {
    name?: string;
    chainId?: string;
    contracts?: {
      [contractName: string]: {
        address: string;
        abi?: any[];
      };
    };
  };
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
   * the contractName:address key value pair
   */
  customAddresses?: Record<string, string>;
  /**
   * Hardhat deployed contracts
   * untyped
   */
  deployedContractsJson?: THardhatDeployedContractsJson;
  /**
   * External contracts (such as DAI)
   */
  externalContracts?: TExternalContracts;
};

export const parseContractsInDeployedHardhatContractsJson = (
  contractList: THardhatDeployedContractsJson,
  chainId: number
): Record<string, TBasicContractData> => {
  let combinedContracts: Record<string, TBasicContractData> = {};

  // combine partitioned contracts based on all the available and chain id.
  if (contractList?.[chainId]?.[0] != null) {
    const chainContracts = contractList?.[chainId]?.[0]?.contracts;
    if (chainContracts != null) {
      combinedContracts = {
        ...combinedContracts,
        ...chainContracts,
      };
    }
  }

  return combinedContracts;
};
/**
 * #### Summary
 * Loads your contracts and returns them. ✋🏽 @deprecated
 * Gives options to read values from contracts or write transactions into them.
 *
 * ##### ✏️ Notes
 * - ✋🏽 For easy app wide contract access use {@link AppContractContex} created by {@link contractsContextFactory}.  See {@link contractsContextFactory} for more details.
 *
 * A optional providerOrSigner is needed to initalize the contract class
 * - if none is given, the context providerOrSigner is used if the chainId is the same.
 * - A signer is required for write contracts
 * Provider
 * - uses the current ethersProvider from context
 * ChainId
 * - if chain id is not given, it will use the chainId of the provider
 *
 * @category Hooks
 *
 * @param config
 * @param providerOrSigner (optional) used to initalize the contract class
 * @param configChainId (optional) can be used to target specific a particular network (such as mainnet) instead of the current provider
 * @returns Record of contractName:Contracts
 */
export const useContractLoader = (
  config: TContractLoaderConfig = {},
  providerOrSigner: TEthersProviderOrSigner | undefined
): Record<string, BaseContract> => {
  const isMounted = useIsMounted();

  const [contracts, setContracts] = useState<Record<string, BaseContract>>({});

  const configDep: string = useMemo(
    () => `${JSON.stringify(config ?? {})}, ${providerKey(providerOrSigner).provider}`,
    [config, providerOrSigner]
  );

  const callFunc = useCallback(
    async (): Promise<void> => {
      const adaptor = await parseProviderOrSigner(providerOrSigner);
      const chainId = adaptor?.chainId;
      if (providerOrSigner != null && chainId && chainId > 0) {
        try {
          const contractList: THardhatDeployedContractsJson = { ...(config.deployedContractsJson ?? {}) };
          const externalContractList: TExternalContracts = {
            ...(config.externalContracts ?? {}),
          };
          let combinedContracts: Record<string, TBasicContractData> = parseContractsInDeployedHardhatContractsJson(
            contractList,
            chainId
          );

          // load external contracts if its the right chain
          if (externalContractList?.[chainId] != null) {
            combinedContracts = { ...combinedContracts, ...externalContractList[chainId].contracts };
          }

          const newContracts = Object.keys(combinedContracts).reduce(
            (accumulator: Record<string, any>, contractName: string) => {
              const address: string =
                config.customAddresses && Object.keys(config.customAddresses).includes(contractName)
                  ? config.customAddresses[contractName]
                  : combinedContracts[contractName].address;

              const abi = combinedContracts[contractName].abi;
              if (abi) {
                accumulator[contractName] = new BaseContract(address, abi, providerOrSigner);
              }
              return accumulator;
            },
            {}
          );

          if (isMounted()) {
            setContracts((currValue) => {
              if (
                currValue !== newContracts &&
                (Object.keys(currValue).length > 0 || Object.keys(newContracts).length > 0)
              ) {
                console.log(`🌀 loading contracts..`);
                return newContracts;
              }
              return currValue;
            });
          }
        } catch (e) {
          console.log('⚠ useContractLoader, ERROR LOADING CONTRACTS!!', e, config);
        }
      }
    },
    // disable as configDep is used for dep instead of config
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configDep]
  );

  useEffect(() => {
    void callFunc();
  }, [callFunc]);

  return contracts;
};
