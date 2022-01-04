import { TokenInfo, TokenList } from '@uniswap/token-lists';
import axios from 'axios';
import isEqual from 'lodash.isequal';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { mergeDefaultHookOptions } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { THookOptions, const_blockNumberInterval100 } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const queryKey = { namespace: keyNamespace.signer, key: 'useDexTokenList' } as const;

/**
 * #### Summary
 * Gets a tokenlist from uniswap ipfs tokenlist
 *
 * #### Note
 * - you can also point it to another URI
 *
 * @category Hooks
 *
 * @param tokenListUri
 * @param chainId optional, you can filter by a particular chainId
 * @returns (TokenInfo[]) from '@uniswap/token-lists'
 */
export const useDexTokenList = (
  tokenListUri: string = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org',
  chainId?: number,
  options: THookOptions = mergeDefaultHookOptions({ ...const_blockNumberInterval100 })
): [tokenList: TokenInfo[], update: () => void] => {
  const keys = [{ ...queryKey }, { tokenListUri, chainId }] as const;
  const { data, refetch } = useQuery(
    keys,
    async (keys): Promise<TokenInfo[]> => {
      const { tokenListUri, chainId } = keys.queryKey[1];
      let tokenInfo: TokenInfo[] = [];
      const tokenListResp: TokenList = (await axios(tokenListUri)).data as TokenList;
      if (tokenListResp != null) {
        if (chainId) {
          tokenInfo = tokenListResp.tokens.filter((t: TokenInfo) => {
            return t.chainId === chainId;
          });
        } else {
          tokenInfo = tokenListResp.tokens;
        }
      }
      return tokenInfo;
    },
    {
      isDataEqual: (oldResult, newResult) => isEqual(oldResult, newResult),
      ...options.update.query,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? [], refetch];
};
