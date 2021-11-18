import { TokenInfo, TokenList } from '@uniswap/token-lists';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';

import { useBlockNumberContext } from '~~/context';
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
  chainId?: number
): TokenInfo[] => {
  const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
  const blockNumber = useBlockNumberContext();

  const callFunc = useCallback(async (): Promise<void> => {
    try {
      const tokenListResp: TokenList = (await axios(tokenListUri)).data as TokenList;
      if (tokenListResp != null) {
        let tokenInfo: TokenInfo[] = [];

        if (chainId) {
          tokenInfo = tokenListResp.tokens.filter((t: TokenInfo) => {
            return t.chainId === chainId;
          });
        } else {
          tokenInfo = tokenListResp.tokens;
        }

        setTokenList(tokenInfo);
      }
    } catch (e) {
      console.log(e);
    }
  }, [chainId, tokenListUri]);

  useEffect(() => {
    void callFunc();
  }, [blockNumber, callFunc]);

  return tokenList;
};
