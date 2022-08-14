import { default as create, StoreApi, UseBoundStore } from 'zustand';

import { IBlockNumberState } from '~~/context/EthersAppState';

interface IStore {
  blockNumberState: IBlockNumberState;
  setBlockNumber: (blocknumber: number, chainId: number) => void;
}

// type TSetStoreFunc = IStore | Partial<IStore> | ((state: IStore) => IStore | Partial<IStore>);
export type TEthersAppStore = UseBoundStore<StoreApi<IStore>>;
export type { create, StoreApi, UseBoundStore };

export const useEthersAppStore = create<IStore>()((set) => ({
  blockNumberState: {},
  setBlockNumber: (blocknumber: number, chainId: number): void =>
    set((state): IStore => {
      state.blockNumberState[chainId] = blocknumber;
      return state;
    }),
}));
