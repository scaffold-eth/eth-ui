/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Web3Provider } from '@ethersproject/providers';
import { useCallback, useEffect, useRef } from 'react';
import Web3Modal, { ICoreOptions, ThemeColors } from 'web3modal';
import './helpers/_global';

import { TEthersProvider } from '~~/models';

export interface IWeb3ModalState {
  initialized: boolean;
  openWeb3ModalCallback: () => void;
  logoutOfWeb3ModalCallback: () => void;
  updateWeb3ModalThemeCallback: (theme: ThemeColors | string) => void;
}

const const_web3DialogClosedByUser = 'Modal closed by user';
export const useWeb3Modal = (
  web3ModalConfig: Partial<ICoreOptions>,
  setCurrentProvider: React.Dispatch<React.SetStateAction<TEthersProvider | undefined>>
): IWeb3ModalState => {
  const web3ModalProviderRef = useRef<Web3Modal>();
  const initalizedRef = useRef<boolean>();

  /**
   * initalize web3 object and save it to state
   */
  useEffect(() => {
    if (!Web3Modal) {
      throw 'Web3Modal is a peer dependancy to use this hook';
    }
    web3ModalProviderRef.current = new Web3Modal(web3ModalConfig ?? {});
    initalizedRef.current = false;
    setCurrentProvider(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3ModalConfig]);

  /**
   * a callback to reload the page and clear cache
   */
  const reload = useCallback(() => {
    return (_param: any): void => {
      web3ModalProviderRef.current?.cachedProvider &&
        setTimeout(() => {
          window.location.reload();
        }, 1);
    };
  }, []);

  /**
   * log out of web3modal provider
   */
  const logoutOfWeb3ModalCallback = useCallback(
    (reload: boolean = false): void => {
      web3ModalProviderRef.current?.clearCachedProvider();
      setCurrentProvider(undefined);
      if (reload) {
        setTimeout(() => {
          window.location.reload();
        }, 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCurrentProvider]
  );

  /**
   * the function that setups up and loads the web3modal
   */
  const loadWeb3Modal = useCallback(async () => {
    try {
      const provider = await web3ModalProviderRef.current?.connect();
      setCurrentProvider(new Web3Provider(provider));
      initalizedRef.current = true;

      if (provider?.on) {
        provider.on('chainChanged', (chainId: number) => {
          console.log(`chain changed to ${chainId}! updating providers`);
          setCurrentProvider(new Web3Provider(provider));
        });

        provider.on('accountsChanged', () => {
          console.log(`account changed!`);
          setCurrentProvider(new Web3Provider(provider));
        });

        // Subscribe to session disconnection
        provider.on('disconnect', (code: any, reason: any) => {
          console.log(code, reason);
          void logoutOfWeb3ModalCallback();
          setCurrentProvider(undefined);
        });
      }
    } catch (e) {
      if ((e as string).includes(const_web3DialogClosedByUser)) {
        initalizedRef.current = true;
      }
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentProvider]);

  /**
   * On initalization, load modal
   */
  useEffect(() => {
    if (web3ModalProviderRef.current?.cachedProvider) {
      void loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  /**
   * a callback to open
   */
  const openWeb3ModalCallback = useCallback(() => {
    setCurrentProvider(undefined);
    web3ModalProviderRef.current?.clearCachedProvider();
    void loadWeb3Modal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadWeb3Modal]);

  const updateWeb3ModalThemeCallback = useCallback((theme: ThemeColors | string) => {
    web3ModalProviderRef.current?.updateTheme(theme);
  }, []);

  /**
   * add hooks to reload page if required
   */
  useEffect(() => {
    /* eslint-disable */
    if (window?.ethereum?.on && window?.ethereum?.off) {
      window.ethereum.on('chainChanged', reload);
      window.ethereum.on('accountsChanged', reload);
      return () => {
        window.ethereum.off('chainChanged', reload);
        window.ethereum.off('accountsChanged', reload);
      };
    }
    /* eslint-disable */
  }, [window?.ethereum]);

  return {
    initialized: initalizedRef.current ?? false,
    openWeb3ModalCallback,
    logoutOfWeb3ModalCallback,
    updateWeb3ModalThemeCallback,
  };
};
