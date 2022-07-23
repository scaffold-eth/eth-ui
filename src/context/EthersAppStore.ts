import create, { StoreApi, UseBoundStore } from 'zustand';

import { IBlockNumberState } from '~~/context/EthersAppState';

interface IEthersAppStore {
  blockNumberState: IBlockNumberState;
  setBlockNumber: (blocknumber: number, chainId: number) => void;
}

type TSetStoreFunc =
  | IEthersAppStore
  | Partial<IEthersAppStore>
  | ((state: IEthersAppStore) => IEthersAppStore | Partial<IEthersAppStore>);

const setBlockNumber = (chainId: number, blocknumber: number): TSetStoreFunc => {
  return (state): IEthersAppStore => {
    state.blockNumberState[chainId] = blocknumber;
    return state;
  };
};

export type TEthersAppStore = UseBoundStore<StoreApi<IEthersAppStore>>;

export const useEthersAppStore = create<IEthersAppStore>()((set) => ({
  blockNumberState: {},
  setBlockNumber: (blocknumber: number, chainId: number): void => set(setBlockNumber(chainId, blocknumber)),
}));

// export const createEthersAppStore = (): TEthersAppStore => {
//   const useEthersAppStore = create<IEthersAppStore>()((set) => ({
//     blockNumberState: {},
//     setBlockNumber: (blocknumber: number, chainId: number): void => set(setBlockNumber(chainId, blocknumber)),
//   }));
//   return useEthersAppStore;
// };
