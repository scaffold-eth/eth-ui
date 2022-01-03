import { utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useBlockNumberContext, useEthersContext } from '~~/context';
import { ethersOverride } from '~~/functions';
import { defaultHookOptions, THookOptions } from '~~/models';
/**
 * #### Summary
 * Checks whether a contract exists on the blockchain
 *
 * #### Notes
 * - uses the ethers.Contract object's provider to access the network
 * - checks the contract address to see if the contract is deployed
 *
 * @category Hooks
 *
 * @param contract ethers.BaseContract class
 * @returns
 */
export const useContractExistsAtAddress = (
  contractAddress: string | undefined,
  options: THookOptions = defaultHookOptions()
): [contractIsDeployed: boolean, update: () => void] => {
  const isMounted = useIsMounted();
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext(options.contextOverride.alternateContextKey);
  const { provider } = ethersOverride(ethersContext, options);

  const [contractIsDeployed, setContractIsDeployed] = useState(false);

  /**
   * We can look at the blockchain and see what's stored at `contractAddress`
   * If we find code then we know that a contract exists there.
   * If we find nothing (0x0) then there is no contract deployed to that address
   */
  const update = useCallback(async (): Promise<void> => {
    if (contractAddress == null || provider == null || !utils.isAddress(contractAddress)) {
      if (isMounted()) setContractIsDeployed(false);
      return;
    }

    const bytecode = await provider.getCode(contractAddress);
    if (isMounted()) {
      setContractIsDeployed(bytecode !== '0x');
    }
  }, [provider, contractAddress, isMounted]);

  useEffect(() => {
    void update();
  }, [blockNumber, update]);

  return [contractIsDeployed, update];
};
