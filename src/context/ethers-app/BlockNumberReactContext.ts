import { createContext } from 'react';

/**
 * The ReactContext for BlockNumberContext from createContext
 * Specifically named as react and web3 share terminlogies in providers / contexts etc.
 */
export const BlockNumberReactContext = createContext<number | undefined>(undefined);
