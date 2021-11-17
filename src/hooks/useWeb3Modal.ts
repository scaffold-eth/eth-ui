/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Web3Provider } from '@ethersproject/providers';
import { useCallback, useEffect, useRef } from 'react';
import Web3Modal, { ICoreOptions, ThemeColors } from 'web3modal';
import '~~/helpers/__global';

import { TEthersProvider } from '~~/models';
import { const_web3DialogClosedByUser } from '~~/models/constants/common';

/**
 * The current state of Web3Modal
 *
 * @category Hooks
 */
export type TWeb3ModalState = {
  /**
   * Is the modal initalizing
   */
  initializing: boolean;
  /**
   * A callback to open the modal
   */
  openWeb3ModalCallback: () => void;
  /**
   * A callback to close the modal
   */
  logoutOfWeb3ModalCallback: () => void;
  /**
   * A callback to change the modal theme
   */
  updateWeb3ModalThemeCallback: (theme: ThemeColors | string) => void;
};
/**
 * #### Summary
 * A hook that makes it easy to interact and use [web3Modal](https://github.com/Web3Modal/web3modal)
 * - provides callback to open, logout and update the modal theme
 *
 * #### Notes
 * - 🤚🏽 Consider using the context provider {@link ethersProvider} and {@link EthersModalConnector} instead.
 *
 * @category Hooks
 *
 * @param web3ModalConfig
 * @param setCurrentEthersProvider
 * @returns
 */
export const useWeb3Modal = (
  web3ModalConfig: Partial<ICoreOptions>,
  setCurrentEthersProvider: (newEthersProvider: TEthersProvider | undefined) => void
): TWeb3ModalState => {
  const web3ModalProviderRef = useRef<Web3Modal>();
  const initalizingRef = useRef<boolean>();

  /**
   * initalize web3 object and save it to state
   */
  useEffect(() => {
    if (!Web3Modal) {
      throw 'Web3Modal is a peer dependancy to use this hook';
    }
    web3ModalProviderRef.current = new Web3Modal(web3ModalConfig ?? {});
    initalizingRef.current = true;
    setCurrentEthersProvider(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3ModalConfig]);

  /**
   * a callback to reload the page and clear cache
   */
  const reloadPage = useCallback(() => {
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
    (reload: boolean = true): void => {
      initalizingRef.current = false;
      setCurrentEthersProvider(undefined);
      if (reload) {
        reloadPage();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCurrentEthersProvider]
  );

  /**
   * the function that setups up and loads the web3modal
   */
  const loadWeb3Modal = useCallback(async () => {
    try {
      initalizingRef.current = true;
      const provider = await web3ModalProviderRef.current?.connect();
      setCurrentEthersProvider(new Web3Provider(provider));

      /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
      if (provider?.on) {
        provider.on('chainChanged', (chainId: number) => {
          console.log(`chain changed to ${chainId}! updating providers`);
          setCurrentEthersProvider(new Web3Provider(provider));
        });

        provider.on('accountsChanged', () => {
          console.log(`account changed!`);
          setCurrentEthersProvider(new Web3Provider(provider));
        });

        // Subscribe to session disconnection
        provider.on('disconnect', (code: any, reason: any) => {
          console.log(code, reason);
          void logoutOfWeb3ModalCallback();
          setCurrentEthersProvider(undefined);
        });
      }
      /* eslint-enable */
    } catch (e) {
      if ((e as string).includes(const_web3DialogClosedByUser)) {
        console.log(e);
      } else {
        throw e;
      }
    } finally {
      initalizingRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentEthersProvider]);

  /**
   * On initalization, load modal
   */
  useEffect(() => {
    if (web3ModalProviderRef.current?.cachedProvider) {
      void loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  /**
   * a callback to open the modal
   */
  const openWeb3ModalCallback = useCallback(() => {
    setCurrentEthersProvider(undefined);
    web3ModalProviderRef.current?.clearCachedProvider();
    void loadWeb3Modal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadWeb3Modal]);

  const updateWeb3ModalThemeCallback = useCallback((theme: ThemeColors | string) => {
    web3ModalProviderRef.current?.updateTheme(theme);
  }, []);

  return {
    initializing: initalizingRef.current ?? false,
    openWeb3ModalCallback,
    logoutOfWeb3ModalCallback,
    updateWeb3ModalThemeCallback,
  };
};
