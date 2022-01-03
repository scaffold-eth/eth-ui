import { BaseContract } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useEthersContext } from '~~/context';
import { ethersOverride } from '~~/functions';
import { defaultHookOptions, THardhatContractsFileJson, THardhatContractJson, THookOptions } from '~~/models';

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
  deployedContractsJson?: THardhatContractsFileJson;
  /**
   * External contracts (such as DAI)
   */
  externalContracts?: TExternalContracts;
};

export const parseContractsInJson = (
  contractList: THardhatContractsFileJson,
  chainId: number
): Record<string, THardhatContractJson> => {
  let combinedContracts: Record<string, THardhatContractJson> = {};

  // combine partitioned contracts based on all the available and chain id.
  if (contractList?.[chainId] != null) {
    for (const network in contractList[chainId]) {
      if (Object.prototype.hasOwnProperty.call(contractList[chainId], network)) {
        const chainContracts = contractList?.[chainId]?.[network]?.contracts;
        if (chainContracts != null) {
          combinedContracts = {
            ...combinedContracts,
            ...chainContracts,
          };
        }
      }
    }
  }

  return combinedContracts;
};
/**
 * #### Summary
 * Loads your contracts and returns them. ✋🏽 @deprecated
 * Gives options to read values from contracts or write transactions into them.
 *
 * #### Notes
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
  options: THookOptions = defaultHookOptions()
): Record<string, BaseContract> => {
  const isMounted = useIsMounted();
  const ethersContext = useEthersContext(options.contextOverride.alternateContextKey);
  const { provider, chainId } = ethersOverride(ethersContext, options);

  const [contracts, setContracts] = useState<Record<string, BaseContract>>({});
  const configDep: string = useMemo(
    () => `${JSON.stringify(config ?? {})}, ${JSON.stringify({ chainId: chainId })}`,
    [chainId, config]
  );

  const callFunc = useCallback(
    (): void => {
      if (provider && chainId && chainId > 0) {
        try {
          const contractList: THardhatContractsFileJson = { ...(config.deployedContractsJson ?? {}) };
          const externalContractList: TExternalContracts = {
            ...(config.externalContracts ?? {}),
          };
          let combinedContracts: Record<string, THardhatContractJson> = parseContractsInJson(contractList, chainId);

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
                accumulator[contractName] = new BaseContract(address, abi, provider);
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
    [provider, configDep, provider]
  );

  useEffect(() => {
    void callFunc();
  }, [callFunc, chainId]);

  return contracts;
};
